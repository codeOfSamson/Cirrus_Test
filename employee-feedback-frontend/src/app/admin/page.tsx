"use client";

import React, { useState } from "react";
import Link from "next/link";

const AdminLandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ username: "admin", password: "password" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock login validation
    if (credentials.username === "admin" && credentials.password === "password") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid username or password. Try 'admin' and 'password'.");
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={styles.loginContainer}>
        <h1 style={styles.title}>Admin Login 'mockup'</h1>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            placeholder="Username: Hint: 'admin'"
            value='admin'
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password: Hint: 'passowrd"
            value='password'
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
          <button style={styles.button} type="submit">
            Login
          </button>
        </form>
        <Link href="/">Go to Home Page</Link>

      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome to the Admin Panel</h1>
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Manage Users</h2>
          <p style={styles.cardDescription}>Create, update, delete, and view employee records.</p>
          <Link href="/admin/employees">
            <button style={styles.cardButton}>Go to User Management</button>
          </Link>
        </div>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Manage Reviews</h2>
          <p style={styles.cardDescription}>Create, update, delete, and view performance reviews.</p>
          <Link href="/admin/reviews">
            <button style={styles.cardButton}>Go to Review Management</button>
          </Link>
        </div>
      </div>
      <Link href="/">Go to Home Page</Link>

    </div>
  );
};

// Inline Styles
const styles = {
  loginContainer: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    width: "300px",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    textAlign: "center" as const,
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  header: {
    fontSize: "32px",
    marginBottom: "30px",
    color: "#333",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap" as const,
  },
  card: {
    width: "300px",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    textAlign: "center" as const,
  },
  cardTitle: {
    fontSize: "20px",
    marginBottom: "10px",
    color: "#007bff",
  },
  cardDescription: {
    fontSize: "14px",
    marginBottom: "20px",
    color: "#555",
  },
  cardButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default AdminLandingPage;
