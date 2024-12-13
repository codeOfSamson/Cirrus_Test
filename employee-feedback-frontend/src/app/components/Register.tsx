"use client";

import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const REGISTER_MUTATION = gql`
  mutation CreateUser($name: String!, $email: String!, $role: String!, $password: String!) {
    createUser(createUserInput: { name: $name, email: $email, role: $role, password: $password }) {
      id
      name
      email
      role
    }
  }
`;

interface RegisterProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register: React.FC<RegisterProps> = ({ setIsLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [register, { loading, error }] = useMutation(REGISTER_MUTATION);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ variables: { name, email, password, role } });
      alert("Registration successful! Please login.");
      setIsLogin(true); 
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <form
      onSubmit={handleRegister} // Pass the function correctly here
      className="bg-white p-6 rounded-lg shadow-lg w-80"
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500">{error.message}</p>}
      <input
        className="text-white mb-2 p-2 border border-gray-300 rounded"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        className="text-white mb-2 p-2 border border-gray-300 rounded"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        className="text-white mb-2 p-2 border border-gray-300 rounded"
        placeholder="Role"
        onChange={(e) => setRole(e.target.value)}
        value={role}
      />
      <input
        className="text-white mb-4 p-2 border border-gray-300 rounded"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default Register;
