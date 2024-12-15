"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";


const LandingPage = () => {
  const { user } = useAuth(); 
  const { logout } = useAuth(); 
  const [isLogin, setIsLogin] = useState(true); 

  console.log(user)
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
      <div className="topnav">
  <button 
   onClick={() => logout()}
  className="active">Logout</button>
 
  </div>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-gray-800">
        {/* Header Section */}
        <header className="text-center mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Employee Review App
          </h1>
          <p className="mt-2 text-base text-gray-600 sm:text-lg">
            Empower your team with transparency and insights!
          </p>
        </header>

        {/* Button Links */}
        <div className="mt-10 flex gap-4">
          <Link href="/employee">
            <button className="px-5 py-3 text-sm sm:text-base font-semibold rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-transform transform hover:scale-105 duration-300">
              Employee Portal
            </button>
          </Link>
          <Link href={`/admin/?name=${user.username}`}>
            <button className="px-5 py-3 text-sm sm:text-base font-semibold rounded-lg shadow-lg bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 transition-transform transform hover:scale-105 duration-300">
              Admin Panel
            </button>
          </Link>
        </div>


        {/* Footer */}
        <footer className="mt-12 text-gray-500 text-xs">
      
          &copy; {new Date().getFullYear()} Employee Review App. All rights reserved.
        </footer>
      </div>
      </div>
    </PrivateRoute>
  );
};

export default LandingPage;
