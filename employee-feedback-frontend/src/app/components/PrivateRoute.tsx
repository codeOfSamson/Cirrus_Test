'use client';
import { redirect } from 'next/navigation';
import React from 'react';
import { notFound } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter()
  if (!user?.isLoggedIn) {
    router.push("/")
    return null; 
  } else if ( user?.role === 'employee'){
    redirect('/unauthorized'); 
  }

  return <>{children}</>;
};

export default PrivateRoute;
