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

2.Go to app module and find:

MongooseModule.forRoot(process.env.MONGO_URI),

replace "process.env.MONGO_URI" with uri pointing to your local mongodb.


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
