#!/usr/bin/env python3
import boto3
import json
import tempfile
import os
import zipfile
import shutil
import subprocess
import time
from botocore.exceptions import ClientError

print("=== Comprehensive Lambda Fixes ===")

# Initialize AWS clients
lambda_client = boto3.client('lambda')
bedrock_client = boto3.client('bedrock')
logs_client = boto3.client('cloudwatch-logs')
iam_client = boto3.client('iam')

# Lambda function names
UPLOAD_LAMBDA = "stylegenie-get-upload-url"
AI_LAMBDA = "StyleGenieAI"

def fix_upload_lambda():
    """Fix the Upload Lambda handler configuration and code"""
    print("\n=== Fixing Upload Lambda ===")
    
    try:
        # Update Lambda function configuration to correct handler
        print("1. Updating function configuration...")
        lambda_client.update_function_configuration(
            FunctionName=UPLOAD_LAMBDA,
            Handler="getUploadUrl.handler",
            Runtime="nodejs18.x"
        )
        
        # Download the Lambda function code
        print("2. Checking existing code...")
        with tempfile.TemporaryDirectory() as temp_dir:
            # Download function
            response = lambda_client.get_function(FunctionName=UPLOAD_LAMBDA)
            code_url = response['Code']['Location']
            
            # Download the zip file
            zip_path = os.path.join(temp_dir, 'lambda.zip')
            subprocess.run(['curl', '-s', '-o', zip_path, code_url], check=True)
            
            # Extract the zip file
            extract_dir = os.path.join(temp_dir, 'extracted')
            os.makedirs(extract_dir, exist_ok=True)
            with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                zip_ref.extractall(extract_dir)
            
            # Check if handler file exists
            handler_file = os.path.join(extract_dir, 'getUploadUrl.js')
            if not os.path.exists(handler_file):
                print("Handler file not found. Creating...")
                
                # Create handler file
                with open(handler_file, 'w') as f:
                    f.write("""const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');

const s3Client = new S3Client({ region: 'us-east-1' });
const BUCKET_NAME = 'stylegenie-uploads';

exports.handler = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ error: 'Request body is required' }),
      };
    }

    const { fileName, fileType } = JSON.parse(event.body);

    if (!fileName || !fileType) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ error: 'fileName and fileType are required' }),
      };
    }

    // Generate a unique file name
    const fileExtension = fileName.split('.').pop();
    const uniqueFileName = `${uuidv4()}.${fileExtension}`;

    // Create the S3 command
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: uniqueFileName,
      ContentType: fileType,
    });

    // Generate the pre-signed URL
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    // Return both the upload URL and the final file URL
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        uploadUrl,
        fileUrl: `https://${BUCKET_NAME}.s3.amazonaws.com/${uniqueFileName}`,
      }),
    };
  } catch (error) {
    console.error('Error generating upload URL:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ error: 'Failed to generate upload URL' }),
    };
  }
};
""")
                
                # Create package.json
                with open(os.path.join(extract_dir, 'package.json'), 'w') as f:
                    f.write("""{
  "name": "stylegenie-upload-lambda",
  "version": "1.0.0",
  "description": "Lambda function for generating S3 pre-signed URLs",
  "main": "getUploadUrl.js",
  "dependencies": {
    "@aws-sdk/client-s3": "^3.0.0",
    "@aws-sdk/s3-request-presigner": "^3.0.0",
    "uuid": "^9.0.0"
  }
}
""")
                
                # Install dependencies
                print("Installing dependencies...")
                cwd = os.getcwd()
                os.chdir(extract_dir)
                subprocess.run(['npm', 'install', '--production'], check=True)
                os.chdir(cwd)
                
                # Create a new zip file
                print("Creating new deployment package...")
                new_zip_path = os.path.join(temp_dir, 'new_lambda.zip')
                shutil.make_archive(os.path.join(temp_dir, 'new_lambda'), 'zip', extract_dir)
                
                # Update the Lambda function code
                print("Updating Lambda function code...")
                with open(new_zip_path, 'rb') as zip_file:
                    lambda_client.update_function_code(
                        FunctionName=UPLOAD_LAMBDA,
                        ZipFile=zip_file.read()
                    )
        
        # Check for the IAM role and add permissions if needed
        print("3. Checking IAM role permissions...")
        lambda_info = lambda_client.get_function(FunctionName=UPLOAD_LAMBDA)
        role_arn = lambda_info['Configuration']['Role']
        role_name = role_arn.split('/')[-1]
        
        # Create the S3 policy if not exists
        policy_name = "StyleGenieS3UploadPolicy"
        try:
            s3_policy = {
                "Version": "2012-10-17",
                "Statement": [
                    {
                        "Effect": "Allow",
                        "Action": [
                            "s3:PutObject",
                            "s3:PutObjectAcl",
                            "s3:GetObject"
                        ],
                        "Resource": "arn:aws:s3:::stylegenie-uploads/*"
                    }
                ]
            }
            
            try:
                response = iam_client.create_policy(
                    PolicyName=policy_name,
                    PolicyDocument=json.dumps(s3_policy)
                )
                policy_arn = response['Policy']['Arn']
            except ClientError as e:
                if e.response['Error']['Code'] == 'EntityAlreadyExists':
                    account_id = boto3.client('sts').get_caller_identity()['Account']
                    policy_arn = f"arn:aws:iam::{account_id}:policy/{policy_name}"
                else:
                    raise
            
            # Attach policy to role
            try:
                iam_client.attach_role_policy(
                    RoleName=role_name,
                    PolicyArn=policy_arn
                )
                print(f"Attached S3 policy to role: {role_name}")
            except ClientError as e:
                if e.response['Error']['Code'] == 'NoSuchEntity':
                    print(f"Warning: Role {role_name} not found")
                else:
                    raise
                    
        except Exception as e:
            print(f"Warning: Error updating IAM permissions: {str(e)}")
        
        print("Upload Lambda fixed successfully!")
        
    except Exception as e:
        print(f"Error fixing upload Lambda: {str(e)}")

