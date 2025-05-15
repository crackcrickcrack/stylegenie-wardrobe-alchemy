import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Coffee, Globe, Heart, Sparkles, Users, Briefcase, Building2, Trophy, Zap } from "lucide-react";

const ValueCard = ({ icon, title, description }) => {
  return (
    <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-purple-100">
      <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-purple-700 transition-colors">{title}</h3>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
};

const JobCard = ({ title, department, location, type, description }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-purple-100">
      <div className="p-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs font-medium bg-purple-100 text-purple-800 rounded-full px-3 py-1">
            {department}
          </span>
          <span className="text-xs font-medium bg-gray-100 text-gray-800 rounded-full px-3 py-1">
            {location}
          </span>
          <span className="text-xs font-medium bg-blue-100 text-blue-800 rounded-full px-3 py-1">
            {type}
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-purple-700 transition-colors">{title}</h3>
        <p className="text-gray-700 mb-6 line-clamp-3">{description}</p>
        <Link 
          to={`/careers/${title.toLowerCase().replace(/\s+/g, '-')}`} 
          className="inline-flex items-center text-purple-700 font-medium hover:text-purple-800 group-hover:translate-x-1 transition-transform"
        >
          View position <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

const TestimonialCard = ({ name, role, quote, image }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 border border-purple-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-center mb-6">
        <img 
          src={image} 
          alt={name}
          className="w-16 h-16 rounded-2xl object-cover mr-4 shadow-md"
        />
        <div>
          <h4 className="font-bold text-gray-800 text-lg">{name}</h4>
          <p className="text-sm text-purple-700">{role}</p>
        </div>
      </div>
      <p className="text-gray-700 italic text-lg leading-relaxed">"{quote}"</p>
    </div>
  );
};

const BenefitCard = ({ icon, title }) => {
  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-xl border border-purple-100">
      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <span className="text-gray-800 font-medium">{title}</span>
    </div>
  );
};

const Careers = () => {
  const values = [
    {
      icon: <Sparkles className="h-7 w-7 text-white" />,
      title: "Innovation First",
      description: "We push the boundaries of AI and fashion technology to create products that transform how people approach personal style."
    },
    {
      icon: <Users className="h-7 w-7 text-white" />,
      title: "Team Collaboration",
      description: "We believe in the power of diverse perspectives and collaborative problem-solving to create exceptional experiences."
    },
    {
      icon: <Heart className="h-7 w-7 text-white" />,
      title: "User-Centered",
      description: "Every decision we make starts and ends with our users. We're committed to creating products people truly love."
    },
    {
      icon: <Globe className="h-7 w-7 text-white" />,
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
    { icon: <Trophy className="h-5 w-5 text-purple-600" />, title: "Competitive salary and equity packages" },
    { icon: <Globe className="h-5 w-5 text-purple-600" />, title: "Flexible remote work policy" },
    { icon: <Coffee className="h-5 w-5 text-purple-600" />, title: "Unlimited PTO with 15-day minimum" },
    { icon: <Heart className="h-5 w-5 text-purple-600" />, title: "Comprehensive health, dental, and vision insurance" },
    { icon: <Building2 className="h-5 w-5 text-purple-600" />, title: "401(k) matching program" },
    { icon: <Zap className="h-5 w-5 text-purple-600" />, title: "Annual learning and development stipend" },
    { icon: <Briefcase className="h-5 w-5 text-purple-600" />, title: "Home office setup allowance" },
    { icon: <Heart className="h-5 w-5 text-purple-600" />, title: "Monthly wellness stipend" },
    { icon: <Users className="h-5 w-5 text-purple-600" />, title: "Team retreats twice a year" },
    { icon: <Heart className="h-5 w-5 text-purple-600" />, title: "Parental leave policy" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-700 to-indigo-800 py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-pattern-grid"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">Join Our Mission</h1>
          <p className="text-xl text-purple-50 max-w-3xl mx-auto mb-12 leading-relaxed">
            Help us revolutionize personal styling with AI technology that makes fashion more accessible, sustainable, and personalized.
          </p>
          <Button className="bg-white text-purple-700 hover:bg-purple-50 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            View Open Positions
          </Button>
        </div>
      </div>
      
      {/* Our Values */}
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-800">Values</span></h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            At StyleGenie, our values guide everything we do, from how we build products to how we interact with each other.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {values.map((value, index) => (
            <ValueCard key={index} {...value} />
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-b from-white to-purple-50 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Perks & Benefits</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              We believe in taking care of our team. Here's what you can expect when you join us.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Open Positions</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Join our team and help shape the future of AI-powered fashion styling.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {openings.map((opening, index) => (
            <JobCard key={index} {...opening} />
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gradient-to-b from-purple-50 to-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Life at StyleGenie</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Hear from our team about what makes working at StyleGenie special.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Careers; 