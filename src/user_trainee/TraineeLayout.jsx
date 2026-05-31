import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

export default function TraineeLayout() {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user.email || user.role !== 'student') {
    return <Navigate to="/login" replace />;
  }

  if (location.pathname === '/trainee' || location.pathname === '/trainee/') {
    return <Navigate to="/trainee/dashboard" replace />;
  }

  return <Outlet />;
}
