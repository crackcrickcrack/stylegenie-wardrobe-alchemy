#!/bin/bash

echo "=== StyleGenie AWS Authentication Check ==="
echo

# Get a pod name
POD_NAME=$(kubectl get pods -l app=stylegenie -o jsonpath="{.items[0].metadata.name}")
if [ -z "$POD_NAME" ]; then
    echo "Error: No StyleGenie pods found"
    exit 1
fi

echo "Checking pod: $POD_NAME"
echo

# Check if AWS CLI is installed
echo "Checking AWS CLI..."
if ! kubectl exec $POD_NAME -- which aws > /dev/null 2>&1; then
    echo "❌ AWS CLI not found in the container"
    exit 1
else
    echo "✅ AWS CLI is installed"
fi

# Check AWS identity
echo
echo "Checking AWS identity..."
AWS_IDENTITY=$(kubectl exec $POD_NAME -- aws sts get-caller-identity 2>&1)
if echo "$AWS_IDENTITY" | grep -q "Unable to locate credentials"; then
    echo "❌ AWS credentials not found"
    echo "  - Make sure IAM role is attached to EC2"
    echo "  - Verify AWS credentials secret is mounted"
else
    echo "✅ AWS identity found:"
    echo "$AWS_IDENTITY"
fi

# Check S3 access
echo
echo "Checking S3 access..."
S3_ACCESS=$(kubectl exec $POD_NAME -- aws s3 ls s3://stylegenie-uploads 2>&1)
if echo "$S3_ACCESS" | grep -q "AccessDenied"; then
    echo "❌ S3 access denied"
    echo "  - Verify IAM policy includes s3:ListBucket permission"
    echo "  - Check S3 bucket name is correct"
elif echo "$S3_ACCESS" | grep -q "NoSuchBucket"; then
    echo "❌ S3 bucket doesn't exist"
    echo "  - Create the bucket: aws s3 mb s3://stylegenie-uploads"
    echo "  - Configure bucket CORS for uploads"
else
    echo "✅ S3 access verified"
fi

# Test API endpoints
echo
echo "Testing API endpoints from within the pod..."

# Test S3 upload URL API
echo "Testing S3 upload URL API..."
UPLOAD_API=$(kubectl exec $POD_NAME -- curl -s -o /dev/null -w "%{http_code}" https://zy522ot005.execute-api.us-east-1.amazonaws.com/prod/getUploadUrl -X POST -H "Content-Type: application/json" -d '{"fileName":"test.jpg","fileType":"image/jpeg"}' 2>&1)

if [[ "$UPLOAD_API" == "200" ]]; then
    echo "✅ S3 upload URL API is accessible"
else
    echo "❌ S3 upload URL API returned: $UPLOAD_API"
    echo "  - Verify the API endpoint is correct"
    echo "  - Check Lambda function permissions"
fi

# Test StyleGenie AI API
echo "Testing StyleGenie AI API..."
AI_API=$(kubectl exec $POD_NAME -- curl -s -o /dev/null -w "%{http_code}" https://1hywq9b8na.execute-api.us-east-1.amazonaws.com/stage/StyleGenieAI -X POST -H "Content-Type: application/json" -d '{"occasion":"casual","body_type":"athletic"}' 2>&1)

if [[ "$AI_API" == "200" ]]; then
    echo "✅ StyleGenie AI API is accessible"
else
    echo "❌ StyleGenie AI API returned: $AI_API"
    echo "  - Verify the API endpoint is correct"
    echo "  - Check Lambda function permissions"
fi

echo
echo "=== Troubleshooting Recommendations ==="
echo "1. If AWS credentials are missing, create the secrets:"
echo "   kubectl create secret generic aws-credentials \\"
echo "     --from-file=credentials=$HOME/.aws/credentials \\"
echo "     --from-file=config=$HOME/.aws/config"
echo
echo "2. If S3 bucket doesn't exist, create it:"
echo "   aws s3 mb s3://stylegenie-uploads"
echo "   aws s3api put-bucket-cors --bucket stylegenie-uploads --cors-configuration file://deployment/s3-cors.json"
echo
echo "3. If APIs are not accessible, check API Gateway settings and Lambda permissions"
echo "   For more info, check CloudWatch logs for the Lambda functions"
echo
echo "4. To view Nginx logs:"
echo "   kubectl logs $POD_NAME" 