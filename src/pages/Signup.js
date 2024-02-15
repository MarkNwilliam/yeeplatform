import React, { useState, useEffect } from "react";
import { auth } from '../firebase';
import Swal from 'sweetalert2';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { countries } from '../constants/countries';
import { debounce } from 'lodash';
import { logEvent } from '../firebase.js'
import { Helmet } from 'react-helmet';
import { logFirebaseEvent } from '../firebase.js';

function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const [country, setCountry] = useState("");

  const debounceDelay = 1000; // 1 second

  const debouncedHandleSignUp = debounce(handleSignUp, debounceDelay);
  
  useEffect(() => {
    logFirebaseEvent('page_view', { page_path: '/Signup' });
  }, []);

  const sendUserDataToBackend = async (userData) => {
    try {
        const response = await fetch('https://yeeplatformbackend.azurewebsites.net/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        }
              // Handle successful signup if needed
        // e.g., navigate to home or show a success message
    } catch (error) {
      console.error('Error sending user data to backend:', error);
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
      });
  }
};

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all fields',
      });
      return;
    }

    if (!isConsentGiven) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'You must agree to receive emails to register.',
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Passwords do not match',
      });
      return;
    }

    try {
      Swal.fire({
        title: 'Signing up...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      await sendEmailVerification(user)
        .then(() => {
          // Email verification sent!
          // ...
        });

      Swal.fire({
        icon: 'info',
        title: 'Verify Your Email',
        text: 'A verification email has been sent. Please check your inbox and verify your email address.',
      });

      const userData = {
        username: name, // Assuming name is the desired username
        email: email,
        password: password,
        dateJoined: Date.now(),
        preferredReadingMode: 'LTR', // or ask the user during signup
        firebaseId: user.uid,
        authProvider: 'emailandpassword',
        emailVerified: user.emailVerified,
        settings: {
          receiveEmailUpdates: true, // or based on user choice during signup
          receiveNotifications: true, // or based on user choice during signup
          darkMode: false // or based on user choice during signup
        },
        isAuthor: false // or ask the user during signup if they are an author
      };
      

          // Save to localStorage (if needed)
    localStorage.setItem('tempUserData', JSON.stringify(userData));

    // Send the userData to the backend
    await sendUserDataToBackend(userData);

      navigate('/verify-email');

    } catch (error) {
      console.error('Error signing up:', error);
      let errorMessage = error.message;
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email address is already in use.';
      }
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
    }
  };

  const signUpWithGoogle = async () => {
    if (!navigator.onLine) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No internet connection',
      });
      return;
    }

    try {
      Swal.fire({
        title: 'Signing up with Google...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

    

      
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        username: user.displayName, // or ask the user to set a unique username
        email: user.email,
        profileImage: user.photoURL,
        dateJoined: Date.now(),
        googleId: user.uid,
        firebaseId: user.uid,
        authProvider: 'google',
        preferredReadingMode: 'LTR', // or ask the user during signup
        emailVerified: user.emailVerified,
        settings: {
          receiveEmailUpdates: true, // or based on user choice during signup
          receiveNotifications: true, // or based on user choice during signup
          darkMode: false // or based on user choice during signup
        },
        isAuthor: false // or ask the user during signup if they are an author
      };
      
      console.log("Sending this user data to the backend:", userData);

         // Save to localStorage (if needed)
    localStorage.setItem('tempUserData', JSON.stringify(userData));

      await sendUserDataToBackend(userData);

      Swal.fire({
        icon: 'success',
        title: 'Welcome to YeePlatform!',
        text: '🎉',
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/home");

    } catch (error) {
      console.error('Error signing in with Google:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-200 p-4 md:p-0">
    <Helmet>
  <title>Sign Up - Yee FM</title>
  <meta name="description" content="Sign up for a new account on Yee FM." />
  <meta name="keywords" content="Yee FM, sign up, register, new account, join" />
  <link rel="icon" href="https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp" />
  <meta property="og:image" content="https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Sign Up - Yee FM" />
  <meta property="og:description" content="Sign up for a new account on Yee FM." />
  <meta property="og:url" content="https://www.yeefm.com/signup" />
</Helmet>

    <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md">
      <div className="text-center">
        <IoArrowBack
          className="text-gray-700 text-2xl cursor-pointer mb-4"
          onClick={() => navigate(-1)}
        />
       <img src="https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp" alt="Platform logo" loading="lazy" className="mx-auto h-16 w-auto mb-2" />

        <h2 className="text-2xl font-bold text-gray-800">Sign Up</h2>
        <p className="mt-2 text-gray-600">
          Already have an account?{' '}
          <Link
            to="/signin"
            className="text-indigo-500 hover:text-indigo-700 underline"
          >
            Sign In
          </Link>
        </p>
      </div>

      <button
        onClick={signUpWithGoogle}
        className="w-full py-2 px-4 mb-6 bg-gray-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-800 flex items-center justify-center"
      >
        <FaGoogle className="mr-2" />
        Continue with Google
      </button>

      
      <form onSubmit={debouncedHandleSignUp} className="space-y-4" autoComplete="off">

        <input
          type="text"
          id="name"
          name="name"
          placeholder="Full Name"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Phone Number"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email Address"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

<select
  id="country"
  name="country"
  value={country}  // Set the value to the state.
  required
  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
  onChange={(e) => setCountry(e.target.value)}
>

<option value="" disabled>Select your Country</option>
  
{Array.isArray(countries) && countries.map((country, index) => (
  <option key={index} value={country}>{country}</option>
))}

 
</select>

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
        <div className="flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-indigo-500"
            checked={isConsentGiven}
            onChange={(e) => setIsConsentGiven(e.target.checked)}
          />
          <label className="ml-2 text-sm text-gray-600">
            I agree to receive marketing emails, newsletters, promotions, and updates.
          </label>
        </div>
      </form>
    </div>
  </div>
);
}

export default Signup;