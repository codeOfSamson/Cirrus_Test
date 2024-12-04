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
    <div style={styles.container}>
      <h1 style={styles.header}>Review Management</h1>
      <ul style={styles.list}>
        {data.getAllReviews.map((review: any) => (
          <li key={review.id} style={styles.listItem}>
                      <span
                    style={{
                      ...styles.statusIcon,
                      backgroundColor:
                        review.status === "PENDING" ? "red" : "green",
                    }}
                  ></span>
            <span>
              <strong>Reviewer:</strong> {review.reviewer} - <strong>Reviewee:</strong> {review.reviewee} -{" "}
              <strong>Status:</strong> {review.status}
            </span>
            <div>
              <button style={styles.button} onClick={() => setForm(review)}>
                Edit
              </button>
              <button style={styles.buttonDelete} onClick={() => handleDelete(review.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div style={styles.formContainer}>
        <h2 style={styles.formHeader}>{form.id ? "Update Review" : "Create Review"}</h2>
        <input
          style={styles.input}
          placeholder="Reviewer"
          value={form.reviewer}
          onChange={(e) => setForm({ ...form, reviewer: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Reviewee"
          value={form.reviewee}
          onChange={(e) => setForm({ ...form, reviewee: e.target.value })}
        />
        <textarea
          style={styles.input}
          placeholder="Feedback"
          value={form.feedback}
          onChange={(e) => setForm({ ...form, feedback: e.target.value })}
        />
         {form.id ?   <input
          style={styles.input}
          placeholder="Status: 'PENDING' or 'COMPLETED'"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        />: ""}
      
        <button style={styles.buttonPrimary} onClick={form.id ? handleUpdate : handleCreate}>
          {form.id ? "Update" : "Create"}
        </button>
      </div>
      <Link href="/admin">Go Back</Link>

    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    maxWidth: "800px",
    margin: "auto",
    borderRadius: "8px",
    border: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  list: {
    listStyle: "none",
    padding: "0",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#fff",
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
  buttonDelete: {
    backgroundColor: "#dc3545",
    marginLeft: "10px",
  },
  formContainer: {
    marginTop: "20px",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  formHeader: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  buttonPrimary: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  statusIcon: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    marginRight: "10px",
    display: "inline-block",
  }
};

export default ReviewsCRUD;
