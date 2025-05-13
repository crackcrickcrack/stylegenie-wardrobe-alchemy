import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const BlogCard = ({ 
  title, 
  excerpt, 
  imageUrl, 
  category, 
  date, 
  slug
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-video overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center mb-3">
          <span className="text-xs font-medium bg-purple-100 text-purple-700 rounded-full px-2.5 py-0.5 mr-2">{category}</span>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-purple-600 transition-colors">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{excerpt}</p>
        <Link to={`/blog/${slug}`} className="text-purple-600 font-medium text-sm inline-flex items-center hover:text-purple-700">
          Read more <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </div>
    </div>
  );
};

const Blog = () => {
  const featuredPost = {
    title: "How AI is Revolutionizing the Fashion Industry",
    excerpt: "Discover how artificial intelligence is transforming fashion design, retail, and personalized styling. From virtual fitting rooms to sustainable production, AI is reshaping every aspect of the industry.",
    imageUrl: "https://images.unsplash.com/photo-1573612664822-d7d347da7b80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "Fashion Tech",
    date: "Oct 12, 2023",
    slug: "ai-revolutionizing-fashion-industry"
  };
  
  const blogPosts = [
    {
      title: "5 Ways to Style Yourself for Different Body Types",
      excerpt: "Learn the best styling tips for your unique body type. Our AI-powered recommendations can help you highlight your best features and create balanced, flattering outfits.",
      imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Styling Tips",
      date: "Sep 28, 2023",
      slug: "styling-tips-body-types"
    },
    {
      title: "Sustainable Fashion: Making Ethical Choices with AI",
      excerpt: "Discover how AI can help you make more sustainable fashion choices. From identifying eco-friendly materials to reducing waste through virtual try-ons.",
      imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Sustainability",
      date: "Sep 15, 2023",
      slug: "sustainable-fashion-ai"
    },
    {
      title: "Color Theory in Fashion: Finding Your Perfect Palette",
      excerpt: "Understanding color theory can transform your wardrobe. Learn how our AI analyzes your skin tone, hair color, and personal style to recommend the perfect color palette.",
      imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Color Theory",
      date: "Aug 22, 2023",
      slug: "color-theory-fashion"
    },
    {
      title: "The Future of Fashion Photography with AI Models",
      excerpt: "Explore how AI-generated models are changing fashion photography. From cost savings to increased diversity, virtual models offer numerous advantages for brands.",
      imageUrl: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Photography",
      date: "Aug 10, 2023",
      slug: "future-fashion-photography-ai"
    },
    {
      title: "Seasonal Wardrobe Transitions Made Easy",
      excerpt: "Learn how to effortlessly transition your wardrobe between seasons. Our AI stylist can help you identify versatile pieces and create layered looks for changing weather.",
      imageUrl: "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Seasonal Fashion",
      date: "Jul 28, 2023",
      slug: "seasonal-wardrobe-transitions"
    },
    {
      title: "Dress for Success: AI-Powered Professional Styling",
      excerpt: "First impressions matter in professional settings. Discover how AI can help you create the perfect work wardrobe tailored to your industry, company culture, and personal style.",
      imageUrl: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Professional Style",
      date: "Jul 15, 2023",
      slug: "dress-for-success-ai-styling"
    }
  ];
  
  const categories = [
    "All Categories", 
    "Fashion Tech", 
    "Styling Tips", 
    "Sustainability", 
    "Color Theory", 
    "Photography", 
    "Seasonal Fashion", 
    "Professional Style"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Style <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Blog</span></h1>
          <p className="text-lg text-gray-600">Fashion insights, styling tips, and AI innovation</p>
        </div>
        
        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-12 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        {/* Featured Post */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="h-64 md:h-full overflow-hidden">
                  <img 
                    src={featuredPost.imageUrl} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <div className="flex items-center mb-3">
                  <span className="text-xs font-medium bg-purple-100 text-purple-700 rounded-full px-2.5 py-0.5 mr-2">Featured</span>
                  <span className="text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full px-2.5 py-0.5 mr-2">{featuredPost.category}</span>
                  <span className="text-xs text-gray-500">{featuredPost.date}</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 hover:text-purple-600 transition-colors">{featuredPost.title}</h2>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <Link to={`/blog/${featuredPost.slug}`}>
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                    Read full article
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Blog Posts Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>
        
        {/* Newsletter Signup */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Stay in style</h2>
          <p className="text-purple-100 mb-6">Subscribe to our newsletter for the latest style tips and fashion trends</p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-2 max-w-md mx-auto">
            <input 
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 rounded-lg focus:outline-none"
            />
            <Button className="bg-white text-purple-600 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog; 