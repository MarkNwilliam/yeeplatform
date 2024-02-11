import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <img 
        src="https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp" 
        alt="loading" 
        className="w-1/4 animate-pulse md:w-1/6"
      />
    </div>
  );
};

export default LoadingScreen;
