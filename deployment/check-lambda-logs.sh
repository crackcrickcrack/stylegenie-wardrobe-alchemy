#!/bin/bash

echo "=== Checking StyleGenieAI Lambda Logs ==="

# Get the most recent log stream name
echo "Getting most recent log stream..."
LOG_STREAMS=$(aws logs describe-log-streams \
  --log-group-name "/aws/lambda/StyleGenieAI" \
  --order-by LastEventTime \
  --descending \
  --limit 3 \
  --query 'logStreams[*].logStreamName' \
  --output text)

# Check if there are any log streams
if [ -z "$LOG_STREAMS" ]; then
  echo "❌ No log streams found for StyleGenieAI Lambda function."
  echo "This could mean the function hasn't been executed yet or there's an issue with CloudWatch logs."
  exit 1
fi

echo "Found log streams:"
echo "$LOG_STREAMS"

# Get the most recent log stream
LATEST_LOG_STREAM=$(echo "$LOG_STREAMS" | head -n 1)

echo "Fetching logs from most recent stream: $LATEST_LOG_STREAM"
echo "============================================================="

# Get the log events from the most recent stream
aws logs get-log-events \
  --log-group-name "/aws/lambda/StyleGenieAI" \
  --log-stream-name "$LATEST_LOG_STREAM" \
  --limit 100 \
  --query 'events[*].message' \
  --output text

echo ""
echo "Analyzing logs for Bedrock issues..."

# Get all recent logs for analysis
ALL_LOGS=$(aws logs get-log-events \
  --log-group-name "/aws/lambda/StyleGenieAI" \
  --log-stream-name "$LATEST_LOG_STREAM" \
  --limit 200 \
  --query 'events[*].message' \
  --output text)

# Check for common errors
echo ""
echo "Common Error Analysis:"

# Check for Bedrock invocation errors
if echo "$ALL_LOGS" | grep -i "Error invoking Bedrock" > /dev/null; then
  echo "❌ Found Bedrock invocation errors"
  echo "Bedrock Error Details:"
  echo "$ALL_LOGS" | grep -i -A 10 "Error invoking Bedrock"
else
  echo "✅ No Bedrock invocation errors found"
fi

# Check for JSON parsing errors
if echo "$ALL_LOGS" | grep -i "Error parsing AI response as JSON" > /dev/null; then
  echo "❌ Found JSON parsing errors"
  echo "JSON Parsing Error Details:"
  echo "$ALL_LOGS" | grep -i -A 10 "Error parsing AI response as JSON"
else
  echo "✅ No JSON parsing errors found"
fi

# Check for permissions issues
if echo "$ALL_LOGS" | grep -i "AccessDenied" > /dev/null; then
  echo "❌ Found permissions issues"
  echo "Permission Error Details:"
  echo "$ALL_LOGS" | grep -i -A 10 "AccessDenied"
else
  echo "✅ No permission errors found"
fi

# Check for timeouts
if echo "$ALL_LOGS" | grep -i "Task timed out" > /dev/null; then
  echo "❌ Found Lambda timeout issues"
  echo "Timeout Details:"
  echo "$ALL_LOGS" | grep -i -A 10 "Task timed out"
else
  echo "✅ No timeout errors found"
fi

echo ""
echo "=== Log Analysis Complete ==="
echo "For more detailed logs, visit the CloudWatch console:"
echo "https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logsV2:log-groups/log-group/$252Faws$252Flambda$252FStyleGenieAI" 