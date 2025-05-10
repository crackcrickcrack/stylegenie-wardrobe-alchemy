
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Sophia Chen",
    role: "Marketing Executive",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&auto=format&fit=crop&q=80",
    content: "StyleGenie transformed my work wardrobe. The AI recommendations are spot-on for my body type and perfectly appropriate for my corporate environment. I get compliments every day!",
  },
  {
    name: "Marcus Johnson",
    role: "Software Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop&q=80",
    content: "As someone who hates shopping, StyleGenie is a lifesaver. In minutes, I got outfit recommendations that actually look good on me. No more fashion anxiety!",
  },
  {
    name: "Aisha Rodriguez",
    role: "Event Planner",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&auto=format&fit=crop&q=80",
    content: "I've tried other styling apps but StyleGenie is next level. The AI actually understands what works for my curvy figure, and suggests outfits that make me feel confident.",
  },
  {
    name: "David Kim",
    role: "Photographer",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&auto=format&fit=crop&q=80",
    content: "StyleGenie helped me develop a signature style that stands out in my creative industry. The personalization is incredible - it's like having a stylist who really knows me.",
  },
  {
    name: "Emma Wilson",
    role: "University Student",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&auto=format&fit=crop&q=80",
    content: "On a student budget, I need versatile pieces that work well together. StyleGenie helped me build a capsule wardrobe that feels fashionable without breaking the bank.",
  },
  {
    name: "James Thompson",
    role: "Financial Analyst",
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
    <section id="testimonials" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Styled and <span className="text-gold">Satisfied</span>
        </h2>
        
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
          Join thousands of satisfied users who have transformed their style with StyleGenie
        </p>
        
        <div className="lg:flex lg:justify-between items-center mb-8 hidden">
          <Button
            variant="outline"
            onClick={prevTestimonial}
            className="border-gold text-gold hover:bg-gold hover:text-white"
            disabled={currentIndex === 0}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            onClick={nextTestimonial}
            className="border-gold text-gold hover:bg-gold hover:text-white"
          >
            Next
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleTestimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-md transition-all duration-300 hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 border-2 border-gold">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">&ldquo;{testimonial.content}&rdquo;</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center mt-8 gap-2">
          {[...Array(Math.ceil(testimonials.length / 3))].map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / 3) === i ? "bg-gold w-6" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(i * 3)}
              aria-label={`Go to testimonial set ${i + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
