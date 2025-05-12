// Browser API Tester for StyleGenieAI
// Paste this entire script into your browser console on the StyleGenie website

console.log('=== StyleGenieAI API Endpoint Tester ===');

// Test payload
const payload = {
  occasion: 'party',
  body_type: 'athletic'
};

console.log('Test payload:', payload);

// List of endpoints to test
const endpoints = [
  'https://aaicj5k6zb.execute-api.us-east-1.amazonaws.com/prod/style-advisor',
  'https://aaicj5k6zb.execute-api.us-east-1.amazonaws.com/prod/StyleGenieAI',
  'https://api.stylegenie.duckdns.org/StyleGenieAI',
  'https://1hywq9b8na.execute-api.us-east-1.amazonaws.com/stage/StyleGenieAI',
  '/StyleGenieAI',  // Relative endpoint that might work if served from same domain
];

// Function to test a single endpoint
async function testEndpoint(url) {
  console.log(`\n--------------------------------------------------`);
  console.log(`Testing endpoint: ${url}`);
  console.log(`--------------------------------------------------`);
  
  try {
    console.log(`Sending POST request to ${url}...`);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    console.log(`Response status: ${response.status}`);
    
    if (!response.ok) {
      console.log(`❌ Error: Server returned ${response.status} ${response.statusText}`);
      return false;
    }
    
    const responseText = await response.text();
    console.log(`Raw response (first 150 chars): ${responseText.substring(0, 150)}...`);
    
    try {
      const data = JSON.parse(responseText);
      console.log('Response parsed successfully as JSON');
      
      if (data.outfit_suggestions && data.historical_fashion) {
        console.log('✅ Response contains expected fields (outfit_suggestions, historical_fashion)');
        console.log('Outfit suggestions count:', data.outfit_suggestions.length);
        console.log('Historical fashion count:', data.historical_fashion.length);
        
        // Check for image URLs
        const hasValidImages = data.outfit_suggestions.every(item => !!item.image_url);
        if (hasValidImages) {
          console.log('✅ All outfit suggestions contain image URLs');
        } else {
          console.log('⚠️ Some outfit suggestions are missing image URLs');
        }
        
        console.log('\n✅✅✅ ENDPOINT WORKING: ' + url);
        console.log('Use this endpoint in your frontend by updating API_ENDPOINT in src/pages/AIStyleAdvisor.tsx');
        return true;
      } else {
        console.log('❌ Response is missing required fields');
        console.log('Response structure:', Object.keys(data));
        return false;
      }
    } catch (e) {
      console.log(`❌ Error parsing response as JSON: ${e.message}`);
      return false;
    }
  } catch (e) {
    console.log(`❌ Error testing endpoint: ${e.message}`);
    return false;
  }
}

// Function to test all endpoints
async function testAllEndpoints() {
  console.log('Testing all potential API endpoints...');
  let workingEndpoint = null;
  
  for (const endpoint of endpoints) {
    const isWorking = await testEndpoint(endpoint);
    if (isWorking) {
      workingEndpoint = endpoint;
      break;
    }
  }
  
  console.log('\n=== Test Complete ===');
  if (workingEndpoint) {
    console.log(`Found working endpoint: ${workingEndpoint}`);
    
    // Create a test element on the page to show results
    const resultDiv = document.createElement('div');
    resultDiv.style.position = 'fixed';
    resultDiv.style.top = '10px';
    resultDiv.style.right = '10px';
    resultDiv.style.padding = '15px';
    resultDiv.style.background = '#e6ffe6';
    resultDiv.style.border = '1px solid #00cc00';
    resultDiv.style.borderRadius = '5px';
    resultDiv.style.zIndex = '9999';
    resultDiv.style.maxWidth = '400px';
    resultDiv.innerHTML = `
      <h3 style="margin: 0 0 10px 0; color: #006600;">API Test Successful!</h3>
      <p style="margin: 0 0 5px 0;"><strong>Working Endpoint:</strong></p>
      <code style="display: block; padding: 5px; background: #f1f1f1; overflow-wrap: break-word; margin-bottom: 10px; font-size: 12px;">${workingEndpoint}</code>
      <p style="margin: 0 0 5px 0; font-size: 12px;">Update AIStyleAdvisor.tsx with this endpoint.</p>
      <button style="padding: 5px 10px; background: #006600; color: white; border: none; border-radius: 3px; cursor: pointer;">Dismiss</button>
    `;
    document.body.appendChild(resultDiv);
    
    resultDiv.querySelector('button').addEventListener('click', () => {
      resultDiv.remove();
    });
  } else {
    console.log('❌ No working endpoints found');
    console.log('Troubleshooting steps:');
    console.log('1. Check API Gateway configuration');
    console.log('2. Verify Lambda function permissions');
    console.log('3. Check Lambda CloudWatch logs for errors');
    console.log('4. Verify network connectivity to AWS endpoints');
  }
}

// Run the tests
testAllEndpoints().then(() => {
  console.log('API testing complete. See results above.');
}); 