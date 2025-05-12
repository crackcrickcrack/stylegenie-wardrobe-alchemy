#!/bin/bash

# Exit on error
set -e

# Variables
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REGION="us-east-1"
ROLE_NAME="StyleGenieBedrockRole"
POLICY_NAME="StyleGenieBedrockPolicy"

echo "Setting up IAM role and policy for AWS Bedrock access..."

# Create IAM policy for Bedrock access
aws iam create-policy \
    --policy-name $POLICY_NAME \
    --policy-document file://aws-iam-policy.json \
    --description "Policy for StyleGenie to access AWS Bedrock and S3"

# Create IAM role for EC2 to assume
aws iam create-role \
    --role-name $ROLE_NAME \
    --assume-role-policy-document '{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": {
                    "Service": "ec2.amazonaws.com"
                },
                "Action": "sts:AssumeRole"
            }
        ]
    }'

# Attach policy to role
aws iam attach-role-policy \
    --role-name $ROLE_NAME \
    --policy-arn arn:aws:iam::$AWS_ACCOUNT_ID:policy/$POLICY_NAME

# Create instance profile
aws iam create-instance-profile \
    --instance-profile-name $ROLE_NAME-instance-profile

# Add role to instance profile
aws iam add-role-to-instance-profile \
    --instance-profile-name $ROLE_NAME-instance-profile \
    --role-name $ROLE_NAME

echo "IAM role and policy created successfully."
echo "Now attach this instance profile to your EC2 instance."
echo "Instance Profile: $ROLE_NAME-instance-profile"

# Update the k8s-deployment.yaml with correct role ARN
sed -i "s/<YOUR-ACCOUNT-ID>/$AWS_ACCOUNT_ID/g" k8s-deployment.yaml

echo "Kubernetes deployment file updated with correct IAM role ARN."
echo "Run 'kubectl apply -f k8s-deployment.yaml' to deploy your application."

# Instructions for creating AWS credentials secret in k3s
echo "
# Create AWS credentials secret for K3s (run on K3s server):
kubectl create secret generic aws-credentials \\
    --from-file=credentials=$HOME/.aws/credentials \\
    --from-file=config=$HOME/.aws/config
" 