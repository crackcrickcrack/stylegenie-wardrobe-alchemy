
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const handleGetStarted = () => {
    document.getElementById("styling-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 px-4 bg-stylish-black text-white relative overflow-hidden">
      {/* Gold decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-gold/5 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-gold/5 blur-3xl"></div>
      
      <div className="container mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Elevate Your <span className="text-gold">Style</span>?
        </h2>
        
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Join thousands of fashion-forward individuals who have transformed their wardrobe with StyleGenie.
        </p>
        
        <Button 
          onClick={handleGetStarted}
          size="lg" 
          className="bg-gold hover:bg-gold/90 text-white hover-scale hover-glow"
        >
          Get Styled Now
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
