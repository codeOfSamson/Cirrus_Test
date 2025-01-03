version: '3.8'

services:
  backend:
    build:
      context: ./employee-feedback-backend
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/employee-review-system # Use the container name "mongo"
      - NODE_ENV=production
      - JWT_SECRET=04f03127694304565195b006b4597e45ea20ab9dc3f93b05b60d1cb5b70cb35a
    depends_on:
      - mongo

  frontend:
    build:
      context: ./employee-feedback-frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://backend:4000/graphql # Use the container name "backend"
    depends_on:
      - backend

  mongo:
    image: mongo:5.0
    container_name: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data: