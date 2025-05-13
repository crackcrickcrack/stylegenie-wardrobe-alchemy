import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

const HeroSection = () => {
  const handleGetStarted = () => {
    document.getElementById("styling-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4">
      {/* Decorative elements */}
      <div className="absolute top-40 left-10 w-48 h-48 rounded-full bg-purple-600/10 blur-3xl"></div>
      <div className="absolute bottom-40 right-10 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl"></div>
      
      <div className="container mx-auto text-center z-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in">
          Create <em className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 not-italic">stunning</em> outfits with AI
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          StyleGenie is perfect for fashion enthusiasts who value quality, speed, and personalization. Bring your style to life in seconds.
        </p>
        
        <div className="flex justify-center gap-4 mb-16">
          <Button 
            onClick={handleGetStarted} 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-lg px-8 py-6 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all animate-fade-in" 
            style={{ animationDelay: "0.4s" }}
          >
            <Sparkles className="h-5 w-5" />
            Try StyleGenie Now
          </Button>
          
          <Button 
            onClick={() => window.location.href="/ai-style-advisor"}
            size="lg" 
            variant="outline"
            className="border-purple-200 text-purple-700 hover:bg-purple-50 text-lg px-8 py-6 rounded-xl flex items-center gap-2 animate-fade-in" 
            style={{ animationDelay: "0.5s" }}
          >
            Learn More <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="relative py-16 px-8 bg-white rounded-2xl shadow-lg max-w-4xl mx-auto">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full font-medium">
            How It Works
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
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
        
        <div className="mt-16 flex flex-col items-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <p className="text-gray-500 mb-4">Trusted by thousands of users</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            <div className="text-gray-600 font-playfair text-xl font-bold">VOGUE</div>
            <div className="text-gray-600 font-sans text-xl font-bold tracking-tight">ELLE</div>
            <div className="text-gray-600 font-serif text-xl italic font-bold">Harper's</div>
            <div className="text-gray-600 font-sans text-xl font-bold">GQ</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
