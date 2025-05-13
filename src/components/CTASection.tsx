import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const CTASection = () => {
  const handleGetStarted = () => {
    document.getElementById("styling-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-purple-50 text-gray-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-purple-600/5 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-indigo-600/5 blur-3xl"></div>
      
      <div className="container mx-auto text-center relative z-10 max-w-4xl">
        <div className="bg-white p-16 rounded-2xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Experience AI-Powered <em className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 not-italic">Fashion Styling</em>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Our AWS Bedrock-powered AI analyzes your preferences and body type to create truly personalized outfit recommendations. Join thousands of fashion-forward individuals already enhancing their style.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleGetStarted}
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-lg px-8 py-6 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <Sparkles className="h-5 w-5" />
              Try StyleGenie Now
            </Button>
            
            <Button 
              onClick={() => window.location.href="/ai-style-advisor"}
              size="lg"
              variant="outline"
              className="border-purple-200 text-purple-700 hover:bg-purple-50 text-lg px-8 py-6 rounded-xl"
            >
              Learn More
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">90%</p>
              <p className="text-gray-600 mt-2">Time saved</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">1000+</p>
              <p className="text-gray-600 mt-2">Outfit combinations</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">24/7</p>
              <p className="text-gray-600 mt-2">Style assistance</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">100%</p>
              <p className="text-gray-600 mt-2">Style confidence</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
