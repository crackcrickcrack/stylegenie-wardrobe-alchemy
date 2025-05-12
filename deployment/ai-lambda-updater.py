#!/usr/bin/env python3
import boto3
import json
import tempfile
import os
import zipfile
import shutil
import subprocess

print("=== Updating StyleGenieAI Lambda Function ===")

# Initialize AWS clients
lambda_client = boto3.client('lambda')
bedrock_client = boto3.client('bedrock')

# Lambda function name
ai_lambda = "StyleGenieAI"

# Get available Bedrock models
try:
    print("Fetching available Bedrock models...")
    model_response = bedrock_client.list_foundation_models()
    available_models = [model['modelId'] for model in model_response.get('modelSummaries', [])]
    
    # Preferred models in order of preference
    preferred_models = [
        "anthropic.claude-3-sonnet-20240229-v1:0",
        "anthropic.claude-3-haiku-20240307-v1:0",
        "amazon.titan-text-express-v1",
        "ai21.j2-ultra-v1",
        "anthropic.claude-v2",
        "anthropic.claude-instant-v1"
    ]
    
    # Find the first available preferred model
    target_model = None
    for model in preferred_models:
        if model in available_models:
            target_model = model
            break
    
    if not target_model and available_models:
        # If none of our preferred models are available, use the first available one
        target_model = available_models[0]
    
    if not target_model:
        print("Error: No Bedrock models available in your account.")
        print("Please enable at least one model in the AWS Bedrock console.")
        exit(1)
    
    print(f"Selected model: {target_model}")
    
    # Create temporary directory
    with tempfile.TemporaryDirectory() as temp_dir:
        # Download Lambda function
        print("Downloading Lambda function code...")
        response = lambda_client.get_function(FunctionName=ai_lambda)
        code_url = response['Code']['Location']
        
        # Download the zip file
        zip_path = os.path.join(temp_dir, 'lambda.zip')
        subprocess.run(['curl', '-s', '-o', zip_path, code_url], check=True)
        
        # Extract the zip file
        extract_dir = os.path.join(temp_dir, 'extracted')
        os.makedirs(extract_dir, exist_ok=True)
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(extract_dir)
        
        # List all files in extract directory for debugging
        print("Extracted files:")
        for root, dirs, files in os.walk(extract_dir):
            for file in files:
                file_path = os.path.join(root, file)
                relative_path = os.path.relpath(file_path, extract_dir)
                print(f"  - {relative_path}")
        
        # Find and modify the Lambda function file
        function_file = None
        for root, _, files in os.walk(extract_dir):
            for file in files:
                if file.endswith('.py'):
                    file_path = os.path.join(root, file)
                    print(f"Checking file: {file_path}")
                    try:
                        with open(file_path, 'r') as f:
                            content = f.read()
                            if 'model_id' in content.lower() or 'bedrock' in content.lower():
                                print(f"Found candidate file: {file_path}")
                                function_file = file_path
                                break
                    except Exception as e:
                        print(f"Error reading file {file_path}: {str(e)}")
            if function_file:
                break
        
        # If we didn't find a file with model_id, check for lambda_function.py
        if not function_file:
            default_file = os.path.join(extract_dir, 'lambda_function.py')
            if os.path.exists(default_file):
                print(f"Using default Lambda function file: {default_file}")
                function_file = default_file
        
        if not function_file:
            print("Error: Could not find the Lambda function file with model_id.")
            print("Files in Lambda package:")
            for root, _, files in os.walk(extract_dir):
                for file in files:
                    file_path = os.path.join(root, file)
                    print(f"  - {os.path.relpath(file_path, extract_dir)}")
            exit(1)
        
        # Read the file content
        with open(function_file, 'r') as f:
            content = f.read()
            print(f"Lambda function file content snippet (first 200 chars):")
            print(content[:200] + "...")
        
        # Create a new model reference that we can inject
        model_reference = f'model_id = "{target_model}"'
        
        # Replace the model ID - different patterns to handle various ways it might be defined
        updated_content = content
        model_patterns = [
            r'model_id\s*=\s*[\'"].*?[\'"]',
            r'["\'](anthropic\.claude[^"\']*)["\']',
            r'["\']modelId["\']\s*:\s*["\']([^"\']*)["\']'
        ]
        
        pattern_match_found = False
        for pattern in model_patterns:
            import re
            matches = re.findall(pattern, content)
            if matches:
                print(f"Found model pattern match: {pattern} -> {matches}")
                for match in matches:
                    if isinstance(match, str) and ('anthropic' in match or 'claude' in match or 'model' in match.lower()):
                        # Handle both full assignment and just the model ID string
                        if '=' in pattern:
                            replacement = f'model_id = "{target_model}"'
                        elif 'modelId' in pattern:
                            replacement = f'"modelId": "{target_model}"'
                        else:
                            replacement = f'"{target_model}"'
                        updated_content = re.sub(pattern, replacement, updated_content, 1)
                        pattern_match_found = True
                        print(f"Replaced model reference with: {replacement}")
                        break
        
        # If no pattern match was found, try to insert model_id near bedrock client initialization
        if not pattern_match_found:
            print("No model pattern match found. Looking for bedrock client initialization...")
            bedrock_patterns = [
                r'bedrock\s*=\s*boto3\.client\([\'"]bedrock[\'"]\)',
                r'bedrock_runtime\s*=\s*boto3\.client\([\'"]bedrock-runtime[\'"]\)'
            ]
            
            for pattern in bedrock_patterns:
                if re.search(pattern, updated_content):
                    print(f"Found bedrock client pattern: {pattern}")
                    # Insert model_id after client initialization
                    updated_content = re.sub(
                        pattern,
                        f"\\g<0>\n{model_reference}",
                        updated_content, 1
                    )
                    pattern_match_found = True
                    print(f"Inserted model reference: {model_reference}")
                    break
        
        # If still no match, create or update invoke_model call
        if not pattern_match_found:
            print("No model pattern or client initialization found. Looking for invoke_model call...")
            invoke_patterns = [
                r'invoke_model\(',
                r'bedrock\.invoke_model\('
            ]
            
            for pattern in invoke_patterns:
                if re.search(pattern, updated_content):
                    print(f"Found invoke_model pattern: {pattern}")
                    # Add model_id before invoke_model
                    updated_content = re.sub(
                        pattern,
                        f"{model_reference}\n\\g<0>",
                        updated_content, 1
                    )
                    pattern_match_found = True
                    print(f"Added model reference before invoke_model: {model_reference}")
                    break
        
        # As a last resort, add model_id to the top of the file
        if not pattern_match_found:
            print("No suitable pattern found. Adding model_id to the top of the file...")
            updated_content = f"{model_reference}\n\n{updated_content}"
            print(f"Added model reference to the top: {model_reference}")
        
        # Write the updated content
        with open(function_file, 'w') as f:
            f.write(updated_content)
        
        # Create a new zip file
        new_zip_path = os.path.join(temp_dir, 'new_lambda.zip')
        shutil.make_archive(os.path.join(temp_dir, 'new_lambda'), 'zip', extract_dir)
        
        # Update the Lambda function
        print("Updating Lambda function with the new model ID...")
        with open(new_zip_path, 'rb') as zip_file:
            lambda_client.update_function_code(
                FunctionName=ai_lambda,
                ZipFile=zip_file.read()
            )
    
    print("\n=== Lambda Update Complete ===")
    print(f"The StyleGenieAI Lambda function has been updated to use the {target_model} model.")
    print("Please allow a few minutes for the Lambda to update before testing again.")

except Exception as e:
    print(f"Error: {str(e)}")
    import traceback
    traceback.print_exc()
    print("\nPlease make sure you have the following permissions:")
    print("- lambda:GetFunction")
    print("- lambda:UpdateFunctionCode")
    print("- bedrock:ListFoundationModels")
    print("\nTry running the script with AWS administrator privileges.") 