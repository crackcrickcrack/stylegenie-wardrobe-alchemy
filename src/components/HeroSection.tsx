
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const handleGetStarted = () => {
    document.getElementById("styling-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-stylish-black to-black py-20 px-4">
      {/* Gold decorative elements */}
      <div className="absolute top-40 left-10 w-48 h-48 rounded-full bg-gold/10 blur-3xl"></div>
      <div className="absolute bottom-40 right-10 w-64 h-64 rounded-full bg-gold/10 blur-3xl"></div>
      
      <div className="container mx-auto text-center z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight animate-fade-in">
          Your Personal <span className="text-gold">AI Stylist</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Upload a photo, select an occasion, and let AI style you. Discover your perfect look in seconds.
        </p>
        
        <Button 
          onClick={handleGetStarted} 
          size="lg" 
          className="bg-gold hover:bg-gold/90 text-white text-lg px-8 py-6 hover-scale hover-glow animate-fade-in" 
          style={{ animationDelay: "0.4s" }}
        >
          Get Styled Now
        </Button>
        
        <div className="mt-16 flex flex-col items-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <p className="text-gray-400 mb-4">As featured in</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            <div className="text-white/80 font-playfair text-xl font-bold">VOGUE</div>
            <div className="text-white/80 font-sans text-xl font-bold tracking-tight">ELLE</div>
            <div className="text-white/80 font-serif text-xl italic font-bold">Harper's</div>
            <div className="text-white/80 font-sans text-xl font-bold">GQ</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
