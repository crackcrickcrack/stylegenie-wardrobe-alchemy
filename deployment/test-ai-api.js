// Test script for StyleGenieAI API
// You can run this in browser console on the website to test the API directly

console.log('Testing StyleGenieAI API...');

// The API endpoint - assumed from the shell script
const apiUrl = 'https://aaicj5k6zb.execute-api.us-east-1.amazonaws.com/prod/style-advisor';

// Create payload
const payload = {
  occasion: 'party',
  body_type: 'athletic'
};

console.log('Test payload:', payload);

// Function to make the API call
async function testStyleGenieAPI() {
  try {
    console.log(`Sending request to ${apiUrl}...`);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Response Data:', data);
    
    // Check if response has the expected structure
    if (data.outfit_suggestions && data.historical_fashion) {
      console.log('✅ API response has expected format');
      
      // Check if images are loading
      checkImages(data);
    } else {
      console.log('❌ API response is missing expected fields');
    }
    
    return data;
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

// Function to check if images are loading
function checkImages(data) {
  console.log('Checking image URLs...');
  
  // Check outfit images
  data.outfit_suggestions.forEach((outfit, i) => {
    console.log(`Outfit ${i+1} image URL:`, outfit.image_url);
    const img = new Image();
    img.onload = () => console.log(`✅ Outfit ${i+1} image loaded successfully`);
    img.onerror = () => console.log(`❌ Outfit ${i+1} image failed to load`);
    img.src = outfit.image_url;
  });
  
  // Check historical images
  data.historical_fashion.forEach((item, i) => {
    console.log(`Historical ${i+1} image URL:`, item.image_url);
    const img = new Image();
    img.onload = () => console.log(`✅ Historical ${i+1} image loaded successfully`);
    img.onerror = () => console.log(`❌ Historical ${i+1} image failed to load`);
    img.src = item.image_url;
  });
}

// Run the test - you can copy-paste this whole file into your browser console
// or just call this function after pasting the rest
testStyleGenieAPI().then(data => {
  console.log('Test complete. Check logs above for results.');
}); 