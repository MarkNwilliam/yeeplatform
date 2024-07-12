import React, { useEffect, useState, useRef } from 'react';
import Lottie from 'lottie-react';
import animationData from '../animations/congs.json';
import notVerifiedAnimation from '../animations/problem.json';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuth, applyActionCode, checkActionCode, verifyPasswordResetCode,confirmPasswordReset } from 'firebase/auth';
import { auth } from '../firebase';
import { debounce } from 'lodash';
import { updatePassword } from 'firebase/auth';
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

  const debounceDelay = 1000;

  const urlParams = new URLSearchParams(window.location.search);
  const actionCode = urlParams.get('oobCode');
  const action_mode = urlParams.get('mode');
  const auth = getAuth();
  //console.log('oobCode:', actionCode);
  //console.log('mode:', action_mode);

  useEffect(() => {
    const user = auth.currentUser;

    //console.log('action_mode:', action_mode);
  //console.log('actionCode:', actionCode);

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
        //console.log('Already verified');
        setLoading(false);
        return;
      }

      if (actionCode && action_mode === 'verifyEmail') {
        hasCheckedActionCode.current = true;
        const auth = getAuth();
        checkActionCode(auth, actionCode)
          .then(() => {
            //console.log('Action code is valid, applying it now...');
            return applyActionCode(auth, actionCode);
          })
          .then(() => {
            //console.log('Email verification successful');
            setIsVerified(true);
            localStorage.setItem('isVerified', true);
      
            fetch('https://yeeplatformbackend.azurewebsites.net/updateVerification', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ firebaseId: user.uid, emailVerified: true })
            })
              .then(response => response.json())
              .then(data => {
                //console.log("Email verification status updated in MongoDB:", data);
              })
              .catch(err => {
                console.error("Error updating email verification status in MongoDB:", err);
              });
          })
          .catch(async (error) => {
            //console.log('Error occurred:', error);
            setError(true);
            setErrorMessage('An error occurred while verifying the code. Please try again.');
            setIsVerified(false);
            localStorage.setItem('isVerified', false);
      
            //console.log('Showing Swal error dialog');
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred while verifying the code. Please try again.'
            });
      
            //console.log('Navigating to home page after delay');
            setTimeout(() => {
              navigate('/home');
            }, 3000); // navigate to home page after 3 seconds
          })
          .finally(() => {
            setLoading(false);
          });
      
      } else if (actionCode && action_mode === 'resetPassword') {
        hasCheckedActionCode.current = true;
       
        //console.log('Action code is valid, applying it now for password ...');
        verifyPasswordResetCode(auth, actionCode)
          .then((email) => {
            //console.log('Action code is valid, user email:', email);
          })
          .catch(async (error) => {
            //console.log('Error occurred:', error);
            setError(true);
            setErrorMessage('An error occurred while resetting the password. Please try again.');
          
            //console.log('Showing Swal error dialog');
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred while updating the password. Please try again.'
            });
          
            //console.log('Navigating to home page after delay');
            setTimeout(() => {
              navigate('/home');
            }, 3000); // navigate to home page after 3 seconds
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        //console.log('No oobCode found, setting loading to false');
        setLoading(false);
      }
    } catch (error) {
      //console.log('An error occurred in useEffect:', error);
      setError(true);
      setErrorMessage('An unexpected error occurred. Please try again later.');
      setLoading(false);
    }
  }, [navigate]);

  const handleUserPasswordChange = async (e) => {
    e.preventDefault();
  
    //console.log('handlePasswordChange called');
  
    if (!password || !confirmPassword) {
      //console.log('Error: Missing password or confirmPassword');
      setError(true);
      setErrorMessage('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      //console.log('Error: Passwords do not match');
      setError(true);
      setErrorMessage('Passwords do not match');
      return;
    }
  
    try {
      //console.log('Showing Swal loading dialog');
      const swalLoading = Swal.fire({
        title: 'Updating Password',
        text: 'Please wait...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
  
      //console.log('Calling confirmPasswordReset');
      await confirmPasswordReset( auth, actionCode, password);
  
      //console.log('Closing Swal loading dialog');
      await swalLoading.close();
  
      //console.log('Showing Swal success dialog');
      await Swal.fire({
        icon: 'success',
        title: 'Password Updated',
        text: 'Your password has been updated successfully.'
      });
  
      //console.log('Navigating to home page after delay');
      setTimeout(() => {
        navigate('/home');
      }, 3000); // navigate to home page after 3 seconds
    } catch (error) {
      console.error('Error updating password:', error);
      setError(true);
      setErrorMessage('An error occurred while resetting the password. Please try again.');
  
      //console.log('Showing Swal error dialog');
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating the password. Please try again.'
      });
  
      //console.log('Navigating to home page after delay');
      setTimeout(() => {
        navigate('/home');
      }, 3000); // navigate to home page after 3 seconds
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
  //const debouncedHandleSignUp = debounce(handlePasswordChange, debounceDelay);
  const renderUI = () => {
    //console.log('renderUI called');
    //console.log('loading:', loading);
    //console.log('error:', error);
    //console.log('mode:', action_mode);

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
