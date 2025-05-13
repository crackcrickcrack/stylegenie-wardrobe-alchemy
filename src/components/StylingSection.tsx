import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import StylingForm from "./styling/StylingForm";
import StylingResults from "./styling/StylingResults";
import { OutfitSuggestion } from "./styling/types";
import { Sparkles, ArrowRight } from "lucide-react";

const modelExampleImage = "https://images.unsplash.com/photo-1613520761471-b387306e2639?q=80&w=500&auto=format&fit=crop";

const StylingSection = () => {
  const [occasion, setOccasion] = useState<string>("");
  const [bodyType, setBodyType] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [outfitSuggestions, setOutfitSuggestions] = useState<OutfitSuggestion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!occasion) {
      toast({
        title: "Occasion required",
        description: "Please select an occasion for your outfit",
        variant: "destructive",
      });
      return;
    }

    if (!bodyType) {
      toast({
        title: "Body type required",
        description: "Please select your body type to get personalized recommendations",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    setError(null);
    setOutfitSuggestions([]);
    
    try {
      // Create the request body according to the API specification
      const requestBody = {
        occasion: occasion.toLowerCase(),
        body_type: bodyType.toLowerCase()
      };
      
      // Make the API call
      const response = await fetch("https://1hywq9b8na.execute-api.us-east-1.amazonaws.com/stage/StyleGenieAI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      
      // Update state with the API response data
      if (data.outfit_suggestions) {
        setOutfitSuggestions(data.outfit_suggestions);
      }
      
      toast({
        title: "Styling Complete!",
        description: "Your personalized outfit has been generated.",
      });
    } catch (err) {
      console.error("Error fetching style suggestions:", err);
      setError("We couldn't generate suggestions at this time. Please try again.");
      toast({
        title: "Error",
        description: "Failed to get style recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="styling-section" className="py-24 px-4 bg-white relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[5%] w-96 h-96 rounded-full bg-purple-600/5 blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[5%] w-96 h-96 rounded-full bg-indigo-600/5 blur-3xl"></div>
      </div>
    
      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get Styled in <em className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 not-italic">Seconds</em>
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our AI analyzes your body type and occasion to create the perfect outfit recommendation tailored just for you.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-6">
              <img 
                src={modelExampleImage} 
                alt="StyleGenie Example" 
                className="w-full aspect-[3/4] object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=500&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
                <div className="p-6 w-full">
                  <p className="text-white font-medium text-lg mb-2">AI-Generated Style</p>
                  <div className="flex justify-between items-center">
                    <div className="text-white/90 text-sm">Perfect for any occasion</div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <ArrowRight className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
              <div className="flex items-center mb-4">
                <Sparkles className="h-5 w-5 mr-2" />
                <h3 className="font-semibold">Why users love StyleGenie</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="text-purple-300 mr-2">•</span> 
                  Personalized to your unique body type
                </li>
                <li className="flex items-start">
                  <span className="text-purple-300 mr-2">•</span> 
                  Perfect outfits for any occasion
                </li>
                <li className="flex items-start">
                  <span className="text-purple-300 mr-2">•</span> 
                  Save time shopping and deciding what to wear
                </li>
                <li className="flex items-start">
                  <span className="text-purple-300 mr-2">•</span> 
                  Increase your style confidence
                </li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-3 order-1 lg:order-2">
            <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
              <div className="grid md:grid-cols-2">
                <div className="p-8 border-r border-gray-100">
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800">Your Style Preferences</h3>
                  <StylingForm
                    occasion={occasion}
                    bodyType={bodyType}
                    loading={loading}
                    onOccasionChange={setOccasion}
                    onBodyTypeChange={setBodyType}
                    onSubmit={handleSubmit}
                  />
                </div>
                
                <div className="p-8 min-h-[400px] flex flex-col bg-gray-50/50">
                  <StylingResults
                    loading={loading}
                    error={error}
                    outfitSuggestions={outfitSuggestions}
                    onClearError={() => setError(null)}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StylingSection;
