FROM node:20-alpine AS builder

WORKDIR /app

# Install root dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install --force
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/frontend/build ./frontend/build
COPY --from=builder /app/backend ./backend
COPY --from=builder /app/package.json .
COPY --from=builder /app/start.sh .

# Start the application
CMD ["/bin/sh", "-c", "npm start"]

