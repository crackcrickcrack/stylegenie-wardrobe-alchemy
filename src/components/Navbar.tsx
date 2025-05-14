
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo(0, 0);
    // Close mobile menu when navigating
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Style</span>
          <span className="text-gray-800">Genie</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/#how-it-works" className="text-sm font-medium text-gray-700 transition-colors hover:text-purple-600">
            How It Works
          </Link>
          <Link to="/ai-style-advisor" className="text-sm font-medium text-gray-700 transition-colors hover:text-purple-600">
            AI Style Advisor
          </Link>
          <Link to="/testimonials" className="text-sm font-medium text-gray-700 transition-colors hover:text-purple-600">
            Testimonials
          </Link>
          <Link to="/pricing" className="text-sm font-medium text-gray-700 transition-colors hover:text-purple-600">
            Pricing
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" className="text-purple-700 hover:bg-purple-50">
            Sign In
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium flex items-center gap-1 shadow-sm">
            <Sparkles className="h-4 w-4" /> Try Now
          </Button>
        </div>

        <Button variant="ghost" onClick={toggleMobileMenu} className="md:hidden text-gray-700" size="icon">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link 
              to="/#how-it-works" 
              className="text-gray-700 py-2 hover:text-purple-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              to="/ai-style-advisor" 
              className="text-gray-700 py-2 hover:text-purple-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              AI Style Advisor
            </Link>
            <Link 
              to="/testimonials" 
              className="text-gray-700 py-2 hover:text-purple-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link 
              to="/pricing" 
              className="text-gray-700 py-2 hover:text-purple-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="flex flex-col pt-4 border-t border-gray-100">
              <Button variant="ghost" className="justify-center text-purple-700 hover:bg-purple-50 mb-2">
                Sign In
              </Button>
              <Button className="justify-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                <Sparkles className="h-4 w-4 mr-1" /> Try Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
