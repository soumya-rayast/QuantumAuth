import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You need to log in to access this page.");
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute;
