import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, token }) => {
  // Check if token is present
  if (!token) {
    // Redirect to the login page if no token
    return <Navigate to="/admin-login" />;
  }

  // Render the protected component if token is present
  return children;
};

export default ProtectedRoute;
