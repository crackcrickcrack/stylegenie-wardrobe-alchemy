#!/bin/bash

# Exit on error
set -e

# Configuration
BUCKET_NAME="stylegenie-uploads"
LAMBDA_NAME="stylegenie-get-upload-url"
REGION="us-east-1"

echo "Creating S3 bucket..."
aws s3api create-bucket \
    --bucket $BUCKET_NAME \
    --region $REGION \
    --create-bucket-configuration LocationConstraint=$REGION

echo "Configuring S3 bucket CORS..."
aws s3api put-bucket-cors \
    --bucket $BUCKET_NAME \
    --cors-configuration file://s3-cors.json

echo "Creating IAM role..."
ROLE_ARN=$(aws iam create-role \
    --role-name $LAMBDA_NAME-role \
    --assume-role-policy-document '{
        "Version": "2012-10-17",
        "Statement": [{
            "Effect": "Allow",
            "Principal": {
                "Service": "lambda.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
        }]
    }' \
    --query 'Role.Arn' \
    --output text)

echo "Attaching policy to role..."
aws iam put-role-policy \
    --role-name $LAMBDA_NAME-role \
    --policy-name $LAMBDA_NAME-policy \
    --policy-document file://role-policy.json

echo "Waiting for role to be available..."
sleep 10

echo "Installing dependencies..."
npm install

echo "Creating deployment package..."
zip -r function.zip . -x "*.git*" "node_modules/*" "*.zip"

echo "Creating Lambda function..."
aws lambda create-function \
    --function-name $LAMBDA_NAME \
    --runtime nodejs18.x \
    --handler getUploadUrl.handler \
    --role $ROLE_ARN \
    --zip-file fileb://function.zip \
    --environment Variables={BUCKET_NAME=$BUCKET_NAME} \
    --timeout 30

echo "Creating API Gateway..."
API_ID=$(aws apigateway create-rest-api \
    --name $LAMBDA_NAME-api \
    --query 'id' \
    --output text)

ROOT_RESOURCE_ID=$(aws apigateway get-resources \
    --rest-api-id $API_ID \
    --query 'items[0].id' \
    --output text)

RESOURCE_ID=$(aws apigateway create-resource \
    --rest-api-id $API_ID \
    --parent-id $ROOT_RESOURCE_ID \
    --path-part "getUploadUrl" \
    --query 'id' \
    --output text)

LAMBDA_ARN=$(aws lambda get-function \
    --function-name $LAMBDA_NAME \
    --query 'Configuration.FunctionArn' \
    --output text)

echo "Setting up API Gateway integration..."
aws apigateway put-method \
    --rest-api-id $API_ID \
    --resource-id $RESOURCE_ID \
    --http-method POST \
    --authorization-type NONE

aws apigateway put-integration \
    --rest-api-id $API_ID \
    --resource-id $RESOURCE_ID \
    --http-method POST \
    --type AWS_PROXY \
    --integration-http-method POST \
    --uri arn:aws:apigateway:$REGION:lambda:path/2015-03-31/functions/$LAMBDA_ARN/invocations

echo "Deploying API..."
aws apigateway create-deployment \
    --rest-api-id $API_ID \
    --stage-name prod

echo "Adding Lambda permission..."
aws lambda add-permission \
    --function-name $LAMBDA_NAME \
    --statement-id apigateway-prod \
    --action lambda:InvokeFunction \
    --principal apigateway.amazonaws.com \
    --source-arn "arn:aws:execute-api:$REGION:*:$API_ID/prod/POST/getUploadUrl"

echo "Cleaning up..."
rm function.zip

echo "Deployment complete!"
echo "API Gateway URL: https://$API_ID.execute-api.$REGION.amazonaws.com/prod/getUploadUrl" 