
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stylish-black to-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-playfair text-center mb-12">
          <span className="text-gold">Privacy</span> Policy
        </h1>
        
        <div className="max-w-3xl mx-auto bg-stylish-black/80 rounded-lg shadow-xl p-8 mb-16">
          <p className="text-gray-300 mb-6">Last Updated: May 12, 2025</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-medium mb-4 text-gold">1. Introduction</h2>
              <p className="text-gray-300">
                StyleGenie is committed to protecting your privacy. This Privacy Policy explains how we collect, 
                use, and safeguard your information when you use our website and services. Please read this policy 
                carefully to understand our practices regarding your personal data.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-medium mb-4 text-gold">2. Information We Collect</h2>
              <p className="text-gray-300 mb-4">
                We collect information that you provide directly to us, such as:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Personal details (name, email address)</li>
                <li>Style preferences and body measurements</li>
                <li>Photos you upload for style analysis</li>
                <li>Account information and usage data</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-medium mb-4 text-gold">3. How We Use Your Information</h2>
              <p className="text-gray-300 mb-4">
                We use the collected information for various purposes, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Providing personalized style recommendations</li>
                <li>Improving our services and user experience</li>
                <li>Communicating with you about our services</li>
                <li>Analyzing usage patterns to enhance our platform</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-medium mb-4 text-gold">4. Data Security</h2>
              <p className="text-gray-300">
                We implement appropriate security measures to protect your personal information 
                against unauthorized access or disclosure. However, no method of transmission over 
                the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-medium mb-4 text-gold">5. Your Rights</h2>
              <p className="text-gray-300">
                You have the right to access, correct, or delete your personal data. You may also 
                request a copy of your data or withdraw your consent at any time by contacting us.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
