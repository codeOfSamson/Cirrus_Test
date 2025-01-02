'use client';
import { redirect } from 'next/navigation';
import React from 'react';
import { notFound } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (!user?.isLoggedIn) {
    notFound(); 
    return null; 
  } else if ( user?.role === 'employee'){
    redirect('/unauthorized'); 
  }

  return <>{children}</>;
};

export default PrivateRoute;
