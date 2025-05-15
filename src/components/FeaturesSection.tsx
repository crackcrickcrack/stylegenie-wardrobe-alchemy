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
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How StyleGenie <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Works</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform makes it easy to discover your perfect style
          </p>
        </div>

        {/* Before & After Images */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img 
                src={modelFeatureImage1} 
                alt="Before StyleGenie" 
                className="w-full h-[300px] object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop";
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent p-4">
                <p className="text-white font-medium">Before StyleGenie</p>
              </div>
            </div>
            
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img 
                src={modelFeatureImage2} 
                alt="After StyleGenie" 
                className="w-full h-[300px] object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1603217192634-61068e4d4bf9?q=80&w=600&auto=format&fit=crop";
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent p-4">
                <p className="text-white font-medium">After StyleGenie</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold">StyleGenie Features</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-10 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-3">Transform your style today</h3>
            <p className="max-w-2xl mx-auto">Join thousands of users who have discovered their perfect style with StyleGenie</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold mb-1">90%</p>
              <p className="text-sm">Time saved</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold mb-1">45%</p>
              <p className="text-sm">Better style confidence</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold mb-1">1000+</p>
              <p className="text-sm">Outfit combinations</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold mb-1">24/7</p>
              <p className="text-sm">Style assistance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
