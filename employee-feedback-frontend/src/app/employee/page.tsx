"use client";

import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

// GraphQL queries
const GET_EMPLOYEES = gql`
  query GetUsers {
    getUsers {
      id
      name
      email
      role
    }
  }
`;

const GET_ALL_REVIEWS = gql`
  query GetAllReviews {
    getAllReviews {
      id
      reviewer
      reviewee
      feedback
      status
    }
  }
`;

const EmployeeLandingPage = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  // Fetch employees
  const { loading: employeesLoading, error: employeesError, data: employeeData } = useQuery(GET_EMPLOYEES);

  // Fetch all reviews
  const { loading: reviewsLoading, error: reviewsError, data: reviewData } = useQuery(GET_ALL_REVIEWS);

  if (employeesLoading || reviewsLoading) return <p>Loading...</p>;
  if (employeesError) return <p>Error: {employeesError.message}</p>;
  if (reviewsError) return <p>Error: {reviewsError.message}</p>;

  const handleEmployeeClick = (employee: any) => {
    setSelectedEmployee(employee);
  };

  const handleEditReviewLink = (review: any) => {
    return `/employee/edit-review?review=${encodeURIComponent(JSON.stringify(review))}`;
  };

  // Filter reviews based on selected employee
  const filteredReviews =
    selectedEmployee &&
    reviewData.getAllReviews.filter(
      (review: any) =>
        review.reviewer === selectedEmployee.name || review.reviewee === selectedEmployee.name
    );

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Employees (Select one)</h1>
      <ul style={styles.list}>
        {employeeData.getUsers.map((employee: any) => (
          <li
            key={employee.id}
            style={styles.listItem}
            onClick={() => handleEmployeeClick(employee)}
          >
            {employee.name} ({employee.role})
          </li>
        ))}
      </ul>

      {selectedEmployee && (
        <div style={styles.reviewsSection}>
          <h2 style={styles.subheading}>Reviews for {selectedEmployee.name}</h2>
          {filteredReviews && filteredReviews.length > 0 ? (
            <ul style={styles.reviewsList}>
              {filteredReviews.map((review: any) => (
                <li key={review.id} style={styles.reviewItem}>
                  <span
                    style={{
                      ...styles.statusIcon,
                      backgroundColor:
                        review.status === "PENDING" ? "red" : "green",
                    }}
                  ></span>
                  <strong>Reviewee:</strong> {review.reviewee}
                  <strong>Reviewer:</strong> {review.reviewer}
                  <strong> Status:</strong> {review.status}
                  <Link href={handleEditReviewLink(review)}>
                    <button style={styles.editButton}>Edit</button>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews found for {selectedEmployee.name}</p>
          )}
        </div>
      )}
    
    </div>
  );
};

// Styling
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
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
  heading: {
    fontSize: "32px",
    textAlign: "center" as const,
    marginBottom: "20px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    padding: "10px 15px",
    margin: "5px 0",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center" as const,
    transition: "background-color 0.3s",
  },
  listItemHover: {
    backgroundColor: "#0056b3",
  },
  reviewsSection: {
    marginTop: "30px",
    textAlign: "left" as const,
  },
  subheading: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  reviewsList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  reviewItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#e3e3e3",
    padding: "10px 15px",
    margin: "5px 0",
    borderRadius: "5px",
  },
  statusIcon: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    marginRight: "10px",
    display: "inline-block",
  },
  editButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
};

export default EmployeeLandingPage;
