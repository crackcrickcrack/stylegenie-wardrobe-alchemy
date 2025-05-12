
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stylish-black to-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-playfair text-center mb-12">
          <span className="text-gold">Help</span> Center
        </h1>
        
        <div className="max-w-3xl mx-auto bg-stylish-black/80 rounded-lg shadow-xl p-8 mb-16">
          <h2 className="text-2xl font-medium mb-6 text-gold">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl mb-2 font-medium">How does StyleGenie work?</h3>
              <p className="text-gray-300">
                StyleGenie uses AI to analyze your body type, personal preferences, and the occasion
                to provide you with personalized style recommendations that will make you look and feel your best.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-2 font-medium">Do I need to create an account?</h3>
              <p className="text-gray-300">
                While you can get basic recommendations without an account, creating a free account
                allows you to save your style preferences and outfit recommendations for future reference.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-2 font-medium">How accurate are the style recommendations?</h3>
              <p className="text-gray-300">
                Our AI has been trained on thousands of fashion combinations and style principles.
                The more information you provide about yourself and your preferences, the more accurate
                our recommendations will be.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-2 font-medium">Can I provide feedback on recommendations?</h3>
              <p className="text-gray-300">
                Yes! We encourage feedback to improve our service. After receiving recommendations,
                you can rate them to help our AI better understand your personal style.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-2 font-medium">How do I contact customer support?</h3>
              <p className="text-gray-300">
                If you need further assistance, please visit our <Link to="/contact" className="text-gold hover:underline">Contact Us</Link> page
                to reach our customer support team.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HelpCenter;
