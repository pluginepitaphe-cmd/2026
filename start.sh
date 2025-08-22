#!/bin/bash
set -e

echo "Starting SiPortEvent 2026 application..."

# Navigate to backend directory
cd /app/backend

# Activate virtual environment if it exists, otherwise create it
if [ -d "venv" ]; then
    echo "Activating existing virtual environment..."
    source venv/bin/activate
else
    echo "Creating virtual environment..."
    python -m venv venv
    source venv/bin/activate
    echo "Installing Python dependencies..."
    pip install --no-cache-dir --upgrade pip
    pip install --no-cache-dir -r requirements.txt
fi

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "Warning: DATABASE_URL not set, using default"
    export DATABASE_URL="postgresql+asyncpg://localhost:5432/siportevent_db"
fi

# Set default port
if [ -z "$PORT" ]; then
    export PORT=8001
fi

echo "Starting FastAPI server on port $PORT..."
python server.py