def fix_ai_lambda():
    """Fix the AI Lambda model and permissions"""
    print("\n=== Fixing StyleGenieAI Lambda ===")
    
    try:
        # Get available Bedrock models
        print("1. Fetching available Bedrock models...")
        model_response = bedrock_client.list_foundation_models()
        available_models = [model['modelId'] for model in model_response.get('modelSummaries', [])]
        
        print(f"Available models: {', '.join(available_models[:5])}" + 
              (f" and {len(available_models)-5} more..." if len(available_models) > 5 else ""))
        
        # Preferred models in order of preference
        preferred_models = [
            "anthropic.claude-3-sonnet-20240229-v1:0",
            "anthropic.claude-3-haiku-20240307-v1:0",
            "amazon.titan-text-express-v1",
            "ai21.j2-ultra-v1",
            "anthropic.claude-v2",
            "anthropic.claude-instant-v1"
        ]
        
        # Find the first available preferred model
        target_model = None
        for model in preferred_models:
            if model in available_models:
                target_model = model
                break
        
        if not target_model and available_models:
            # If none of our preferred models are available, use the first available one
            target_model = available_models[0]
        
        if not target_model:
            print("Error: No Bedrock models available in your account.")
            print("Please enable at least one model in the AWS Bedrock console.")
            return
        
        print(f"Selected model: {target_model}")
        
        # Update Lambda function with error handling
        with tempfile.TemporaryDirectory() as temp_dir:
            # Download Lambda function
            print("2. Downloading Lambda function code...")
            response = lambda_client.get_function(FunctionName=AI_LAMBDA)
            code_url = response['Code']['Location']
            
            # Download the zip file
            zip_path = os.path.join(temp_dir, 'lambda.zip')
            subprocess.run(['curl', '-s', '-o', zip_path, code_url], check=True)
            
            # Extract the zip file
            extract_dir = os.path.join(temp_dir, 'extracted')
            os.makedirs(extract_dir, exist_ok=True)
            with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                zip_ref.extractall(extract_dir)
            
            # Find Lambda function file
            lambda_file = None
            for root, _, files in os.walk(extract_dir):
                for file in files:
                    if file.endswith('.py'):
                        lambda_file = os.path.join(root, file)
                        print(f"Found Python file: {os.path.relpath(lambda_file, extract_dir)}")
                        break
                if lambda_file:
                    break
            
            if not lambda_file:
                lambda_file = os.path.join(extract_dir, 'lambda_function.py')
                print(f"No Python file found. Creating default at: {os.path.relpath(lambda_file, extract_dir)}")
                
                # Create basic Lambda function with error handling
                with open(lambda_file, 'w') as f:
                    f.write(f"""import json
import boto3
import traceback

# Initialize Bedrock client
bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')

# Set the model ID to an available model
model_id = "{target_model}"

def lambda_handler(event, context):
    try:
        # Parse the request
        if 'body' in event and event['body']:
            try:
                body = json.loads(event['body'])
                query = body.get('query', '')
            except:
                query = event.get('query', '')
        else:
            query = event.get('query', '')
            
        if not query:
            return {{
                'statusCode': 400,
                'headers': {{
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }},
                'body': json.dumps({{'error': 'Query parameter is required'}}),
            }}
        
        # Prepare prompt for Claude
        prompt = f'''Human: I need some fashion advice for the following scenario: {{query}}
        
Give me a complete outfit suggestion including clothes, shoes, and accessories. Explain why this outfit works for the scenario.
""") 