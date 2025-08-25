FROM node:20-alpine AS frontend_builder

WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install --legacy-peer-deps
RUN npm install ajv ajv-keywords
COPY frontend/ ./
RUN npm run build

FROM python:3.9-alpine AS backend_builder

WORKDIR /app/backend
COPY backend/requirements.txt ./
RUN apk add --no-cache python3 py3-pip
RUN python3 -m venv venv
ENV PATH="/app/backend/venv/bin:$PATH"
RUN pip install --no-cache-dir -r requirements.txt

FROM node:20-alpine

WORKDIR /app

# Copy frontend build artifacts
COPY --from=frontend_builder /app/frontend/build ./frontend/build

# Copy backend files and dependencies, including the virtual environment
COPY --from=backend_builder /app/backend /app/backend

# Start the application (backend only for now, as frontend is static files)
WORKDIR /app/backend
CMD ["/bin/sh", "-c", "./venv/bin/python3 server.py"]

