"use client";

import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

// Define GraphQL queries
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

const GET_REVIEWS = gql`
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

// Employee details child component
const EmployeeDetails = ({ employee, onBack }: { employee: any; onBack: () => void }) => {
  return (
    <div>
      <h2>Employee Details</h2>
      <p>
        <strong>Name:</strong> {employee.name}
      </p>
      <p>
        <strong>Email:</strong> {employee.email}
      </p>
      <p>
        <strong>Role:</strong> {employee.role}
      </p>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

// Review details child component
const ReviewDetails = ({ review, onBack }: { review: any; onBack: () => void }) => {
  return (
    <div>
      <h2>Review Details</h2>
      <p>
        <strong>Reviewer:</strong> {review.reviewer}
      </p>
      <p>
        <strong>Reviewee:</strong> {review.reviewee}
      </p>
      <p>
        <strong>Feedback:</strong> {review.feedback}
      </p>
      <p>
        <strong>Status:</strong> {review.status}
      </p>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

// Main Admin Page
const AdminPage = () => {
  const { loading: usersLoading, error: usersError, data: userData } = useQuery(GET_USERS);
  const { loading: reviewsLoading, error: reviewsError, data: reviewData } = useQuery(GET_REVIEWS);

  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);
  const [selectedReview, setSelectedReview] = useState<any | null>(null);

  if (usersLoading || reviewsLoading) return <p>Loading...</p>;
  if (usersError) return <p>Error loading users: {usersError.message}</p>;
  if (reviewsError) return <p>Error loading reviews: {reviewsError.message}</p>;

  // Render child component if an employee or review is selected
  if (selectedEmployee) {
    return <EmployeeDetails employee={selectedEmployee} onBack={() => setSelectedEmployee(null)} />;
  }

  if (selectedReview) {
    return <ReviewDetails review={selectedReview} onBack={() => setSelectedReview(null)} />;
  }

  // Render the main admin page with employees and reviews lists
  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Employees Section */}
      <div>
        <h2>Employee List</h2>
        <ul>
          {userData.getUsers.map((user: any) => (
            <li key={user.id}>
              <button onClick={() => setSelectedEmployee(user)}>
                {user.name} - {user.email} ({user.role})
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Reviews Section */}
      <div>
        <h2>Reviews List</h2>
        <ul>
          {reviewData.getAllReviews.map((review: any) => (
            <li key={review.id}>
              <button onClick={() => setSelectedReview(review)}>
                Reviewer: {review.reviewer}, Reviewee: {review.reviewee} ({review.status})
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
