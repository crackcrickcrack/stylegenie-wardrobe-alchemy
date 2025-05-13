import { Button } from "@/components/ui/button";
import { Sparkles, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/ai-style-advisor");
  };

  return (
    <section className="py-24 px-4 bg-white text-gray-800 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-64 h-64 rounded-full bg-purple-600/5 blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[10%] w-72 h-72 rounded-full bg-indigo-600/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your <em className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 not-italic">mobile</em> fashion studio
            </h2>
            
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              With StyleGenie's app, you have our AI-powered stylist right in your pocket. Select your preferences and get stunning, personalized outfits in minutes, all on your phone.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-y-10 gap-x-8 mb-10">
              <div>
                <div className="flex items-center mb-3">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <span className="text-purple-700 font-semibold">1</span>
                  </div>
                  <h3 className="font-semibold text-xl">Input your style</h3>
                </div>
                <p className="text-gray-600 pl-14">Choose your body type and the occasion you're dressing for</p>
              </div>
              
              <div>
                <div className="flex items-center mb-3">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <span className="text-purple-700 font-semibold">2</span>
                  </div>
                  <h3 className="font-semibold text-xl">AI creates outfits</h3>
                </div>
                <p className="text-gray-600 pl-14">Our AI generates personalized outfit recommendations</p>
              </div>
              
              <div>
                <div className="flex items-center mb-3">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <span className="text-purple-700 font-semibold">3</span>
                  </div>
                  <h3 className="font-semibold text-xl">View the details</h3>
                </div>
                <p className="text-gray-600 pl-14">See every piece in your outfit with detailed recommendations</p>
              </div>
              
              <div>
                <div className="flex items-center mb-3">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <span className="text-purple-700 font-semibold">4</span>
                  </div>
                  <h3 className="font-semibold text-xl">Share & save</h3>
                </div>
                <p className="text-gray-600 pl-14">Save your favorite outfits and share them with friends</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={handleGetStarted}
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-lg px-8 py-6 rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <Sparkles className="h-5 w-5" />
                Try StyleGenie Now
              </Button>
              
              <Button variant="outline" size="lg" className="border-purple-200 text-purple-700 hover:bg-purple-50 flex items-center gap-2 px-8 py-6 rounded-xl">
                <Smartphone className="h-5 w-5" />
                Download App
              </Button>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="relative w-full max-w-xs mx-auto">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-gradient-to-br from-purple-300/20 to-indigo-300/20 rounded-full blur-3xl"></div>
              <div className="relative z-10 bg-white p-3 rounded-[3rem] shadow-2xl border-8 border-gray-100 overflow-hidden">
                <div className="rounded-[2.5rem] overflow-hidden h-[500px] bg-gradient-to-br from-purple-600 to-indigo-600">
                  <img 
                    src="https://images.unsplash.com/photo-1566958769312-82cef41d19ef?q=80&w=400&auto=format&fit=crop" 
                    alt="StyleGenie Mobile App" 
                    className="w-full h-full object-cover object-center opacity-90"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?q=80&w=400&auto=format&fit=crop";
                    }}
                  />
                </div>
              </div>
              
              <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-gradient-to-br from-purple-300/10 to-indigo-300/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
