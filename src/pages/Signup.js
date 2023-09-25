import React, { useState , useContext } from "react";
import { auth, database } from '../firebase';
import Swal from 'sweetalert2';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from '../contexts/AuthContext';
import { get, ref, set } from "firebase/database";
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';


function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [isConsentGiven, setIsConsentGiven] = useState(false);

  const { loginWithGoogle } = useContext(AuthContext);
  // ... (handleSignUp and signUpWithGoogle functions)

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
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });

        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        // Send email verification
        await user.sendEmailVerification();
        
        Swal.fire({
            icon: 'info',
            title: 'Verify Your Email',
            text: 'A verification email has been sent. Please check your inbox and verify your email address.',
        });
    
        const userData = {
          name,
          email,
          phoneNumber: phone,
          photoURL: "",
          isAuthor: false,
          subscription: {
            type: "free",
            status: "active",
            startDate: new Date().toISOString().split("T")[0],
            endDate: "",
          },
        };
    
        // Save userData temporarily in local storage
        localStorage.setItem('tempUserData', JSON.stringify(userData));
    
        navigate('/verify-email');
    

        await set(ref(database, `users/${user.uid}`), userData);

        Swal.close();
        navigate('/dashboard');

        // Redirect to another page or show a success message
    } catch (error) {
        console.error('Error signing up:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
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
          onBeforeOpen: () => {
              Swal.showLoading();
          },
      });

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      Swal.close();

      const user = result.user;
      const userData = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber || "", // Use the phone number from Google, if available
        photoURL: user.photoURL,
        isAuthor: false,
        subscription: {
          type: "free", // Set the default subscription type
          status: "active",
          startDate: new Date().toISOString().split("T")[0],
          endDate: "", // Calculate the end date based on the subscription type and duration
        },
      };
  
      // Check if the user already exists in the database
      const userRef = ref(database, `users/${user.uid}`);
      const userSnapshot = await get(userRef);

      if (!userSnapshot.exists()) {
        // If the user doesn't exist, create a new user with the userData
        await set(userRef, userData);
      }

      // Show the welcome alert
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
    <div className ="min-h-screen flex items-center justify-center bg-yellow-200">
      <div className="w-full sm:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <IoArrowBack
          className="text-gray-700 text-2xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <img
          src="/Y.png"
          alt="Platform logo"
          className="mx-auto h-16 w-auto"
        />
        <Link
          to="/signin"
          className="text-sm text-gray-700 underline hover:text-gray-900"
        >
          I have an account?
        </Link>
      </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h1>
        <button onClick={signUpWithGoogle} className="w-full py-2 px-4 mb-6 bg-gray-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-800 flex items-center justify-center">
  <FaGoogle className="mr-2" />
  Continue with Google
</button>

        <form onSubmit={handleSignUp} autoComplete="off">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Full Name"
            required
            className="mb-4 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-700 focus:outline-none"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone Number"
            required
            className="mb-4 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-700 focus:outline-none"
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            required
            className="mb-4 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-700 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            minLength="6"
            required
            className="mb-4 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-700 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            minLength="6"
            required
            className="mb-6 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-700 focus:outline-none"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            aria-label="Sign up"
            role="button"
            className="w-full py-2 px-4 bg-gray-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-800"
          >
            Sign Up
          </button>

          <label className="inline-flex items-center mb-3">
  <input
    type="checkbox"
    className="form-checkbox"
    checked={isConsentGiven}
    onChange={(e) => setIsConsentGiven(e.target.checked)}
  />
  <span className="ml-2">
    I agree to receive marketing emails, newsletters, promotions, and updates.
  </span>
</label>


        </form>
      </div>
    </div>
  );
}

export default Signup;