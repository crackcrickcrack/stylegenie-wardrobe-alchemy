#!/bin/bash

echo "=== Creating API Gateway for StyleGenieAI ==="

# Create the REST API
echo "Creating REST API..."
API_ID=$(aws apigateway create-rest-api \
  --name StyleGenieAI-API \
  --description "API for StyleGenieAI Lambda function" \
  --endpoint-configuration "{ \"types\": [\"REGIONAL\"] }" \
  --query 'id' \
  --output text)

echo "API Gateway created with ID: $API_ID"

# Get the API's root resource ID
ROOT_RESOURCE_ID=$(aws apigateway get-resources \
  --rest-api-id $API_ID \
  --query 'items[0].id' \
  --output text)

echo "Root resource ID: $ROOT_RESOURCE_ID"

# Create a resource for the API
echo "Creating API resource..."
RESOURCE_ID=$(aws apigateway create-resource \
  --rest-api-id $API_ID \
  --parent-id $ROOT_RESOURCE_ID \
  --path-part "StyleGenieAI" \
  --query 'id' \
  --output text)

echo "Resource created with ID: $RESOURCE_ID"

# Create a POST method for the resource
echo "Creating POST method..."
aws apigateway put-method \
  --rest-api-id $API_ID \
  --resource-id $RESOURCE_ID \
  --http-method POST \
  --authorization-type NONE \
  --no-api-key-required

# Set up the Lambda integration
echo "Setting up Lambda integration..."
REGION=$(aws configure get region)
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

aws apigateway put-integration \
  --rest-api-id $API_ID \
  --resource-id $RESOURCE_ID \
  --http-method POST \
  --type AWS_PROXY \
  --integration-http-method POST \
  --uri "arn:aws:apigateway:$REGION:lambda:path/2015-03-31/functions/arn:aws:lambda:$REGION:$ACCOUNT_ID:function:StyleGenieAI/invocations"

# Set up method response
echo "Setting up method response..."
aws apigateway put-method-response \
  --rest-api-id $API_ID \
  --resource-id $RESOURCE_ID \
  --http-method POST \
  --status-code 200 \
  --response-models '{"application/json": "Empty"}'

# Add permissions for API Gateway to invoke the Lambda function
echo "Adding Lambda permission..."
aws lambda add-permission \
  --function-name StyleGenieAI \
  --statement-id apigateway-test \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:$REGION:$ACCOUNT_ID:$API_ID/*/POST/StyleGenieAI"

# Enable CORS
echo "Enabling CORS..."
aws apigateway put-method \
  --rest-api-id $API_ID \
  --resource-id $RESOURCE_ID \
  --http-method OPTIONS \
  --authorization-type NONE \
  --no-api-key-required

aws apigateway put-method-response \
  --rest-api-id $API_ID \
  --resource-id $RESOURCE_ID \
  --http-method OPTIONS \
  --status-code 200 \
  --response-models '{"application/json": "Empty"}' \
  --response-parameters '{
    "method.response.header.Access-Control-Allow-Headers": true,
    "method.response.header.Access-Control-Allow-Methods": true,
    "method.response.header.Access-Control-Allow-Origin": true
  }'

aws apigateway put-integration \
  --rest-api-id $API_ID \
  --resource-id $RESOURCE_ID \
  --http-method OPTIONS \
  --type MOCK \
  --request-templates '{"application/json": "{\"statusCode\": 200}"}'

aws apigateway put-integration-response \
  --rest-api-id $API_ID \
  --resource-id $RESOURCE_ID \
  --http-method OPTIONS \
  --status-code 200 \
  --response-parameters '{
    "method.response.header.Access-Control-Allow-Headers": "'"'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"'",
    "method.response.header.Access-Control-Allow-Methods": "'"'POST,OPTIONS'"'",
    "method.response.header.Access-Control-Allow-Origin": "'"'*'"'"
  }'

# Deploy the API
echo "Deploying API..."
DEPLOYMENT_ID=$(aws apigateway create-deployment \
  --rest-api-id $API_ID \
  --stage-name prod \
  --query 'id' \
  --output text)

echo "API deployed with ID: $DEPLOYMENT_ID"

# Get the API URL
API_URL="https://$API_ID.execute-api.$REGION.amazonaws.com/prod/StyleGenieAI"
echo "API Gateway URL: $API_URL"

echo "=== API Gateway Creation Complete ==="
echo ""
echo "Update your frontend to use the following URL for API calls:"
echo "$API_URL"
echo ""
echo "Test with curl:"
echo "curl -X POST $API_URL -H 'Content-Type: application/json' -d '{\"occasion\": \"casual\", \"body_type\": \"slim\"}'" 