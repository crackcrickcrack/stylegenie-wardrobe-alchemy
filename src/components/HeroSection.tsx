import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const modelImages = [
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=300&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=300&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=300&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=300&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599592705169-f3e51bd0e608?q=80&w=300&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?q=80&w=300&h=400&auto=format&fit=crop",
];

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/ai-style-advisor");
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-72 h-72 rounded-full bg-purple-600/5 blur-3xl"></div>
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-indigo-600/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Create <em className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 not-italic">stunning</em> outfits with AI
            </h1>
            
            <p className="text-lg text-gray-600 mb-10">
              StyleGenie is perfect for fashion enthusiasts who value quality, speed, and personalization. Bring your style to life in seconds.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Button 
                onClick={handleGetStarted} 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-lg px-8 py-6 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all" 
              >
                <Sparkles className="h-5 w-5" />
                Try StyleGenie Now
              </Button>
              
              <Link to="/ai-style-advisor">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 text-lg px-8 py-6 rounded-xl flex items-center gap-2" 
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
              <span>Trusted by thousands of users</span>
              <div className="flex gap-3 opacity-70">
                <div className="text-gray-600 font-serif font-bold">VOGUE</div>
                <div className="text-gray-600 font-sans font-bold">ELLE</div>
                <div className="text-gray-600 font-sans font-bold">GQ</div>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="grid grid-cols-3 gap-2 rotate-3">
              {modelImages.map((src, index) => (
                <div key={index} className={`overflow-hidden rounded-xl shadow-lg ${index % 2 === 0 ? 'translate-y-6' : ''}`}>
                  <img 
                    src={src} 
                    alt={`Fashion model ${index+1}`} 
                    className="w-full h-72 object-cover hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300&h=400&auto=format&fit=crop";
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
        
        {/* How it works section */}
        <div className="mt-24 bg-white rounded-2xl shadow-lg p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              How <em className="text-purple-600 font-bold not-italic">StyleGenie</em> works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              No styling skills required - just a few clicks and you've got personalized outfit recommendations
            </p>
          </div>
          
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
      </div>
    </section>
  );
};

export default HeroSection;
