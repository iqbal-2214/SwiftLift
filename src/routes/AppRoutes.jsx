import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import AdminProtectedRoute from './AdminProtectedRoute.jsx';

// ... other page imports
import MainLayout from '../components/layout/MainLayout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MyQuotesPage from '../pages/MyQuotesPage.jsx';
import AdminLoginPage from '../pages/AdminLoginPage';
import AdminDashboardPage from '../pages/AdminDashboardPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* --- User Layout and Routes --- */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="my-quotes" element={<MyQuotesPage />} />
      </Route>

      {/* --- Admin Routes --- */}
      {/* The login page is outside the protected group */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      
      {/* All routes inside this group will be protected by the guard */}
      <Route element={<AdminProtectedRoute><Outlet /></AdminProtectedRoute>}>
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        {/* You can add more protected admin routes here later, e.g.: */}
        {/* <Route path="/admin/settings" element={<AdminSettingsPage />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
