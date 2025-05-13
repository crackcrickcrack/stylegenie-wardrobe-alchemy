import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Copy, Check, Code, Terminal, Package, Key, Search } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CodeBlock = ({ code, language = "json" }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-zinc-950 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between py-2 px-4 border-b border-zinc-800">
        <div className="flex items-center space-x-2">
          <Code className="h-4 w-4 text-zinc-400" />
          <span className="text-xs text-zinc-400">{language}</span>
        </div>
        <button 
          onClick={copyToClipboard}
          className="text-xs text-zinc-400 hover:text-white flex items-center space-x-1"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-zinc-100">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const Endpoint = ({ method, path, description, request, response }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-8">
      <div className="flex items-center p-4 border-b border-gray-100">
        <div className={`px-2.5 py-1 rounded text-xs font-bold mr-3 ${
          method === "GET" ? "bg-green-100 text-green-700" : 
          method === "POST" ? "bg-blue-100 text-blue-700" : 
          method === "PUT" ? "bg-yellow-100 text-yellow-700" : 
          "bg-red-100 text-red-700"
        }`}>
          {method}
        </div>
        <code className="text-sm text-gray-900 font-mono">{path}</code>
      </div>
      <div className="p-6">
        <p className="text-gray-700 mb-6">{description}</p>
        
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Request</h4>
          <CodeBlock code={request} language="json" />
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Response</h4>
          <CodeBlock code={response} language="json" />
        </div>
      </div>
    </div>
  );
};

