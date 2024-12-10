"use client";

import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import Link from "next/link";

// GraphQL Queries and Mutations
const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      email
      role
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      name
      email
      role
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: String!, $updateUserInput: UpdateUserInput!) {
    updateUser(id: $id, updateUserInput: $updateUserInput) {
      id
      name
      email
      role
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

const UsersCRUD = () => {
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [createUser] = useMutation(CREATE_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  const [form, setForm] = useState({ id: "", name: "", email: "", role: "" });

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  const handleCreate = async () => {
    const { name, email, role } = form;
    await createUser({ variables: { createUserInput: { name, email, role } } });
    refetch();
    setForm({ id: "", name: "", email: "", role: "" });
  };

  const handleUpdate = async () => {
    const { id, name, email, role } = form;
    await updateUser({ variables: { id: form.id, updateUserInput: { name, email, role } } });
    refetch();
    setForm({ id: "", name: "", email: "", role: "" });
  };

  const handleDelete = async (id: string) => {
    await deleteUser({ variables: { id } });
    refetch();
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center mb-8">User Management</h1>

      <ul className="space-y-4">
        {data.getUsers.map((user: any) => (
          <li key={user.id} className="flex justify-between items-center p-4 bg-white border rounded-md shadow-sm">
            <span>
              {user.name} - {user.email} ({user.role})
            </span>
            <div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
                onClick={() => setForm(user)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{form.id ? "Update User" : "Create User"}</h2>

        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <select
          name="role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>

        <button
          className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={form.id ? handleUpdate : handleCreate}
        >
          {form.id ? "Update" : "Create"}
        </button>
      </div>
      <Link href="/admin" className="block text-center mt-4 text-blue-500 hover:underline">
        Go Back
      </Link>
    </div>
  );
};

export default UsersCRUD;

