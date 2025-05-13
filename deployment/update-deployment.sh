#!/bin/bash

# Exit on error
set -e

echo "Rebuilding and deploying StyleGenie with updated configuration..."

# Rebuild Docker image
cd /home/ubuntu/stylegenie-wardrobe-alchemy/
docker build -f deployment/Dockerfile -t stylegenie-webapp:latest .
docker tag stylegenie-webapp:latest sandeepkalathil/stylegenie-webapp:latest
docker push sandeepkalathil/stylegenie-webapp:latest
# Create or update ConfigMap with the new API endpoint
kubectl create configmap stylegenie-config --from-literal=API_ENDPOINT=https://zkbluoyybf.execute-api.us-east-1.amazonaws.com/prod/StyleGenieAI -o yaml --dry-run=client | kubectl apply -f -

# Apply updated ConfigMap
kubectl apply -f deployment/bedrock-env-config.yaml

# Restart the deployment to pick up changes
kubectl rollout restart deployment stylegenie-app

# Wait for rollout to complete
kubectl rollout status deployment stylegenie-app

echo "Deployment updated successfully!"
echo "Please verify by accessing: http://stylegenie.duckdns.org/ai-style-advisor"

# For troubleshooting
echo "
To check logs use:
kubectl logs -l app=stylegenie

To check if AWS credentials are accessible:
kubectl exec -it \$(kubectl get pods -l app=stylegenie -o name | head -n 1) -- aws sts get-caller-identity

To debug image generation issues:
kubectl exec -it \$(kubectl get pods -l app=stylegenie -o name | head -n 1) -- aws bedrock list-foundation-models --query 'modelSummaries[?contains(modelId, `stability`)].modelId' --output text
" 