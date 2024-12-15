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

  const [isEditModalOpen, setEditModalOpen] = useState(false);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error loading reviews: {error.message}</p>;

  const handleCreate = async () => {
    const { reviewer, reviewee, feedback } = form;
    await createReview({
      variables: { createReviewDto: { reviewer, reviewee, feedback } },
    });
    refetch();
    setForm({ id: "", reviewer: "", reviewee: "", feedback: "", status: "" });
  };

  const handleUpdate = async () => {
    const { id, reviewer, reviewee, feedback, status } = form;
    await updateReview({
      variables: { id, updateReviewDto: { reviewer, reviewee, feedback, status } },
    });
    refetch();
    setForm({ id: "", reviewer: "", reviewee: "", feedback: "", status: "" });
    setEditModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteReview({ variables: { id } });
    refetch();
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-700 text-center mb-8">
        Review Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Form */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            {form.id ? "Edit Review" : "Create Review"}
          </h2>
          <input
            className="w-full p-3 mb-4 bg-white  text-gray-700 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Reviewer"
            value={form.reviewer}
            onChange={(e) => setForm({ ...form, reviewer: e.target.value })}
          />
          <input
            className="w-full p-3 mb-4 bg-white  text-gray-700 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Reviewee"
            value={form.reviewee}
            onChange={(e) => setForm({ ...form, reviewee: e.target.value })}
          />
          <textarea
            className="w-full p-3 mb-4 bg-white  text-gray-700 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Feedback"
            value={form.feedback}
            onChange={(e) => setForm({ ...form, feedback: e.target.value })}
          />
          {form.id && (
            <input
              className="w-full p-3 mb-4 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Status: PENDING or COMPLETED"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            />
          )}
          <button
            onClick={form.id ? handleUpdate : handleCreate}
            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-200"
          >
            {form.id ? "Update Review" : "Create Review"}
          </button>
        </div>

        {/* Right Side: Reviews List */}
        <div className="bg-white p-6 shadow-lg rounded-lg max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 bg-white  text-gray-700">Reviews List</h2>
          <div className="space-y-4">
            {data.getAllReviews.map((review: any) => (
              <div
                key={review.id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm hover:bg-gray-200 transition duration-200"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    Reviewer: {review.reviewer}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Reviewee: {review.reviewee}
                  </p>
                  <p className="text-sm">
                    Status:{" "}
                    <span
                      className={`font-semibold ${
                        review.status === "PENDING"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {review.status}
                    </span>
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setForm(review);
                      setEditModalOpen(true);
                    }}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
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

      <Link
        href="/admin"
        className="block text-center mt-8 text-blue-500 hover:underline"
      >
        Go Back
      </Link>
    </div>
  );
};

export default ReviewsCRUD;
