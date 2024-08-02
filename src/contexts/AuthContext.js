import React, { useState, useEffect, createContext, useCallback } from "react";
import { debounce } from 'lodash'; 

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

  // Memoized functions
  const checkAuthorStatus = useCallback(debounce(async (currentUser) => {
    if (!currentUser || !currentUser.uid) return;

    try {
      const response = await fetch(`https://yeeplatformbackend.azurewebsites.net/isAuthor/${currentUser.uid}`);
      if (response.ok) {
        const data = await response.json();
        setIsAuthor(data.isAuthor);
      } else {
        //console.error("AuthContext: Failed to check author status. Response status:", response.status);
      }
    } catch (error) {
      //console.error("AuthContext: Error checking author status:", error);
    }
  }, 15000), []);

  const login = useCallback(async (email, password) => {
    const { auth, signInWithEmailAndPassword } = await import("../firebase");
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      const verified = result.user?.emailVerified || false;
      setIsVerified(verified);
      localStorage.setItem('isVerified', verified.toString());
    } catch (error) {
      //console.error("Error logging in:", error);
    }
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const { auth, signInWithPopup, GoogleAuthProvider } = await import("../firebase");
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      const verified = result.user?.emailVerified || false;
      setIsVerified(verified);
      localStorage.setItem('isVerified', verified.toString());
    } catch (error) {
      //console.error("Error signing in with Google:", error);
    }
  }, []);

  const logout = useCallback(async () => {
    const { auth, signOut } = await import("../firebase");
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthor(false);
    } catch (error) {
      //console.error("Error logging out:", error);
    }
  }, []);

  // Effect to manage authentication state
  useEffect(() => {
    const initializeAuth = async () => {
      const { auth, onAuthStateChanged } = await import("../firebase");
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
        setLoading(false);

        if (currentUser) {
          setIsVerified(currentUser.emailVerified);
          localStorage.setItem('isVerified', currentUser.emailVerified.toString());
        }
      });

      return () => unsubscribe();
    }

    initializeAuth();
  }, []);

  // Effect to check author status after initial render
  useEffect(() => {
    if (user) {
      checkAuthorStatus(user);
    }
  }, [user, checkAuthorStatus]);

  // Value provided by context
  const contextValue = {
    user,
    isAuthor,
    loading,
    isVerified,
    login,
    logout,
    loginWithGoogle
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;