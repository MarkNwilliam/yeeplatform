import React from 'react';
import Lottie from 'lottie-react';
import noInternetAnimation from '../animations/nointernet.json';

function OfflineStatus() {
  return (
    <div className="offline-status flex flex-col items-center justify-center">
      <div className="w-full md:w-1/2 lg:w-1/3">
        <Lottie 
          animationData={noInternetAnimation}
        />
      </div>
      <p className="text-center text-lg md:text-xl">
        No Internet Connection
      </p>
    </div>
  );
}

export default OfflineStatus;
