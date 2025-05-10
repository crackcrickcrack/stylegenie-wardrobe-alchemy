
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const StylingSection = () => {
  const [image, setImage] = useState<string | null>(null);
  const [occasion, setOccasion] = useState<string>("");
  const [bodyType, setBodyType] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!image) {
      toast({
        title: "Missing image",
        description: "Please upload a photo to continue",
        variant: "destructive",
      });
      return;
    }

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
    
    // Simulate AI processing
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult(`For a ${occasion} event and your ${bodyType} body type, we recommend:
      
      • A tailored ${occasion === "Wedding" ? "navy blue suit with a subtle pattern" : occasion === "Casual" ? "pair of slim fit jeans with a white t-shirt" : occasion === "Party" ? "black shirt with dark jeans" : "charcoal grey suit with a light blue shirt"}
      
      • Pair with ${occasion === "Wedding" ? "brown leather oxford shoes" : occasion === "Casual" ? "white sneakers" : occasion === "Party" ? "chelsea boots" : "black cap-toe oxfords"}
      
      • Accessorize with ${occasion === "Wedding" ? "a patterned pocket square and minimalist watch" : occasion === "Casual" ? "a leather strap watch and minimal jewelry" : occasion === "Party" ? "a statement watch and leather bracelet" : "a silk tie and silver cufflinks"}
      
      This outfit will highlight your best features while keeping you appropriate for the occasion. The color palette is chosen to complement your skin tone based on your photo.`);
      
      toast({
        title: "Styling Complete!",
        description: "Your personalized outfit has been generated.",
      });
    }, 2000);
  };

  return (
    <section id="styling-section" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Get Styled in <span className="text-gold">Seconds</span>
        </h2>
        
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Our AI analyzes your photo, body type, and occasion to create the perfect outfit recommendation tailored just for you.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="p-6 border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="photo">Upload Your Photo</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gold transition-colors cursor-pointer">
                  {image ? (
                    <div className="relative">
                      <img 
                        src={image} 
                        alt="Uploaded" 
                        className="mx-auto max-h-64 rounded" 
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2 bg-white"
                        onClick={() => setImage(null)}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col items-center justify-center py-4">
                        <svg 
                          className="w-12 h-12 text-gray-400 mb-3" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-600">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG or WEBP (MAX. 5MB)
                        </p>
                      </div>
                      <Input 
                        id="photo" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </>
                  )}
                  <Label 
                    htmlFor="photo" 
                    className="cursor-pointer block w-full h-full absolute top-0 left-0 opacity-0"
                  >
                    Upload Photo
                  </Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="occasion">Select an Occasion</Label>
                <Select value={occasion} onValueChange={setOccasion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an occasion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Wedding">Wedding</SelectItem>
                    <SelectItem value="Casual">Casual</SelectItem>
                    <SelectItem value="Party">Party</SelectItem>
                    <SelectItem value="Interview">Interview</SelectItem>
                    <SelectItem value="Date Night">Date Night</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bodyType">Select Your Body Type</Label>
                <Select value={bodyType} onValueChange={setBodyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your body type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Athletic">Athletic</SelectItem>
                    <SelectItem value="Petite">Petite</SelectItem>
                    <SelectItem value="Curvy">Curvy</SelectItem>
                    <SelectItem value="Tall">Tall</SelectItem>
                    <SelectItem value="Plus Size">Plus Size</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gold hover:bg-gold/90 text-white"
                disabled={loading}
              >
                {loading ? "Generating Outfit..." : "Generate Outfit"}
              </Button>
            </form>
          </Card>
          
          <Card className={`p-6 border border-gray-200 min-h-[400px] flex flex-col ${result ? "justify-start" : "justify-center"}`}>
            {result ? (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-medium mb-4 text-gold">Your Personalized Style</h3>
                <div className="prose">
                  <p className="whitespace-pre-line">{result}</p>
                </div>
                <Button 
                  variant="outline" 
                  className="mt-6 border-gold text-gold hover:bg-gold hover:text-white"
                >
                  Save This Style
                </Button>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <div className="mb-4">
                  <svg 
                    className="w-16 h-16 mx-auto text-gray-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="1" 
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Your Style Will Appear Here</h3>
                <p>Upload a photo and fill in your preferences to receive AI-generated outfit suggestions.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StylingSection;
