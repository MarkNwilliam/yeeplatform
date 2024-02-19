import React, { useEffect, useState, useRef } from 'react';
import Lottie from 'lottie-react';
import animationData from '../animations/congs.json';
import notVerifiedAnimation from '../animations/problem.json';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuth, applyActionCode, checkActionCode } from 'firebase/auth';
import { auth } from '../firebase';
import { logEvent } from '../firebase.js'
import { Helmet } from 'react-helmet';
import { debounce } from 'lodash';
import { updatePassword } from 'firebase/auth';
import Swal from 'sweetalert2';

const Welcome = () => {
  const [isVerified, setIsVerified] = useState(() => JSON.parse(localStorage.getItem('isVerified')) || false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // State variable for error
  const [errorMessage, setErrorMessage] = useState(''); // State variable for error message
  const navigate = useNavigate();
  const hasCheckedActionCode = useRef(false); // add a ref here
  const { mode } = useParams(); // Get the mode parameter from the URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const debounceDelay = 1000; // 1 second

 
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
            setError(true); // Set error state to true
            setErrorMessage('An error occurred while verifying the code. Please try again.'); // Set error message
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
      setError(true);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  }, [navigate]); // remove isVerified from dependencies



 

  const handlePasswordChange = async (e) => {
    e.preventDefault();
  
    if (!password || !confirmPassword) {
      setError(true);
      setErrorMessage('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError(true);
      setErrorMessage('Passwords do not match');
      return;
    }
  
    const user = auth.currentUser;
  
    if (!user) {
      setError(true);
      setErrorMessage('User not found');
      return;
    }
  
    try {
      // Show loading SweetAlert with progress bar
      const swalLoading = Swal.fire({
        title: 'Updating Password',
        text: 'Please wait...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
  
      // Change the user's password
      await updatePassword(user, password);
  
      // Make API call to update password in the backend
      const response = await fetch('https://yeeplatformbackend.azurewebsites.net/updatepassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.uid, newPassword: password })
      });
  
      if (!response.ok) {
        throw new Error('Failed to update password in the backend');
      }
  
      // Password update successful, close loading SweetAlert and show success message
      await swalLoading.close();
      await Swal.fire({
        icon: 'success',
        title: 'Password Updated',
        text: 'Your password has been updated successfully.'
      });
  
      // Optionally, you can redirect the user to a different page
      // navigate('/success-page');
    } catch (error) {
      console.error('Error updating password:', error);
      setError(true);
      setErrorMessage('An error occurred while resetting the password. Please try again.');
  
      // Close loading SweetAlert and show error message
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating the password. Please try again.'
      });
    }
  };
  
  const debouncedHandleSignUp = debounce(handlePasswordChange, debounceDelay);

  // Render different UI based on the mode and error state
  const renderUI = () => {
    if (error) {
      // Error UI
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
            <Lottie 
              animationData={notVerifiedAnimation} // Display not verified animation for error
              className="w-full h-full" 
            />
          </div>
          <p className="text-2xl md:text-3xl text-gray-800 mb-4 font-semibold">
            {errorMessage}
          </p>
        </div>
        <button 
          onClick={() => navigate('/home')}
          className="mt-4 px-4 py-2 bg-yellow-400 text-white rounded w-full max-w-xs mx-auto text-lg md:text-xl"
        >
          Go to Home
        </button>
      </div>
    );
    } else if (mode === 'resetPassword') {
      // UI for resetting password
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-lg mx-auto mb-4">
           <h2>Reset Password</h2>
           <form onSubmit={debouncedHandleSignUp} className="space-y-4" autoComplete="off">
          
         
          <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          minLength="6"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          minLength="6"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-500 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-700"
        >
          Sign Up
        </button>
          </form>
        </div>
        </div>
      );
    } else {
      // Default UI for email verification
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
    }
  };

  return (
    <div>
      {renderUI()}
    </div>
  );
};

export default Welcome;
