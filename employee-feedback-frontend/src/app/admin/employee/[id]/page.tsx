"use client";

import React from "react";
import { useRouter } from "next/router";

const EmployeeDetailPage = () => {
  const router = useRouter();
  const { data } = router.query;

  // Ensure data is a string before parsing
  if (!data || typeof data !== "string") {
    return <p>Error: Invalid or missing data</p>;
  }

  const employee = JSON.parse(data);

  return (
    <div>
      <h1>Employee Details</h1>
      <p>
        <strong>Name:</strong> {employee.name}
      </p>
      <p>
        <strong>Email:</strong> {employee.email}
      </p>
      <p>
        <strong>Role:</strong> {employee.role}
      </p>
      <button onClick={() => router.back()}>Go Back</button>
    </div>
  );
};

export default EmployeeDetailPage;
