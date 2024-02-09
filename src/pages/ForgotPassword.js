import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter your email address",
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Password reset email sent. Please check your inbox.",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-200 p-4 sm:p-0">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Forgot Password</h1>
        <form onSubmit={handleResetPassword} autoComplete="off">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            required
            className="mb-4 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-700 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-800"
          >
            Send Reset Email
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-700 block">
            <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/signin")}>
              Back to Sign In
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
