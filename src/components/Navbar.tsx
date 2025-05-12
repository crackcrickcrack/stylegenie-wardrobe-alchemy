import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

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
        scrolled ? "bg-background/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-playfair font-bold">
          <span className="mr-1 text-gold">Style</span>Genie
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm font-medium transition-colors hover:text-gold border-b-2 border-transparent hover:border-gold pb-1">
            How It Works
          </a>
          <a href="#testimonials" className="text-sm font-medium transition-colors hover:text-gold border-b-2 border-transparent hover:border-gold pb-1">
            Testimonials
          </a>
          <Link to="/ai-style-advisor" className="text-sm font-medium transition-colors hover:text-gold border-b-2 border-transparent hover:border-gold pb-1">
            AI Style Advisor
          </Link>
          <Button variant="outline" className="border-gold text-gold hover:bg-gold/10 hover:text-white">
            Sign In
          </Button>
          <Button className="bg-gold hover:bg-gold/90 text-white font-medium">Get Styled</Button>
        </div>

        <Button variant="ghost" className="md:hidden" size="icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
