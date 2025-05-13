import json
import boto3

# Initialize clients
bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')
s3_client = boto3.client('s3', region_name='us-east-1')

# S3 bucket for uploads if needed
S3_BUCKET = "stylegenie-uploads"

def lambda_handler(event, context):
    try:
        # Get input parameters from the event
        body = json.loads(event.get('body', '{}')) if event.get('body') else event
        body_type = body.get('body_type', 'average')
        occasion = body.get('occasion', 'casual')
        
        # Generate outfit description using Claude Instant
        outfit_description = generate_outfit_description(body_type, occasion)
        
        # Generate image using Stability AI
        image_url = generate_outfit_image(outfit_description, body_type, occasion)
        
        # Return the final output as a JSON response
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': True
            },
            'body': json.dumps({
                'outfit_description': outfit_description,
                'image_url': image_url
            })
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': True
            },
            'body': json.dumps({
                'error': str(e)
            })
        }

def generate_outfit_description(body_type, occasion):
    """Generate outfit description using Claude Instant"""
    try:
        prompt = f"You are a professional fashion stylist. Suggest a stylish outfit for a {body_type} body type, suitable for a {occasion} occasion. The outfit should be modern, fashionable, and appropriate for the event."
        
        response = bedrock.invoke_model(
            modelId="anthropic.claude-instant-v1",
            body=json.dumps({
                "anthropic_version": "bedrock-2023-05-31",
                "max_tokens": 300,
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
        
        response_body = json.loads(response['body'].read())
        return response_body['content'][0]['text']
    except Exception as e:
        print(f"Error generating outfit description: {str(e)}")
        return "A stylish outfit suitable for the occasion"

def generate_outfit_image(outfit_description, body_type, occasion):
    """Generate outfit image using Stability AI SDXL"""
    try:
        # Create image prompt
        image_prompt = f"Fashion outfit: {outfit_description}. Style for {occasion} occasion, {body_type} body type. Professional fashion photography, detailed clothing, high quality."
        
        # Call Stability AI
        response = bedrock.invoke_model(
            modelId="stability.stable-diffusion-xl-v1",
            body=json.dumps({
                "text_prompts": [{"text": image_prompt}],
                "cfg_scale": 8,
                "seed": 0,
                "steps": 30,
            })
        )
        
        # Process the response and upload to S3
        response_body = json.loads(response['body'].read())
        if 'artifacts' in response_body and len(response_body['artifacts']) > 0:
            image_data = response_body['artifacts'][0]['base64']
            return f"https://placehold.co/600x400/png?text=Generated+Fashion+Image"
            # In a production environment, you would upload to S3 here
            # return upload_to_s3(image_data)
        else:
            return "https://placehold.co/600x400/png?text=No+Image+Generated"
    except Exception as e:
        print(f"Error generating image: {str(e)}")
        return "https://placehold.co/600x400/png?text=Image+Generation+Error" 