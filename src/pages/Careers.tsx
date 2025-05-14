
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

type JobPosition = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  isNew: boolean;
};

const jobPositions: JobPosition[] = [
  {
    id: "style-director",
    title: "Style Director",
    department: "Creative",
    location: "New York, NY",
    type: "Full-time",
    description: "Lead our team of AI stylists and fashion experts to create cutting-edge style recommendations that delight our users.",
    requirements: [
      "8+ years experience in fashion styling or related field",
      "Experience managing creative teams",
      "Understanding of AI and machine learning concepts",
      "Strong portfolio demonstrating styling expertise"
    ],
    isNew: true
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    department: "Technology",
    location: "Remote",
    type: "Full-time",
    description: "Develop and refine our AI models to improve personalized style recommendations based on user preferences and body types.",
    requirements: [
      "5+ years experience in machine learning or AI development",
      "Experience with computer vision and image recognition",
      "Proficiency in Python, PyTorch or TensorFlow",
      "Understanding of fashion concepts is a plus"
    ],
    isNew: true
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    department: "Design",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "Create intuitive and engaging user experiences for our styling platform that make fashion accessible to everyone.",
    requirements: [
      "4+ years of UX design experience",
      "Strong portfolio showing user-centered design process",
      "Experience with fashion e-commerce or styling applications",
      "Proficiency in Figma, Sketch, and prototyping tools"
    ],
    isNew: false
  },
  {
    id: "marketing-specialist",
    title: "Growth Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description: "Drive user acquisition and engagement through innovative digital marketing strategies and campaigns.",
    requirements: [
      "3+ years in growth marketing roles",
      "Experience with performance marketing and user acquisition",
      "Data-driven approach to campaign optimization",
      "Experience in fashion or lifestyle industry preferred"
    ],
    isNew: false
  },
  {
    id: "fashion-writer",
    title: "Fashion Content Writer",
    department: "Content",
    location: "Remote",
    type: "Part-time",
    description: "Create engaging content about fashion trends, style tips, and best practices for our blog and social media channels.",
    requirements: [
      "2+ years writing experience in fashion or lifestyle",
      "Understanding of SEO principles",
      "Portfolio of published fashion content",
      "Ability to adapt tone for various audience segments"
    ],
    isNew: false
  },
  {
    id: "customer-support",
    title: "Style Support Specialist",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time",
    description: "Provide exceptional support to users who need assistance with our styling platform or have questions about their recommendations.",
    requirements: [
      "2+ years in customer support roles",
      "Fashion knowledge and styling experience",
      "Excellent written and verbal communication",
      "Problem-solving mindset and empathy"
    ],
    isNew: true
  }
];

const Careers = () => {
  const [filter, setFilter] = useState<string | null>(null);
  
  const filteredJobs = filter 
    ? jobPositions.filter(job => job.department === filter) 
    : jobPositions;
  
  const departments = Array.from(new Set(jobPositions.map(job => job.department)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-stylish-black to-black text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-playfair mb-6">
            Join the <span className="text-gold">StyleGenie</span> Team
          </h1>
          
          <p className="text-xl text-gray-200 mb-8">
            Help us revolutionize personal styling with AI and make fashion more accessible to everyone.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Button 
              onClick={() => setFilter(null)} 
              variant={filter === null ? "secondary" : "outline"}
              className={filter === null 
                ? "bg-gold text-gray-900 hover:bg-gold/90" 
                : "border-gray-600 text-gray-200 hover:bg-gray-800/50"}
            >
              All Departments
            </Button>
            
            {departments.map(dept => (
              <Button 
                key={dept}
                onClick={() => setFilter(dept)} 
                variant={filter === dept ? "secondary" : "outline"}
                className={filter === dept 
                  ? "bg-gold text-gray-900 hover:bg-gold/90" 
                  : "border-gray-600 text-gray-200 hover:bg-gray-800/50"}
              >
                {dept}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredJobs.map(job => (
            <Card key={job.id} className="bg-stylish-black/90 border-gray-800 overflow-hidden hover:border-gold/50 transition-colors">
              <CardHeader className="border-b border-gray-800 bg-stylish-black/80">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-white mb-1">{job.title}</CardTitle>
                    <CardDescription className="text-gray-300">{job.department}</CardDescription>
                  </div>
                  {job.isNew && <Badge className="bg-gold text-gray-900 hover:bg-gold/90">New</Badge>}
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="mb-4 flex flex-wrap gap-2 text-sm">
                  <span className="px-2 py-1 rounded bg-gray-800 text-gray-200">{job.location}</span>
                  <span className="px-2 py-1 rounded bg-gray-800 text-gray-200">{job.type}</span>
                </div>
                
                <p className="text-gray-300 mb-4">{job.description}</p>
                
                <div className="mt-4">
                  <h4 className="text-white font-medium mb-2">Requirements:</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {job.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              
              <CardFooter className="border-t border-gray-800 bg-stylish-black/50">
                <Button className="w-full bg-crimson hover:bg-crimson/90 text-white">
                  Apply Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="max-w-3xl mx-auto mt-20 text-center">
          <h2 className="text-2xl font-playfair mb-6">Benefits &amp; Culture</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-stylish-black/60 p-6 rounded-lg border border-gray-800">
              <div className="w-12 h-12 bg-crimson/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Flexible Schedule</h3>
              <p className="text-gray-300">Work when you're most productive with our flexible hours policy.</p>
            </div>
            
            <div className="bg-stylish-black/60 p-6 rounded-lg border border-gray-800">
              <div className="w-12 h-12 bg-crimson/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Health Benefits</h3>
              <p className="text-gray-300">Comprehensive healthcare package for you and your family.</p>
            </div>
            
            <div className="bg-stylish-black/60 p-6 rounded-lg border border-gray-800">
              <div className="w-12 h-12 bg-crimson/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Learning Budget</h3>
              <p className="text-gray-300">Annual budget for courses, books, and conferences to help you grow.</p>
            </div>
            
            <div className="bg-stylish-black/60 p-6 rounded-lg border border-gray-800">
              <div className="w-12 h-12 bg-crimson/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Remote First</h3>
              <p className="text-gray-300">Work from anywhere in the world with our distributed team setup.</p>
            </div>
            
            <div className="bg-stylish-black/60 p-6 rounded-lg border border-gray-800">
              <div className="w-12 h-12 bg-crimson/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Competitive Salary</h3>
              <p className="text-gray-300">Above industry average compensation plus equity options.</p>
            </div>
            
            <div className="bg-stylish-black/60 p-6 rounded-lg border border-gray-800">
              <div className="w-12 h-12 bg-crimson/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Fun Culture</h3>
              <p className="text-gray-300">Regular team events, retreats, and a supportive, inclusive environment.</p>
            </div>
          </div>
          
          <div className="bg-stylish-black/80 p-8 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-playfair mb-4">Don't see a position that fits?</h2>
            <p className="text-gray-300 mb-6">We're always interested in connecting with talented individuals who are passionate about fashion and technology.</p>
            <Button className="bg-gold text-gray-900 hover:bg-gold/90">Submit Your Resume</Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Careers;
