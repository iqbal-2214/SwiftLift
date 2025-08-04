// /src/routes/AdminProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../store/AuthContext.jsx';

const AdminProtectedRoute = () => {
  const { isAdmin } = useAuth();

  // If the user is an admin, render the nested routes (via Outlet).
  // Otherwise, redirect them to the admin login page.
  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;