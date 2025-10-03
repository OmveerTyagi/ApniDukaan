// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // If user is not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If user exists, render the children components
  return children;
};

export default ProtectedRoute;
