"use client";

import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import Link from "next/link";

// GraphQL Queries and Mutations
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

const CREATE_REVIEW = gql`
  mutation CreateReview($createReviewDto: CreateReviewDto!) {
    createReview(createReviewDto: $createReviewDto) {
      id
      reviewer
      reviewee
      feedback
      status
    }
  }
`;

const UPDATE_REVIEW = gql`
  mutation UpdateReview($id: String!, $updateReviewDto: UpdateReviewDto!) {
    updateReview(id: $id, updateReviewDto: $updateReviewDto) {
      id
      reviewer
      reviewee
      feedback
      status
    }
  }
`;

const DELETE_REVIEW = gql`
  mutation DeleteReview($id: String!) {
    deleteReview(id: $id)
  }
`;

const ReviewsCRUD = () => {
  const { loading, error, data, refetch } = useQuery(GET_REVIEWS);
  const [createReview] = useMutation(CREATE_REVIEW);
  const [updateReview] = useMutation(UPDATE_REVIEW);
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const [form, setForm] = useState({
    id: "",
    reviewer: "",
    reviewee: "",
    feedback: "",
    status: "",
  });

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error loading reviews: {error.message}</p>;

  const handleCreate = async () => {
    const { reviewer , reviewee, feedback} = form
    await createReview({ variables: { createReviewDto: {reviewer , reviewee, feedback} } });
    refetch();
    setForm({ id: "", reviewer: "", reviewee: "", feedback: "", status: "" });
  };

  const handleUpdate = async () => {
    const { id, reviewer , reviewee, feedback, status} = form
    await updateReview({ variables: { id: form.id, updateReviewDto: {reviewer , reviewee, feedback, status} } });
    refetch();
    setForm({ id: "", reviewer: "", reviewee: "", feedback: "", status: "" });
  };

  const handleDelete = async (id: string) => {
    await deleteReview({ variables: { id } });
    refetch();
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center mb-8">Review Management</h1>

      <ul className="space-y-4">
        {data.getAllReviews.map((review: any) => (
          <li key={review.id} className="flex justify-between items-center p-4 bg-white border rounded-md shadow-sm">
            <span className={`w-3 h-3 rounded-full mr-4 ${review.status === "PENDING" ? "bg-red-500" : "bg-green-500"}`}></span>
            <span className="flex-grow">
              <strong>Reviewer:</strong> {review.reviewer} - <strong>Reviewee:</strong> {review.reviewee} -{" "}
              <strong>Status:</strong> {review.status}
            </span>
            <div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
                onClick={() => setForm(review)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={() => handleDelete(review.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{form.id ? "Update Review" : "Create Review"}</h2>

        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Reviewer"
          value={form.reviewer}
          onChange={(e) => setForm({ ...form, reviewer: e.target.value })}
        />
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Reviewee"
          value={form.reviewee}
          onChange={(e) => setForm({ ...form, reviewee: e.target.value })}
        />
        <textarea
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Feedback"
          value={form.feedback}
          onChange={(e) => setForm({ ...form, feedback: e.target.value })}
        />
        {form.id && (
          <input
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Status: 'PENDING' or 'COMPLETED'"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          />
        )}
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

export default ReviewsCRUD;
