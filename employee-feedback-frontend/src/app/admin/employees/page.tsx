"use client";

import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import Link from "next/link";
import PrivateRoute from "@/app/components/PrivateRoute";

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

  const [form, setForm] = useState({ id: "", name: "", email: "", role: "", password: "" });
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  const handleCreate = async () => {
    const { name, email, role, password } = form;
    await createUser({ variables: { createUserInput: { name, email, role, password } } });
    refetch();
    setForm({ id: "", name: "", email: "", role: "", password: "" });
  };

  const handleUpdate = async () => {
    const { id, name, email, role } = form;
    await updateUser({ variables: { id, updateUserInput: { name, email, role } } });
    refetch();
    setForm({ id: "", name: "", email: "", role: "", password: "" });
    setEditModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteUser({ variables: { id } });
    refetch();
  };

  return (
    <PrivateRoute>
  <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-700 text-center mb-8">
        User Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Form */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4  text-gray-700 ">
            {form.id ? "Edit User" : "Create User"}
          </h2>
          <input
            className="w-full p-3 mb-4 bg-white border  text-gray-700  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="w-full p-3 mb-4 bg-white  text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <select
            className="w-full p-3 mb-4 bg-white  text-gray-700  border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>

          <input
            className="w-full p-3 mb-4 bg-white  text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            onClick={form.id ? handleUpdate : handleCreate}
            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-200"
          >

            {form.id ? "Update User" : "Create User"}
          </button>
          <button
              onClick={() => {
                setEditModalOpen(false);
                setForm({ id: "", name: "", email: "", role: "", password: "" });
              }}
              className="w-full mt-2 text-gray-500 hover:underline text-center"
            >
              Cancel
            </button>
        </div>

        {/* Right Side: Users List */}
        <div className="bg-white p-6 shadow-md rounded-lg   ">
          <h2 className="text-xl  text-gray-700  font-semibold mb-4">Users List</h2>
          <div className="space-y-4 max-h-[80vh] overflow-y-auto">
            {data.getUsers.map((user: any) => (
              <div
                key={user.id}
                className="flex justify-between overflow-scroll items-center bg-gray-200 p-4 rounded-md shadow-md hover:bg-gray-100 transition duration-200"
              >
                <div>
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-gray-600 text-sm">
                    {user.email} ({user.role})
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      console.log(user)
                      setForm(user);
                      setEditModalOpen(true);
                    }}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold  text-gray-700 mb-4">Edit User</h2>
            <input
              className="w-full p-3 mb-4 border  bg-white  text-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="w-full p-3 mb-4 border  bg-white  text-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <button
              onClick={handleUpdate}
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
            >
              Update User
            </button>
            <button
              onClick={() => {
                setEditModalOpen(false);
                setForm({ id: "", name: "", email: "", role: "", password: "" });
              }}
              className="w-full mt-2 text-gray-500 hover:underline text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <Link href="/admin" className="block text-center mt-8 text-blue-500 hover:underline">
        Go Back
      </Link>
    </div>
    </PrivateRoute>
  
  );
};

export default UsersCRUD;
