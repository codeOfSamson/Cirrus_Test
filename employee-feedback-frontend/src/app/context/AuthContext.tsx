"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from "next/navigation";

interface User {
  username: string;
  isLoggedIn: boolean;
}

interface AuthContextType {
  user: User;
  login: (token: string, userData: {username: string}) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Create a provider to manage auth state
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router =useRouter()
  const [user, setUser] = useState<User>({ username: '', isLoggedIn: false });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token && username) {
      setUser({ username, isLoggedIn: true });
    }
  }, []);

   const login = (token: string, userData: { username: string }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", userData.username);

    setUser({ username: userData.username, isLoggedIn: true });
    router.push("/"); 
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    setUser({ username: "", isLoggedIn: false });
    router.push("/"); 
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
