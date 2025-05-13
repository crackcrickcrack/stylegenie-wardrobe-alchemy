import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import StylingForm from "./styling/StylingForm";
import StylingResults from "./styling/StylingResults";
import { OutfitSuggestion } from "./styling/types";

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
    <section id="styling-section" className="py-24 px-4 bg-gradient-to-b from-white to-gray-50 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gold/5 blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-gold/5 blur-3xl"></div>
      </div>
    
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get Styled in <span className="text-gold">Seconds</span>
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our AI analyzes your body type and occasion to create the perfect outfit recommendation tailored just for you.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 items-start max-w-6xl mx-auto">
          <Card className="p-8 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white/95 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Your Style Preferences</h3>
            <StylingForm
              occasion={occasion}
              bodyType={bodyType}
              loading={loading}
              onOccasionChange={setOccasion}
              onBodyTypeChange={setBodyType}
              onSubmit={handleSubmit}
            />
          </Card>
          
          <Card className="p-8 border border-gray-200 rounded-xl shadow-sm bg-white/95 backdrop-blur-sm min-h-[400px] flex flex-col">
            <StylingResults
              loading={loading}
              error={error}
              outfitSuggestions={outfitSuggestions}
              onClearError={() => setError(null)}
            />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StylingSection;
