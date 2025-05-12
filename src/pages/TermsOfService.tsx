
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stylish-black to-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-playfair text-center mb-12">
          <span className="text-gold">Terms</span> of Service
        </h1>
        
        <div className="max-w-3xl mx-auto bg-stylish-black/80 rounded-lg shadow-xl p-8 mb-16">
          <p className="text-gray-300 mb-6">Last Updated: May 12, 2025</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-medium mb-4 text-gold">1. Acceptance of Terms</h2>
              <p className="text-gray-300">
                By accessing or using StyleGenie, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-medium mb-4 text-gold">2. Description of Service</h2>
              <p className="text-gray-300">
                StyleGenie provides AI-powered personal styling recommendations based on user inputs 
                such as body type, occasion, and style preferences. We strive to provide accurate and 
                helpful fashion advice, but results may vary based on the information provided.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-medium mb-4 text-gold">3. User Accounts</h2>
              <p className="text-gray-300">
                When creating an account, you must provide accurate and complete information. You are 
                responsible for maintaining the confidentiality of your account credentials and for all 
                activities that occur under your account.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-medium mb-4 text-gold">4. User Content</h2>
              <p className="text-gray-300">
                By uploading images or providing information to StyleGenie, you grant us a non-exclusive, 
                worldwide license to use, store, and process this content for the purpose of providing and 
                improving our services. We will not share your personal images with third parties without 
                your consent.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-medium mb-4 text-gold">5. Limitations of Liability</h2>
              <p className="text-gray-300">
                StyleGenie provides style recommendations on an "as is" basis. We do not guarantee that our 
                service will meet your requirements or expectations. We are not liable for any purchases made 
                based on our recommendations.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-medium mb-4 text-gold">6. Modifications to Service</h2>
              <p className="text-gray-300">
                We reserve the right to modify or discontinue our service temporarily or permanently, with 
                or without notice. We shall not be liable to you or any third party for any modification, 
                suspension, or discontinuation of the service.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;
