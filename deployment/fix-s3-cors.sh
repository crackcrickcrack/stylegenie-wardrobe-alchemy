#!/bin/bash

echo "=== Configuring S3 CORS for StyleGenie ==="

# S3 bucket name
S3_BUCKET="stylegenie-uploads"

# Create CORS configuration file
cat > cors.json << EOF
{
  "CORSRules": [
    {
      "AllowedOrigins": ["*"],
      "AllowedMethods": ["GET", "PUT", "POST", "HEAD"],
      "AllowedHeaders": ["*"],
      "ExposeHeaders": ["ETag", "Content-Length", "Content-Type"],
      "MaxAgeSeconds": 3000
    }
  ]
}
EOF

echo "Created CORS configuration file"

# Apply CORS configuration to S3 bucket
echo "Applying CORS configuration to bucket: $S3_BUCKET"
aws s3api put-bucket-cors --bucket $S3_BUCKET --cors-configuration file://cors.json

# Disable public access block settings
echo "Disabling public access block settings for bucket: $S3_BUCKET"
aws s3api put-public-access-block --bucket $S3_BUCKET --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# Wait a few seconds for the changes to propagate
echo "Waiting for settings to propagate..."
sleep 5

# Make bucket publicly readable (for image access)
echo "Setting bucket policy to allow public read access"
cat > bucket-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadForGetBucketObjects",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$S3_BUCKET/*"
    }
  ]
}
EOF

aws s3api put-bucket-policy --bucket $S3_BUCKET --policy file://bucket-policy.json

# Clean up
rm cors.json bucket-policy.json

echo "=== S3 CORS Configuration Complete ==="
echo ""
echo "Your S3 bucket is now configured to allow image access from your website."
echo "Images should now load correctly in the StyleGenie application."
echo ""
echo "NOTE: This script has disabled public access blocking settings for this bucket."
echo "This allows public read access to images, which is required for your application."
echo "However, make sure your application only uploads appropriate content to this bucket." 