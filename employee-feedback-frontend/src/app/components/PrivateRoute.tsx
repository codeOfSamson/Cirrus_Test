'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (!user?.isLoggedIn) {
    notFound(); 
    return null; 
  } else if ( user?.role === 'employee'){
    return <>{`Sorry you do not have access to this page : '(`}</>
  }

  return <>{children}</>;
};

export default PrivateRoute;
