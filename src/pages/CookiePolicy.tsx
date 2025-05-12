
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stylish-black to-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-playfair text-center mb-12">
          <span className="text-gold">Cookie</span> Policy
        </h1>
        
        <div className="max-w-3xl mx-auto bg-stylish-black/80 rounded-lg shadow-xl p-8 mb-16">
          <p className="text-gray-300 mb-6">Last Updated: May 12, 2025</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-medium mb-4 text-gold">What Are Cookies</h2>
              <p className="text-gray-300">
                Cookies are small text files that are stored on your computer or mobile device when you visit 
                websites. They are widely used to make websites work more efficiently and provide information 
                to the website owners. Cookies help us enhance your browsing experience and enable certain 
                features of our service.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-medium mb-4 text-gold">How We Use Cookies</h2>
              <p className="text-gray-300 mb-4">
                StyleGenie uses cookies for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Authentication: To recognize you when you log in and maintain your session</li>
                <li>Preferences: To remember your settings and preferences</li>
                <li>Analytics: To understand how visitors interact with our website</li>
                <li>Personalization: To deliver content tailored to your interests</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-medium mb-4 text-gold">Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl mb-2 font-medium text-gold/80">Essential Cookies</h3>
                  <p className="text-gray-300">
                    These cookies are necessary for the website to function properly. They enable core 
                    functionality such as security, account management, and remembering your preferences.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl mb-2 font-medium text-gold/80">Analytics Cookies</h3>
                  <p className="text-gray-300">
                    These cookies help us understand how visitors interact with our website by collecting 
                    and reporting information anonymously. This helps us improve our website and your experience.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl mb-2 font-medium text-gold/80">Functionality Cookies</h3>
                  <p className="text-gray-300">
                    These cookies allow us to remember choices you make and provide enhanced, personalized 
                    features. They may be set by us or by third-party providers whose services we have added to our pages.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-medium mb-4 text-gold">Managing Cookies</h2>
              <p className="text-gray-300">
                Most web browsers allow you to control cookies through their settings preferences. 
                You can usually find these settings in the "Options," "Preferences," or "Settings" menu 
                of your browser. However, limiting the ability of websites to set cookies may impact your 
                user experience and certain features of our service might not function properly.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
