#!/usr/bin/env python3
import boto3
import json
import sys

# Initialize AWS clients
lambda_client = boto3.client('lambda')
bedrock_client = boto3.client('bedrock')
s3_client = boto3.client('s3')
iam_client = boto3.client('iam')

def test_upload_lambda():
    """Test the upload Lambda function"""
    print("\n=== Testing Upload Lambda ===")
    
    # First, check the Lambda configuration
    try:
        lambda_config = lambda_client.get_function(FunctionName="stylegenie-get-upload-url")
        
        print(f"Handler: {lambda_config['Configuration']['Handler']}")
        print(f"Runtime: {lambda_config['Configuration']['Runtime']}")
        print(f"Role: {lambda_config['Configuration']['Role']}")
        
        # Check if the handler is correct, fix if not
        if lambda_config['Configuration']['Handler'] != "getUploadUrl.handler":
            print("Incorrect handler. Updating...")
            lambda_client.update_function_configuration(
                FunctionName="stylegenie-get-upload-url",
                Handler="getUploadUrl.handler"
            )
            print("Handler updated to getUploadUrl.handler")
    except Exception as e:
        print(f"Error checking Lambda configuration: {str(e)}")
    
    # Test invoke the function
    print("\nInvoking Lambda function...")
    try:
        response = lambda_client.invoke(
            FunctionName="stylegenie-get-upload-url",
            Payload=json.dumps({
                "body": json.dumps({
                    "fileName": "test.jpg",
                    "fileType": "image/jpeg"
                })
            })
        )
        
        payload = json.loads(response['Payload'].read().decode())
        print(f"Status code: {payload.get('statusCode', 'Unknown')}")
        if 'body' in payload:
            body = json.loads(payload['body']) if isinstance(payload['body'], str) else payload['body']
            if 'error' in body:
                print(f"Error: {body['error']}")
            else:
                print("Response: OK")
                print(f"Upload URL available: {'uploadUrl' in body}")
                print(f"File URL: {body.get('fileUrl', 'Not available')}")
                
    except Exception as e:
        print(f"Error invoking Lambda: {str(e)}")
        
def fix_bedrock_permissions():
    """Fix Bedrock permissions for the AI Lambda"""
    print("\n=== Fixing Bedrock Permissions ===")
    
    try:
        # Get the Lambda function role
        lambda_config = lambda_client.get_function(FunctionName="StyleGenieAI")
        role_arn = lambda_config['Configuration']['Role']
        role_name = role_arn.split('/')[-1]
        
        print(f"Lambda role: {role_name}")
        
        # Create Bedrock policy
        policy_name = "StyleGenieBedrockAccess"
        policy_document = {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": [
                        "bedrock:InvokeModel",
                        "bedrock:InvokeModelWithResponseStream"
                    ],
                    "Resource": "*"
                }
            ]
        }
        
        # Create policy if it doesn't exist
        try:
            response = iam_client.create_policy(
                PolicyName=policy_name,
                PolicyDocument=json.dumps(policy_document)
            )
            policy_arn = response['Policy']['Arn']
            print(f"Created policy: {policy_arn}")
        except iam_client.exceptions.EntityAlreadyExistsException:
            account_id = boto3.client('sts').get_caller_identity()['Account']
            policy_arn = f"arn:aws:iam::{account_id}:policy/{policy_name}"
            print(f"Policy already exists: {policy_arn}")
        
        # Attach policy to role
        try:
            iam_client.attach_role_policy(
                RoleName=role_name,
                PolicyArn=policy_arn
            )
            print(f"Attached policy to role {role_name}")
        except Exception as e:
            print(f"Error attaching policy: {str(e)}")
        
        # Get available models
        print("\nAvailable Bedrock models:")
        models_response = bedrock_client.list_foundation_models(
            byOutputModality="TEXT"
        )
        for model in models_response.get('modelSummaries', []):
            print(f"- {model['modelId']}")
            
        print("\nTo update the Lambda to use an available model, run:")
        print("python deployment/ai-lambda-updater.py")
        
    except Exception as e:
        print(f"Error fixing Bedrock permissions: {str(e)}")

def print_commands():
    """Print commands to fix issues"""
    print("\n=== Commands to Fix Lambda Issues ===")
    print("1. To fix the Upload Lambda handler:")
    print("   aws lambda update-function-configuration --function-name stylegenie-get-upload-url --handler getUploadUrl.handler")
    
    print("\n2. To add Bedrock permissions:")
    print("   # Create policy document")
    print("""   echo '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:InvokeModelWithResponseStream"
      ],
      "Resource": "*"
    }
  ]
}' > bedrock-policy.json""")
    print("   # Create policy")
    print("   aws iam create-policy --policy-name StyleGenieBedrockAccess --policy-document file://bedrock-policy.json")
    print("   # Get the role name from the Lambda function")
    print("   ROLE=$(aws lambda get-function --function-name StyleGenieAI --query 'Configuration.Role' --output text | sed 's/.*\\///')")
    print("   # Attach policy to role")
    print("   aws iam attach-role-policy --role-name $ROLE --policy-arn arn:aws:iam::<ACCOUNT_ID>:policy/StyleGenieBedrockAccess")
    
    print("\n3. To update the model ID in the AI Lambda:")
    print("   python deployment/ai-lambda-updater.py")

if __name__ == "__main__":
    print("=== StyleGenie Lambda Test Tool ===")
    print("Select an option:")
    print("1. Test Upload Lambda")
    print("2. Fix Bedrock Permissions")
    print("3. Print Fix Commands")
    print("4. Exit")
    
    choice = input("Enter your choice (1-4): ")
    
    if choice == "1":
        test_upload_lambda()
    elif choice == "2":
        fix_bedrock_permissions()
    elif choice == "3":
        print_commands()
    elif choice == "4":
        print("Exiting...")
        sys.exit(0)
    else:
        print("Invalid choice. Exiting.") 