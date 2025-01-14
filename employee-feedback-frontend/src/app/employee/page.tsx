"use client";

import React, { useContext, useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import ReviewCard from "../components/ReviewCard";
import AwesomeStarsRating from "react-awesome-stars-rating";

// GraphQL Queries
const GET_ALL_REVIEWS = gql`
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

const UPDATE_REVIEW_MUTATION = gql`
  mutation UpdateReview($id: String!, $updateReviewDto: UpdateReviewDto!) {
    updateReview(id: $id, updateReviewDto: $updateReviewDto) {
      id
      feedback
      status
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
    }
  }
`;


const EmployeeLandingPage = () => {
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [editableFeedback, setEditableFeedback] = useState<string>("");
  console.log(1, selectedReview)
  const [user, setUser] = useState({ username: "", isLoggedIn: false, role: "" });
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    if (token && username && role) {
      setUser({ username, isLoggedIn: true, role });
    }
  }, []);

  // Fetch reviews
  const { loading, error, data, refetch } = useQuery(GET_ALL_REVIEWS);
console.log(data)
  // Mutation for updating reviews
  const [updateReview] = useMutation(UPDATE_REVIEW_MUTATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!user.isLoggedIn) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg text-red-600">You must be logged in to view this page.</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Go to Home Page
        </Link>
      </div>
    );
  }

  const reviewsAsReviewer = data.getAllReviews.filter(
    (review: any) => review.reviewer.name === user.username
  );

  const reviewsAsReviewee = data.getAllReviews.filter(
    (review: any) => review.reviewee.name === user.username
  );

  const handleSaveChanges = async () => {
    if (!selectedReview) return;

    try {
      await updateReview({
        variables: {
          id: selectedReview.id,
          updateReviewDto:{
            reviewer: selectedReview.reviewer.id,
            reviewee: selectedReview.reviewee.id,
            status:  editableFeedback !== "" ? 'COMPLETED': "PENDING", 
            feedback: editableFeedback, 
          }
        },
      });
      await refetch();
      setSelectedReview(null); 
    } catch (err) {
      console.error("Failed to update review:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 text-gray-700 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Your Reviews</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reviews Written */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Reviews You Wrote</h2>
          {reviewsAsReviewer.length > 0 ? (
            <ul className="space-y-4 max-h-[70vh] overflow-y-auto">
              {reviewsAsReviewer.map((review: any) => (
                  <ReviewCard
                  key={review.id}
                  reviewerName={review?.reviewer?.name}
                  revieweeName={review?.reviewee?.name}
                  status={review.status}
                  rating={review?.rating}
                  onClick={() => {
                    setSelectedReview(review);
                    setEditableFeedback(review.feedback); // Load existing feedback into state
                  }}
                />
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">You haven't written any reviews yet.</p>
          )}
        </div>

        {/* Reviews Received */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Reviews About You</h2>
          {reviewsAsReviewee.length > 0 ? (
            <ul className="space-y-4 max-h-[70vh] overflow-y-auto">
              {reviewsAsReviewee.map((review: any) => (
                   <ReviewCard
                   key={review.id}
                   reviewerName={review?.reviewer?.name}
                   revieweeName={review?.reviewee?.name}
                   status={review.status}
                   rating={review?.rating}
                   onClick={() => {
                     setSelectedReview(review);
                     setEditableFeedback(review.feedback); // Load existing feedback into state
                   }}
                 />

              ))}
            </ul>
          ) : (
            <p className="text-gray-600">You have no reviews yet.</p>
          )}
        </div>
      </div>

      {/* Modal for Editing Review */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Edit Review
            </h3>
            <p className="text-gray-700">
              <strong>Reviewer:</strong> {selectedReview.reviewer.name}
            </p>
            <p className="text-gray-700">
              <strong>Reviewee:</strong> {selectedReview.reviewee.name}
            </p>

            <p>
              <strong>Rating:</strong>
              <AwesomeStarsRating
          value={selectedReview.rating}
          size={20}
          isEdit={true}
          onChange={(e:any)=>{console.log(selectedReview.rating)}}
          className="flex items-center space-x-1 text-yellow-400"
        />
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  selectedReview.status === "PENDING" ? "text-red-500" : "text-green-500"
                }`}
              >
                {selectedReview.status}
              </span>
            </p>
            <textarea
              className="w-full p-3 bg-white text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={editableFeedback ? editableFeedback : selectedReview.feedback}
              readOnly={selectedReview.reviewee.name === user.username}

              onChange={(e) => setEditableFeedback(e.target.value)}
            />
            <div className="flex justify-end space-x-4 mt-4">
            
            {selectedReview.reviewer.name === user.username && selectedReview.reviewee.name !== user.username && (
                  <button
                    onClick={handleSaveChanges}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                  >
                    Save Changes
                  </button>
                )}
              <button
                onClick={() => setSelectedReview(null)}
                className="mt-4 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
            {selectedReview.reviewee.name === user.username ? null :  <button
              onClick={() => setSelectedReview(null)}
              disabled={selectedReview.reviewee.name === user.username}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>}
           
          </div>
        </div>
      )}
    
    </div>
  );
};

export default EmployeeLandingPage;
