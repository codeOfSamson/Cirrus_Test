"use client";

import React from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout, user } = useAuth();


  return (
    <nav className="bg-blue-500 shadow-md p-4 flex justify-between items-center border-b-solid border-2 border-black-500">
      <h2 className="text-2xl font-bold text-gray-700">{`Welcome ${user?.username  || ''}`}</h2>
      <button
        onClick={logout}
        className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
