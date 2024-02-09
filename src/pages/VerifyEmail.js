import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import emailAnimation from '../animations/emailsent.json';
import { sendEmailVerification } from "firebase/auth";

function VerifyEmail() {
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (user && user.emailVerified) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    let timerId;
    if (isButtonDisabled && timer > 0) {
      timerId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsButtonDisabled(false);
      setTimer(60); // Reset the timer back to 60 seconds after it hits 0
    }
    return () => clearInterval(timerId);
  }, [isButtonDisabled, timer]);

  const resendVerificationEmail = async () => {
    try {
      setLoading(true);
      setIsButtonDisabled(true);

      await sendEmailVerification(user)
        .then(() => {
          // Email verification sent!
        });
      setLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Email Sent',
        text: 'A verification email has been sent. Please check your inbox and verify your email address.',
      });
    } catch (error) {
      setLoading(false);
      console.error('Error sending verification email:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center" 
      style={{ backgroundColor: '#fff', padding: '20px' }}
    >
      <button 
        className="self-start mb-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full"
        onClick={() => navigate(-1)}
        style={{ marginBottom: '1rem' }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div 
        className="p-4 rounded-lg shadow-md text-center" 
        style={{ backgroundColor: '#ffde59', maxWidth: '400px', width: '100%' }}
      >
        <h1 
          className="text-2xl font-bold mb-6"
          style={{ color: '#173A5E' }}
        >
          Verify Your Email
        </h1>
        <Lottie animationData={emailAnimation} style={{ height: 150, marginBottom: '1rem' }} /> 
        <p 
          className="mb-4"
          style={{ color: '#46505A' }}
        >
          A verification email has been sent to your email address. Please check
          your email and click on the verification link.
        </p>
        <button
          className="w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1"
          style={{
            backgroundColor: loading ? '#001E3C' : '#173A5E',
            color: '#fff'
          }}
          disabled={isButtonDisabled}
          onClick={resendVerificationEmail}
        >
          {loading ? 'Sending...' : 'Resend Verification Email'}
        </button>
        {/* Timer Text */}
        {isButtonDisabled && <p>You can resend in {timer}s</p>}
      </div>
    </div>
  );
}

export default VerifyEmail;
