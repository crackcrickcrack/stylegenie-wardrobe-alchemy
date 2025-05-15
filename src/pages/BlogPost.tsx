import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

const blogPosts = {
  "ai-revolutionizing-fashion-industry": {
    title: "How AI is Revolutionizing the Fashion Industry",
    content: `
      <div class="space-y-8">
        <p class="text-xl font-medium text-gray-900 leading-relaxed">Artificial intelligence is transforming every aspect of the fashion industry, from design and manufacturing to retail and personal styling. This technological revolution is changing how we create, sell, and consume fashion.</p>
        
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Design Innovation</h2>
          <p class="text-lg text-gray-800 leading-relaxed">AI algorithms can analyze thousands of design elements, trends, and consumer preferences to generate new design ideas. Some fashion houses are already using AI to assist their creative teams, allowing designers to explore new possibilities they might not have considered otherwise.</p>
          
          <p class="text-lg text-gray-800 leading-relaxed">For example, AI can analyze past successful designs, current runway trends, and consumer purchasing patterns to suggest new collections that balance innovation with marketability. This doesn't replace the human creative process but enhances it with data-driven insights.</p>
        </div>
        
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Personalized Shopping Experiences</h2>
          <p class="text-lg text-gray-800 leading-relaxed">Perhaps the most visible impact of AI in fashion is in the personalization of shopping experiences. Online retailers use recommendation engines to suggest items based on browsing history, purchase patterns, and even body measurements.</p>
          
          <p class="text-lg text-gray-800 leading-relaxed">StyleGenie represents the cutting edge of this trend, offering AI-powered style recommendations tailored to an individual's body type, coloring, style preferences, and lifestyle needs. By analyzing thousands of successful styling combinations, our AI can recommend outfits that work harmoniously for each unique customer.</p>
        </div>
        
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Virtual Try-On Technology</h2>
          <p class="text-lg text-gray-800 leading-relaxed">One of the biggest barriers to online shopping has always been the inability to try clothes on. AI-powered virtual try-on technology is changing that by allowing customers to see how garments would look on their body without physically wearing them.</p>
          
          <p class="text-lg text-gray-800 leading-relaxed">Using computer vision and augmented reality, these systems can overlay clothing items on images or live video of customers, taking into account body measurements, fabric physics, and lighting conditions to create realistic visualizations.</p>
        </div>
        
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Sustainable Production</h2>
          <p class="text-lg text-gray-800 leading-relaxed">AI is also helping the fashion industry address its environmental impact. By predicting demand more accurately, brands can reduce overproduction and waste. AI systems analyze sales data, social media trends, and even weather forecasts to help companies produce only what they're likely to sell.</p>
          
          <p class="text-lg text-gray-800 leading-relaxed">Additionally, AI can optimize supply chains and manufacturing processes to reduce resource consumption and carbon emissions. Some companies are using AI to develop more sustainable materials and production techniques as well.</p>
        </div>
        
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">The Future of Fashion AI</h2>
          <p class="text-lg text-gray-800 leading-relaxed">As AI technology continues to evolve, we can expect even more transformative applications in the fashion industry. From completely automated manufacturing to hyper-personalized garments designed specifically for an individual's measurements and preferences, the possibilities are exciting.</p>
          
          <p class="text-lg text-gray-800 leading-relaxed">At StyleGenie, we're committed to staying at the forefront of this technological revolution while maintaining the human touch that makes fashion so special. Our AI tools are designed to empower both designers and consumers, making fashion more accessible, sustainable, and personalized than ever before.</p>
        </div>
      </div>
    `,
    author: "Elena Martinez",
    date: "October 12, 2023",
    category: "Fashion Tech",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tags: ["AI", "Fashion Technology", "Innovation", "Sustainable Fashion"]
  },
  "styling-tips-body-types": {
    title: "5 Ways to Style Yourself for Different Body Types",
    content: `
      <div class="space-y-8">
        <p class="text-xl font-medium text-gray-900 leading-relaxed">Understanding your body type is the first step toward creating a wardrobe that makes you look and feel your best. Different silhouettes and styling tricks can highlight your favorite features and create balanced, flattering outfits.</p>
        
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Identifying Your Body Type</h2>
          <p class="text-lg text-gray-800 leading-relaxed">Before diving into specific styling tips, it's important to understand your body type. While everyone is unique, most people fall into broad categories like rectangular, hourglass, pear, apple, or inverted triangle. These classifications are based on the proportions between your shoulders, waist, and hips.</p>
          <p class="text-lg text-gray-800 leading-relaxed">StyleGenie's AI analysis can help identify your body type based on photos and measurements, taking the guesswork out of this crucial first step.</p>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">1. Hourglass Body Type</h2>
          <p class="text-lg text-gray-800 leading-relaxed">If you have an hourglass figure with similar shoulder and hip measurements and a defined waist, embrace styles that highlight this natural balance.</p>
          <ul class="list-disc pl-6 space-y-2 text-lg text-gray-800">
            <li>Opt for fitted clothing that follows your curves rather than hiding them</li>
            <li>Wrap dresses and tops emphasize your waist beautifully</li>
            <li>High-waisted bottoms pair well with tucked-in tops</li>
            <li>Belted garments accentuate your narrowest point</li>
            <li>Avoid boxy or overly loose styles that hide your natural shape</li>
          </ul>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">2. Rectangle Body Type</h2>
          <p class="text-lg text-gray-800 leading-relaxed">With a rectangular body type, your shoulders, waist, and hips have similar measurements. Your styling goal might be to create the illusion of curves.</p>
          <ul class="list-disc pl-6 space-y-2 text-lg text-gray-800">
            <li>Layer pieces to add dimension to your silhouette</li>
            <li>Peplum tops and jackets create waist definition</li>
            <li>Dresses with ruching or gathering at the waist add shape</li>
            <li>Statement belts worn at the waist create curves</li>
            <li>Structured jackets with a nipped-in waist balance your proportions</li>
          </ul>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">3. Pear Body Type</h2>
          <p class="text-lg text-gray-800 leading-relaxed">If your hips are wider than your shoulders, you have a pear or triangle body shape. Styling for this type often focuses on balancing your upper and lower body.</p>
          <ul class="list-disc pl-6 space-y-2 text-lg text-gray-800">
            <li>Draw attention upward with detailed or brighter tops</li>
            <li>Boat necks and off-shoulder tops visually widen shoulders</li>
            <li>A-line skirts and dresses flow gracefully over hips</li>
            <li>Dark-colored bottoms and brighter tops create visual balance</li>
            <li>Avoid tight-fitting bottoms that emphasize hip width</li>
          </ul>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">4. Apple Body Type</h2>
          <p class="text-lg text-gray-800 leading-relaxed">With an apple body type, you carry weight around your midsection with slimmer legs and arms. Your styling goal might be to elongate your torso and showcase your limbs.</p>
          <ul class="list-disc pl-6 space-y-2 text-lg text-gray-800">
            <li>Empire waist dresses and tops draw attention above the midsection</li>
            <li>V-necks create a vertical line that elongates the torso</li>
            <li>Straight or flared leg pants balance your silhouette</li>
            <li>Open front cardigans and jackets create vertical lines</li>
            <li>Show off toned arms and legs with sleeveless styles and shorter hemlines</li>
          </ul>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">5. Inverted Triangle Body Type</h2>
          <p class="text-lg text-gray-800 leading-relaxed">If your shoulders are broader than your hips, you have an inverted triangle shape. Styling for this type often aims to add volume to the lower body while softening the shoulder line.</p>
          <ul class="list-disc pl-6 space-y-2 text-lg text-gray-800">
            <li>Wide-leg pants and full skirts add volume to your lower half</li>
            <li>Avoid padded shoulders or halter necks that emphasize shoulder width</li>
            <li>Scoop and V-necks soften your upper body</li>
            <li>A-line dresses create balance between top and bottom</li>
            <li>Details at the hip like pockets or pleats add visual weight where needed</li>
          </ul>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Personalized AI Styling</h2>
          <p class="text-lg text-gray-800 leading-relaxed">While these guidelines provide a starting point, StyleGenie's AI takes a more nuanced approach. Our technology analyzes not just your basic body type but also your height, proportions, coloring, and personal style preferences to create truly customized recommendations.</p>
          <p class="text-lg text-gray-800 leading-relaxed">The best part? As you provide feedback on outfits you love or dislike, our AI continues to refine its understanding of your preferences, creating an increasingly personalized styling experience.</p>
        </div>
      </div>
    `,
    author: "Michael Wong",
    date: "September 28, 2023",
    category: "Styling Tips",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tags: ["Body Types", "Styling Tips", "Fashion Advice", "Wardrobe Essentials"]
  },
  "sustainable-fashion-ai": {
    title: "Sustainable Fashion: Making Ethical Choices with AI",
    content: `
      <div class="space-y-8">
        <p class="text-xl font-medium text-gray-900 leading-relaxed">The fashion industry is one of the largest polluters in the world, but AI technology is helping to change that. From reducing waste to promoting sustainable materials, artificial intelligence is becoming a powerful tool for ethical fashion.</p>
        
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">AI-Powered Waste Reduction</h2>
          <p class="text-lg text-gray-800 leading-relaxed">One of the biggest challenges in fashion is overproduction. AI algorithms can analyze sales data, social media trends, and even weather patterns to predict demand more accurately, helping brands produce only what they need.</p>
          <p class="text-lg text-gray-800 leading-relaxed">StyleGenie's AI takes this a step further by helping individual consumers make more sustainable choices. Our system can analyze your existing wardrobe and suggest ways to maximize the use of each piece, reducing the need for new purchases.</p>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Virtual Try-On Technology</h2>
          <p class="text-lg text-gray-800 leading-relaxed">Virtual try-on technology not only improves the shopping experience but also reduces returns, which are a major source of waste in the fashion industry. By allowing customers to see how clothes will look before buying, AI helps reduce the environmental impact of shipping and processing returns.</p>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Sustainable Material Identification</h2>
          <p class="text-lg text-gray-800 leading-relaxed">AI can help identify and promote sustainable materials by analyzing their environmental impact throughout their lifecycle. This includes considering factors like water usage, carbon emissions, and biodegradability.</p>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">The Future of Sustainable Fashion</h2>
          <p class="text-lg text-gray-800 leading-relaxed">As AI technology continues to evolve, we can expect even more innovative solutions for sustainable fashion. From circular economy models to personalized sustainable recommendations, the possibilities are endless.</p>
        </div>
      </div>
    `,
    author: "Sarah Chen",
    date: "September 15, 2023",
    category: "Sustainability",
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tags: ["Sustainability", "Ethical Fashion", "AI Technology", "Environmental Impact"]
  },
  "color-theory-fashion": {
    title: "Color Theory in Fashion: Finding Your Perfect Palette",
    content: `
      <div class="space-y-8">
        <p class="text-xl font-medium text-gray-900 leading-relaxed">Understanding color theory is essential for creating a cohesive and flattering wardrobe. Our AI technology takes this understanding to the next level, helping you discover your perfect color palette.</p>
        
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">The Science of Color</h2>
          <p class="text-lg text-gray-800 leading-relaxed">Color theory in fashion is based on the principles of how colors interact with each other and with your natural coloring. This includes your skin tone, hair color, and eye color.</p>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Seasonal Color Analysis</h2>
          <p class="text-lg text-gray-800 leading-relaxed">Traditional color analysis categorizes people into seasons (Spring, Summer, Autumn, Winter) based on their natural coloring. Our AI enhances this by considering thousands of color combinations and their effects on different skin tones.</p>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Personalized Color Recommendations</h2>
          <p class="text-lg text-gray-800 leading-relaxed">StyleGenie's AI analyzes your photos to determine your optimal color palette, taking into account:</p>
          <ul class="list-disc pl-6 space-y-2 text-lg text-gray-800">
            <li>Skin undertones</li>
            <li>Hair color and texture</li>
            <li>Eye color</li>
            <li>Personal style preferences</li>
          </ul>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Color Psychology in Fashion</h2>
          <p class="text-lg text-gray-800 leading-relaxed">Different colors can evoke different emotions and create different impressions. Our AI helps you understand how to use color psychology to your advantage in different situations.</p>
        </div>
      </div>
    `,
    author: "David Kim",
    date: "August 22, 2023",
    category: "Color Theory",
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tags: ["Color Theory", "Fashion Psychology", "Personal Style", "AI Analysis"]
  },
  "future-fashion-photography-ai": {
    title: "The Future of Fashion Photography with AI Models",
    content: `
      <div class="space-y-8">
        <p class="text-xl font-medium text-gray-900 leading-relaxed">AI-generated models are revolutionizing fashion photography, offering new possibilities for creativity and efficiency in the industry.</p>
        
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">The Rise of Virtual Models</h2>
          <p class="text-lg text-gray-800 leading-relaxed">Virtual models created by AI are becoming increasingly common in fashion campaigns. These digital avatars can be customized to represent diverse body types, ethnicities, and styles.</p>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Benefits of AI Models</h2>
          <ul class="list-disc pl-6 space-y-2 text-lg text-gray-800">
            <li>Cost-effective production</li>
            <li>24/7 availability</li>
            <li>Consistent performance</li>
            <li>Ability to showcase diverse representation</li>
            <li>Reduced environmental impact</li>
          </ul>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Ethical Considerations</h2>
          <p class="text-lg text-gray-800 leading-relaxed">While AI models offer many advantages, it's important to consider the ethical implications and ensure transparency in their use.</p>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">The Future of Fashion Photography</h2>
          <p class="text-lg text-gray-800 leading-relaxed">As AI technology continues to evolve, we can expect even more innovative applications in fashion photography, from virtual photoshoots to personalized model generation.</p>
        </div>
      </div>
    `,
    author: "Emma Thompson",
    date: "August 10, 2023",
    category: "Photography",
    imageUrl: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tags: ["AI Models", "Fashion Photography", "Digital Innovation", "Virtual Fashion"]
  },
  "seasonal-wardrobe-transitions": {
    title: "Seasonal Wardrobe Transitions Made Easy",
    content: `
      <div class="space-y-8">
        <p class="text-xl font-medium text-gray-900 leading-relaxed">Transitioning your wardrobe between seasons can be challenging, but with the right approach and AI assistance, you can create versatile outfits that work year-round.</p>
        
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Understanding Seasonal Transitions</h2>
          <p class="text-lg text-gray-800 leading-relaxed">Each season brings unique challenges and opportunities for your wardrobe. The key is to have pieces that can adapt to changing temperatures and conditions while maintaining your personal style.</p>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Spring to Summer Transition</h2>
          <ul class="list-disc pl-6 space-y-2 text-lg text-gray-800">
            <li>Layer lightweight pieces for unpredictable weather</li>
            <li>Incorporate breathable fabrics like cotton and linen</li>
            <li>Use accessories to adapt outfits to changing temperatures</li>
            <li>Build a capsule wardrobe of versatile pieces</li>
          </ul>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Summer to Fall Transition</h2>
          <ul class="list-disc pl-6 space-y-2 text-lg text-gray-800">
            <li>Add lightweight jackets and cardigans to summer outfits</li>
            <li>Incorporate darker colors gradually</li>
            <li>Layer summer pieces with autumn essentials</li>
            <li>Update accessories for cooler weather</li>
          </ul>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Fall to Winter Transition</h2>
          <ul class="list-disc pl-6 space-y-2 text-lg text-gray-800">
            <li>Layer effectively for warmth and style</li>
            <li>Incorporate winter accessories gradually</li>
            <li>Use thermal layers for added warmth</li>
            <li>Maintain style while staying warm</li>
          </ul>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Winter to Spring Transition</h2>
          <ul class="list-disc pl-6 space-y-2 text-lg text-gray-800">
            <li>Lighten up your color palette</li>
            <li>Incorporate lighter fabrics gradually</li>
            <li>Use layering to adapt to changing temperatures</li>
            <li>Update accessories for spring</li>
          </ul>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">AI-Powered Seasonal Styling</h2>
          <p class="text-lg text-gray-800 leading-relaxed">StyleGenie's AI can help you navigate seasonal transitions by:</p>
          <ul class="list-disc pl-6 space-y-2 text-lg text-gray-800">
            <li>Analyzing your existing wardrobe</li>
            <li>Suggesting transitional pieces</li>
            <li>Creating outfits for changing weather</li>
            <li>Recommending new pieces to fill gaps</li>
          </ul>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Building a Versatile Wardrobe</h2>
          <p class="text-lg text-gray-800 leading-relaxed">The key to successful seasonal transitions is having a versatile wardrobe with pieces that can work across multiple seasons. Our AI can help you identify these key pieces and suggest ways to style them for different weather conditions.</p>
        </div>
      </div>
    `,
    author: "Sophie Anderson",
    date: "July 25, 2023",
    category: "Seasonal Style",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tags: ["Seasonal Style", "Wardrobe Planning", "Fashion Tips", "AI Styling"]
  },
  "dress-for-success-ai-styling": {
    title: "Dress for Success: AI-Powered Professional Styling",
    content: `
      <div class="space-y-8">
        <p class="text-xl font-medium text-gray-900 leading-relaxed">In today's professional world, your appearance can significantly impact your career success. AI-powered styling tools are revolutionizing how we approach professional dressing, making it easier to look polished and confident in any workplace setting.</p>
        
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">The Importance of Professional Appearance</h2>
          <p class="text-lg text-gray-800 leading-relaxed">Your professional appearance can influence:</p>
          <ul class="list-disc pl-6 space-y-2 text-lg text-gray-800">
            <li>First impressions</li>
            <li>Career advancement opportunities</li>
            <li>Client and colleague relationships</li>
            <li>Self-confidence and performance</li>
          </ul>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Understanding Workplace Dress Codes</h2>
          <p class="text-lg text-gray-800 leading-relaxed">Different industries and companies have varying dress code expectations. Our AI can help you navigate these requirements while maintaining your personal style:</p>
          <ul class="list-disc pl-6 space-y-2 text-lg text-gray-800">
            <li>Business formal</li>
            <li>Business casual</li>
            <li>Smart casual</li>
            <li>Creative professional</li>
          </ul>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Building a Professional Wardrobe</h2>
          <p class="text-lg text-gray-800 leading-relaxed">StyleGenie's AI can help you build a professional wardrobe by:</p>
          <ul class="list-disc pl-6 space-y-2 text-lg text-gray-800">
            <li>Identifying key pieces for your industry</li>
            <li>Suggesting versatile items that work for multiple occasions</li>
            <li>Recommending pieces that complement your existing wardrobe</li>
            <li>Creating outfits for different professional scenarios</li>
          </ul>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Professional Styling Tips</h2>
          <p class="text-lg text-gray-800 leading-relaxed">Our AI-powered styling system considers:</p>
          <ul class="list-disc pl-6 space-y-2 text-lg text-gray-800">
            <li>Industry standards and expectations</li>
            <li>Your body type and coloring</li>
            <li>Personal style preferences</li>
            <li>Budget considerations</li>
            <li>Seasonal appropriateness</li>
          </ul>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Special Occasions and Events</h2>
          <p class="text-lg text-gray-800 leading-relaxed">Professional life includes various special occasions that require specific styling:</p>
          <ul class="list-disc pl-6 space-y-2 text-lg text-gray-800">
            <li>Job interviews</li>
            <li>Client meetings</li>
            <li>Conference presentations</li>
            <li>Networking events</li>
            <li>Company social gatherings</li>
          </ul>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">The Future of Professional Styling</h2>
          <p class="text-lg text-gray-800 leading-relaxed">As AI technology continues to evolve, we can expect even more personalized and sophisticated professional styling recommendations. From virtual try-ons to real-time outfit suggestions based on your schedule, the possibilities are endless.</p>
        </div>

        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Getting Started with AI Professional Styling</h2>
          <p class="text-lg text-gray-800 leading-relaxed">StyleGenie makes it easy to get started with AI-powered professional styling:</p>
          <ol class="list-decimal pl-6 space-y-2 text-lg text-gray-800">
            <li>Upload photos of your current professional wardrobe</li>
            <li>Specify your industry and workplace dress code</li>
            <li>Share your style preferences and concerns</li>
            <li>Receive personalized outfit recommendations</li>
            <li>Get ongoing style advice as your career evolves</li>
          </ol>
        </div>
      </div>
    `,
    author: "James Wilson",
    date: "July 10, 2023",
    category: "Professional Style",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tags: ["Professional Style", "Career Development", "Business Fashion", "AI Styling"]
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? blogPosts[slug] : null;
  
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Article Not Found</h1>
            <p className="text-gray-700 mb-8">The article you're looking for doesn't exist or has been moved.</p>
            <Link to="/blog" className="text-purple-700 flex items-center justify-center gap-2 hover:text-purple-800">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="w-full h-[500px] bg-gradient-to-r from-purple-800 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 h-full flex items-end pb-16">
          <div className="max-w-3xl text-white">
            <Link to="/blog" className="inline-flex items-center text-white hover:text-purple-100 mb-6 font-medium">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
            <div className="flex flex-wrap gap-6 items-center text-base text-white">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span className="font-medium">{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                <span className="font-medium">{post.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none 
            prose-headings:text-gray-900 prose-headings:font-bold prose-headings:leading-tight
            prose-p:text-gray-800 prose-p:leading-relaxed prose-p:text-lg
            prose-a:text-purple-800 prose-a:no-underline prose-a:font-medium hover:prose-a:text-purple-900
            prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-ul:text-gray-800 prose-ul:leading-relaxed prose-ul:text-lg
            prose-li:my-2
            prose-blockquote:text-gray-700 prose-blockquote:border-l-4 prose-blockquote:border-purple-800 prose-blockquote:pl-4 prose-blockquote:italic
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
            prose-div:space-y-8" 
            dangerouslySetInnerHTML={{ __html: post.content }}>
          </div>
          
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag, index) => (
                <span key={index} className="bg-purple-100 text-purple-900 text-base px-5 py-2 rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
