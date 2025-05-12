#!/bin/bash

echo "=== Updating Lambda Function Permissions ==="

# Lambda function names
UPLOAD_LAMBDA="stylegenie-get-upload-url"
AI_LAMBDA="StyleGenieAI"

# Get AWS account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
if [ -z "$AWS_ACCOUNT_ID" ]; then
    echo "Error: Unable to get AWS account ID. Check AWS credentials."
    exit 1
fi

# Create or update the policy
echo "Creating enhanced Bedrock policy..."
POLICY_ARN=$(aws iam create-policy \
    --policy-name StyleGenieBedrockEnhancedPolicy \
    --policy-document file://bedrock-lambda-policy.json \
    --query 'Policy.Arn' \
    --output text 2>/dev/null || \
  aws iam get-policy \
    --policy-arn arn:aws:iam::$AWS_ACCOUNT_ID:policy/StyleGenieBedrockEnhancedPolicy \
    --query 'Policy.Arn' \
    --output text)

echo "Policy ARN: $POLICY_ARN"

# Get the role for each Lambda function
echo "Getting role for $AI_LAMBDA Lambda function..."
AI_ROLE=$(aws lambda get-function \
    --function-name $AI_LAMBDA \
    --query 'Configuration.Role' \
    --output text)

echo "Getting role for $UPLOAD_LAMBDA Lambda function..."
UPLOAD_ROLE=$(aws lambda get-function \
    --function-name $UPLOAD_LAMBDA \
    --query 'Configuration.Role' \
    --output text)

# Extract role names from ARNs
AI_ROLE_NAME=$(echo $AI_ROLE | sed 's/.*\/\(.*\)/\1/')
UPLOAD_ROLE_NAME=$(echo $UPLOAD_ROLE | sed 's/.*\/\(.*\)/\1/')

echo "AI Lambda Role: $AI_ROLE_NAME"
echo "Upload Lambda Role: $UPLOAD_ROLE_NAME"

# Attach the policy to the roles
echo "Attaching policy to $AI_ROLE_NAME..."
aws iam attach-role-policy \
    --role-name $AI_ROLE_NAME \
    --policy-arn $POLICY_ARN

echo "Attaching policy to $UPLOAD_ROLE_NAME..."
aws iam attach-role-policy \
    --role-name $UPLOAD_ROLE_NAME \
    --policy-arn $POLICY_ARN

# Update Lambda configuration to increase timeout and memory
echo "Updating $AI_LAMBDA configuration..."
aws lambda update-function-configuration \
    --function-name $AI_LAMBDA \
    --timeout 60 \
    --memory-size 1024

echo "Updating $UPLOAD_LAMBDA configuration..."
aws lambda update-function-configuration \
    --function-name $UPLOAD_LAMBDA \
    --timeout 30 \
    --memory-size 512

echo
echo "=== Adding API Gateway Response Models for Better Error Handling ==="

# For the StyleGenie AI API
echo "Updating StyleGenie AI API Gateway responses..."
aws apigateway put-gateway-response \
    --rest-api-id 1hywq9b8na \
    --response-type DEFAULT_5XX \
    --response-parameters "{\"gatewayresponse.header.Access-Control-Allow-Origin\":\"'*'\"}" \
    --response-templates "{\"application/json\":\"{\\\"message\\\": \\\"An internal server error occurred. Please try again later.\\\"}\"}" \
    --status-code 500

# For the Upload URL API
echo "Updating Upload URL API Gateway responses..."
aws apigateway put-gateway-response \
    --rest-api-id zy522ot005 \
    --response-type DEFAULT_5XX \
    --response-parameters "{\"gatewayresponse.header.Access-Control-Allow-Origin\":\"'*'\"}" \
    --response-templates "{\"application/json\":\"{\\\"message\\\": \\\"An internal server error occurred. Please try again later.\\\"}\"}" \
    --status-code 500

echo
echo "=== Deploying API Gateway Changes ==="

# Deploy API Gateway changes
echo "Deploying StyleGenie AI API Gateway..."
aws apigateway create-deployment \
    --rest-api-id 1hywq9b8na \
    --stage-name stage

echo "Deploying Upload URL API Gateway..."
aws apigateway create-deployment \
    --rest-api-id zy522ot005 \
    --stage-name prod

echo
echo "=== Updates Completed ==="
echo "Lambda functions have been updated with enhanced permissions and configurations."
echo "API Gateway responses have been improved for better error handling."
echo
echo "Please rebuild and redeploy the application with:"
echo "   ./deployment/update-deployment.sh" 