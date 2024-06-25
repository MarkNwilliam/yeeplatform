import React, { useState, useEffect } from "react";
import { auth } from '../firebase';
import Swal from 'sweetalert2';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { countries } from '../constants/countries';
import { getErrorMessage }   from '../functions/getFirebaseErrorMessage';
import { Helmet } from 'react-helmet';
import { logFirebaseEvent } from '../firebase.js';
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';


function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const [country, setCountry] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  
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
        text: 'You must agree to the terms and conditions to register.',
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

       // Check if the email is already in use
       const signInMethods = await fetchSignInMethodsForEmail(auth, email);
       if (signInMethods.length > 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'This email address is already in use.',
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
          await user.getIdToken().then((idToken) => {
            localStorage.setItem('userToken', idToken);
          });

    // Send the userData to the backend
    await sendUserDataToBackend(userData);

      navigate('/verify-email');

    } catch (error) {
      console.error('Error signing up:', error);
      const message = getErrorMessage(error.code);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
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

    if (!isConsentGiven) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must agree to the terms and conditions to sign up.',
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


      if (!result) {
        Swal.fire({
          icon: "error",
          title: "Error",
          html: 'Popup blocked. Please allow popups for this site in your browser settings. <a href="https://www.google.com/search?q=how+to+allow+popups+in+my+browser" target="_blank">Learn More</a>',
        });
        return;
      }

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
      const message = getErrorMessage(error.code);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
      });
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
          onClick={() => navigate('/ebooks')}
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

      
      <form onSubmit={handleSignUp} className="space-y-4" autoComplete="off">

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

<div className="flex w-full">
      <input
        type={showPassword ? 'text' : 'password'}
        id="password"
        name="password"
        placeholder="Password"
        minLength="6"
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        onChange={handlePasswordChange}
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
          onChange={handleConfirmPasswordChange}
        />
        <button onClick={toggleConfirmPasswordVisibility} className="bg-gray-200 rounded-r-lg p-2 hover:bg-gray-300">
        {showConfirmPassword ? <EyeIcon className="h-5 w-5 text-gray-500" /> : <EyeSlashIcon className="h-5 w-5 text-gray-500" />}
      </button>

      </div>

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
    I agree to the terms  ,
    <button
      onClick={() => {
        Swal.fire({
          icon: 'info',
          title: ' Terms and Conditions',
          html: `
          <h2><strong>Terms and Conditions</strong></h2>

          <p>Welcome to yeefm!</p>
          
          <p>These terms and conditions outline the rules and regulations for the use of Yee technologies's Website, located at www.yeefm.com.</p>
          
          <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use yeefm if you do not agree to take all of the terms and conditions stated on this page.</p>
          
          <p>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of ug. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>
          
          <h3><strong>Cookies</strong></h3>
          
          <p>We employ the use of cookies. By accessing yeefm, you agreed to use cookies in agreement with the Yee technologies's Privacy Policy. </p>
          
          <p>Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>
          
          <h3><strong>License</strong></h3>
          
          <p>Unless otherwise stated, Yee technologies and/or its licensors own the intellectual property rights for all material on yeefm. All intellectual property rights are reserved. You may access this from yeefm for your own personal use subjected to restrictions set in these terms and conditions.</p>
          
          <p>You must not:</p>
          <ul>
              <li>Republish material from yeefm</li>
              <li>Sell, rent or sub-license material from yeefm</li>
              <li>Reproduce, duplicate or copy material from yeefm</li>
              <li>Redistribute content from yeefm</li>
          </ul>
          
          <p>This Agreement shall begin on the date hereof. Our Terms and Conditions were created with the help of the <a href="https://www.termsandconditionsgenerator.com/">Free Terms and Conditions Generator</a>.</p>
          
          <p>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Yee technologies does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Yee technologies,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Yee technologies shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>
          
          <p>Yee technologies reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>
          
          <p>You warrant and represent that:</p>
          
          <ul>
              <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
              <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
              <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
              <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
          </ul>
          
          <p>You hereby grant Yee technologies a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</p>
          
          <h3><strong>Hyperlinking to our Content</strong></h3>
          
          <p>The following organizations may link to our Website without prior written approval:</p>
          
          <ul>
              <li>Government agencies;</li>
              <li>Search engines;</li>
              <li>News organizations;</li>
              <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
              <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
          </ul>
          
          <p>These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.</p>
          
          <p>We may consider and approve other link requests from the following types of organizations:</p>
          
          <ul>
              <li>commonly-known consumer and/or business information sources;</li>
              <li>dot.com community sites;</li>
              <li>associations or other groups representing charities;</li>
              <li>online directory distributors;</li>
              <li>internet portals;</li>
              <li>accounting, law and consulting firms; and</li>
              <li>educational institutions and trade associations.</li>
          </ul>
          
          <p>We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Yee technologies; and (d) the link is in the context of general resource information.</p>
          
          <p>These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party's site.</p>
          
          <p>If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to Yee technologies. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.</p>
          
          <p>Approved organizations may hyperlink to our Website as follows:</p>
          
          <ul>
              <li>By use of our corporate name; or</li>
              <li>By use of the uniform resource locator being linked to; or</li>
              <li>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party's site.</li>
          </ul>
          
          <p>No use of Yee technologies's logo or other artwork will be allowed for linking absent a trademark license agreement.</p>
          
          <h3><strong>iFrames</strong></h3>
          
          <p>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</p>
          
          <h3><strong>Content Liability</strong></h3>
          
          <p>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>
          
          <h3><strong>Reservation of Rights</strong></h3>
          
          <p>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it's linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>
          
          <h3><strong>Removal of links from our website</strong></h3>
          
          <p>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</p>
          
          <p>We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</p>
          
          <h3><strong>Disclaimer</strong></h3>
          
          <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>
          
          <ul>
              <li>limit or exclude our or your liability for death or personal injury;</li>
              <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
              <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
              <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
          </ul>
          
          <p>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>
          
          <p>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
          `,
        });
      }}
      className="text-indigo-500 underline focus:outline-none"
      
    >
       Terms and Conditions
    </button>
    , to receive marketing emails, newsletters, promotions, and updates.
  </label>
</div>

     
      </form>
    </div>
  </div>
);
}

export default Signup;