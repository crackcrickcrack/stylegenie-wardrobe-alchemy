#!/bin/bash

echo "=== Checking S3 Configuration for StyleGenie ==="

# S3 bucket name
S3_BUCKET="stylegenie-uploads"

# Check if bucket exists
echo "Checking if bucket exists: $S3_BUCKET"
if aws s3api head-bucket --bucket $S3_BUCKET 2>/dev/null; then
    echo "✅ Bucket exists: $S3_BUCKET"
else
    echo "❌ Bucket does not exist or you don't have permission to access it"
    exit 1
fi

# Check CORS configuration
echo ""
echo "Current CORS configuration:"
aws s3api get-bucket-cors --bucket $S3_BUCKET || echo "No CORS configuration found"

# Check bucket policy
echo ""
echo "Current bucket policy:"
aws s3api get-bucket-policy --bucket $S3_BUCKET --output json 2>/dev/null || echo "No bucket policy found"

# Check public access block settings
echo ""
echo "Public access block settings:"
PUBLIC_ACCESS=$(aws s3api get-public-access-block --bucket $S3_BUCKET 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "$PUBLIC_ACCESS"
    
    # Extract and analyze block settings for clarity
    BLOCK_PUBLIC_ACLS=$(echo "$PUBLIC_ACCESS" | grep -o '"BlockPublicAcls": true' | wc -l)
    IGNORE_PUBLIC_ACLS=$(echo "$PUBLIC_ACCESS" | grep -o '"IgnorePublicAcls": true' | wc -l)
    BLOCK_PUBLIC_POLICY=$(echo "$PUBLIC_ACCESS" | grep -o '"BlockPublicPolicy": true' | wc -l)
    RESTRICT_PUBLIC_BUCKETS=$(echo "$PUBLIC_ACCESS" | grep -o '"RestrictPublicBuckets": true' | wc -l)
    
    if [ $BLOCK_PUBLIC_ACLS -eq 1 ] || [ $BLOCK_PUBLIC_POLICY -eq 1 ] || [ $RESTRICT_PUBLIC_BUCKETS -eq 1 ]; then
        echo "⚠️  Public access is restricted. This may prevent images from loading."
        echo "Run the fix-s3-cors.sh script to configure proper access."
    else
        echo "✅ Public access settings are configured correctly."
    fi
else
    echo "No public access block settings found"
fi

# Test access to an object
echo ""
echo "Testing access to a recent image:"
# List most recent object
RECENT_OBJECT=$(aws s3api list-objects-v2 --bucket $S3_BUCKET --query 'sort_by(Contents, &LastModified)[-1].Key' --output text)

if [[ $RECENT_OBJECT == "None" || -z $RECENT_OBJECT ]]; then
    echo "No objects found in bucket"
else
    echo "Most recent object: $RECENT_OBJECT"
    
    # Check object ACL
    echo "Object ACL:"
    aws s3api get-object-acl --bucket $S3_BUCKET --key "$RECENT_OBJECT" 2>/dev/null || echo "Cannot access object ACL"
    
    # Test public access
    OBJECT_URL="https://$S3_BUCKET.s3.amazonaws.com/$RECENT_OBJECT"
    echo "Testing public access to: $OBJECT_URL"
    HTTP_STATUS=$(curl -s -I "$OBJECT_URL" | head -n 1)
    echo "$HTTP_STATUS"
    
    if [[ "$HTTP_STATUS" == *"403"* ]]; then
        echo "❌ Image access failed (403 Forbidden). Public access is not configured correctly."
    elif [[ "$HTTP_STATUS" == *"200"* ]]; then
        echo "✅ Image is publicly accessible."
    else
        echo "⚠️  Unexpected response. Check S3 configuration."
    fi
fi

echo ""
echo "=== S3 Configuration Check Complete ==="
echo ""
if [[ "$HTTP_STATUS" == *"403"* ]] || [ $BLOCK_PUBLIC_ACLS -eq 1 ] || [ $BLOCK_PUBLIC_POLICY -eq 1 ] || [ $RESTRICT_PUBLIC_BUCKETS -eq 1 ]; then
    echo "⚠️  Your S3 bucket needs configuration changes to make images publicly accessible."
    echo "Run the fix-s3-cors.sh script to fix the CORS and permission issues."
else
    echo "✅ Your S3 configuration looks correct. Images should load properly in the application."
fi 