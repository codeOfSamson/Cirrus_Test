# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

# Set working directory inside the container
WORKDIR /src/app

# Copy package.json and lock file to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

RUN ls -la /src/app/.next

# Stage 2: Serve the built application
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Install the necessary dependencies for Next.js
COPY --from=builder /src/app/package.json /src/app/package-lock.json ./
RUN npm install --production

# Copy the build output from the builder stage
COPY --from=builder /src/app/.next ./.next
COPY --from=builder /src/app/public ./public

# Expose the application port
EXPOSE 3000

# Run the Next.js production server
CMD ["npm", "run", "start"]
