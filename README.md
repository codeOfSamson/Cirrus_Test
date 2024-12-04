Hello, and welcome to employee review app!

Before cloning the repo, ensure the following tools are installed on your local machine:

-Node.js (version 18.x or higher)
-npm or yarn
-Git
-MongoDB (Ensure MongoDB is running locally or use a cloud-hosted MongoDB URI)

For the Backend:
-----------------
1. Open a terminal and Navigate to the backend directory:
Install dependencies:
npm install

2.Create a .env file in the backend directory and add the following environment variables:
PORT=4000
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret>
Replace <your_mongo_connection_string> with your MongoDB URI and <your_jwt_secret> with a secure secret key for JWT.

3.Start the backend server:
npm run start:dev

For The FrontEnd:
------------------
1. Open another terminal and Navigate to the frontend directory:
Install dependencies:
npm install
2. Startup Frontend
npm run dev

-------------------
Notes:
Make sure MongoDB is running when starting the backend.
If you are using a cloud-hosted MongoDB (e.g., MongoDB Atlas), ensure the IP whitelist allows connections from your local machine.
