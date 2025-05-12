#!/bin/bash

echo "=== Checking AWS Bedrock Access ==="

# Get the Lambda's execution role
echo "Getting Lambda execution role..."
LAMBDA_ROLE=$(aws lambda get-function --function-name StyleGenieAI --query 'Configuration.Role' --output text)
ROLE_NAME=$(echo $LAMBDA_ROLE | cut -d'/' -f2)

echo "Lambda execution role: $ROLE_NAME"

# Check if AWS CLI has the required permissions
echo "Checking if AWS CLI can access Bedrock..."
BEDROCK_MODELS=$(aws bedrock list-foundation-models --output json 2>&1)

if echo "$BEDROCK_MODELS" | grep -i "error" > /dev/null; then
  echo "❌ Error accessing Bedrock from AWS CLI:"
  echo "$BEDROCK_MODELS" | grep -i "error"
  
  echo ""
  echo "This could indicate service not enabled or permissions issues."
  ACCOUNT_ID=$(aws sts get-caller-identity --query 'Account' --output text)
  echo "Your AWS account ID: $ACCOUNT_ID"
  
  echo ""
  echo "Checking AWS region configuration..."
  AWS_REGION=$(aws configure get region)
  echo "AWS CLI configured region: $AWS_REGION"
  
  echo ""
  echo "Checking role policies..."
  ROLE_POLICIES=$(aws iam list-role-policies --role-name $ROLE_NAME)
  echo "Attached inline policies: $ROLE_POLICIES"
  
  ATTACHED_POLICIES=$(aws iam list-attached-role-policies --role-name $ROLE_NAME)
  echo "Attached managed policies: $ATTACHED_POLICIES"
else
  echo "✅ AWS CLI can access Bedrock services"
  echo ""
  echo "Available Bedrock models:"
  aws bedrock list-foundation-models --query 'modelSummaries[?contains(modelId, `anthropic`)].[modelId]' --output text
fi

echo ""
echo "=== Bedrock Access Check Complete ==="
echo ""
echo "Troubleshooting suggestions:"
echo "1. Verify Bedrock service is enabled in your AWS account:"
echo "   https://console.aws.amazon.com/bedrock/home#/modelaccess"
echo "2. Check that your account has model access to Claude:"
echo "   You need to request access to the model in the AWS console"
echo "3. Make sure the Lambda execution role has the proper permissions"
echo "   Run the fix-bedrock-integration.sh script to add necessary permissions" 