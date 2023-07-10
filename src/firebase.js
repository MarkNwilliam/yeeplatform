import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore"; // Add this import statement
import { getStorage } from "firebase/storage"; // Add this import statement

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
isSupported().then((isSupported) => {
  if (isSupported) {
    analytics = getAnalytics(app);
  } else {
    console.log("Firebase analytics is not supported in this environment");
  }
});

// Add console.log statement to check Firebase connection
console.log("Firebase connected successfully");

export const auth = getAuth(app);
export const database = getDatabase(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app); // Add this export statement
export {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
};