FROM python:3.9-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Install Yarn
RUN npm install -g yarn

WORKDIR /app

# Copy package files
COPY backend/requirements.txt backend/
COPY frontend/package.json frontend/yarn.lock frontend/

# Create virtual environment and install Python dependencies
RUN cd backend && python -m venv venv && \
    . venv/bin/activate && \
    pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Install Node dependencies
RUN cd frontend && yarn install

# Copy source code
COPY . .

# Build frontend
RUN cd frontend && yarn build

# Expose port
EXPOSE $PORT

# Start command
CMD cd backend && . venv/bin/activate && python server.py