#!/bin/bash

echo "=== Fixing Lambda Handler Configuration ==="

# Set Lambda function names
UPLOAD_LAMBDA="stylegenie-get-upload-url"
AI_LAMBDA="StyleGenieAI"

echo "1. Fixing $UPLOAD_LAMBDA handler configuration..."
aws lambda update-function-configuration \
    --function-name $UPLOAD_LAMBDA \
    --handler getUploadUrl.handler \
    --runtime nodejs18.x

echo "2. Checking Lambda code file structure..."
# Create a temporary directory
mkdir -p /tmp/lambda-code
cd /tmp/lambda-code

# Download the Lambda function code
echo "Downloading existing Lambda code..."
aws lambda get-function \
    --function-name $UPLOAD_LAMBDA \
    --query 'Code.Location' \
    --output text > lambda_url.txt

curl -s -o lambda.zip $(cat lambda_url.txt)
unzip -q lambda.zip

# Check if the handler file exists
if [ ! -f "getUploadUrl.js" ]; then
    echo "Handler file not found. Creating correct handler file..."
    
    # Copy our local version if available
    if [ -f "../../../lambda/getUploadUrl.js" ]; then
        cp ../../../lambda/getUploadUrl.js .
    else
        # Create a minimal handler file
        cat > getUploadUrl.js << 'EOL'
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
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
EOL
    fi
    
    # Create package.json for dependencies
    cat > package.json << 'EOL'
{
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
EOL
    
    # Install dependencies
    echo "Installing dependencies..."
    npm install --production
    
    # Create a new ZIP file
    echo "Creating new deployment package..."
    zip -r new_lambda.zip .
    
    # Update the Lambda function code
    echo "Updating Lambda function code..."
    aws lambda update-function-code \
        --function-name $UPLOAD_LAMBDA \
        --zip-file fileb://new_lambda.zip
fi

echo "3. Fixing permissions and allowed models for AI Lambda..."
# Create a model access policy
cat > bedrock-model-policy.json << 'EOL'
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "bedrock:InvokeModel",
                "bedrock:InvokeModelWithResponseStream"
            ],
            "Resource": [
                "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0",
                "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-haiku-20240307-v1:0",
                "arn:aws:bedrock:us-east-1::foundation-model/stability.stable-diffusion-xl-v1:0",
                "arn:aws:bedrock:us-east-1::foundation-model/*"
            ]
        }
    ]
}
EOL

# Create the policy
MODEL_POLICY_ARN=$(aws iam create-policy \
    --policy-name StyleGenieModelAccessPolicy \
    --policy-document file://bedrock-model-policy.json \
    --query 'Policy.Arn' \
    --output text 2>/dev/null || \
    aws iam get-policy \
    --policy-arn arn:aws:iam::$(aws sts get-caller-identity --query Account --output text):policy/StyleGenieModelAccessPolicy \
    --query 'Policy.Arn' \
    --output text)

# Get the role for the AI Lambda
AI_ROLE=$(aws lambda get-function \
    --function-name $AI_LAMBDA \
    --query 'Configuration.Role' \
    --output text)

# Extract the role name
AI_ROLE_NAME=$(echo $AI_ROLE | sed 's/.*\/\(.*\)/\1/')

# Attach the policy to the role
echo "Attaching model access policy to $AI_ROLE_NAME..."
aws iam attach-role-policy \
    --role-name $AI_ROLE_NAME \
    --policy-arn $MODEL_POLICY_ARN

# Check the content of the Lambda function to identify the model being used
echo "4. Checking Lambda function code to identify model used..."
mkdir -p /tmp/ai-lambda
cd /tmp/ai-lambda

# Download the Lambda function code
aws lambda get-function \
    --function-name $AI_LAMBDA \
    --query 'Code.Location' \
    --output text > ai_lambda_url.txt

curl -s -o ai_lambda.zip $(cat ai_lambda_url.txt)
unzip -q ai_lambda.zip

# Check which model is being used
MODEL_ID=$(grep -r "model_id" . | head -1 || echo "Model ID not found")
echo "Current model reference: $MODEL_ID"

# Print Bedrock models that you have access to
echo "5. Listing available Bedrock models..."
aws bedrock list-foundation-models --query "modelSummaries[*].modelId" --output table

echo
echo "=== All fixes applied ==="
echo "1. Fixed Upload Lambda handler configuration"
echo "2. Added correct code file structure if missing"
echo "3. Added model access permissions to the AI Lambda role"
echo "4. Listed available Bedrock models for your account"
echo
echo "For the StyleGenieAI Lambda, make sure it's using one of the available models."
echo "You may need to update the model_id in the Lambda function code."
echo
echo "To redeploy the application with these fixes, run:"
echo "   ./deployment/update-deployment.sh" 