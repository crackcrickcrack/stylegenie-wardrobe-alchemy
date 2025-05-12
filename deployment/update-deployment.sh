#!/bin/bash

# Exit on error
set -e

echo "Rebuilding and deploying StyleGenie with updated configuration..."

# Rebuild Docker image
docker build -f deployment/Dockerfile -t stylegenie/webapp:latest .

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
" 