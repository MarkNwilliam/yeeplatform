import React, { useState, useEffect, createContext } from "react";
import {
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "../firebase";

export const AuthContext = createContext();

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthor, setIsAuthor] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(
    () => JSON.parse(localStorage.getItem('isVerified')) || false
  );

  const checkAuthorStatus = async (currentUser) => {
    if (!currentUser || !currentUser.uid) return;

    try {
      const response = await fetch(`https://yeeplatformbackend.azurewebsites.net/isAuthor/${currentUser.uid}`);
      if (response.ok) {
          const data = await response.json();
          setIsAuthor(data.isAuthor);
      } else {
          console.error("AuthContext: Failed to check author status. Response status:", response.status);
      }
    } catch (error) {
      console.error("AuthContext: Error checking author status:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        setIsVerified(currentUser.emailVerified);
        localStorage.setItem('isVerified', currentUser.emailVerified.toString());
        await checkAuthorStatus(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("AuthContext: isAuthor state changed to", isAuthor);
  }, [isAuthor]);

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      const verified = result.user?.emailVerified || false;
      setIsVerified(verified);
      localStorage.setItem('isVerified', verified.toString());
      await checkAuthorStatus(result.user);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };


  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      const verified = result.user?.emailVerified || false;
      setIsVerified(verified);
      localStorage.setItem('isVerified', verified.toString());
      await checkAuthorStatus(result.user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setIsAuthor(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthor, loading, isVerified, login, logout, loginWithGoogle }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
