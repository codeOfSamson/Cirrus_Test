"use client";

import React from "react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Employee Review App</h1>

      <div style={styles.hero}>
        <img
          src="https://t2binteriors.com/wp-content/uploads/2022/02/elevated-view-of-a-busy-open-plan-office-2021-08-26-16-14-58-utc.jpg" 
          alt="Modern Office"
          style={styles.heroImage}
        />
      
      </div>
      <div style={styles.overlay}>
          <p style={styles.description}>
            A seamless solution to manage employee reviews and feedback. Empower your team with transparency and insights!
          </p>
        </div>
      {/* Navigation Links */}
      <div style={styles.linksContainer}>
        <Link href="/employee">
          <button style={styles.button}>Employee Portal</button>
        </Link>
        <Link href="/admin">
          <button style={styles.buttonSecondary}>Admin Panel</button>
        </Link>
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    color: "#333",
    textAlign: "center" as const,
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
  },
  hero: {
    position: "relative" as const,
    width: "100%",
    height: "60vh",
    overflow: "hidden" as const,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },
  overlay: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    padding: "20px 40px",
    borderRadius: "8px",
  },
  title: {
    fontSize: "36px",
    marginBottom: "10px",
    fontWeight: "bold" as const,
  },
  description: {
    fontSize: "18px",
    lineHeight: "1.5",
    margin: 0,
  },
  linksContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    margin: "40px 0",
  },
  button: {
    padding: "15px 30px",
    fontSize: "18px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s",
  },
  buttonSecondary: {
    padding: "15px 30px",
    fontSize: "18px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s",
  },
};

export default LandingPage;
