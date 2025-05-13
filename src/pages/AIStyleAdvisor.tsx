import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkles, Camera, Wand2, Share2, ArrowRight } from "lucide-react";
import BodyTypeGuide from "@/components/BodyTypeGuide";

// Model images for the banner gallery
const modelImages = [
  "https://images.unsplash.com/photo-1618375531912-867984bdfd87?q=80&w=300&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1611042553365-9b153c7e4ca5?q=80&w=300&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1603217192634-61068e4d4bf9?q=80&w=300&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=300&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=300&h=400&auto=format&fit=crop",
];

interface OutfitSuggestion {
  image_url: string;
  description: string;
}

interface AIResponse {
  outfit_suggestions: OutfitSuggestion[];
}

// List of potential API endpoints to try
const API_ENDPOINTS = [
  'https://zkbluoyybf.execute-api.us-east-1.amazonaws.com/prod/StyleGenieAI'  // New working API endpoint
];

const AIStyleAdvisor: React.FC = () => {
  const [occasion, setOccasion] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [bodyType, setBodyType] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [ageRange, setAgeRange] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [suggestions, setSuggestions] = useState<AIResponse | null>(null);
  const [apiDebug, setApiDebug] = useState<any>(null);
  const [workingEndpoint, setWorkingEndpoint] = useState<string | null>(null);
  const [selectedOutfit, setSelectedOutfit] = useState<OutfitSuggestion | null>(null);

  useEffect(() => {
    console.log('AIStyleAdvisor component mounted');
    // Log the API endpoints being used
    console.log('Potential API endpoints:', API_ENDPOINTS);
  }, []);

  // Function to try a specific endpoint
  const tryEndpoint = async (endpoint: string, payload: any) => {
    console.log(`Trying endpoint: ${endpoint}`);
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      console.log(`Response status from ${endpoint}:`, response.status);
      
      if (!response.ok) {
        console.log(`Error from ${endpoint}:`, response.status, response.statusText);
        return null;
      }
      
      const responseText = await response.text();
      if (!responseText) {
        console.log(`Empty response from ${endpoint}`);
        return null;
      }
      
      try {
        const data = JSON.parse(responseText);
        console.log("API Response:", data);
        
        // Handle the new API response format
        if (data.outfit_description && data.image_url) {
          console.log(`✅ Success from ${endpoint} with new format`);
          
          // Convert the new format to the expected structure
          const convertedData = {
            outfit_suggestions: [
              {
                description: data.outfit_description,
                image_url: data.image_url
              }
            ]
          };
          
          // Update the working endpoint for future use
          setWorkingEndpoint(endpoint);
          return convertedData;
        }
        
        // Check if the response has the original expected structure
        else if (data.outfit_suggestions) {
          console.log(`✅ Success from ${endpoint} with original format`);
          // Update the working endpoint for future use
          setWorkingEndpoint(endpoint);
          // Remove historical_fashion if it exists
          const { historical_fashion, ...rest } = data;
          return rest;
        } else {
          console.log(`Response from ${endpoint} missing expected fields`);
          return null;
        }
      } catch (e) {
        console.log(`Error parsing JSON from ${endpoint}:`, e);
        return null;
      }
    } catch (e) {
      console.log(`Network error with ${endpoint}:`, e);
      return null;
    }
  };

  const getStyleSuggestions = async () => {
    if (!occasion || !bodyType || !gender) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');
    setApiDebug(null);

    // Prepare the request payload
    const payload = {
      occasion,
      body_type: bodyType,
      gender,
      country: country || 'global', // Default to 'global' if no country is selected
      age_range: ageRange || 'adult' // Default to 'adult' if no age range is selected
    };

    console.log('Sending request with payload:', payload);

    // Try each endpoint in order until one works
    let successData = null;
    const endpointsToTry = workingEndpoint 
      ? [workingEndpoint, ...API_ENDPOINTS.filter(e => e !== workingEndpoint)] 
      : API_ENDPOINTS;
    
    for (const endpoint of endpointsToTry) {
      const data = await tryEndpoint(endpoint, payload);
      if (data) {
        successData = data;
        break;
      }
    }

    if (successData) {
      // Process and validate the response
      const data = successData;
      setApiDebug({ responseData: data, workingEndpoint });
      
      // Check if image URLs are valid
      console.log('Validating image URLs');
      data.outfit_suggestions.forEach((outfit: OutfitSuggestion, index: number) => {
        if (!outfit.image_url) {
          outfit.image_url = `https://placehold.co/600x800/EEE/31343C?text=Outfit+${index+1}`;
        }
      });

      setSuggestions(data);
      
      // Scroll to results
      const resultsElement = document.getElementById('results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // All endpoints failed
      setError('Could not connect to style advisor service. Please try again later.');
      setApiDebug({ error: 'All API endpoints failed', triedEndpoints: API_ENDPOINTS });
    }
    
    setLoading(false);
  };

  const handleOpenOutfit = (outfit: OutfitSuggestion) => {
    setSelectedOutfit(outfit);
  };

  const handleCloseOutfit = () => {
    setSelectedOutfit(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Hero Banner with Model Images */}
      <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-pattern-grid"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Elevate Your <em className="font-bold not-italic">Style</em> with AI
              </h1>
              
              <p className="text-white/80 text-lg mb-6 max-w-lg">
                Our AI-powered style advisor analyzes your body type and occasion to create perfect outfit combinations personalized just for you.
              </p>
              
              <div className="flex items-center text-white/70 text-sm gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                  </span>
                  <span>Personalized Recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                  </span>
                  <span>AI-Generated Outfits</span>
                </div>
              </div>
              
              <Button className="bg-white text-purple-600 hover:bg-white/90 rounded-xl px-6 py-6 h-auto text-lg font-medium flex items-center gap-2">
                Start Your Style Journey <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="grid grid-cols-3 gap-2 rotate-3">
                {modelImages.slice(0, 3).map((src, index) => (
                  <div key={index} className={`overflow-hidden rounded-xl shadow-lg ${index % 2 === 0 ? 'translate-y-6' : ''}`}>
                    <img 
                      src={src} 
                      alt={`Fashion model ${index+1}`} 
                      className="w-full h-[220px] object-cover hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300&auto=format&fit=crop";
                      }}
                    />
                  </div>
                ))}
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg z-10">
                <p className="text-sm font-medium text-purple-700">AI-Powered Style</p>
                <p className="text-xs text-gray-500">Personalized in seconds</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* How it works section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">
              How <em className="text-purple-600 font-bold not-italic">StyleGenie</em> works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                    <span className="text-purple-700 font-bold text-xl">1</span>
                  </div>
                </div>
                <h3 className="font-semibold text-xl mb-2">Choose</h3>
                <p className="text-gray-600">Select your body type and occasion</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                    <span className="text-purple-700 font-bold text-xl">2</span>
                  </div>
                </div>
                <h3 className="font-semibold text-xl mb-2">Transform</h3>
                <p className="text-gray-600">Our AI generates personalized outfits</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                    <span className="text-purple-700 font-bold text-xl">3</span>
                  </div>
                </div>
                <h3 className="font-semibold text-xl mb-2">Share</h3>
                <p className="text-gray-600">Save your favorites and share them</p>
              </div>
            </div>
          </div>
          
          {/* Gallery of style inspiration */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-8">
              Style <em className="text-purple-600 font-bold not-italic">Inspiration</em>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
              {modelImages.map((src, index) => (
                <div key={index} className="overflow-hidden rounded-xl aspect-[3/4] shadow-sm">
                  <img 
                    src={src} 
                    alt={`Style inspiration ${index+1}`} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300&auto=format&fit=crop";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {workingEndpoint && (
            <div className="mb-4 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-800">
              Using API endpoint: {workingEndpoint}
            </div>
          )}
          
          <div className="grid md:grid-cols-2 gap-10 mb-16 bg-white p-8 rounded-2xl shadow-lg">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-800 border-b border-purple-100 pb-4">
                Your Style Preferences
              </h2>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Occasion</label>
                <Select onValueChange={setOccasion} value={occasion}>
                  <SelectTrigger className="w-full border-purple-200 focus:ring-purple-500 focus:border-purple-500 rounded-xl">
                    <SelectValue placeholder="Select an occasion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date night">Date Night</SelectItem>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="wedding guest">Wedding Guest</SelectItem>
                    <SelectItem value="cocktail party">Cocktail Party</SelectItem>
                    <SelectItem value="formal gala">Formal Gala</SelectItem>
                    <SelectItem value="party">Party</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="business casual">Business Casual</SelectItem>
                    <SelectItem value="business formal">Business Formal</SelectItem>
                    <SelectItem value="job interview">Job Interview</SelectItem>
                    <SelectItem value="beach vacation">Beach Vacation</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="outdoor activities">Outdoor Activities</SelectItem>
                    <SelectItem value="gym workout">Gym Workout</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="brunch">Brunch</SelectItem>
                    <SelectItem value="festival">Festival</SelectItem>
                    <SelectItem value="concert">Concert</SelectItem>
                    <SelectItem value="graduation">Graduation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Gender</label>
                <Select onValueChange={setGender} value={gender}>
                  <SelectTrigger className="w-full border-purple-200 focus:ring-purple-500 focus:border-purple-500 rounded-xl">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="non-binary">Non-Binary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Body Type</label>
                <div className="flex items-center">
                  <Select onValueChange={setBodyType} value={bodyType}>
                    <SelectTrigger className="w-full border-purple-200 focus:ring-purple-500 focus:border-purple-500 rounded-xl">
                      <SelectValue placeholder="Select your body type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slim">Slim</SelectItem>
                      <SelectItem value="curvy">Curvy</SelectItem>
                      <SelectItem value="athletic">Athletic</SelectItem>
                      <SelectItem value="petite">Petite</SelectItem>
                      <SelectItem value="plus-size">Plus Size</SelectItem>
                      <SelectItem value="tall">Tall</SelectItem>
                      <SelectItem value="short">Short</SelectItem>
                      <SelectItem value="hourglass">Hourglass</SelectItem>
                      <SelectItem value="pear">Pear</SelectItem>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="rectangle">Rectangle</SelectItem>
                      <SelectItem value="inverted-triangle">Inverted Triangle</SelectItem>
                    </SelectContent>
                  </Select>
                  <BodyTypeGuide onSelectBodyType={setBodyType} />
                </div>
                <p className="text-xs text-gray-500 mt-1">Not sure? Click the info icon to view body type examples</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Country</label>
                <Select onValueChange={setCountry} value={country}>
                  <SelectTrigger className="w-full border-purple-200 focus:ring-purple-500 focus:border-purple-500 rounded-xl">
                    <SelectValue placeholder="Select your country (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="global">Global Style</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="france">France</SelectItem>
                    <SelectItem value="italy">Italy</SelectItem>
                    <SelectItem value="japan">Japan</SelectItem>
                    <SelectItem value="korea">South Korea</SelectItem>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="australia">Australia</SelectItem>
                    <SelectItem value="canada">Canada</SelectItem>
                    <SelectItem value="brazil">Brazil</SelectItem>
                    <SelectItem value="germany">Germany</SelectItem>
                    <SelectItem value="spain">Spain</SelectItem>
                    <SelectItem value="mexico">Mexico</SelectItem>
                    <SelectItem value="china">China</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">Select your country to get region-specific style recommendations</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Age Range</label>
                <Select onValueChange={setAgeRange} value={ageRange}>
                  <SelectTrigger className="w-full border-purple-200 focus:ring-purple-500 focus:border-purple-500 rounded-xl">
                    <SelectValue placeholder="Select your age range (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teen">Teen (13-19)</SelectItem>
                    <SelectItem value="young-adult">Young Adult (20-29)</SelectItem>
                    <SelectItem value="adult">Adult (30-45)</SelectItem>
                    <SelectItem value="mature">Mature Adult (46-60)</SelectItem>
                    <SelectItem value="senior">Senior (60+)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">Age-appropriate style suggestions will be tailored to your selection</p>
              </div>

              <div className="pt-4">
                <Button
                  onClick={getStyleSuggestions}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white h-14 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-lg font-medium"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Generating Your Perfect Outfit...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-5 w-5" />
                      Generate My Perfect Outfit
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-gray-500 text-center mt-3">
                  Our AI will create personalized outfit recommendations based on your selections
                </p>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
            </div>
            
            <div className="bg-gradient-to-br from-purple-100 to-indigo-50 rounded-2xl p-6 flex items-center justify-center">
              {!suggestions && !loading ? (
                <div className="text-center text-gray-600 flex flex-col items-center justify-center">
                  <div className="mb-6">
                    <Wand2 className="h-16 w-16 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Your Style Will Appear Here</h3>
                  <p className="max-w-xs">Select your preferences and click "Generate" to receive AI outfit suggestions</p>
                </div>
              ) : loading ? (
                <div className="text-center py-12">
                  <div className="relative mx-auto mb-6">
                    <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-purple-600 animate-pulse" />
                    </div>
                  </div>
                  <p className="text-purple-800 font-medium">Creating your perfect outfit...</p>
                  <p className="text-sm text-purple-600 mt-2">This may take a few seconds</p>
                </div>
              ) : (
                <div className="text-center p-4">
                  <p className="text-purple-700 font-medium text-lg">✨ Your outfits are ready!</p>
                  <p className="text-sm text-purple-600 mt-2">Scroll down to see your personalized suggestions</p>
                </div>
              )}
            </div>
          </div>

          {suggestions && (
            <div id="results-section" className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-3 text-center">
                  Your <em className="text-purple-600 font-bold not-italic">Personalized</em> Outfits
                </h2>
                <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
                  Here are the perfect outfit suggestions created just for you by our AI. Click on any outfit to see more details.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {suggestions.outfit_suggestions.map((outfit, index) => (
                    <div 
                      key={index} 
                      className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                      onClick={() => handleOpenOutfit(outfit)}
                    >
                      <div className="absolute top-3 right-3 z-10">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full shadow-sm">
                          Perfect Match
                        </span>
                      </div>
                      
                      <div className="relative h-80 overflow-hidden">
                        <img
                          src={outfit.image_url}
                          alt={outfit.description}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => {
                            console.error(`Error loading image: ${outfit.image_url}`);
                            (e.target as HTMLImageElement).src = `https://placehold.co/600x800/EEE/31343C?text=Outfit+${index+1}`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-700/20 to-transparent flex items-end">
                          <div className="p-5 w-full">
                            <p className="text-white font-medium line-clamp-2 text-lg">
                              {outfit.description.split('.')[0]}.
                            </p>
                            <div className="h-1 w-20 bg-purple-400 mt-3 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-5 bg-white">
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {outfit.description.split('.').slice(1).join('.').trim()}
                        </p>
                        <div className="flex items-center mt-4 justify-between">
                          <p className="text-xs text-purple-600 font-medium flex items-center">
                            <span className="mr-1">Click to view details</span>
                          </p>
                          <button className="p-2 bg-purple-50 rounded-full">
                            <Share2 className="h-4 w-4 text-purple-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Customer stats */}
              <div className="py-16 bg-white rounded-2xl shadow-sm">
                <h2 className="text-3xl font-bold text-center mb-12">
                  With StyleGenie, our customers achieve
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600">90%</p>
                    <p className="text-gray-600 mt-2">Time saved on outfit selection</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600">+45%</p>
                    <p className="text-gray-600 mt-2">Increase in style confidence</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600">+20%</p>
                    <p className="text-gray-600 mt-2">Reduced shopping returns</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600">1000+</p>
                    <p className="text-gray-600 mt-2">Outfit combinations</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Image Popup Dialog */}
          {selectedOutfit && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={handleCloseOutfit}>
              <div className="relative max-w-4xl w-full p-1 max-h-[90vh]" onClick={e => e.stopPropagation()}>
                <button
                  onClick={handleCloseOutfit}
                  className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    <div className="bg-purple-50 p-2">
                      {selectedOutfit.image_url && (
                        <img
                          src={selectedOutfit.image_url}
                          alt={selectedOutfit.description}
                          className="w-full h-full object-contain max-h-[70vh]"
                        />
                      )}
                    </div>
                    
                    <div className="p-8 flex flex-col">
                      <div className="mb-6">
                        <div className="w-12 h-1 bg-purple-500 mb-4 rounded-full"></div>
                        <h3 className="text-2xl font-bold mb-4">Outfit Details</h3>
                        <p className="text-gray-700 leading-relaxed">{selectedOutfit.description}</p>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Perfect For</h4>
                        <div className="flex flex-wrap gap-2">
                          {['Casual', 'Evening', 'Work', 'Special Occasion'].map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Style Tips</h4>
                        <ul className="text-sm text-gray-700 space-y-2">
                          <li className="flex items-start">
                            <span className="text-purple-500 mr-2">•</span> 
                            Accessorize with minimal jewelry for a balanced look
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-500 mr-2">•</span> 
                            Pair with neutral shoes to keep the focus on the outfit
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-500 mr-2">•</span> 
                            Consider a light jacket if attending an evening event
                          </li>
                        </ul>
                      </div>
                      
                      <div className="mt-auto">
                        <div className="flex gap-4">
                          <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                            Save Outfit
                          </Button>
                          <Button className="bg-white border border-purple-200 text-purple-700 hover:bg-purple-50">
                            <Share2 className="h-4 w-4 mr-2" /> Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIStyleAdvisor; 