const APIDocumentation = () => {
  const endpoints = [
    {
      method: "POST",
      path: "/api/v1/style-recommendations",
      description: "Generate personalized outfit recommendations based on user parameters such as body type, occasion, gender, etc.",
      request: `{
  "body_type": "hourglass",
  "occasion": "formal",
  "gender": "female",
  "country": "united-states",
  "age_range": "adult"
}`,
      response: `{
  "outfit_suggestions": [
    {
      "description": "A fitted black sheath dress that accentuates your hourglass shape, paired with statement earrings and classic pumps. This elegant ensemble is perfect for formal occasions, highlighting your curves while maintaining sophistication.",
      "image_url": "https://example.com/images/outfit-1.jpg"
    },
    {
      "description": "A burgundy wrap dress with a cinched waist to showcase your natural proportions. Complete the look with metallic accessories and strappy heels for a refined formal appearance.",
      "image_url": "https://example.com/images/outfit-2.jpg"
    }
  ]
}`
    },
    {
      method: "GET",
      path: "/api/v1/body-types",
      description: "Retrieve a list of all available body types and their descriptions for reference.",
      request: "No request body required",
      response: `{
  "body_types": [
    {
      "id": "hourglass",
      "name": "Hourglass",
      "description": "Characterized by well-proportioned shoulders and hips with a defined waist."
    },
    {
      "id": "pear",
      "name": "Pear",
      "description": "Hips wider than shoulders with a defined waist and narrower upper body."
    },
    {
      "id": "apple",
      "name": "Apple",
      "description": "Fuller mid-section with slimmer legs and shoulders."
    },
    {
      "id": "rectangle",
      "name": "Rectangle",
      "description": "Shoulders and hips roughly the same width with less defined waist."
    },
    {
      "id": "inverted-triangle",
      "name": "Inverted Triangle",
      "description": "Shoulders wider than hips with an athletic upper body."
    }
  ]
}`
    },
    {
      method: "POST",
      path: "/api/v1/wardrobe/analyze",
      description: "Analyze a user's wardrobe items and provide recommendations for versatile combinations.",
      request: `{
  "wardrobe_items": [
    {
      "id": "item-1",
      "type": "top",
      "subtype": "blouse",
      "color": "white",
      "pattern": "solid",
      "image_url": "https://example.com/wardrobe/blouse.jpg"
    },
    {
      "id": "item-2",
      "type": "bottom",
      "subtype": "skirt",
      "color": "navy",
      "pattern": "solid",
      "image_url": "https://example.com/wardrobe/skirt.jpg"
    },
    {
      "id": "item-3",
      "type": "outerwear",
      "subtype": "blazer",
      "color": "black",
      "pattern": "solid",
      "image_url": "https://example.com/wardrobe/blazer.jpg"
    }
  ]
}`,
      response: `{
  "combinations": [
    {
      "items": ["item-1", "item-2", "item-3"],
      "occasion": "business",
      "season": "spring",
      "description": "A classic business ensemble combining your white blouse, navy skirt and black blazer. Perfect for professional settings with a timeless elegance."
    },
    {
      "items": ["item-1", "item-2"],
      "occasion": "semi-formal",
      "season": "summer",
      "description": "A light and breezy combination for warmer weather. The white blouse and navy skirt create a nautical-inspired look perfect for summer events."
    }
  ],
  "suggestions": {
    "missing_essentials": [
      {
        "type": "footwear",
        "subtype": "pumps",
        "description": "A pair of classic black pumps would complete multiple outfits in your wardrobe."
      }
    ]
  }
}`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">API <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Documentation</span></h1>
            <p className="text-lg text-gray-600 mb-8">Integrate StyleGenie's AI styling capabilities into your applications</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                Get API Key
              </Button>
              <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                View on GitHub
              </Button>
            </div>
          </div>
          
          {/* Quick start section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Quick Start</h2>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <ol className="space-y-6">
                <li className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-purple-100 text-purple-600 mr-3">
                    <Key className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Get your API Key</h3>
                    <p className="text-gray-600 mb-2">Sign up for an account and generate an API key from your dashboard.</p>
                    <CodeBlock 
                      code="API_KEY=sk_test_yourkey12345" 
                      language="bash"
                    />
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-purple-100 text-purple-600 mr-3">
                    <Package className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Install the SDK (Optional)</h3>
                    <p className="text-gray-600 mb-2">Install our SDK for your preferred programming language.</p>
                    <Tabs defaultValue="npm">
                      <TabsList className="mb-2">
                        <TabsTrigger value="npm">npm</TabsTrigger>
                        <TabsTrigger value="yarn">yarn</TabsTrigger>
                        <TabsTrigger value="pip">pip</TabsTrigger>
                      </TabsList>
                      <TabsContent value="npm">
                        <CodeBlock 
                          code="npm install stylegenie-sdk" 
                          language="bash"
                        />
                      </TabsContent>
                      <TabsContent value="yarn">
                        <CodeBlock 
                          code="yarn add stylegenie-sdk" 
                          language="bash"
                        />
                      </TabsContent>
                      <TabsContent value="pip">
                        <CodeBlock 
                          code="pip install stylegenie-sdk" 
                          language="bash"
                        />
                      </TabsContent>
                    </Tabs>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-purple-100 text-purple-600 mr-3">
                    <Terminal className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Make your first API call</h3>
                    <p className="text-gray-600 mb-2">Generate your first style recommendation:</p>
                    <Tabs defaultValue="javascript">
                      <TabsList className="mb-2">
                        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                        <TabsTrigger value="python">Python</TabsTrigger>
                        <TabsTrigger value="curl">cURL</TabsTrigger>
                      </TabsList>
                      <TabsContent value="javascript">
                        <CodeBlock 
                          code={`import { StyleGenie } from 'stylegenie-sdk';

const stylegenie = new StyleGenie('YOUR_API_KEY');

async function getStyleRecommendation() {
  const recommendation = await stylegenie.generateOutfit({
    body_type: 'hourglass',
    occasion: 'formal',
    gender: 'female'
  });
  
  console.log(recommendation);
}

getStyleRecommendation();`} 
                          language="javascript"
                        />
                      </TabsContent>
                      <TabsContent value="python">
                        <CodeBlock 
                          code={`from stylegenie import StyleGenie

stylegenie = StyleGenie('YOUR_API_KEY')

recommendation = stylegenie.generate_outfit(
    body_type='hourglass',
    occasion='formal',
    gender='female'
)

print(recommendation)`} 
                          language="python"
                        />
                      </TabsContent>
                      <TabsContent value="curl">
                        <CodeBlock 
                          code={`curl -X POST https://api.stylegenie.com/v1/style-recommendations \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "body_type": "hourglass",
    "occasion": "formal",
    "gender": "female"
  }'`} 
                          language="bash"
                        />
                      </TabsContent>
                    </Tabs>
                  </div>
                </li>
              </ol>
            </div>
          </div>
          
          {/* API Reference */}
          <div className="mb-16">
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-3xl font-bold">API Reference</h2>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input 
                  type="text"
                  placeholder="Search endpoints..."
                  className="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              {endpoints.map((endpoint, index) => (
                <Endpoint key={index} {...endpoint} />
              ))}
            </div>
          </div>
          
          {/* Rate limiting and usage */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-16">
            <h2 className="text-2xl font-bold mb-4">Rate Limiting and Usage</h2>
            <p className="text-gray-600 mb-6">Our API implements rate limiting to ensure fair usage and availability for all users. Rate limits vary by plan:</p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Plan</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Requests per Minute</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Requests per Day</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-700">Basic</td>
                    <td className="py-3 px-4 text-gray-700">10</td>
                    <td className="py-3 px-4 text-gray-700">1,000</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-700">Professional</td>
                    <td className="py-3 px-4 text-gray-700">30</td>
                    <td className="py-3 px-4 text-gray-700">5,000</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-700">Enterprise</td>
                    <td className="py-3 px-4 text-gray-700">100</td>
                    <td className="py-3 px-4 text-gray-700">20,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Support */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-3">Need help with integration?</h2>
            <p className="text-purple-100 mb-6">Our developer support team is ready to assist you with any questions or issues</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-purple-600 hover:bg-gray-100">
                Developer Support
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-purple-500">
                Join Discord
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default APIDocumentation; 