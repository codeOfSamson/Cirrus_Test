"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
const LandingPage = () => {
  const { user } = useAuth(); // Access the user session from context
console.log(user)
  if (!user?.isLoggedIn) {
    return <Login />; // Show the login component if user is not logged in
  }

  return (
    <PrivateRoute>
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

        {/* Hero Section */}
        <div className="relative w-full max-w-5xl h-[50vh] rounded-lg overflow-hidden shadow-lg">
          <img
            src="https://t2binteriors.com/wp-content/uploads/2022/02/elevated-view-of-a-busy-open-plan-office-2021-08-26-16-14-58-utc.jpg"
            alt="Modern Office"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <p className="text-white text-center text-sm sm:text-base max-w-xl leading-relaxed">
              A seamless solution to manage employee reviews and feedback. Transform how your team collaborates and grows.
            </p>
          </div>
        </div>

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
    </PrivateRoute>
  );
};

export default LandingPage;
