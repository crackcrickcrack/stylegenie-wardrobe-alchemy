# StyleGenie Kubernetes Deployment Guide

This guide will help you deploy StyleGenie on a lightweight Kubernetes (k3s) cluster on EC2 with proper AWS Bedrock integration.

## Prerequisites

- AWS CLI installed and configured with proper credentials
- An EC2 instance with k3s installed
- Docker installed for building the container image
- kubectl configured to connect to your k3s cluster

## Setup Steps

### 1. Set up AWS IAM Role and Permissions

First, set up the necessary IAM roles and policies for AWS Bedrock and S3 access:

```bash
cd deployment
chmod +x setup-k3s-iam.sh
./setup-k3s-iam.sh
```

This script will:
- Create an IAM policy with permissions for AWS Bedrock and S3
- Create an IAM role that can be assumed by EC2
- Attach the policy to the role
- Create an instance profile
- Update the Kubernetes deployment file with your AWS account ID

### 2. Attach IAM Role to EC2 Instance

Attach the IAM role to your EC2 instance:
- Go to the EC2 console
- Select your instance
- Actions > Security > Modify IAM Role
- Select the newly created role: `StyleGenieBedrockRole-instance-profile`
- Click Update IAM Role

### 3. Build and Push Docker Image

Build and push the Docker image:

```bash
docker build -t stylegenie/webapp:latest -f deployment/Dockerfile .
docker tag stylegenie/webapp:latest <your-registry>/stylegenie/webapp:latest
docker push <your-registry>/stylegenie/webapp:latest
```

Update the image reference in `k8s-deployment.yaml` to match your registry.

### 4. Create AWS Credentials Secret

On your k3s server, create a secret with your AWS credentials:

```bash
kubectl create secret generic aws-credentials \
    --from-file=credentials=$HOME/.aws/credentials \
    --from-file=config=$HOME/.aws/config
```

### 5. Deploy the Application

Deploy the application to your k3s cluster:

```bash
kubectl apply -f deployment/bedrock-env-config.yaml
kubectl apply -f deployment/k8s-deployment.yaml
```

### 6. Verify Deployment

Check if the pods are running correctly:

```bash
kubectl get pods
kubectl logs -l app=stylegenie
```

## Testing AWS Bedrock Integration

To test that AWS Bedrock is properly integrated:

1. Get the external IP/URL of your service:
```bash
kubectl get service stylegenie-service
```

2. Access the StyleGenie application using the external IP/URL
3. Try generating an outfit - if it works, AWS Bedrock integration is functioning correctly

## Troubleshooting

If you encounter issues with AWS Bedrock access:

1. Check the pod logs:
```bash
kubectl logs -l app=stylegenie
```

2. Verify IAM role is attached correctly:
```bash
aws ec2 describe-instances --instance-id <your-instance-id> --query 'Reservations[0].Instances[0].IamInstanceProfile'
```

3. Verify AWS credentials are mounted correctly:
```bash
kubectl exec -it <pod-name> -- ls -la /root/.aws
```

4. Test Bedrock access directly:
```bash
kubectl exec -it <pod-name> -- aws bedrock list-foundation-models --region us-east-1
```

## Environment Variables

You can customize the AWS configuration by editing the `bedrock-env-config.yaml` file before deployment. 