import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin, Send } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Subscription functionality would go here
    if (email) {
      console.log(`Subscribing email: ${email}`);
      setEmail("");
      // Here you would typically send this to a backend
    }
  };

  return (
    <footer className="bg-white pt-16 pb-8 px-4 border-t border-gray-100">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Style</span>
              <span className="text-gray-800">Genie</span>
            </h3>
            <p className="text-gray-600 mb-6">
              Your AI personal stylist that helps you look your best for any occasion.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="rounded-full border-purple-200 text-purple-600 hover:bg-purple-50 w-9 h-9">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-purple-200 text-purple-600 hover:bg-purple-50 w-9 h-9">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-purple-200 text-purple-600 hover:bg-purple-50 w-9 h-9">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-6">Product</h4>
            <ul className="space-y-3">
              <li><Link to="/ai-style-advisor" className="text-gray-600 hover:text-purple-600 transition-colors">AI Style Advisor</Link></li>
              <li><Link to="/how-it-works" className="text-gray-600 hover:text-purple-600 transition-colors">How It Works</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-purple-600 transition-colors">Pricing</Link></li>
              <li><Link to="/testimonials" className="text-gray-600 hover:text-purple-600 transition-colors">Testimonials</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-6">Resources</h4>
            <ul className="space-y-3">
              <li><Link to="/help" className="text-gray-600 hover:text-purple-600 transition-colors">Help Center</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-purple-600 transition-colors">Style Blog</Link></li>
              <li><Link to="/api" className="text-gray-600 hover:text-purple-600 transition-colors">API Documentation</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-purple-600 transition-colors">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-6">Subscribe</h4>
            <p className="text-gray-600 mb-4">Get style tips and exclusive offers straight to your inbox.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input 
                placeholder="Your email" 
                className="bg-white border-gray-200 focus:border-purple-500 rounded-l-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
              <Button type="submit" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-r-lg px-3">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} StyleGenie. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-gray-500 text-sm hover:text-purple-600 transition-colors">Privacy</Link>
            <Link to="/terms" className="text-gray-500 text-sm hover:text-purple-600 transition-colors">Terms</Link>
            <Link to="/cookies" className="text-gray-500 text-sm hover:text-purple-600 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
