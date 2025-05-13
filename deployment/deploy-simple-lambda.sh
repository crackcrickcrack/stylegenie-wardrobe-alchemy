#!/bin/bash

echo "=== Deploying Simple StyleGenieAI Lambda Function ==="

# Copy the simple_ai_lambda.py to lambda_function.py
echo "Copying Lambda function code..."
cp ../lambda/simple_ai_lambda.py lambda_function.py

# Zip the file
echo "Creating deployment package..."
zip lambda_function.zip lambda_function.py

# Update the Lambda function
echo "Updating Lambda function code..."
aws lambda update-function-code \
  --function-name StyleGenieAI \
  --zip-file fileb://lambda_function.zip

# Updating Lambda configuration
echo "Updating Lambda configuration..."
aws lambda update-function-configuration \
  --function-name StyleGenieAI \
  --runtime python3.9 \
  --handler lambda_function.lambda_handler \
  --timeout 60 \
  --memory-size 2048

echo "Cleaning up temporary files..."
rm lambda_function.py lambda_function.zip

echo "=== Lambda Deployment Complete ==="
echo ""
echo "Test the Lambda function with the AWS CLI:"
echo "aws lambda invoke --function-name StyleGenieAI --payload '{\"occasion\": \"casual\", \"body_type\": \"slim\"}' --cli-binary-format raw-in-base64-out output.json"
echo ""
echo "Or test via API Gateway if configured." 