"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from "next/navigation";

interface User {
  username: string;
  isLoggedIn: boolean;
  role: string;
}

interface AuthContextType {
  user: User;
  login: (userData: {  token: string, user: {email: string, id: string, name: string, role: string }}) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Create a provider to manage auth state
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router =useRouter()
  const [user, setUser] = useState<User>({ username: '', isLoggedIn: false, role: ''});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    if (token && username && role) {
      setUser({ username, isLoggedIn: true , role: role});
    }
  }, []);

   const login = ( userData: {  token: string, user: {email: string, id: string, name: string, role: string }}) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("username", userData.user.name);
    localStorage.setItem("role", userData.user.role);

    setUser({ username: userData.user.name, isLoggedIn: true, role: userData.user.role});
    if(userData.user.role === 'admin'){
      router.push("/admin"); 
    } else if (userData.user.role === 'employee'){
      router.push("/employee"); 
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    setUser({ username: "", isLoggedIn: false, role:''});
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
