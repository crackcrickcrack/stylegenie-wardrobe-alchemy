import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Sparkles, Menu } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 px-4 md:px-8 py-4 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Style</span>
          <span className="text-gray-800">Genie</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm font-medium text-gray-700 transition-colors hover:text-purple-600 border-b-2 border-transparent hover:border-purple-600 pb-1">
            How It Works
          </a>
          <a href="#testimonials" className="text-sm font-medium text-gray-700 transition-colors hover:text-purple-600 border-b-2 border-transparent hover:border-purple-600 pb-1">
            Testimonials
          </a>
          <Link to="/ai-style-advisor" className="text-sm font-medium text-gray-700 transition-colors hover:text-purple-600 border-b-2 border-transparent hover:border-purple-600 pb-1">
            AI Style Advisor
          </Link>
          <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
            Sign In
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium flex items-center gap-1">
            <Sparkles className="h-4 w-4" /> Try Now
          </Button>
        </div>

        <Button variant="ghost" className="md:hidden text-gray-700" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
