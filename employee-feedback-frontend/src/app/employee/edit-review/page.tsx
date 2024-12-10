"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Link from "next/link";

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

interface Review {
  id: string;
  reviewer: string;
  reviewee: string;
  feedback: string;
  status: string;
}

const EditReviewContent = () => {
  const searchParams = useSearchParams();
  const reviewData = searchParams.get("review");

  const review: Review | null = reviewData ? JSON.parse(reviewData) : null;

  const [updateReview, { loading: updateLoading }] = useMutation(UPDATE_REVIEW);
  const [updatedReview, setUpdatedReview] = useState<Review | null>(review);

  if (!review)
    return (
      <p className="text-center text-red-500 mt-5">
        Error: No review data provided!
      </p>
    );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedReview((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!updatedReview) {
      alert("Error: No review data to update!");
      return;
    }

    try {
      await updateReview({
        variables: {
          id: updatedReview.id,
          updateReviewDto: {
            reviewer: updatedReview.reviewer,
            reviewee: updatedReview.reviewee,
            feedback: updatedReview.feedback,
            status: updatedReview.status,
          },
        },
      });
      alert("Review updated successfully!");
      window.history.back();
    } catch (err: any) {
      alert("Error updating review: " + err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md font-sans">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-8">Edit Review</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="text-gray-600 font-semibold mb-2">Reviewer:</label>
          <input
            type="text"
            name="reviewer"
            value={updatedReview?.reviewer || ""}
            onChange={handleInputChange}
            className="p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-semibold mb-2">Reviewee:</label>
          <input
            type="text"
            name="reviewee"
            value={updatedReview?.reviewee || ""}
            onChange={handleInputChange}
            className="p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-semibold mb-2">Feedback:</label>
          <textarea
            name="feedback"
            value={updatedReview?.feedback || ""}
            onChange={handleInputChange}
            className="p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-semibold mb-2">Status:</label>
          <select
            name="status"
            value={updatedReview?.status || "PENDING"}
            onChange={handleInputChange}
            className="p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={updateLoading}
          className="mt-4 p-3 text-lg font-bold text-white bg-green-500 rounded-md hover:bg-green-600 disabled:bg-gray-400"
        >
          {updateLoading ? "Updating..." : "Update Review"}
        </button>
      </form>
      <Link href="/employee" className="mt-4 block text-center text-blue-500 hover:underline">
        Go Back
      </Link>
    </div>
  );
};

const EditReviewPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EditReviewContent />
  </Suspense>
);

export default EditReviewPage;
