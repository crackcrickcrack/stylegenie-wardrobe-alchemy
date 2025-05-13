// This script updates the API endpoint in the website's configuration

const fs = require('fs');
const path = require('path');

// The new API endpoint
const NEW_API_ENDPOINT = "https://zkbluoyybf.execute-api.us-east-1.amazonaws.com/prod/StyleGenieAI";

// Function to find and update the configuration file
function updateApiEndpoint() {
  try {
    // Look for config file in common locations
    const possibleLocations = [
      '../src/config.js', 
      '../src/config/api.js',
      '../src/utils/api.js',
      '../src/constants.js',
      '../public/config.js'
    ];
    
    let configFile = null;
    let configPath = null;
    
    // Find the first existing config file
    for (const location of possibleLocations) {
      try {
        configPath = path.resolve(__dirname, location);
        if (fs.existsSync(configPath)) {
          configFile = fs.readFileSync(configPath, 'utf8');
          console.log(`Found config file at ${configPath}`);
          break;
        }
      } catch (err) {
        // Continue to next location
      }
    }
    
    if (!configFile) {
      console.log("No existing config file found, creating a new one");
      configPath = path.resolve(__dirname, '../src/config.js');
      configFile = `// API Configuration
export const API_ENDPOINTS = [
  "https://example.com/api"
];
`;
    }
    
    // Update the API endpoints in the configuration
    let updatedConfig;
    
    if (configFile.includes('API_ENDPOINTS')) {
      // Replace existing API endpoints array
      updatedConfig = configFile.replace(
        /API_ENDPOINTS\s*=\s*\[([\s\S]*?)\]/,
        `API_ENDPOINTS = [\n  "${NEW_API_ENDPOINT}"\n]`
      );
    } else {
      // Add API endpoints array if it doesn't exist
      updatedConfig = configFile + `\n\n// API Configuration\nexport const API_ENDPOINTS = [\n  "${NEW_API_ENDPOINT}"\n];\n`;
    }
    
    // Write the updated configuration back to the file
    fs.writeFileSync(configPath, updatedConfig);
    console.log(`Updated API endpoint in ${configPath} to ${NEW_API_ENDPOINT}`);
    
    return true;
  } catch (error) {
    console.error("Error updating API endpoint:", error);
    return false;
  }
}

// Execute the update
updateApiEndpoint(); 