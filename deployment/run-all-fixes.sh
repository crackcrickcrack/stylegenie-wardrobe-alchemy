#!/bin/bash

echo "=== Running All StyleGenieAI Fixes ==="

# Make sure all scripts are executable
chmod +x fix-lambda-permissions.sh
chmod +x fix-api-gateway.sh 
chmod +x rebuild-frontend.sh

# Step 1: Fix Lambda permissions and update function
echo ""
echo "Step 1: Fixing Lambda permissions and updating function..."
echo "=========================================================="
./fix-lambda-permissions.sh

# Step 2: Configure API Gateway
echo ""
echo "Step 2: Configuring API Gateway..."
echo "=================================="
./fix-api-gateway.sh

# Step 3: Rebuild and deploy frontend
echo ""
echo "Step 3: Rebuilding and deploying frontend..."
echo "==========================================="
./rebuild-frontend.sh

echo ""
echo "=== All fixes completed ==="
echo "The StyleGenieAI system should now be working correctly."
echo "Visit http://stylegenie.duckdns.org/ai-style-advisor to test the changes."
echo ""
echo "If you still encounter issues:"
echo "1. Check Lambda CloudWatch logs for errors"
echo "2. Verify API Gateway configuration in the AWS Console"
echo "3. Check network connectivity in the browser console" 