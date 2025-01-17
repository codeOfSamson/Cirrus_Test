"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const { user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false); // Track dark mode
  const router = useRouter();

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (user?.role === "admin") {
      router.push("/admin");
    } else if (user?.role === "employee") {
      router.push("/employee");
    }
  }, [user, router]);

  if (!user?.isLoggedIn) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Employee Review App
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-300 sm:text-lg">
            Empower your team with transparency and insights!
          </p>
        </header>

        <div className="mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 ${
              isLogin
                ? "font-bold underline dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 ${
              !isLogin
                ? "font-bold underline dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Register
          </button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setIsDarkMode(false)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded text-black dark:text-white"
          >
            ☀️ Light Mode
          </button>
          <button
            onClick={() => setIsDarkMode(true)}
            className="px-4 py-2 bg-gray-800 dark:bg-gray-200 rounded text-white dark:text-black"
          >
            🌙 Dark Mode
          </button>
        </div>

        {isLogin ? <Login /> : <Register setIsLogin={setIsLogin} />}
      </div>
    );
  }

  // return (
  //   <PrivateRoute>
  //     <div>
  //       {/* Footer */}
  //       <footer className="mt-12 text-gray-500 text-xs">
  //         &copy; {new Date().getFullYear()} Employee Review App. All rights reserved.
  //       </footer>
  //     </div>
  //   </PrivateRoute>
  // );
};

export default LandingPage;
