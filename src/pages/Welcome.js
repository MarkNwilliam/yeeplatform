import React, { useEffect, useState, useRef } from 'react';
import Lottie from 'lottie-react';
import animationData from '../animations/congs.json';
import notVerifiedAnimation from '../animations/problem.json';
import { useNavigate } from 'react-router-dom';
import { getAuth, applyActionCode, checkActionCode, verifyPasswordResetCode,confirmPasswordReset } from 'firebase/auth';

import Swal from 'sweetalert2';
import LinearProgress from '@mui/material/LinearProgress';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';


const Welcome = () => {
  const [isVerified, setIsVerified] = useState(() => JSON.parse(localStorage.getItem('isVerified')) || false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const hasCheckedActionCode = useRef(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const urlParams = new URLSearchParams(window.location.search);
  const actionCode = urlParams.get('oobCode');
  const action_mode = urlParams.get('mode');
  const auth = getAuth();
 

  useEffect(() => {
    const user = auth.currentUser;

    
    if (user && user.emailVerified && action_mode === 'verifyEmail') {
      //console.log('User is already verified');
      setIsVerified(true);
      localStorage.setItem('isVerified', true);
      navigate('/');
      setLoading(false);
      return;
    }

    if (hasCheckedActionCode.current) return;

    try {
      if (isVerified && action_mode === 'verifyEmail') {
      
        setLoading(false);
        return;
      }

      if (actionCode && action_mode === 'verifyEmail') {
        hasCheckedActionCode.current = true;
        const auth = getAuth();
        checkActionCode(auth, actionCode)
          .then(() => {
            
            return applyActionCode(auth, actionCode);
          })
          .then(() => {
            
            setIsVerified(true);
            localStorage.setItem('isVerified', true);
      
            fetch('https://yeeplatformbackend.azurewebsites.net/updateVerification', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ firebaseId: user.uid, emailVerified: true })
            })
              .then(response => response.json())
              .catch(err => {
                console.error("Error updating email verification status in MongoDB:", err);
              });
          })
          .catch(async (error) => {
            
            setError(true);
            setErrorMessage('An error occurred while verifying the code. Please try again.');
            setIsVerified(false);
            localStorage.setItem('isVerified', false);
      
            
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred while verifying the code. Please try again.'
            });
      
            
            setTimeout(() => {
              navigate('/home');
            }, 3000); 
          })
          .finally(() => {
            setLoading(false);
          });
      
      } else if (actionCode && action_mode === 'resetPassword') {
        hasCheckedActionCode.current = true;
       
       
        verifyPasswordResetCode(auth, actionCode)
          .then((email) => {
            
          })
          .catch(async (error) => {
           
            setError(true);
            setErrorMessage('An error occurred while resetting the password. Please try again.');
          
            
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred while updating the password. Please try again.'
            });
          
           
            setTimeout(() => {
              navigate('/home');
            }, 3000); 
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
       
        setLoading(false);
      }
    } catch (error) {
     
      setError(true);
      setErrorMessage('An unexpected error occurred. Please try again later.');
      setLoading(false);
    }
  }, [navigate]);

  const handleUserPasswordChange = async (e) => {
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
  
    try {
     
      const swalLoading = Swal.fire({
        title: 'Updating Password',
        text: 'Please wait...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
  
    
      await confirmPasswordReset( auth, actionCode, password);
  
     
      await swalLoading.close();
  
     
      await Swal.fire({
        icon: 'success',
        title: 'Password Updated',
        text: 'Your password has been updated successfully.'
      });
  
     
      setTimeout(() => {
        navigate('/home');
      }, 3000); 
    } catch (error) {
      console.error('Error updating password:', error);
      setError(true);
      setErrorMessage('An error occurred while resetting the password. Please try again.');
  
      
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating the password. Please try again.'
      });
  
     
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    }
  };


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
 
  const renderUI = () => {


    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
          <LinearProgress className="text-yellow-500 animate-pulse" color="secondary" />
        </div>
      );
    }

    if (action_mode === 'resetPassword') {
      //console.log('Rendering resetPassword UI');
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
          <div className="w-full max-w-lg mx-auto mb-4">
            <h2>Reset Password</h2>
            <form onSubmit={handleUserPasswordChange} className="space-y-4" autoComplete="off">

            <div className="flex w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Password"
                minLength="6"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
               <button onClick={togglePasswordVisibility} className="bg-gray-200 rounded-r-lg p-2 hover:bg-gray-300">
        {showPassword ? <EyeIcon className="h-5 w-5 text-gray-500" /> : <EyeSlashIcon className="h-5 w-5 text-gray-500" />}
      </button>
              </div>

<div className="flex w-full">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                minLength="6"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
                 <button onClick={toggleConfirmPasswordVisibility} className="bg-gray-200 rounded-r-lg p-2 hover:bg-gray-300">
        {showConfirmPassword ? <EyeIcon className="h-5 w-5 text-gray-500" /> : <EyeSlashIcon className="h-5 w-5 text-gray-500" />}
      </button>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-yellow-500 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-yellow-700"
              >
                Change password
              </button>
            </form>
          </div>
        </div>
      );
    }

    if (error) {
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
                animationData={notVerifiedAnimation}
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
    }

    if (action_mode === 'verifyEmail') {
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
                animationData={isVerified ? animationData : notVerifiedAnimation}
                className="w-full h-full" 
              />
            </div>
            <p className="text-2xl md:text-3xl text-gray-800 mb-4 font-semibold">
              {isVerified ? "🎉 Thank you for finishing signup! 🎉" : "⚠️ Email not yet verified! ⚠️"}
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
    }
 
else {
  return(
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
         <h1>UI is not showing</h1>
        </div>
  )
}
  
  };

  return (
    <div>
     
      {renderUI()}
    </div>
  );
};

export default Welcome;
