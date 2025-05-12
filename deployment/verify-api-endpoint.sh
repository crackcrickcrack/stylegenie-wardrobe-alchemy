#!/bin/bash

echo "=== Verifying StyleGenieAI API Endpoints ==="

# List of potential endpoints to test
echo "Testing multiple potential API endpoints to find the working one..."

# Endpoints to test - add any other potential URLs here
ENDPOINTS=(
  "https://aaicj5k6zb.execute-api.us-east-1.amazonaws.com/prod/style-advisor"
  "https://aaicj5k6zb.execute-api.us-east-1.amazonaws.com/prod/StyleGenieAI"
  "https://api.stylegenie.duckdns.org/StyleGenieAI"
  "https://1hywq9b8na.execute-api.us-east-1.amazonaws.com/stage/StyleGenieAI"
  "/StyleGenieAI"
)

# Test payload
PAYLOAD='{
  "occasion": "party", 
  "body_type": "athletic"
}'

# Function to test an endpoint
test_endpoint() {
  local url=$1
  echo "----------------------------------------"
  echo "Testing endpoint: $url"
  echo "----------------------------------------"
  
  # Make the request with a timeout to avoid hanging
  RESPONSE=$(curl -s -m 10 -X POST "$url" \
    -H "Content-Type: application/json" \
    -d "$PAYLOAD")
  
  STATUS=$?
  
  if [ $STATUS -eq 0 ]; then
    if [ -n "$RESPONSE" ]; then
      echo "✅ Got response from $url"
      echo "First 200 characters of response:"
      echo "$RESPONSE" | head -c 200
      echo "..."
      
      # Check if it has the expected structure
      if echo "$RESPONSE" | grep -q "outfit_suggestions"; then
        echo "✅ Response contains outfit_suggestions"
        echo "SUCCESS: $url appears to be working correctly"
        echo ""
        echo "To use this endpoint in the frontend, update the API_ENDPOINT in src/pages/AIStyleAdvisor.tsx to:"
        echo "const API_ENDPOINT = '$url';"
        return 0
      else
        echo "❌ Response doesn't contain outfit_suggestions"
      fi
    else
      echo "❌ Empty response from $url"
    fi
  else
    echo "❌ Failed to connect to $url (status code: $STATUS)"
  fi
  
  return 1
}

# Try each endpoint
FOUND_WORKING=false

for endpoint in "${ENDPOINTS[@]}"; do
  if test_endpoint "$endpoint"; then
    FOUND_WORKING=true
    WORKING_ENDPOINT="$endpoint"
    break
  fi
  echo ""
done

if [ "$FOUND_WORKING" = true ]; then
  echo "=== API Verification Complete ==="
  echo "Working endpoint found: $WORKING_ENDPOINT"
  echo ""
  echo "Next steps:"
  echo "1. Update the frontend to use this endpoint"
  echo "2. Rebuild and deploy the frontend"
else
  echo "=== API Verification Complete ==="
  echo "❌ No working endpoints found."
  echo ""
  echo "Troubleshooting suggestions:"
  echo "1. Check that the Lambda function is properly configured"
  echo "2. Check API Gateway settings and ensure routes are correct"
  echo "3. Verify IAM permissions for Lambda and API Gateway"
  echo "4. Check Lambda CloudWatch logs for errors"
fi 