"use client";

import React, { useState } from "react";
import Link from "next/link";

const AdminLandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "admin",
    password: "password",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username === "admin" && credentials.password === "password") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid username or password. Try 'admin' and 'password'.");
    }
  };

  // Login Page
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Admin Login</h1>
        <form onSubmit={handleLogin} className="w-80 bg-white p-6 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Username: Hint: 'admin'"
            value="admin"
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password: Hint: 'password'"
            value="password"
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <Link href="/" className="mt-4 text-blue-600 hover:underline">
          Go to Home Page
        </Link>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Welcome to the Admin Panel
      </h1>

      <div className="flex flex-wrap justify-center gap-8">
        {/* User Management Card */}
        <div className="w-80 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Manage Users</h2>
          <p className="text-gray-600 mb-6">
            Create, update, delete, and view employee records.
          </p>
          <Link href="/admin/employees">
            <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
              Go to User Management
            </button>
          </Link>
        </div>

        {/* Review Management Card */}
        <div className="w-80 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Manage Reviews</h2>
          <p className="text-gray-600 mb-6">
            Create, update, delete, and view performance reviews.
          </p>
          <Link href="/admin/reviews">
            <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
              Go to Review Management
            </button>
          </Link>
        </div>
      </div>

      <div className="text-center mt-10">
        <Link href="/" className="text-blue-600 hover:underline">
          Go to Home Page
        </Link>
      </div>
    </div>
  );
};

export default AdminLandingPage;
