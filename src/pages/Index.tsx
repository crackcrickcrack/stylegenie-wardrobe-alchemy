import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 text-gray-800">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-purple-600/5 blur-3xl"></div>
        <div className="absolute top-[40%] right-[5%] w-80 h-80 rounded-full bg-indigo-600/5 blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[20%] w-72 h-72 rounded-full bg-purple-600/5 blur-3xl"></div>
      </div>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
