import json
import boto3
import os
import traceback
import base64
from datetime import datetime

# Initialize Bedrock client
bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')

# Set the model IDs for available models
text_model_id = "anthropic.claude-instant-v1"
image_model_id = "stability.stable-diffusion-xl-v1"

def format_response(status_code, body):
    """Format the API Gateway response with CORS headers"""
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": True
        },
        "body": json.dumps(body)
    }

def get_default_response():
    """Generate a default response structure if the model fails"""
    return {
        "outfit_suggestions": [
            {
                "image_url": "https://placehold.co/600x400/png?text=Outfit+Suggestion+1",
                "description": "A casual ensemble featuring dark wash jeans paired with a light blue button-down shirt. Complete with brown leather loafers and a matching belt. Perfect for a relaxed yet put-together look."
            },
            {
                "image_url": "https://placehold.co/600x400/png?text=Outfit+Suggestion+2",
                "description": "Khaki chinos paired with a navy polo shirt. Add white sneakers and a minimalist watch for a clean, casual aesthetic suitable for everyday wear."
            },
            {
                "image_url": "https://placehold.co/600x400/png?text=Outfit+Suggestion+3",
                "description": "Black slim-fit jeans with a gray crew neck t-shirt and a light bomber jacket. Finish with black leather sneakers for a modern, versatile casual outfit."
            }
        ],
        "historical_fashion": [
            {
                "year": "1950s",
                "image_url": "https://placehold.co/600x400/png?text=1950s+Fashion"
            },
            {
                "year": "1970s",
                "image_url": "https://placehold.co/600x400/png?text=1970s+Fashion"
            }
        ]
    }

def generate_image(prompt):
    """Generate an image using Stability AI's SDXL model"""
    try:
        print(f"Generating image with prompt: {prompt}")
        response = bedrock.invoke_model(
            modelId=image_model_id,
            body=json.dumps({
                "text_prompts": [{"text": prompt}],
                "cfg_scale": 10,
                "seed": 0,
                "steps": 30,
            })
        )
        
        response_body = json.loads(response['body'].read())
        if 'artifacts' in response_body and len(response_body['artifacts']) > 0:
            # Get the base64 encoded image
            image_b64 = response_body['artifacts'][0]['base64']
            
            # Save to S3 or return a data URL
            # For simplicity, we're returning a data URL here
            return f"data:image/png;base64,{image_b64}"
        else:
            print("No image generated")
            return None
    except Exception as e:
        print(f"Error generating image: {str(e)}")
        print(traceback.format_exc())
        return None

def lambda_handler(event, context):
    try:
        # Parse the request
        if 'body' in event and event['body']:
            try:
                body = json.loads(event['body'])
                occasion = body.get('occasion', '')
                body_type = body.get('body_type', '')
                photo_url = body.get('photo', '')
            except Exception as e:
                print(f"Error parsing body: {str(e)}")
                occasion = event.get('occasion', '')
                body_type = event.get('body_type', '')
                photo_url = event.get('photo', '')
        else:
            occasion = event.get('occasion', '')
            body_type = event.get('body_type', '')
            photo_url = event.get('photo', '')
        
        print(f"Processing request: occasion={occasion}, body_type={body_type}, photo_url={'present' if photo_url else 'not present'}")
        
        if not occasion or not body_type:
            print("Missing required parameters")
            return format_response(400, {"error": "occasion and body_type are required"})
        
        # Prepare prompt for Claude
        prompt = f"""Human: I need some fashion advice for the following scenario:
Occasion: {occasion}
Body Type: {body_type}
{'Photo URL: ' + photo_url if photo_url else ''}

Please provide:
1. Three outfit suggestions including clothes, shoes, and accessories. Each should have a detailed description.
2. Two examples of how this style has evolved throughout history, with the year and a brief description.

Format your response as JSON with the following structure:
{{
  "outfit_suggestions": [
    {{ 
      "description": "Complete description of the outfit"
    }},
    ...
  ],
  "historical_fashion": [
    {{ 
      "year": "1950s",
      "description": "Brief description of this fashion era"
    }},
    ...
  ]
}}"""

        # Invoke Bedrock model for text generation
        try:
            print(f"Invoking Bedrock text model: {text_model_id}")
            response = bedrock.invoke_model(
                modelId=text_model_id,
                body=json.dumps({
                    "anthropic_version": "bedrock-2023-05-31",
                    "max_tokens": 4096,
                    "temperature": 0.7,
                    "messages": [
                        {
                            "role": "user",
                            "content": [
                                {
                                    "type": "text",
                                    "text": prompt
                                }
                            ]
                        }
                    ]
                })
            )
            
            # Parse the response
            response_body = json.loads(response['body'].read())
            print("Got response from Bedrock text model")
            
            # Extract the AI generated content
            ai_response = response_body['content'][0]['text']
            print(f"AI response length: {len(ai_response)}")
            
            # Extract the JSON part from the response
            try:
                # Try to extract JSON from the response
                json_str = ai_response
                if "```json" in ai_response:
                    json_str = ai_response.split("```json")[1].split("```")[0].strip()
                elif "```" in ai_response:
                    json_str = ai_response.split("```")[1].strip()
                
                result = json.loads(json_str)
                print("Successfully parsed JSON from response")
                
                # Generate images for each outfit suggestion and historical fashion
                for i, outfit in enumerate(result.get('outfit_suggestions', [])):
                    # Create a good prompt for the image generator
                    image_prompt = f"Fashion outfit: {outfit.get('description', '')}. Style for {occasion} occasion, {body_type} body type. Professional fashion photography, detailed clothing, high quality."
                    
                    # Generate image
                    image_url = generate_image(image_prompt)
                    if image_url:
                        outfit['image_url'] = image_url
                    else:
                        outfit['image_url'] = f"https://placehold.co/600x400/png?text=Outfit+Suggestion+{i+1}"
                
                for i, historical in enumerate(result.get('historical_fashion', [])):
                    # Create a good prompt for the image generator
                    year = historical.get('year', '')
                    image_prompt = f"Historical fashion from {year}: {historical.get('description', '')}. {occasion} wear, vintage clothing. Professional fashion photography, high quality."
                    
                    # Generate image
                    image_url = generate_image(image_prompt)
                    if image_url:
                        historical['image_url'] = image_url
                    else:
                        historical['image_url'] = f"https://placehold.co/600x400/png?text={year}+Fashion"
                
                # Ensure the response has the expected structure
                if 'outfit_suggestions' not in result or 'historical_fashion' not in result:
                    print("Response missing required fields, using default structure")
                    # Fill in missing fields with defaults
                    default = get_default_response()
                    if 'outfit_suggestions' not in result:
                        result['outfit_suggestions'] = default['outfit_suggestions']
                    if 'historical_fashion' not in result:
                        result['historical_fashion'] = default['historical_fashion']
                
                return format_response(200, result)
            except Exception as e:
                print(f"Error parsing AI response as JSON: {str(e)}")
                print(f"Raw AI response: {ai_response}")
                # Return default response if JSON parsing fails
                return format_response(200, get_default_response())
        
        except Exception as e:
            print(f"Error invoking Bedrock: {str(e)}")
            print(traceback.format_exc())
            # Return default response if Bedrock invocation fails
            return format_response(200, get_default_response())
    
    except Exception as e:
        print(f"Unhandled error: {str(e)}")
        print(traceback.format_exc())
        return format_response(500, {"error": "Internal server error"})