import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

const blogPosts = {
  "ai-revolutionizing-fashion-industry": {
    title: "How AI is Revolutionizing the Fashion Industry",
    content: `
      <p>Artificial intelligence is transforming every aspect of the fashion industry, from design and manufacturing to retail and personal styling. This technological revolution is changing how we create, sell, and consume fashion.</p>
      
      <h2>Design Innovation</h2>
      <p>AI algorithms can analyze thousands of design elements, trends, and consumer preferences to generate new design ideas. Some fashion houses are already using AI to assist their creative teams, allowing designers to explore new possibilities they might not have considered otherwise.</p>
      
      <p>For example, AI can analyze past successful designs, current runway trends, and consumer purchasing patterns to suggest new collections that balance innovation with marketability. This doesn't replace the human creative process but enhances it with data-driven insights.</p>
      
      <h2>Personalized Shopping Experiences</h2>
      <p>Perhaps the most visible impact of AI in fashion is in the personalization of shopping experiences. Online retailers use recommendation engines to suggest items based on browsing history, purchase patterns, and even body measurements.</p>
      
      <p>StyleGenie represents the cutting edge of this trend, offering AI-powered style recommendations tailored to an individual's body type, coloring, style preferences, and lifestyle needs. By analyzing thousands of successful styling combinations, our AI can recommend outfits that work harmoniously for each unique customer.</p>
      
      <h2>Virtual Try-On Technology</h2>
      <p>One of the biggest barriers to online shopping has always been the inability to try clothes on. AI-powered virtual try-on technology is changing that by allowing customers to see how garments would look on their body without physically wearing them.</p>
      
      <p>Using computer vision and augmented reality, these systems can overlay clothing items on images or live video of customers, taking into account body measurements, fabric physics, and lighting conditions to create realistic visualizations.</p>
      
      <h2>Sustainable Production</h2>
      <p>AI is also helping the fashion industry address its environmental impact. By predicting demand more accurately, brands can reduce overproduction and waste. AI systems analyze sales data, social media trends, and even weather forecasts to help companies produce only what they're likely to sell.</p>
      
      <p>Additionally, AI can optimize supply chains and manufacturing processes to reduce resource consumption and carbon emissions. Some companies are using AI to develop more sustainable materials and production techniques as well.</p>
      
      <h2>The Future of Fashion AI</h2>
      <p>As AI technology continues to evolve, we can expect even more transformative applications in the fashion industry. From completely automated manufacturing to hyper-personalized garments designed specifically for an individual's measurements and preferences, the possibilities are exciting.</p>
      
      <p>At StyleGenie, we're committed to staying at the forefront of this technological revolution while maintaining the human touch that makes fashion so special. Our AI tools are designed to empower both designers and consumers, making fashion more accessible, sustainable, and personalized than ever before.</p>
    `,
    author: "Elena Martinez",
    date: "October 12, 2023",
    category: "Fashion Tech",
    imageUrl: "https://images.unsplash.com/photo-1573612664822-d7d347da7b80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tags: ["AI", "Fashion Technology", "Innovation", "Sustainable Fashion"]
  },
  "styling-tips-body-types": {
    title: "5 Ways to Style Yourself for Different Body Types",
    content: `
      <p>Understanding your body type is the first step toward creating a wardrobe that makes you look and feel your best. Different silhouettes and styling tricks can highlight your favorite features and create balanced, flattering outfits.</p>
      
      <h2>Identifying Your Body Type</h2>
      <p>Before diving into specific styling tips, it's important to understand your body type. While everyone is unique, most people fall into broad categories like rectangular, hourglass, pear, apple, or inverted triangle. These classifications are based on the proportions between your shoulders, waist, and hips.</p>
      
      <p>StyleGenie's AI analysis can help identify your body type based on photos and measurements, taking the guesswork out of this crucial first step.</p>
      
      <h2>1. Hourglass Body Type</h2>
      <p>If you have an hourglass figure with similar shoulder and hip measurements and a defined waist, embrace styles that highlight this natural balance.</p>
      
      <ul>
        <li>Opt for fitted clothing that follows your curves rather than hiding them</li>
        <li>Wrap dresses and tops emphasize your waist beautifully</li>
        <li>High-waisted bottoms pair well with tucked-in tops</li>
        <li>Belted garments accentuate your narrowest point</li>
        <li>Avoid boxy or overly loose styles that hide your natural shape</li>
      </ul>
      
      <h2>2. Rectangle Body Type</h2>
      <p>With a rectangular body type, your shoulders, waist, and hips have similar measurements. Your styling goal might be to create the illusion of curves.</p>
      
      <ul>
        <li>Layer pieces to add dimension to your silhouette</li>
        <li>Peplum tops and jackets create waist definition</li>
        <li>Dresses with ruching or gathering at the waist add shape</li>
        <li>Statement belts worn at the waist create curves</li>
        <li>Structured jackets with a nipped-in waist balance your proportions</li>
      </ul>
      
      <h2>3. Pear Body Type</h2>
      <p>If your hips are wider than your shoulders, you have a pear or triangle body shape. Styling for this type often focuses on balancing your upper and lower body.</p>
      
      <ul>
        <li>Draw attention upward with detailed or brighter tops</li>
        <li>Boat necks and off-shoulder tops visually widen shoulders</li>
        <li>A-line skirts and dresses flow gracefully over hips</li>
        <li>Dark-colored bottoms and brighter tops create visual balance</li>
        <li>Avoid tight-fitting bottoms that emphasize hip width</li>
      </ul>
      
      <h2>4. Apple Body Type</h2>
      <p>With an apple body type, you carry weight around your midsection with slimmer legs and arms. Your styling goal might be to elongate your torso and showcase your limbs.</p>
      
      <ul>
        <li>Empire waist dresses and tops draw attention above the midsection</li>
        <li>V-necks create a vertical line that elongates the torso</li>
        <li>Straight or flared leg pants balance your silhouette</li>
        <li>Open front cardigans and jackets create vertical lines</li>
        <li>Show off toned arms and legs with sleeveless styles and shorter hemlines</li>
      </ul>
      
      <h2>5. Inverted Triangle Body Type</h2>
      <p>If your shoulders are broader than your hips, you have an inverted triangle shape. Styling for this type often aims to add volume to the lower body while softening the shoulder line.</p>
      
      <ul>
        <li>Wide-leg pants and full skirts add volume to your lower half</li>
        <li>Avoid padded shoulders or halter necks that emphasize shoulder width</li>
        <li>Scoop and V-necks soften your upper body</li>
        <li>A-line dresses create balance between top and bottom</li>
        <li>Details at the hip like pockets or pleats add visual weight where needed</li>
      </ul>
      
      <h2>Personalized AI Styling</h2>
      <p>While these guidelines provide a starting point, StyleGenie's AI takes a more nuanced approach. Our technology analyzes not just your basic body type but also your height, proportions, coloring, and personal style preferences to create truly customized recommendations.</p>
      
      <p>The best part? As you provide feedback on outfits you love or dislike, our AI continues to refine its understanding of your preferences, creating an increasingly personalized styling experience.</p>
    `,
    author: "Michael Wong",
    date: "September 28, 2023",
    category: "Styling Tips",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Body Types", "Styling Tips", "Fashion Advice", "Wardrobe Essentials"]
  }
  // Other blog posts would be added here similarly
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
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been moved.</p>
            <Link to="/blog" className="text-purple-600 flex items-center justify-center gap-2 hover:text-purple-700">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <Navbar />
      
      <div className="w-full h-64 md:h-80 lg:h-96 bg-gradient-to-r from-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="container mx-auto px-4 h-full flex items-end pb-8">
          <div className="max-w-3xl text-white">
            <Link to="/blog" className="inline-flex items-center text-purple-100 hover:text-white mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-4 items-center text-sm text-gray-500 mb-8 pb-8 border-b">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag className="h-4 w-4" />
              <span>{post.category}</span>
            </div>
          </div>
          
          <div className="prose max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-purple-600 prose-a:no-underline hover:prose-a:text-purple-700 prose-img:rounded-lg" dangerouslySetInnerHTML={{ __html: post.content }}>
          </div>
          
          <div className="mt-12 pt-6 border-t flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span key={index} className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
