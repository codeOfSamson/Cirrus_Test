"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

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

const EditReviewPage = () => {
  const searchParams = useSearchParams();
  const reviewData = searchParams.get("review");

  const review = reviewData ? JSON.parse(reviewData) : null;

  const [updateReview, { loading: updateLoading }] = useMutation(UPDATE_REVIEW);
  const [updatedReview, setUpdatedReview] = useState(review);

  if (!review)
    return (
      <p style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
        Error: No review data provided!
      </p>
    );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdatedReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

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
      window.history.back()
    } catch (error) {
      alert("Error updating review: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Edit Review</h1>
      <form onSubmit={handleUpdate} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Reviewer:</label>
          <input
            type="text"
            name="reviewer"
            value={updatedReview.reviewer}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Reviewee:</label>
          <input
            type="text"
            name="reviewee"
            value={updatedReview.reviewee}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Feedback:</label>
          <textarea
            name="feedback"
            value={updatedReview.feedback}
            onChange={handleInputChange}
            style={styles.textarea}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Status:</label>
          <select
            name="status"
            value={updatedReview.status}
            onChange={handleInputChange}
            style={styles.select}
          >
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
        <button type="submit" disabled={updateLoading} style={styles.button}>
          {updateLoading ? "Updating..." : "Update Review"}
        </button>
      </form>
    </div>
  );
};

export default EditReviewPage;

const styles= {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
    fontSize: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    transition: "border-color 0.3s",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    resize: "none",
    height: "100px",
    transition: "border-color 0.3s",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#45a049",
  },
};

// Add hover effect to the button dynamically
styles.button[":hover"] = {
  backgroundColor: "#45a049",
};
