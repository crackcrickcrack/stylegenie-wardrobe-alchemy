
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ContactUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Contact form submitted:", formData);
      
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon!",
        duration: 5000,
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stylish-black to-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-playfair text-center mb-12">
          <span className="text-gold">Contact</span> Us
        </h1>
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-stylish-black/80 rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-medium mb-6 text-gold">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-gray-300">Name</label>
                <Input 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-stylish-black border-gray-700 focus:border-gold"
                  required
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 text-gray-300">Email</label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-stylish-black border-gray-700 focus:border-gold"
                  required
                  placeholder="Your email address"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 text-gray-300">Subject</label>
                <Input 
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-stylish-black border-gray-700 focus:border-gold"
                  required
                  placeholder="Subject of your message"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 text-gray-300">Message</label>
                <Textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-stylish-black border-gray-700 focus:border-gold min-h-[150px]"
                  required
                  placeholder="Your message"
                />
              </div>
              
              <Button 
                type="submit" 
                className="bg-gold hover:bg-gold/90 text-white w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
          
          <div className="bg-stylish-black/80 rounded-lg shadow-xl p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-medium mb-6 text-gold">Contact Information</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg mb-2 font-medium">Email</h3>
                  <p className="text-gray-300">support@stylegenie.com</p>
                </div>
                
                <div>
                  <h3 className="text-lg mb-2 font-medium">Phone</h3>
                  <p className="text-gray-300">+1 (800) STYLE-123</p>
                </div>
                
                <div>
                  <h3 className="text-lg mb-2 font-medium">Address</h3>
                  <p className="text-gray-300">
                    123 Fashion Avenue<br />
                    Suite 456<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg mb-4 font-medium">Business Hours</h3>
              <p className="text-gray-300">
                Monday - Friday: 9am - 6pm EST<br />
                Saturday: 10am - 4pm EST<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
