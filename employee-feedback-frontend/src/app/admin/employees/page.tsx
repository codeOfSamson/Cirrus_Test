"use client";

import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import Link from 'next/link';

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

  console.log(data)

  const [form, setForm] = useState({ id: "", name: "", email: "", role: "" });

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  const handleCreate = async () => {
    const {name , email, role} = form
    await createUser({ variables: { createUserInput: {name, email, role } } });
    refetch();
    setForm({ id: "", name: "", email: "", role: "" });
  };

  const handleUpdate = async () => {
    const {id, name , email, role} = form

    await updateUser({ variables: { id: form.id, updateUserInput: {name, email, role} } });
    refetch();
    setForm({ id: "", name: "", email: "", role: "" });
  };

  const handleDelete = async (id: string) => {
    await deleteUser({ variables: { id } });
    refetch();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>User Management</h1>
      <ul style={styles.list}>
        {data.getUsers.map((user: any) => (
          <li key={user.id} style={styles.listItem}>
            <span>
              {user.name} - {user.email} ({user.role})
            </span>
            <div>
              <button style={styles.button} onClick={() => setForm(user)}>
                Edit
              </button>
              <button style={styles.buttonDelete} onClick={() => handleDelete(user.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div style={styles.formContainer}>
        <h2 style={styles.formHeader}>{form.id ? "Update User" : "Create User"}</h2>
        <input
          style={styles.input}
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Role : 'admin' or 'employee'"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />
        <button style={styles.buttonPrimary} onClick={form.id ? handleUpdate : handleCreate}>
          {form.id ? "Update" : "Create"}
        </button>
      </div>
      <Link href="/">Go to Home Page</Link>

    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    maxWidth: "800px",
    margin: "auto",
    borderRadius: "8px",
    border: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  list: {
    listStyle: "none",
    padding: "0",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#fff",
  },
  button: {
    marginLeft: "10px",
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  buttonDelete: {
    backgroundColor: "#dc3545",
    marginLeft: "10px",
  },
  formContainer: {
    marginTop: "20px",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  formHeader: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  buttonPrimary: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default UsersCRUD;


