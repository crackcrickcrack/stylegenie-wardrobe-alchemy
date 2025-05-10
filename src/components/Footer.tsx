
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

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
    <footer className="bg-stylish-black bg-opacity-95 text-white pt-16 pb-8 px-4 border-t border-gold/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div>
            <h3 className="text-2xl font-playfair font-bold mb-4">
              <span className="text-gold">Style</span>Genie
            </h3>
            <p className="text-gray-400 mb-6">
              Your AI personal stylist that helps you look your best for any occasion.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="rounded-full border-gold/50 hover:bg-gold/20">
                <svg className="h-5 w-5 text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-gold/50 hover:bg-gold/20">
                <svg className="h-5 w-5 text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.334-1.756-1.334-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.763-1.604-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.234-3.22-.123-.303-.535-1.524.118-3.176 0 0 1.005-.322 3.3 1.23.957-.266 1.983-.398 3-.404 1.017.006 2.043.138 3 .404 2.29-1.553 3.293-1.23 3.293-1.23.655 1.652.243 2.874.12 3.176.77.84 1.232 1.91 1.232 3.22 0 4.61-2.806 5.624-5.478 5.92.43.37.814 1.102.814 2.218 0 1.605-.015 2.898-.015 3.292 0 .32.217.695.825.577C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z"></path>
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-gold/50 hover:bg-gold/20">
                <svg className="h-5 w-5 text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold uppercase text-sm text-gold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-gold transition-colors">About Us</a></li>
              <li><a href="#how-it-works" className="text-gray-300 hover:text-gold transition-colors">How It Works</a></li>
              <li><a href="#testimonials" className="text-gray-300 hover:text-gold transition-colors">Testimonials</a></li>
              <li><a href="/press" className="text-gray-300 hover:text-gold transition-colors">Press</a></li>
              <li><a href="/careers" className="text-gray-300 hover:text-gold transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold uppercase text-sm text-gold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="/help" className="text-gray-300 hover:text-gold transition-colors">Help Center</a></li>
              <li><a href="/privacy" className="text-gray-300 hover:text-gold transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-300 hover:text-gold transition-colors">Terms of Service</a></li>
              <li><a href="/cookie-policy" className="text-gray-300 hover:text-gold transition-colors">Cookie Policy</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-gold transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold uppercase text-sm text-gold mb-4">Subscribe</h4>
            <p className="text-gray-300 mb-4">Get style tips and exclusive offers straight to your inbox.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input 
                placeholder="Your email" 
                className="bg-stylish-black border-gray-700 focus:border-gold"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
              <Button type="submit" className="bg-gold hover:bg-gold/90 text-white">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} StyleGenie. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="text-gray-500 text-sm hover:text-gold transition-colors">Privacy</a>
            <a href="/terms" className="text-gray-500 text-sm hover:text-gold transition-colors">Terms</a>
            <a href="/sitemap" className="text-gray-500 text-sm hover:text-gold transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
