#!/bin/bash

echo "=== Securing S3 Bucket for StyleGenie ==="

# S3 bucket name
S3_BUCKET="stylegenie-uploads"

# Confirm the action
echo "WARNING: This script will re-enable public access block settings for the bucket: $S3_BUCKET"
echo "This will prevent public access to images in your bucket, which might break image loading in your application."
echo ""
read -p "Are you sure you want to continue? (y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Operation canceled."
    exit 0
fi

# Re-enable public access block settings
echo "Re-enabling public access block settings for bucket: $S3_BUCKET"
aws s3api put-public-access-block --bucket $S3_BUCKET --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

# Remove any existing public bucket policy
echo "Removing any existing public bucket policy"
# First check if a policy exists
if aws s3api get-bucket-policy --bucket $S3_BUCKET &> /dev/null; then
    # Create a more restrictive policy or remove it entirely
    echo "Creating a more restrictive bucket policy"
    cat > bucket-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "RestrictedAccess",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::794038256791:user/sandeep"
      },
      "Action": "s3:*",
      "Resource": "arn:aws:s3:::$S3_BUCKET/*"
    }
  ]
}
EOF
    
    # Try to apply the restricted policy, but it may fail due to BlockPublicPolicy
    aws s3api put-bucket-policy --bucket $S3_BUCKET --policy file://bucket-policy.json || \
    echo "Could not apply restrictive policy. The bucket is now secured with public access blocking only."
    
    rm bucket-policy.json
else
    echo "No existing bucket policy found, skipping policy update."
fi

echo "=== S3 Bucket Securing Complete ==="
echo ""
echo "Your S3 bucket now has public access blocking enabled."
echo "Images will NO LONGER be publicly accessible."
echo ""
echo "To restore public access for your application, run the fix-s3-cors.sh script again." 