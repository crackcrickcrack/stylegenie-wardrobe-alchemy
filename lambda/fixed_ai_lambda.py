import json
import boto3
import base64

# Initialize Bedrock client
bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')

# Set model IDs
text_model_id = "anthropic.claude-instant-v1"
image_model_id = "stability.stable-diffusion-xl-v1"

def build_prompt(occasion, body_type):
    return f"""
You are a professional fashion stylist.
Suggest 3 outfit ideas for a {body_type} body type for a {occasion} occasion.
Each suggestion should include a detailed description and suitable style notes.
Also include 2 historical fashion references related to this style.

Respond in JSON format with these exact keys:
- outfit_suggestions (list of dicts with 'description' field)
- historical_fashion (list of dicts with 'year' and 'description' fields)
"""

def generate_image(prompt):
    """Generate an image using Stability AI's SDXL model"""
    try:
        response = bedrock.invoke_model(
            modelId=image_model_id,
            body=json.dumps({
                "text_prompts": [{"text": prompt}],
                "cfg_scale": 8,
                "seed": 0,
                "steps": 30,
            })
        )
        
        response_body = json.loads(response['body'].read())
        if 'artifacts' in response_body and len(response_body['artifacts']) > 0:
            # Get the base64 encoded image
            image_b64 = response_body['artifacts'][0]['base64']
            return f"data:image/png;base64,{image_b64}"
        else:
            return None
    except Exception as e:
        print(f"Error generating image: {str(e)}")
        return None

def lambda_handler(event, context):
    try:
        # Extract inputs
        body = json.loads(event["body"]) if event.get("body") else event
        occasion = body.get("occasion", "casual")
        body_type = body.get("body_type", "average")
        
        # Generate fashion advice using Claude Instant
        text_response = bedrock.invoke_model(
            modelId=text_model_id,
            body=json.dumps({
                "anthropic_version": "bedrock-2023-05-31",
                "max_tokens": 1000,
                "temperature": 0.7,
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": build_prompt(occasion, body_type)
                            }
                        ]
                    }
                ]
            })
        )
        
        # Parse text response
        text_result = json.loads(text_response['body'].read())
        ai_response = text_result['content'][0]['text']
        
        # Extract JSON from text response
        if "```json" in ai_response:
            json_str = ai_response.split("```json")[1].split("```")[0].strip()
        elif "```" in ai_response:
            json_str = ai_response.split("```")[1].strip()
        else:
            json_str = ai_response
        
        fashion_data = json.loads(json_str)
        
        # Generate images for outfit suggestions
        for outfit in fashion_data.get('outfit_suggestions', []):
            image_prompt = f"Fashion outfit: {outfit.get('description')}. Style for {occasion} occasion, {body_type} body type. Professional fashion photography, detailed clothing, high quality."
            outfit['image_url'] = generate_image(image_prompt) or f"https://placehold.co/600x400/png?text=Outfit+Suggestion"
        
        # Generate images for historical fashion
        for historical in fashion_data.get('historical_fashion', []):
            year = historical.get('year', '')
            image_prompt = f"Historical fashion from {year}: {historical.get('description')}. Professional fashion photography, vintage clothing, high quality."
            historical['image_url'] = generate_image(image_prompt) or f"https://placehold.co/600x400/png?text={year}+Fashion"
        
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": True
            },
            "body": json.dumps(fashion_data)
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": True
            },
            "body": json.dumps({"error": str(e)})
        }