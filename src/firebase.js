import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXS56tIro9cd-Sd4ySn5AwLw3T6cnMHr0",
  authDomain: "yeeplatform.firebaseapp.com",
  projectId: "yeeplatform",
  storageBucket: "yeeplatform.appspot.com",
  messagingSenderId: "272587831821",
  appId: "1:272587831821:web:b612b427ff43968f33f344",
  measurementId: "G-YZV03469PP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics;

// Lazy load Firebase Analytics
const initializeAnalytics = async () => {
  const supported = await isSupported();
  if (supported) {
    analytics = getAnalytics(app);
    console.log("Firebase Analytics initialized.");
  } else {
    console.warn("Firebase Analytics is not supported in this environment.");
  }
};

initializeAnalytics();

export const auth = getAuth(app);

// Export a function to log events after Firebase Analytics is initialized
export const logFirebaseEvent = (eventName, eventParams) => {
  if (analytics) {
    logEvent(analytics, eventName, eventParams);
  } else {
    console.warn("Firebase Analytics is not initialized yet.");
  }
};

export {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  signOut,
  logEvent,
  analytics,
};
