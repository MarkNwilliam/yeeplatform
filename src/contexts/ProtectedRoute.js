import React from "react";
import { Navigate,useLocation } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import queryString from 'query-string';

const ProtectedRouteWrapper = ({ children }) => {
  const { user, isAuthor: contextIsAuthor, loading } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute: User from context:", user);
  console.log("ProtectedRoute: isAuthor from context:", contextIsAuthor);

  if (loading) {
    console.log("ProtectedRoute: Still loading");
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log("ProtectedRoute: No user found, navigating to Signin");
    const query = queryString.stringify({ from: location.pathname }); // Append current page to query parameter
    console.log("Query parameter:", query);
    console.log("Location object:", location);
    return <Navigate to={`/signin?${query}`} replace />;
  } 

  if (!contextIsAuthor) {
    console.log("ProtectedRoute: User is not an author, navigating to home");


    return <Navigate to="/" replace />;
  }

  console.log("ProtectedRoute: Rendering protected content");
  return children;
};

export default ProtectedRouteWrapper;
