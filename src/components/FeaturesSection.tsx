import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Clock, Maximize, ShoppingBag } from "lucide-react";

const modelFeatureImage1 = "https://images.unsplash.com/photo-1618375531912-867984bdfd87?q=80&w=600&auto=format&fit=crop";
const modelFeatureImage2 = "https://images.unsplash.com/photo-1611042553365-9b153c7e4ca5?q=80&w=600&auto=format&fit=crop";

const features = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Personalized Recommendations",
    description: "Our AI analyzes your body type and style preferences to create perfectly tailored outfit suggestions."
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Save Time Shopping",
    description: "Stop spending hours browsing through stores. Get instant outfit ideas that match your style and occasion."
  },
  {
    icon: <Maximize className="h-6 w-6" />,
    title: "Interactive Style Viewing",
    description: "Click on any outfit to see it in full detail with a beautiful popup that showcases every aspect of your new look."
  },
  {
    icon: <ShoppingBag className="h-6 w-6" />,
    title: "Shopping Assistance",
    description: "We'll recommend where to buy each piece of your outfit, with options in different price ranges."
  }
];

const FeaturesSection = () => {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[5%] w-80 h-80 rounded-full bg-purple-600/5 blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[10%] w-80 h-80 rounded-full bg-indigo-600/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto z-10 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            AI solutions to <em className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 not-italic">boost</em> your style
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Powered by advanced AI, we analyze thousands of style combinations to find your perfect look
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          <div>
            <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-lg mb-8">
              <img 
                src={modelFeatureImage1} 
                alt="StyleGenie in action" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6">
                  <div className="text-white text-sm font-medium">Before StyleGenie</div>
                </div>
              </div>
            </div>
            
            <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={modelFeatureImage2} 
                alt="StyleGenie result" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1603217192634-61068e4d4bf9?q=80&w=600&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6">
                  <div className="text-white text-sm font-medium">After StyleGenie</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-none bg-white shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-10 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Transform your style today</h3>
          <p className="mb-6 max-w-2xl mx-auto">Join thousands of users who have discovered their perfect style with StyleGenie</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
            <div>
              <p className="text-3xl font-bold">90%</p>
              <p className="text-sm opacity-80">Time saved</p>
            </div>
            <div>
              <p className="text-3xl font-bold">45%</p>
              <p className="text-sm opacity-80">Better style confidence</p>
            </div>
            <div>
              <p className="text-3xl font-bold">1000+</p>
              <p className="text-sm opacity-80">Outfit combinations</p>
            </div>
            <div>
              <p className="text-3xl font-bold">24/7</p>
              <p className="text-sm opacity-80">Style assistance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
