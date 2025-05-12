#!/bin/bash

echo "=== Fixing StyleGenieAI API Gateway ==="

# Create a temporary directory
TMP_DIR=$(mktemp -d)
cd $TMP_DIR

echo "Working in directory: $TMP_DIR"

# Step 1: Get information about the Lambda function
echo "Getting Lambda function information..."
LAMBDA_ARN=$(aws lambda get-function --function-name StyleGenieAI --query 'Configuration.FunctionArn' --output text)
LAMBDA_REGION=$(echo $LAMBDA_ARN | cut -d':' -f4)

echo "Lambda ARN: $LAMBDA_ARN"
echo "Lambda Region: $LAMBDA_REGION"

# Step 2: Update or create API Gateway

# Check if the API already exists (use the ID from the working URL)
echo "Checking for existing API Gateway..."
API_ID="1hywq9b8na" # From the URL https://1hywq9b8na.execute-api.us-east-1.amazonaws.com/stage/StyleGenieAI

if aws apigateway get-rest-api --rest-api-id $API_ID > /dev/null 2>&1; then
  echo "API Gateway exists with ID: $API_ID"
else
  echo "API Gateway not found, creating new API..."
  API_ID=$(aws apigateway create-rest-api --name "StyleGenieAPI" --query 'id' --output text)
  echo "Created new API Gateway with ID: $API_ID"
fi

# Get the root resource ID
ROOT_RESOURCE_ID=$(aws apigateway get-resources --rest-api-id $API_ID --query 'items[?path==`/`].id' --output text)
echo "Root Resource ID: $ROOT_RESOURCE_ID"

# Create StyleGenieAI resource if it doesn't exist
RESOURCE_ID=$(aws apigateway get-resources --rest-api-id $API_ID --query "items[?path==\`/StyleGenieAI\`].id" --output text)

if [ -z "$RESOURCE_ID" ]; then
  echo "Creating /StyleGenieAI resource..."
  RESOURCE_ID=$(aws apigateway create-resource --rest-api-id $API_ID --parent-id $ROOT_RESOURCE_ID --path-part "StyleGenieAI" --query 'id' --output text)
  echo "Created resource with ID: $RESOURCE_ID"
else
  echo "Resource /StyleGenieAI already exists with ID: $RESOURCE_ID"
fi

# Create or update POST method
echo "Setting up POST method for /StyleGenieAI..."
aws apigateway put-method --rest-api-id $API_ID --resource-id $RESOURCE_ID \
  --http-method POST --authorization-type NONE \
  --no-api-key-required > /dev/null 2>&1 || true

# Set up Lambda integration
echo "Setting up Lambda integration..."
aws apigateway put-integration --rest-api-id $API_ID --resource-id $RESOURCE_ID \
  --http-method POST --type AWS_PROXY \
  --integration-http-method POST \
  --uri "arn:aws:apigateway:$LAMBDA_REGION:lambda:path/2015-03-31/functions/$LAMBDA_ARN/invocations" \
  --passthrough-behavior WHEN_NO_MATCH > /dev/null 2>&1 || true

# Add CORS support
echo "Adding CORS support..."

# Options method
aws apigateway put-method --rest-api-id $API_ID --resource-id $RESOURCE_ID \
  --http-method OPTIONS --authorization-type NONE \
  --no-api-key-required > /dev/null 2>&1 || true

# Mock integration for OPTIONS
aws apigateway put-integration --rest-api-id $API_ID --resource-id $RESOURCE_ID \
  --http-method OPTIONS --type MOCK \
  --integration-http-method OPTIONS \
  --request-templates '{"application/json": "{\"statusCode\": 200}"}' > /dev/null 2>&1 || true

# Add OPTIONS method response
aws apigateway put-method-response --rest-api-id $API_ID --resource-id $RESOURCE_ID \
  --http-method OPTIONS --status-code 200 \
  --response-parameters '{
    "method.response.header.Access-Control-Allow-Origin": true,
    "method.response.header.Access-Control-Allow-Methods": true,
    "method.response.header.Access-Control-Allow-Headers": true
  }' > /dev/null 2>&1 || true

# Add OPTIONS integration response
aws apigateway put-integration-response --rest-api-id $API_ID --resource-id $RESOURCE_ID \
  --http-method OPTIONS --status-code 200 \
  --response-parameters '{
    "method.response.header.Access-Control-Allow-Origin": "'"'*'"'",
    "method.response.header.Access-Control-Allow-Methods": "'"'GET,POST,OPTIONS'"'",
    "method.response.header.Access-Control-Allow-Headers": "'"'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"'"
  }' \
  --response-templates '{"application/json": ""}' > /dev/null 2>&1 || true

# Add Lambda permission to allow API Gateway to invoke it
echo "Adding Lambda permission for API Gateway..."
aws lambda add-permission \
  --function-name StyleGenieAI \
  --statement-id apigateway-test-2 \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:$LAMBDA_REGION:$(echo $LAMBDA_ARN | cut -d':' -f5):$API_ID/*" > /dev/null 2>&1 || true

# Deploy the API
echo "Deploying API to 'stage' stage..."
DEPLOYMENT_ID=$(aws apigateway create-deployment --rest-api-id $API_ID --stage-name stage --query 'id' --output text)
echo "Deployed API with deployment ID: $DEPLOYMENT_ID"

# Get the API invocation URL
API_URL="https://$API_ID.execute-api.$LAMBDA_REGION.amazonaws.com/stage/StyleGenieAI"
echo "API URL: $API_URL"

# Test the API
echo ""
echo "Testing the API..."
echo "Sending test request to: $API_URL"

# Test payload
TEST_PAYLOAD='{
  "occasion": "party", 
  "body_type": "athletic"
}'

RESPONSE=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "$TEST_PAYLOAD")

if [ -n "$RESPONSE" ]; then
  echo "API Response received:"
  echo "$RESPONSE" | head -c 200
  echo "..."
  
  if echo "$RESPONSE" | grep -q "outfit_suggestions"; then
    echo "✅ API is working correctly!"
  else
    echo "⚠️ API responded but may not be fully functional. Check Lambda logs."
  fi
else
  echo "❌ No response from API. Check Lambda logs for errors."
fi

# Update the frontend component with the working URL
echo ""
echo "Updating the frontend component with the API URL..."
sed -i "s|'https://1hywq9b8na.execute-api.us-east-1.amazonaws.com/stage/StyleGenieAI'|'$API_URL'|g" ../src/pages/AIStyleAdvisor.tsx

echo ""
echo "=== API Gateway Fix Complete ==="
echo "API Gateway URL: $API_URL"
echo ""
echo "Next steps:"
echo "1. Run ./rebuild-frontend.sh to rebuild and deploy the frontend"
echo "2. Check CloudWatch logs if issues persist"
echo "3. Visit http://stylegenie.duckdns.org/ai-style-advisor to test the changes"

# Clean up
cd ..
rm -rf $TMP_DIR 