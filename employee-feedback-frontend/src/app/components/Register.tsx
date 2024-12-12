"use client";

import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const REGISTER_MUTATION = gql`
mutation CreateUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    id
    name
    email
    role
  }
}
`;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, { loading, error }] = useMutation(REGISTER_MUTATION);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ variables: { name, email, password } });
      alert("Registration successful! Please login.");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="bg-white p-6 rounded-lg shadow-lg w-80"
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500">{error.message}</p>}
      <input className="text-white" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input className="text-white" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
      className="text-white" 
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default Register;
