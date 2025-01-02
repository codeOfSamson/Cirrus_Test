"use client";

import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import Link from "next/link";
import PrivateRoute from "@/app/components/PrivateRoute";

// GraphQL Queries and Mutations
const GET_REVIEWS = gql`
 query {
  getAllReviews {
    id
    reviewer {
      id
      name
      email
    }
    reviewee {
      id
      name
      email
    }
    status
    feedback
    rating
  }
}
`;

const GET_EMPLOYEES = gql`
  query {
    getUsers {
      id
      name
    }
  }
`;

const CREATE_REVIEW = gql`
  mutation CreateReview($createReviewDto: CreateReviewDto!) {
    createReview(createReviewDto: $createReviewDto) {
      id
      feedback
      status
    }
  }
`;

const UPDATE_REVIEW = gql`
  mutation UpdateReview($id: String!, $updateReviewDto: UpdateReviewDto!) {
    updateReview(id: $id, updateReviewDto: $updateReviewDto) {
      id
      reviewer {
        id
        name
        email
      }
      reviewee {
        id
        name
        email
      }
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
  const { loading: employeesLoading, error: employeesError, data: employeesData } = useQuery(GET_EMPLOYEES);
  const [createReview] = useMutation(CREATE_REVIEW);
  const [updateReview] = useMutation(UPDATE_REVIEW);
  const [deleteReview] = useMutation(DELETE_REVIEW);

  console.log(employeesData)
  const [form, setForm] = useState({
    id: "",
    reviewer: "",
    reviewee: "",
    feedback: "",
    status: "",
  });

  const [isEditModalOpen, setEditModalOpen] = useState(false);

  if (loading || employeesLoading) return <p>Loading...</p>;
  if (error || employeesError) return <p>Error: {error?.message || employeesError?.message}</p>;

  const handleCreate = async () => {
    const { reviewer, reviewee, feedback } = form;

    if (!reviewer || !reviewee) {
      alert("Please select both a reviewer and reviewee.");
      return;
    }

    await createReview({
      variables: { createReviewDto: { reviewer, reviewee, feedback, status: "PENDING", rating : 0 } },
    });

    refetch();
    setForm({ id: "", reviewer: "", reviewee: "", feedback: "", status: "" });
  };

  const handleUpdate = async () => {
    const { id, feedback } = form;
    const status = feedback === "" ? "PENDING" : "COMPLETED";

    await updateReview({
      variables: { id, updateReviewDto: { reviewer: form.reviewer, reviewee: form.reviewee, feedback, status } },
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
    <PrivateRoute>
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

          <div className="mb-4">
            <label className="block mb-2 text-gray-600">Reviewer</label>
            <select
              className="w-full p-3 bg-white text-gray-600 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={form.reviewer}
              onChange={(e) => setForm({ ...form, reviewer: e.target.value })}
            >
              <option value="">Select Reviewer</option>
              {employeesData?.getUsers?.map((user: { id: string; name: string }) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-600">Reviewee</label>
            <select
              className="w-full p-3 text-gray-600 bg-white border rounded-md focus:ring-2 focus:ring-blue-500"
              value={form.reviewee}
              onChange={(e) => setForm({ ...form, reviewee: e.target.value })}
            >
              <option value="">Select Reviewee</option>
              {employeesData?.getUsers?.map((user: { id: string; name: string }) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <textarea
            className="w-full p-3 mb-4 bg-white text-gray-700 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Feedback"
            value={form.feedback}
            onChange={(e) => setForm({ ...form, feedback: e.target.value })}
          />

          <button
            onClick={form.id ? handleUpdate : handleCreate}
            className="w-full bg-green-500 mb-2 text-white py-3 rounded-md hover:bg-green-600 transition duration-200"
          >
            {form.id ? "Update Review" : "Create Review"}
          </button>
          <button
            onClick={() =>
              setForm({ id: "", reviewer: "", reviewee: "", feedback: "", status: "" })
            }
            className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-700 transition duration-200"
          >
            Cancel
          </button>
        </div>

        {/* Right Side: Reviews List */}
        <div className="bg-white p-6 shadow-lg rounded-lg max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 bg-white text-gray-700">Reviews List</h2>
          <div className="space-y-4">
            {data.getAllReviews.map((review: any) => (
              <div
                key={review.id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm hover:bg-gray-200 transition duration-200"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    Reviewer: {review?.reviewer.name}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Reviewee: {review?.reviewee.name}
                  </p>
                  <p className="text-sm">
                    Status: {" "}
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
                      setForm({
                        id: review?.id,
                        reviewer: review?.reviewer.id,
                        reviewee: review?.reviewee.id,
                        feedback: review?.feedback,
                        status: review?.status,
                      });
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

      <button
        onClick={() => window.history.back()}
        className="block text-center mt-8 text-blue-500 hover:underline"
      >
        Go Back
      </button>
    </div>
    </PrivateRoute>
   
  );
};

export default ReviewsCRUD;
