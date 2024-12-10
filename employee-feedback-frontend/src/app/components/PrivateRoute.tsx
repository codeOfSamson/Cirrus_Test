'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (!user?.isLoggedIn) {
    notFound(); // This will trigger a 404 response and redirect to the 404 page.
    return null; // Component will not render
  }

  return <>{children}</>;
};

export default PrivateRoute;
