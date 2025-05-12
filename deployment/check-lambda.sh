#!/bin/bash

echo "=== Checking Lambda Function Logs ==="
echo

# Set Lambda function names
UPLOAD_LAMBDA="stylegenie-get-upload-url"
AI_LAMBDA="StyleGenieAI"

# Check recent logs for the upload Lambda function
echo "Checking logs for $UPLOAD_LAMBDA Lambda function..."
echo
aws logs get-log-events \
    --log-group-name "/aws/lambda/$UPLOAD_LAMBDA" \
    --log-stream-name $(aws logs describe-log-streams --log-group-name "/aws/lambda/$UPLOAD_LAMBDA" --order-by LastEventTime --descending --limit 1 --query 'logStreams[0].logStreamName' --output text) \
    --limit 20 \
    --query 'events[*].message' \
    --output text

echo
echo "Checking logs for $AI_LAMBDA Lambda function..."
echo
aws logs get-log-events \
    --log-group-name "/aws/lambda/$AI_LAMBDA" \
    --log-stream-name $(aws logs describe-log-streams --log-group-name "/aws/lambda/$AI_LAMBDA" --order-by LastEventTime --descending --limit 1 --query 'logStreams[0].logStreamName' --output text) \
    --limit 20 \
    --query 'events[*].message' \
    --output text

echo
echo "=== Testing Direct API Calls ==="
echo

# Test with verbose output to see more details
echo "Testing S3 upload URL API with verbose output..."
curl -v -X POST \
    -H "Content-Type: application/json" \
    -d '{"fileName":"test.jpg","fileType":"image/jpeg"}' \
    https://zy522ot005.execute-api.us-east-1.amazonaws.com/prod/getUploadUrl

echo
echo
echo "Testing StyleGenie AI API with verbose output..."
curl -v -X POST \
    -H "Content-Type: application/json" \
    -d '{"occasion":"casual","body_type":"athletic"}' \
    https://1hywq9b8na.execute-api.us-east-1.amazonaws.com/stage/StyleGenieAI

echo
echo "=== Lambda API Gateway Policy Check ==="
echo

# Check API Gateway resource policy
echo "Checking resource policy for the Upload URL API Gateway..."
aws apigateway get-rest-api \
    --rest-api-id zy522ot005 \
    --query 'policy' \
    --output text | jq . 2>/dev/null || echo "Could not retrieve or parse policy"

echo
echo "Checking resource policy for the StyleGenie AI API Gateway..."
aws apigateway get-rest-api \
    --rest-api-id 1hywq9b8na \
    --query 'policy' \
    --output text | jq . 2>/dev/null || echo "Could not retrieve or parse policy"

echo
echo "=== Lambda Function Configuration ==="
echo

# Check Lambda function configuration
echo "Checking configuration for $UPLOAD_LAMBDA Lambda function..."
aws lambda get-function \
    --function-name $UPLOAD_LAMBDA \
    --query 'Configuration.[Timeout,MemorySize,Role]' \
    --output json

echo
echo "Checking configuration for $AI_LAMBDA Lambda function..."
aws lambda get-function \
    --function-name $AI_LAMBDA \
    --query 'Configuration.[Timeout,MemorySize,Role]' \
    --output json

echo
echo "=== API Gateway Cors Check ==="
echo

# Check CORS configuration for API Gateway
echo "Checking CORS for the Upload URL API Gateway..."
aws apigateway get-resource \
    --rest-api-id zy522ot005 \
    --resource-id $(aws apigateway get-resources --rest-api-id zy522ot005 --query 'items[?path==`/getUploadUrl`].id' --output text) \
    --query '[resourceMethods.POST.methodIntegration.integrationResponses."200".responseParameters]' \
    --output json 2>/dev/null || echo "Could not retrieve CORS configuration"

echo
echo "=== Fix Recommendations ==="
echo

echo "1. Check Lambda permissions:"
echo "   - Make sure both Lambda functions have access to AWS services they need"
echo "   - For the StyleGenieAI Lambda, ensure it has bedrock:InvokeModel permission"
echo "   - For the upload Lambda, ensure it has s3:PutObject permission"
echo
echo "2. Check Lambda timeouts:"
echo "   - If Lambda is timing out, increase the timeout value (e.g., to 30 seconds)"
echo "   - Increase memory if needed for better performance"
echo
echo "3. Review API Gateway configurations:"
echo "   - Verify the API Gateway has correct integration with Lambda"
echo "   - Check CORS settings to allow requests from your domain"
echo
echo "4. For HTTPS issues:"
echo "   - Ensure certificates are valid and trusted"
echo "   - Add proper SSL configuration to Nginx"
echo
echo "5. Update your Nginx configuration to use HTTP instead of HTTPS for backend calls:"
echo "   kubectl edit configmap nginx-config" 