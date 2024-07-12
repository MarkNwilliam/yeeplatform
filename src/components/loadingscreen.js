import React, { useEffect } from "react";

const LoadingScreen = () => {
  useEffect(() => {
    const img = new Image();
    img.src = "https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp";
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img 
        src="https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp" 
        alt="loading" 
        className="w-1/4 animate-pulse md:w-1/6 mb-4"
      />
    </div>
  );
};

export default LoadingScreen;