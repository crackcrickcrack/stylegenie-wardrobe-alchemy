
const EmptyState = () => {
  return (
    <div className="text-center text-gray-500">
      <div className="mb-4">
        <svg 
          className="w-16 h-16 mx-auto text-gray-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1" 
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          ></path>
        </svg>
      </div>
      <h3 className="text-xl font-medium mb-2">Your Style Will Appear Here</h3>
      <p>Upload a photo and fill in your preferences to receive AI-generated outfit suggestions.</p>
    </div>
  );
};

export default EmptyState;
