// Welcome.js
import React, { useEffect, useState, useRef } from 'react';
import Lottie from 'lottie-react';
import animationData from '../animations/congs.json';
import notVerifiedAnimation from '../animations/problem.json';
import { useNavigate } from 'react-router-dom';
import { getAuth, applyActionCode, checkActionCode } from 'firebase/auth';
import { auth } from '../firebase';

const Welcome = () => {
  const [isVerified, setIsVerified] = useState(() => JSON.parse(localStorage.getItem('isVerified')) || false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const hasCheckedActionCode = useRef(false); // add a ref here

  useEffect(() => {
    const user = auth.currentUser;

    if (user && user.emailVerified) {
      console.log('User is already verified');
      setIsVerified(true);
      localStorage.setItem('isVerified', true);
      navigate('/');
      setLoading(false);
      return;
    }

    if (hasCheckedActionCode.current) return; // check the ref here

    try {
      if (isVerified) {
        console.log('Already verified');
        setLoading(false);
        return;
      }

      console.log('useEffect is running');
      const urlParams = new URLSearchParams(window.location.search);
      const actionCode = urlParams.get('oobCode');
      console.log('oobCode:', actionCode);

      if (actionCode) {
        hasCheckedActionCode.current = true; // set the ref here
        const auth = getAuth();
        checkActionCode(auth, actionCode)
          .then(() => {
            console.log('Action code is valid, applying it now...');
            return applyActionCode(auth, actionCode);
          })
          .then(() => {
            console.log('Email verification successful');
            setIsVerified(true);
            localStorage.setItem('isVerified', true);

            // Make API call to update email verification in MongoDB
            fetch('https://yeeplatformbackend.azurewebsites.net/updateVerification', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ firebaseId: user.uid, emailVerified: true })
            })
            .then(response => response.json())
            .then(data => {
              console.log("Email verification status updated in MongoDB:", data);
            })
            .catch(err => {
              console.error("Error updating email verification status in MongoDB:", err);
            });
          })
          .catch((error) => {
            console.log('Error occurred:', error);
            setIsVerified(false);
            localStorage.setItem('isVerified', false);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        console.log('No oobCode found, setting loading to false');
        setLoading(false);
      }
    } catch (error) {
      console.log('An error occurred in useEffect:', error);
    }
  }, [navigate]); // remove isVerified from dependencies

  
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg mx-auto mb-4">
        <button 
          onClick={() => navigate('/home')}
          className="text-yellow-500 text-3xl mb-4"
        >
          ←
        </button>
        <div className="aspect-w-16 aspect-h-9">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Lottie 
              animationData={isVerified ? animationData : notVerifiedAnimation} 
              className="w-full h-full" 
            />
          )}
        </div>
      </div>
      <p className="text-2xl md:text-3xl text-gray-800 mb-4 font-semibold">
        {isVerified ? "🎉 Thank you for finishing signup! 🎉" : "⚠️ Email not yet verified! ⚠️"}
      </p>

      <button 
        onClick={() => navigate('/home')}
        className="mt-4 px-4 py-2 bg-yellow-400 text-white rounded w-full max-w-xs mx-auto text-lg md:text-xl"
      >
        Go to Home
      </button>
    </div>
  );
};

export default Welcome;

