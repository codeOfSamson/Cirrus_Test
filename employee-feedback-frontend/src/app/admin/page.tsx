"use client";

import React, { useState } from "react";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import PrivateRoute from "../components/PrivateRoute";

interface AuditLog {
  id: string;
  action: string;
  userId: string;
  resource: string;
  resourceId: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  location: string;
  timestamp: string;
  outcome: string;
  createdAt: string;
  updatedAt: string;
}

const AdminLandingPage = () => {
  const GET_AUDIT_LOGS = gql`
    query {
      getAuditLogs {
        id
        action
        userId
        resource
        resourceId
        details
        ipAddress
        userAgent
        location
        timestamp
        outcome
        createdAt
        updatedAt
      }
    }
  `;

  const { loading, error, data } = useQuery<{ getAuditLogs: AuditLog[] }>(GET_AUDIT_LOGS);

  const [showTable, setShowTable] = useState(false);
  const [sortKey, setSortKey] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const toggleTable = () => setShowTable((prev) => !prev);

  const sortedLogs = data?.getAuditLogs.slice().sort((a, b) => {
    if (a[sortKey as keyof AuditLog] < b[sortKey as keyof AuditLog]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortKey as keyof AuditLog] > b[sortKey as keyof AuditLog]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key: string) => {
    setSortKey(key);
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const getSortIcon = (key: string) => {
    if (sortKey === key) {
      return sortOrder === "asc" ? "▲" : "▼";
    }
    return "⇵"; // Neutral sort icon
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching audit logs</p>;
  const headers = data?.getAuditLogs.length ? Object.keys(data.getAuditLogs[0]) : [];
  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Welcome to the Admin Panel
        </h1>

        <div className="flex flex-wrap justify-center gap-8">
          <div className="w-80 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Manage Users</h2>
            <p className="text-gray-600 mb-6">Create, update, delete, and view employee records.</p>
            <Link href="/admin/employees">
              <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
                Go to User Management
              </button>
            </Link>
          </div>

          <div className="w-80 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Manage Reviews</h2>
            <p className="text-gray-600 mb-6">Create, update, delete, and view performance reviews.</p>
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
            <div className="mt-4 max-h-[80vh] text-black overflow-auto">
              Click on a Table header to sort logs by that property.
              <table className="min-w-full border-collapse border text-black border-gray-300">
                <thead>
                  <tr>
                    {headers.map((header) => (
                      <th
                        key={header}
                        onClick={() => handleSort(header)}
                        className="border border-gray-300 px-4 py-2 cursor-pointer"
                      >
                        {header} {getSortIcon(`${header}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedLogs?.map((log) => (
                    <tr key={log.id}>
                      {headers.map((header) => (
                        <td key={header} className="border border-gray-300 px-4 py-2">
                          {log[header as keyof AuditLog] || "N/A"}
                        </td>
                      ))}
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
