import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { ChevronDown, ChevronUp, Search, MessageCircle, BookOpen, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does StyleGenie work?",
    answer: "StyleGenie uses AI to analyze your body type, personal preferences, and the occasion to provide you with personalized style recommendations that will make you look and feel your best. Our advanced algorithm considers factors like your body shape, color preferences, and the specific event you're dressing for to create perfect outfit combinations.",
    category: "Getting Started"
  },
  {
    question: "Do I need to create an account?",
    answer: "While you can get basic recommendations without an account, creating a free account allows you to save your style preferences and outfit recommendations for future reference. You'll also get access to exclusive features like outfit history, style evolution tracking, and personalized shopping recommendations.",
    category: "Account & Features"
  },
  {
    question: "How accurate are the style recommendations?",
    answer: "Our AI has been trained on thousands of fashion combinations and style principles. The more information you provide about yourself and your preferences, the more accurate our recommendations will be. We continuously improve our algorithm based on user feedback and the latest fashion trends.",
    category: "AI & Technology"
  },
  {
    question: "Can I provide feedback on recommendations?",
    answer: "Yes! We encourage feedback to improve our service. After receiving recommendations, you can rate them to help our AI better understand your personal style. Your feedback helps us refine our suggestions and provide even better recommendations in the future.",
    category: "User Experience"
  },
  {
    question: "How do I contact customer support?",
    answer: "If you need further assistance, please visit our Contact Us page to reach our customer support team. We're available 24/7 to help with any questions or concerns you may have about our service.",
    category: "Support"
  }
];

const categories = ["All", "Getting Started", "Account & Features", "AI & Technology", "User Experience", "Support"];

const HelpCenter = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-pattern-grid"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How can we help you?
            </h1>
            <p className="text-white/80 text-lg mb-8">
              Find answers to common questions and learn how to make the most of StyleGenie
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-purple-600 text-white"
                    : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {filteredFaqs.slice(0, Math.ceil(filteredFaqs.length / 2)).map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-purple-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-purple-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-purple-600" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 py-4 bg-purple-50">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="space-y-6">
              {filteredFaqs.slice(Math.ceil(filteredFaqs.length / 2)).map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index + Math.ceil(filteredFaqs.length / 2) ? null : index + Math.ceil(filteredFaqs.length / 2))}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-purple-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {expandedFaq === index + Math.ceil(filteredFaqs.length / 2) ? (
                      <ChevronUp className="h-5 w-5 text-purple-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-purple-600" />
                    )}
                  </button>
                  {expandedFaq === index + Math.ceil(filteredFaqs.length / 2) && (
                    <div className="px-6 py-4 bg-purple-50">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
              <p className="text-white/80 mb-8">
                Our support team is here to help you with any questions or concerns
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button className="bg-white text-purple-600 hover:bg-white/90">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contact Support
                </Button>
                <Button className="bg-purple-700 text-white hover:bg-purple-800">
                  <BookOpen className="h-5 w-5 mr-2" />
                  View Documentation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HelpCenter;
