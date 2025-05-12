
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-stylish-black to-black text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-gold">404</h1>
        <p className="text-xl text-gray-300 mb-6">Oops! Page not found</p>
        <Link to="/" className="bg-gold hover:bg-gold/80 text-black font-medium py-2 px-4 rounded transition-colors">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
