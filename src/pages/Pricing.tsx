import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingTier = ({ 
  title, 
  price, 
  description, 
  features, 
  highlighted = false,
  ctaText = "Get Started"
}) => {
  return (
    <div className={`rounded-2xl p-8 ${highlighted ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white' : 'bg-white border border-gray-100 shadow-sm'}`}>
      <h3 className={`text-xl font-bold mb-2 ${highlighted ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
      <div className="mb-4">
        <span className={`text-3xl font-bold ${highlighted ? 'text-white' : 'text-gray-900'}`}>${price}</span>
        <span className={`text-sm ml-1 ${highlighted ? 'text-purple-100' : 'text-gray-500'}`}>/month</span>
      </div>
      <p className={`mb-6 text-sm ${highlighted ? 'text-purple-100' : 'text-gray-500'}`}>{description}</p>
      
      <Button className={`w-full mb-6 ${highlighted ? 'bg-white text-purple-600 hover:bg-gray-100' : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700'}`}>
        {ctaText}
      </Button>
      
      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <div className={`mr-2 mt-1 rounded-full p-1 ${highlighted ? 'bg-purple-400/20' : 'bg-purple-100'}`}>
              <Check className={`h-3 w-3 ${highlighted ? 'text-white' : 'text-purple-600'}`} />
            </div>
            <span className={`text-sm ${highlighted ? 'text-purple-50' : 'text-gray-600'}`}>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Pricing = () => {
  const pricingTiers = [
    {
      title: "Starter",
      price: "49",
      description: "Perfect for individuals and small businesses just getting started.",
      features: [
        "20 credits per month",
        "1 revision per photo",
        "Standard support",
        "Up to 1080p resolution",
        "30+ AI models",
        "Basic backgrounds"
      ]
    },
    {
      title: "Professional",
      price: "99",
      description: "Ideal for growing businesses with regular content needs.",
      features: [
        "100 credits per month",
        "2 revisions per photo",
        "Priority support",
        "Up to 2K resolution",
        "50+ AI models",
        "Premium backgrounds",
        "1-day turnaround time"
      ],
      highlighted: true,
      ctaText: "Try Now"
    },
    {
      title: "Enterprise",
      price: "199",
      description: "Advanced features for larger teams and high-volume needs.",
      features: [
        "300 credits per month",
        "Unlimited revisions",
        "24/7 dedicated support",
        "Up to 4K resolution",
        "All AI models",
        "Custom backgrounds",
        "Same-day turnaround time",
        "API access"
      ]
    }
  ];

  const faqItems = [
    {
      question: "What are credits?",
      answer: "Credits allow you to generate AI-styled outfit recommendations. One credit equals one styling session. For example, if you want 4 different outfit recommendations, you'll need 4 credits."
    },
    {
      question: "Do credits expire?",
      answer: "Monthly credits must be used within the month and don't roll over. Annual plans allow credit rollover and include significant discounts."
    },
    {
      question: "Can I upgrade my plan?",
      answer: "Yes, you can upgrade your plan anytime. When you upgrade, you'll receive additional credits immediately and pay a prorated amount for the remainder of your billing period."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, including Visa, Mastercard, and American Express. We also support PayPal for hassle-free payments."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">transparent</span> pricing</h1>
          <p className="text-lg text-gray-600">Choose the perfect plan for your styling needs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {pricingTiers.map((tier, index) => (
            <PricingTier key={index} {...tier} />
          ))}
        </div>
        
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked <span className="text-purple-600">Questions</span></h2>
          
          <div className="space-y-8">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-12 text-center text-white max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Need a custom solution?</h2>
          <p className="text-lg mb-8 text-purple-100">Contact our team for enterprise pricing and custom features tailored to your specific requirements.</p>
          <Button className="bg-white text-purple-600 hover:bg-gray-100">Contact Sales</Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Pricing; 