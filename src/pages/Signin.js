import React, { useState , useContext} from "react";
import { auth } from "../firebase";
import Swal from "sweetalert2";
import { FaGoogle, FaArrowLeft } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const { login, loginWithGoogle } = useContext(AuthContext);


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
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
  
      await signInWithEmailAndPassword(auth, email, password);
      Swal.close();
      await login(email, password);
      navigate("/home");
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
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
  
      const result = await signInWithPopup(auth, provider);
      const { email, uid } = result.user;
      Swal.close();
    
       await loginWithGoogle();
      navigate("/home");
      
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
    <div className="min-h-screen flex items-center justify-center bg-yellow-200">
      <div className="w-full sm:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-start mb-6">
          <FaArrowLeft
            className="text-gray-800 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <img
            src="/Y.png"
            alt="Platform Logo"
            className="w-20 h-20 mx-auto"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sign In
        </h1>
        <button
  onClick={handleGoogleSignIn}
  className="w-full py-2 px-4 mb-6 bg-gray-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-800 flex items-center justify-center"
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
            className="mb-6 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-700 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            aria-label="Sign in"
            role="button"
            className="w-full py-2 px-4 bg-gray-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-800"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-700">
          <span>Don&apos;t have an account?</span>

            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign in
            </span>
          </span>

          <div className="mt-4 text-center">
  <span className="text-gray-700">
    <span
      className="text-blue-500 cursor-pointer"
      onClick={() => navigate("/")}
    >
      Back Home
    </span>
  </span>
</div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
