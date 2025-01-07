"use client";

import React, { useState } from "react";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import PrivateRoute from "../components/PrivateRoute";

interface AuditLog {
  id: string;
  resource: string;
  resourceId: string;
  details: string;
  createdAt: string;
  updatedAt: string;
}

const AdminLandingPage = () => {
  const GET_AUDIT_LOGS = gql`
    query {
      getAuditLogs {
        id
        resource
        resourceId
        details
        createdAt
        updatedAt
      }
    }
  `;

  const { loading, error, data } = useQuery<{ getAuditLogs: AuditLog[] }>(GET_AUDIT_LOGS);

  const [showTable, setShowTable] = useState(false);
  const [sortKey, setSortKey] = useState<keyof AuditLog>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const toggleTable = () => setShowTable((prev) => !prev);

  const sortedLogs = data?.getAuditLogs.slice().sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key: keyof AuditLog) => {
    setSortKey(key);
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching audit logs</p>;

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Welcome to the Admin Panel
        </h1>

        <div className="flex flex-wrap justify-center gap-8">
          {/* User Management Card */}
          <div className="w-80 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Manage Users</h2>
            <p className="text-gray-600 mb-6">
              Create, update, delete, and view employee records.
            </p>
            <Link href="/admin/employees">
              <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
                Go to User Management
              </button>
            </Link>
          </div>

          {/* Review Management Card */}
          <div className="w-80 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Manage Reviews</h2>
            <p className="text-gray-600 mb-6">
              Create, update, delete, and view performance reviews.
            </p>
            <Link href="/admin/reviews">
              <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
                Go to Review Management
              </button>
            </Link>
          </div>
        </div>

        <div className="text-center mt-10">
          <button
            onClick={toggleTable}
            className="w-80 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
          >
            {showTable ? "Hide Audit Logs" : "Show Audit Logs"}
          </button>

          {showTable && (
            <div className="mt-4 max-h-[80vh] overflow-auto">
              <table className="min-w-full border-collapse border text-black border-gray-300">
                <thead>
                  <tr>
                    <th
                      onClick={() => handleSort("resource")}
                      className="border border-gray-300 px-4 py-2 cursor-pointer"
                    >
                      Resource
                    </th>
                    <th
                      onClick={() => handleSort("details")}
                      className="border border-gray-300 px-4 py-2 cursor-pointer"
                    >
                      Details
                    </th>
                    <th
                      onClick={() => handleSort("createdAt")}
                      className="border border-gray-300 px-4 py-2 cursor-pointer"
                    >
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedLogs?.map((log) => (
                    <tr key={log.id}>
                      <td className="border border-gray-300 px-4 py-2">{log.resource}</td>
                      <td className="border border-gray-300 px-4 py-2">{log.details}</td>
                      <td className="border border-gray-300 px-4 py-2">{log.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default AdminLandingPage;
