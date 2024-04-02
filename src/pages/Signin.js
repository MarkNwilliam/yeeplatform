import React, { useState , useContext, useEffect} from "react";
import { auth } from "../firebase";
import Swal from "sweetalert2";
import { FaGoogle, FaArrowLeft } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import { logFirebaseEvent } from '../firebase.js';

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  
  const { login, loginWithGoogle } = useContext(AuthContext);

  useEffect(() => {
    logFirebaseEvent('page_view', { page_path: '/Signin' });
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all fields",
      });
      return;
    }

    try {
      Swal.fire({
        title: "Signing in...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        background: '#fff', 
        backdrop: `
        rgba(255,255,224,0.4) // Light yellow
      `,
        didOpen: () => {
            Swal.showLoading();
        },
        willClose: (dismiss) => {
            if (dismiss === Swal.DismissReason.cancel) {
                // Handle cancel action
                console.log("Sign in canceled");
            }
        },
    });

      await signInWithEmailAndPassword(auth, email, password);
      Swal.close();
      await login(email, password);
      navigate(location.state?.from || "/home");
    } catch (error) {
      console.error("Error signing in:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };
  


  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
  
    try {
      Swal.fire({
        title: "Signing in with Google...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        background: '#fff', 
        backdrop: `
        rgba(255,255,224,0.4) // Light yellow
      `,
        didOpen: () => {
            Swal.showLoading();
          
        },
        willClose: (dismiss) => {
            if (dismiss === Swal.DismissReason.cancel) {
                // Handle cancel action
                console.log("Sign in canceled");
            }
        },
    });
  
      const result = await signInWithPopup(auth, provider);

    if (!result) {
      Swal.fire({
        icon: "error",
        title: "Error",
        html: 'Popup blocked. Please allow popups for this site in your browser settings. <a href="https://www.google.com/search?q=how+to+allow+popups+in+my+browser" target="_blank">Learn More</a>',
      });
      return;
    }
  
      const { email, uid } = result.user;
      Swal.close();
    
       await loginWithGoogle();
       // Redirect back to the previous page or "/home" if no "from" parameter
      navigate(queryString.parse(location.search).from || "/home");
      
    } catch (error) {
      console.error("Error signing in with Google:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-200 p-4 sm:p-0">
  <Helmet>
  <title>Sign In - Yee FM</title>
  <meta name="description" content="Sign in to your account on Yee FM." />
  <meta name="keywords" content="Yee FM, sign in, login, email, Google, account" />
  <link rel="icon" href="https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp" />
  <meta property="og:image" content="https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Sign In - Yee FM" />
  <meta property="og:description" content="Sign in to your account on Yee FM." />
  <meta property="og:url" content="https://www.yeefm.com/signin" />
</Helmet>

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <FaArrowLeft className="text-gray-800 cursor-pointer" onClick={() => navigate(-1)} />
          <img src="https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp" alt="Platform logo" loading="lazy" className="mx-auto h-16 w-auto mb-2" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Sign In</h1>
        <button
          onClick={handleGoogleSignIn}
          className="w-full py-2 px-4 mb-4 bg-gray-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-800 flex items-center justify-center"
        >
          <FaGoogle className="mr-2" />
          Continue with Google
        </button>
        <form onSubmit={handleSignIn} autoComplete="off">
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
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-800"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-700 block mb-2">
            Don&apos;t have an account?
            <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/signup")}>
              {" "}Sign Up
            </span>
          </span>
          <span className="text-gray-700 block">
            <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </span>
          </span>
          <span className="text-gray-700 block mt-2">
            <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/")}>
              Back Home
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignIn;




