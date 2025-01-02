"use client";

import React, { useState , Context} from "react";
import Link from "next/link";
import { gql, useQuery, useMutation } from "@apollo/client";
//import { useSearchParams } from 'next/navigation'; // For Next.js 13
import PrivateRoute from "../components/PrivateRoute";

const AdminLandingPage = () => {

  //const searchParams = useSearchParams(); // Next.js 13+
  //const userName = searchParams.get('name');

  const GET_AUDIT_LOGS = gql`
 query {
  getAuditLogs{
    id
    resource
    resourceId
    details
    createdAt
    updatedAt
  }
}
`;

const { loading, error, data, refetch } = useQuery(GET_AUDIT_LOGS);


  // Admin Dashboard
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
        {/* <Link href="/" className="text-blue-600 hover:underline">
          Go to Home Page
        </Link> */}
            <button className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition">
              See Audit Logs
            </button>

            <div className="space-y-4 max-h-[80vh] overflow-y-auto">
            {data?.getAuditLogs?.map((log: any) => (
              <div
                key={log.id}
                className="flex justify-between overflow-scroll items-center bg-gray-200 p-4 rounded-md shadow-md hover:bg-gray-100 transition duration-200"
              >
                <div>
                  <p className="font-semibold text-gray-800">{log.resource}</p>
                  <p className="text-gray-600 text-sm">
                    {log.details} - ({log.createdAt})
                  </p>
                </div>
            
              </div>
            ))}
          </div>

      </div>
    </div>
    </PrivateRoute>
  
  );
};

export default AdminLandingPage;
