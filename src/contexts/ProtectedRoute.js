import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";

const ProtectedRouteWrapper = ({ children }) => {
  const { user, isAuthor: contextIsAuthor, loading } = useAuth();

  console.log("ProtectedRoute: User from context:", user);
  console.log("ProtectedRoute: isAuthor from context:", contextIsAuthor);

  if (loading) {
    console.log("ProtectedRoute: Still loading");
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log("ProtectedRoute: No user found, navigating to Signin");
    return <Navigate to="/Signin" replace />;
  } 

  if (!contextIsAuthor) {
    console.log("ProtectedRoute: User is not an author, navigating to home");
    return <Navigate to="/" replace />;
  }

  console.log("ProtectedRoute: Rendering protected content");
  return children;
};

export default ProtectedRouteWrapper;
