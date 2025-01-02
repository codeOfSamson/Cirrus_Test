"use client";

import React, { useState , Context} from "react";
import Link from "next/link";
//import { useSearchParams } from 'next/navigation'; // For Next.js 13
import PrivateRoute from "../components/PrivateRoute";

const AdminLandingPage = () => {

  //const searchParams = useSearchParams(); // Next.js 13+
  //const userName = searchParams.get('name');


  // Admin Dashboard
  return (
    <PrivateRoute>
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
        {/* <Link href="/" className="text-blue-600 hover:underline">
          Go to Home Page
        </Link> */}
      </div>
    </div>
    </PrivateRoute>
  
  );
};

export default AdminLandingPage;
