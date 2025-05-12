#!/usr/bin/env python3
import boto3
import json

# Initialize Lambda client
lambda_client = boto3.client('lambda')

# StyleGenie AI Lambda function
LAMBDA_NAME = "StyleGenieAI"

def test_lambda():
    """Test the StyleGenieAI Lambda function directly"""
    print(f"Testing Lambda function: {LAMBDA_NAME}")
    
    # Simple test payload
    test_payload = {
        "occasion": "casual",
        "body_type": "slim"
    }
    
    print(f"Sending test payload: {json.dumps(test_payload, indent=2)}")
    
    try:
        # Invoke Lambda
        response = lambda_client.invoke(
            FunctionName=LAMBDA_NAME,
            InvocationType='RequestResponse',
            Payload=json.dumps(test_payload)
        )
        
        # Read the response
        response_payload = json.loads(response['Payload'].read().decode())
        
        print(f"Lambda response status code: {response['StatusCode']}")
        print(f"Response payload: {json.dumps(response_payload, indent=2)}")
        
        # Check if there was an error in the Lambda execution
        if 'FunctionError' in response:
            print(f"Lambda execution error: {response['FunctionError']}")
        
        # Check if the response has expected format
        if 'statusCode' in response_payload:
            print(f"API Gateway response status: {response_payload['statusCode']}")
            
            # Parse body if present
            if 'body' in response_payload:
                try:
                    body = response_payload['body']
                    if isinstance(body, str):
                        body = json.loads(body)
                    print(f"Response body: {json.dumps(body, indent=2)}")
                except Exception as e:
                    print(f"Error parsing response body: {str(e)}")
                    print(f"Raw body: {response_payload['body']}")
        
        # Check if this is a direct Lambda response (no API Gateway wrapper)
        elif isinstance(response_payload, dict) and not 'statusCode' in response_payload:
            print("Direct Lambda response (not API Gateway format)")
            print(f"Keys in response: {list(response_payload.keys())}")
            
            # Check for expected fields in our AI response
            expected_fields = ['outfit_suggestions', 'historical_fashion']
            missing_fields = [field for field in expected_fields if field not in response_payload]
            
            if missing_fields:
                print(f"Missing expected fields: {missing_fields}")
            else:
                print("Response contains all expected fields")
                
                # Check outfit suggestions
                if 'outfit_suggestions' in response_payload:
                    suggestions = response_payload['outfit_suggestions']
                    print(f"Number of outfit suggestions: {len(suggestions)}")
                    
                    if suggestions and isinstance(suggestions, list):
                        first_suggestion = suggestions[0]
                        print(f"First suggestion keys: {list(first_suggestion.keys())}")
                
                # Check historical fashion
                if 'historical_fashion' in response_payload:
                    historical = response_payload['historical_fashion']
                    print(f"Number of historical fashion items: {len(historical)}")
    
    except Exception as e:
        print(f"Error invoking Lambda: {str(e)}")

if __name__ == "__main__":
    test_lambda() 