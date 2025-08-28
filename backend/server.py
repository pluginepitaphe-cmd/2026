from fastapi import FastAPI, APIRouter, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from dotenv import load_dotenv
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime
import os
import logging

# Import database components
from database import get_session, create_tables, test_connection, StatusCheck

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Pydantic models for API
class StatusCheckCreate(BaseModel):
    client_name: str

class StatusCheckResponse(BaseModel):
    id: str
    client_name: str
    timestamp: datetime
    
    class Config:
        from_attributes = True

# Create FastAPI app
app = FastAPI(
    title="Application PostgreSQL",
    description="Application migrée vers PostgreSQL pour Railway",
    version="1.0.0"
)

# Create API router with /api prefix
api_router = APIRouter(prefix="/api")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routes
@api_router.get("/")
async def root():
    """Root endpoint"""
    return {"message": "Application PostgreSQL fonctionnelle!"}

@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    db_status = await test_connection()
    return {
        "status": "healthy" if db_status else "unhealthy",
        "database": "connected" if db_status else "disconnected",
        "timestamp": datetime.utcnow().isoformat()
    }

@api_router.post("/status", response_model=StatusCheckResponse)
async def create_status_check(
    input_data: StatusCheckCreate, 
    session: AsyncSession = Depends(get_session)
):
    """Create a new status check"""
    try:
        # Create new status check
        status_check = StatusCheck(
            id=str(uuid.uuid4()),
            client_name=input_data.client_name,
            timestamp=datetime.utcnow()
        )
        
        # Add to database
        session.add(status_check)
        await session.commit()
        await session.refresh(status_check)
        
        logger.info(f"Created status check for client: {input_data.client_name}")
        return StatusCheckResponse.model_validate(status_check)
        
    except Exception as e:
        logger.error(f"Error creating status check: {e}")
        await session.rollback()
        raise HTTPException(status_code=500, detail="Error creating status check")

@api_router.get("/status", response_model=List[StatusCheckResponse])
async def get_status_checks(session: AsyncSession = Depends(get_session)):
    """Get all status checks"""
    try:
        # Query all status checks
        result = await session.execute(
            select(StatusCheck).order_by(StatusCheck.timestamp.desc())
        )
        status_checks = result.scalars().all()
        
        logger.info(f"Retrieved {len(status_checks)} status checks")
        return [StatusCheckResponse.model_validate(check) for check in status_checks]
        
    except Exception as e:
        logger.error(f"Error retrieving status checks: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving status checks")

# Include the router
app.include_router(api_router)

# Startup event
@app.on_event("startup")
async def startup_event():
    """Initialize database on startup"""
    logger.info("Starting up application...")
    try:
        await create_tables()
        connection_status = await test_connection()
        if connection_status:
            logger.info("Application started successfully with PostgreSQL")
        else:
            logger.warning("Application started but database connection failed")
    except Exception as e:
        logger.error(f"Startup error: {e}")

# Shutdown event  
@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    logger.info("Shutting down application...")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)