import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <img 
        src="Y.webp" 
        alt="loading" 
        className="w-1/4 animate-pulse md:w-1/6"
      />
    </div>
  );
};

export default LoadingScreen;
