import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Coffee, Globe, Heart, Sparkles, Users } from "lucide-react";

const ValueCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const JobCard = ({ title, department, location, type, description }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs font-medium bg-purple-100 text-purple-700 rounded-full px-2.5 py-0.5">
            {department}
          </span>
          <span className="text-xs font-medium bg-gray-100 text-gray-700 rounded-full px-2.5 py-0.5">
            {location}
          </span>
          <span className="text-xs font-medium bg-blue-100 text-blue-700 rounded-full px-2.5 py-0.5">
            {type}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 hover:text-purple-600 transition-colors">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        <Link to={`/careers/${title.toLowerCase().replace(/\s+/g, '-')}`} className="text-purple-600 font-medium inline-flex items-center hover:text-purple-700">
          View position <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

const TestimonialCard = ({ name, role, quote, image }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center mb-4">
        <img 
          src={image} 
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-bold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
      <p className="text-gray-600 italic">"{quote}"</p>
    </div>
  );
};

const Careers = () => {
  const values = [
    {
      icon: <Sparkles className="h-6 w-6 text-purple-600" />,
      title: "Innovation First",
      description: "We push the boundaries of AI and fashion technology to create products that transform how people approach personal style."
    },
    {
      icon: <Users className="h-6 w-6 text-purple-600" />,
      title: "Team Collaboration",
      description: "We believe in the power of diverse perspectives and collaborative problem-solving to create exceptional experiences."
    },
    {
      icon: <Heart className="h-6 w-6 text-purple-600" />,
      title: "User-Centered",
      description: "Every decision we make starts and ends with our users. We're committed to creating products people truly love."
    },
    {
      icon: <Globe className="h-6 w-6 text-purple-600" />,
      title: "Global Impact",
      description: "We're building technology that makes personal styling accessible to everyone, regardless of location or background."
    }
  ];
  
  const openings = [
    {
      title: "Senior Frontend Engineer",
      department: "Engineering",
      location: "Remote (US)",
      type: "Full-time",
      description: "We're looking for a senior frontend engineer with expertise in React and TypeScript to help us build beautiful, intuitive user interfaces that make styling accessible to everyone."
    },
    {
      title: "Machine Learning Engineer",
      department: "AI",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Join our AI team to develop and optimize the machine learning models that power our style recommendations and virtual try-on features."
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time",
      description: "Help us create beautiful, intuitive experiences that make fashion styling accessible and enjoyable for users of all backgrounds and technical abilities."
    },
    {
      title: "Fashion Technology Specialist",
      department: "Product",
      location: "Remote (Global)",
      type: "Full-time",
      description: "Bring your expertise in fashion and technology to help shape our product roadmap and ensure our AI styling recommendations are on-trend and fashion-forward."
    },
    {
      title: "Growth Marketing Manager",
      department: "Marketing",
      location: "Remote (US)",
      type: "Full-time",
      description: "Drive user acquisition and retention through creative, data-driven marketing strategies that communicate the value of AI-powered styling to diverse audiences."
    },
    {
      title: "Customer Success Specialist",
      department: "Customer Experience",
      location: "Remote (Global)",
      type: "Part-time",
      description: "Support our users in getting the most out of StyleGenie, troubleshooting issues, and gathering feedback to improve our product."
    }
  ];
  
  const testimonials = [
    {
      name: "Alex Chen",
      role: "Senior AI Engineer",
      quote: "Working at StyleGenie means using cutting-edge AI technology to solve real problems in fashion. It's the perfect intersection of innovation and practical application.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Maya Johnson",
      role: "Product Designer",
      quote: "I love the collaborative environment here. As a designer, I get to work closely with engineers and fashion experts to create experiences that truly delight our users.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "David Park",
      role: "Frontend Developer",
      quote: "The engineering challenges we tackle are fascinating, and there's a real emphasis on professional growth. I've learned more here in one year than in my previous three jobs combined.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ];

  const benefits = [
    "Competitive salary and equity packages",
    "Flexible remote work policy",
    "Unlimited PTO with 15-day minimum",
    "Comprehensive health, dental, and vision insurance",
    "401(k) matching program",
    "Annual learning and development stipend",
    "Home office setup allowance",
    "Monthly wellness stipend",
    "Team retreats twice a year",
    "Parental leave policy"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-pattern-grid"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Join Our Mission</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-8">
            Help us revolutionize personal styling with AI technology that makes fashion more accessible, sustainable, and personalized.
          </p>
          <Button className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-6 py-3">
            View Open Positions
          </Button>
        </div>
      </div>
      
      {/* Our Values */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Values</span></h2>
          <p className="text-lg text-gray-600">
            At StyleGenie, our values guide everything we do, from how we build products to how we interact with each other.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <ValueCard key={index} {...value} />
          ))}
        </div>
      </div>
      
      {/* Team Culture Spotlight */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="md:flex items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
                <h2 className="text-3xl font-bold mb-6">Life at <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">StyleGenie</span></h2>
                <p className="text-gray-600 mb-6">
                  We're building a team of passionate individuals who believe in the power of technology to transform how people express themselves through fashion.
                </p>
                <p className="text-gray-600 mb-6">
                  Our culture celebrates innovation, diversity, and work-life balance. We believe that the best products come from teams where everyone feels empowered to contribute their unique perspectives.
                </p>
                <div className="flex items-center space-x-4">
                  <Coffee className="h-6 w-6 text-purple-600" />
                  <p className="text-gray-700 font-medium">Remote-first with collaborative hubs in SF, NY, and London</p>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Team collaboration"
                    className="rounded-lg object-cover h-40"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Team workshop"
                    className="rounded-lg object-cover h-40"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1560523160-754a9e25c68f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Team retreat"
                    className="rounded-lg object-cover h-40"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Remote work"
                    className="rounded-lg object-cover h-40"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Employee Testimonials */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">From Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Team</span></h2>
          <p className="text-lg text-gray-600">
            Hear from the people who make StyleGenie an amazing place to work.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
      
      {/* Benefits */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Benefits & Perks</h2>
            <p className="text-lg text-purple-100">
              We believe in taking care of our team with comprehensive benefits that support your health, wealth, and happiness.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-purple-300 rounded-full mr-3"></div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Open Positions */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Open <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Positions</span></h2>
          <p className="text-lg text-gray-600">
            Join our team and help shape the future of AI-powered fashion styling.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {openings.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Don't see a position that matches your skills?</p>
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
            Send General Application
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Careers; 