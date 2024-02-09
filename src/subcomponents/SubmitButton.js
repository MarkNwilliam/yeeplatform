import React from 'react';

function SubmitButton({ buttonText }) {
  return (
    <button 
      type="submit" 
      className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 transform hover:scale-105 focus:outline-none focus:shadow-outline"
    >
      {buttonText}
    </button>
  );
}

export default SubmitButton;
