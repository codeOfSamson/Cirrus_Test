"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Type for the user session data
interface User {
  username: string;
  isLoggedIn: boolean;
}

// Define the context state
interface AuthContextType {
  user: User;
  login: (username: string, password: string) => void;
  logout: () => void;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface AuthProviderProps {
  children: ReactNode;
}

// Create a provider to manage auth state
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({ username: '', isLoggedIn: false });

  const login = (username: string, password: string) => {
    // Hardcoded default password
    if (password === '1234') {
      setUser({ username, isLoggedIn: true });
    } else {
      alert('Invalid password');
    }
  };

  const logout = () => {
    setUser({ username: '', isLoggedIn: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
