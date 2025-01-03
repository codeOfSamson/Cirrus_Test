# Backend Stage
FROM node:18 AS backend
WORKDIR /app/backend
COPY ./employee-feedback-backend ./
RUN npm install
RUN npm run build

# Frontend Stage
FROM node:18 AS frontend
WORKDIR /app/frontend
COPY ./employee-feedback-frontend ./
RUN npm install
RUN npm run build

# Final Stage
FROM node:18
WORKDIR /app
COPY --from=backend /app/backend ./backend
COPY --from=frontend /app/frontend ./frontend

# Start both services
CMD ["sh", "-c", "node ./backend/dist/main.js & npm start --prefix ./frontend"]
