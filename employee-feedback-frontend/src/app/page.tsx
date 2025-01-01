"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import { useRouter } from 'next/navigation';



const LandingPage = () => {
  const { user } = useAuth(); 
  const [isLogin, setIsLogin] = useState(true); 
  const router = useRouter();


  useEffect(() => {
    if (user.role === 'admin') {
      router.push('/admin');
    } else if (user.role === 'employee') {
      router.push('/employee');
    }
  }, [user, router]);



  if (!user?.isLoggedIn) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-gray-800">
         
      <header className="text-center mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Employee Review App
          </h1>
          <p className="mt-2 text-base text-gray-600 sm:text-lg">
            Empower your team with transparency and insights!
          </p>
        </header>
        <div className="mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 ${
              isLogin ? "font-bold underline" : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 ${
              !isLogin ? "font-bold underline" : "text-gray-500"
            }`}
          >
            Register
          </button>
        </div>

        {isLogin ? <Login /> : <Register  setIsLogin={setIsLogin}/>}
      </div>
    );
  }

  return (
    <PrivateRoute>
      <div>
   

        {/* Footer */}
        <footer className="mt-12 text-gray-500 text-xs">
      
          &copy; {new Date().getFullYear()} Employee Review App. All rights reserved.
        </footer>
  
      </div>
    </PrivateRoute>
  );
};

export default LandingPage;
