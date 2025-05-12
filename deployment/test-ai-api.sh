#!/bin/bash

echo "=== Testing StyleGenieAI API ==="

# The API endpoint - replace with your actual API URL
API_URL="https://aaicj5k6zb.execute-api.us-east-1.amazonaws.com/prod/style-advisor"
# If you have a different API URL, replace the line above

# Create a JSON payload
echo "Creating test payload with party occasion and athletic body type..."
PAYLOAD='{
  "occasion": "party", 
  "body_type": "athletic"
}'

# Make the request
echo "Sending request to API..."
echo "Request payload: $PAYLOAD"
echo ""
echo "API Response:"
curl -s -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD" | jq

echo ""
echo "=== Test complete ==="
echo "If you see a proper JSON response above, the API is working."
echo "If you see an error or empty response, there may be issues with the Lambda function." 