# Use Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port your backend runs on (e.g., 4000)
EXPOSE 4000

# Start the backend application
CMD ["npm", "run", "start:prod"]
