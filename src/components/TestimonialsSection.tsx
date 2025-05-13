import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sophia Chen",
    role: "Marketing Executive",
    company: "Vogue",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&auto=format&fit=crop&q=80",
    content: "StyleGenie transformed my work wardrobe. The AI recommendations are spot-on for my body type and perfectly appropriate for my corporate environment. I get compliments every day!",
  },
  {
    name: "Marcus Johnson",
    role: "Software Developer",
    company: "TechCorp",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop&q=80",
    content: "As someone who hates shopping, StyleGenie is a lifesaver. In minutes, I got outfit recommendations that actually look good on me. No more fashion anxiety!",
  },
  {
    name: "Aisha Rodriguez",
    role: "Event Planner",
    company: "EventElegance",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&auto=format&fit=crop&q=80",
    content: "I've tried other styling apps but StyleGenie is next level. The AI actually understands what works for my curvy figure, and suggests outfits that make me feel confident.",
  },
  {
    name: "David Kim",
    role: "Photographer",
    company: "Aperture",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&auto=format&fit=crop&q=80",
    content: "StyleGenie helped me develop a signature style that stands out in my creative industry. The personalization is incredible - it's like having a stylist who really knows me.",
  },
  {
    name: "Emma Wilson",
    role: "University Student",
    company: "Stanford",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&auto=format&fit=crop&q=80",
    content: "On a student budget, I need versatile pieces that work well together. StyleGenie helped me build a capsule wardrobe that feels fashionable without breaking the bank.",
  },
  {
    name: "James Thompson",
    role: "Financial Analyst",
    company: "Morgan Finance",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&auto=format&fit=crop&q=80",
    content: "My wife convinced me to try StyleGenie, and I'm impressed. The AI suggested subtle upgrades to my usual style that make me look more polished and professional.",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 3 >= testimonials.length ? 0 : prev + 3));
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 3 < 0 ? Math.max(0, testimonials.length - 3) : prev - 3));
  };

  return (
    <section id="testimonials" className="py-24 px-4 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[30%] left-[10%] w-72 h-72 rounded-full bg-purple-600/5 blur-3xl"></div>
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-indigo-600/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto z-10 relative max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Don't take our <em className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 not-italic">word</em> for it
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            See what our users think about using StyleGenie for their personal styling needs
          </p>
        </div>
        
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="outline"
            onClick={prevTestimonial}
            className="border-purple-200 text-purple-700 hover:bg-purple-50 rounded-full h-10 w-10 p-0"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            onClick={nextTestimonial}
            className="border-purple-200 text-purple-700 hover:bg-purple-50 rounded-full h-10 w-10 p-0"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleTestimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-md transition-all duration-300 hover:shadow-lg bg-white overflow-hidden">
              <CardContent className="p-0">
                <div className="p-8">
                  <div className="text-purple-400 mb-4">
                    <Quote className="h-8 w-8" />
                  </div>
                  <p className="text-gray-700 mb-8 leading-relaxed">{testimonial.content}</p>
                  
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 border-2 border-purple-100">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback className="bg-purple-100 text-purple-700">{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </div>
                <div className="h-1 w-full bg-gradient-to-r from-purple-600 to-indigo-600"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center mt-10 gap-2">
          {[...Array(Math.ceil(testimonials.length / 3))].map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / 3) === i ? "bg-purple-600 w-6" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(i * 3)}
              aria-label={`Go to testimonial set ${i + 1}`}
            ></button>
          ))}
        </div>
        
        <div className="mt-20 pt-10 border-t border-gray-200">
          <h3 className="text-center text-xl font-medium mb-8 text-gray-600">Trusted by fashion enthusiasts worldwide</h3>
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            <div className="text-gray-600 font-serif text-xl font-bold">VOGUE</div>
            <div className="text-gray-600 font-sans text-xl font-bold tracking-tight">ELLE</div>
            <div className="text-gray-600 font-serif text-xl italic font-bold">Harper's</div>
            <div className="text-gray-600 font-sans text-xl font-bold">GQ</div>
            <div className="text-gray-600 font-serif text-xl font-bold">InStyle</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
