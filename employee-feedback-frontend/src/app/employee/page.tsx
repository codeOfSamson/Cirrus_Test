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
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-4xl text-center text-gray-800 mb-8">Employees (Select one)</h1>
      <ul className="list-none p-0 m-0">
        {employeeData.getUsers.map((employee: any) => (
          <li
            key={employee.id}
            onClick={() => handleEmployeeClick(employee)}
            className="p-3 mb-4 bg-blue-600 text-white text-center cursor-pointer rounded-lg hover:bg-blue-700 transition-colors"
          >
            {employee.name} ({employee.role})
          </li>
        ))}
      </ul>

      {selectedEmployee && (
        <div className="mt-8 text-left">
          <h2 className="text-2xl mb-4  text-black">Reviews for {selectedEmployee.name}</h2>
          {filteredReviews && filteredReviews.length > 0 ? (
            <ul className="list-none p-0 m-0">
              {filteredReviews.map((review: any) => (
                <li
                  key={review.id}
                  className="flex items-center text-black justify-between p-4 mb-4 bg-gray-200 rounded-lg"
                >
                  <span
                    className={`w-3 h-3 rounded-full mr-4 inline-block ${
                      review.status === "PENDING" ? "bg-red-500" : "bg-green-500"
                    }`}
                  ></span>
                  <div>
                    <strong>Reviewee:</strong> {review.reviewee} <br />
                    <strong>Reviewer:</strong> {review.reviewer} <br />
                    <strong>Status:</strong> {review.status}
                  </div>
                  <Link href={handleEditReviewLink(review)}>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
                      Edit
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews found for {selectedEmployee.name}</p>
          )}
        </div>
      )}

      <Link href="/" className="mt-6 block text-center text-blue-500 hover:underline">
        Go to Home Page
      </Link>
    </div>
  );
};

export default EmployeeLandingPage;
