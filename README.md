Employee Review System

A comprehensive Employee Review System designed for managing employees, performance reviews, and audit logs efficiently.  Built with modern web technologies, this application provides role-based access and a user-friendly interface for administrators and employees.

Features:

User Management

Create, update, delete, and view employee records.

Secure authentication and authorization.

Review Management

Create, update, and delete performance reviews.

Assign reviews to specific employees.

Audit Logs

Track changes and operations within the system.

Display audit logs in a sortable and filterable table.

Technologies Used

Frontend: Next.js, React, TypeScript, Tailwind CSS

Backend: Node.js, GraphQL, Apollo Server, MongoDB

Containerization: Docker, Docker Compose

Deployment: Railway, Fly.io (optional)

Getting Started

Follow these steps to run the project locally or with Docker.

Prerequisites

Node.js: Version 16+

MongoDB: Locally installed or cloud-hosted MongoDB instance

Docker: Installed and running

Running Locally

1. Clone the Repository

git clone https://github.com/codeOfSamson/employee-review-system.git
cd employee-review-system

2. Set Up the Backend

cd employee-feedback-backend
npm install

Create a .env file in the employee-feedback-backend directory:

MONGODB_URI=mongodb://localhost:27017/employee-review-system
NODE_ENV=development
JWT_SECRET=your_jwt_secret

Run the backend:

npm run start

3. Set Up the Frontend

cd ../employee-feedback-frontend
npm install

Create a .env.local file in the employee-feedback-frontend directory:

NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql

Run the frontend:

npm run dev

Access the application at http://localhost:3000.

Running with Docker instead?
In parent directory that contains docker-compose.yaml, run the following command: 

docker-compose up --build

This command will:

Start the backend service on port 4000

Start the frontend service on port 3000

Start a MongoDB service on port 27017

3. Access the Application

Frontend: http://localhost:3000

GraphQL Playground (Backend): http://localhost:4000/graphql