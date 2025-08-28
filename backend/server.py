#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SIPORTS v2.0 - Production Backend
FastAPI + SQLite + AI Chatbot
Optimisé pour Railway deployment
"""

import os
import sys
from datetime import datetime, timedelta
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from typing import List, Optional
import jwt
import secrets
import json
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
import logging

# Import chatbot service
from chatbot_service import siports_ai_service, ChatRequest, ChatResponse

# Import AI matching service  
from ai_matching_service import (
    ai_matching_service, MatchingRequest, MatchResult, 
    ProactiveRecommendation, UserProfile
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuration
JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', secrets.token_hex(32))
DATABASE_URL = os.environ.get('DATABASE_URL', 'instance/siports_production.db')

# FastAPI app
app = FastAPI(
    title="SIPORTS v2.0 API",
    description="API pour événements maritimes avec chatbot IA",
    version="2.0.0"
)

# CORS configuration for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure with your Vercel domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Database initialization
def init_database():
    """Initialize production database"""
    os.makedirs('instance', exist_ok=True)
    conn = sqlite3.connect(DATABASE_URL)
    
    # Users table
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            user_type TEXT DEFAULT 'visitor',
            first_name TEXT,
            last_name TEXT,
            company TEXT,
            phone TEXT,
            visitor_package TEXT DEFAULT 'Free',
            partnership_package TEXT,
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Insert admin user if not exists
    admin_password = generate_password_hash('admin123')
    conn.execute('''
        INSERT OR IGNORE INTO users (email, password_hash, user_type, status, first_name, last_name)
        VALUES (?, ?, 'admin', 'validated', 'Admin', 'SIPORTS')
    ''', ('admin@siportevent.com', admin_password))
    
    # Sample data
    visitor_password = generate_password_hash('visitor123')
    exhibitor_password = generate_password_hash('exhibitor123')
    
    conn.execute('''
        INSERT OR IGNORE INTO users (email, password_hash, user_type, visitor_package, status, first_name, last_name, company)
        VALUES (?, ?, 'visitor', 'Premium', 'validated', 'Marie', 'Dupont', 'Port Autonome Marseille')
    ''', ('visitor@example.com', visitor_password))
    
    conn.execute('''
        INSERT OR IGNORE INTO users (email, password_hash, user_type, partnership_package, status, first_name, last_name, company)
        VALUES (?, ?, 'exhibitor', 'Gold', 'validated', 'Jean', 'Martin', 'Maritime Solutions Ltd')
    ''', ('exposant@example.com', exhibitor_password))
    
    # Ensure test accounts are validated (in case they exist but are not validated)
    conn.execute('''
        UPDATE users SET status = 'validated' 
        WHERE email IN ('admin@siportevent.com', 'visitor@example.com', 'exposant@example.com')
    ''')
    
    conn.commit()
    conn.close()

# Initialize database on startup
init_database()

# Models
class UserLogin(BaseModel):
    email: str
    password: str

class UserRegister(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str
    company: Optional[str] = None
    phone: Optional[str] = None
    user_type: str = 'visitor'

class PackageUpdate(BaseModel):
    package_type: str
    user_id: int

# Nouveaux modèles pour les profils détaillés
class UserProfileDetailed(BaseModel):
    sectors_activity: Optional[List[str]] = []
    products_services: Optional[List[str]] = []
    participation_objectives: Optional[List[str]] = []
    interest_themes: Optional[List[str]] = []
    visit_objectives: Optional[List[str]] = []
    skills_expertise: Optional[List[str]] = []
    matching_criteria: Optional[dict] = {}
    looking_for: Optional[List[str]] = []
    budget_range: Optional[str] = None
    company_size: Optional[str] = None
    geographic_location: Optional[List[str]] = []
    meeting_availability: Optional[str] = None
    languages: Optional[List[str]] = []
    certifications: Optional[List[str]] = []

# Helper functions
def create_jwt_token(user_data: dict) -> str:
    """Create JWT token"""
    payload = {
        'user_id': user_data['id'],
        'email': user_data['email'],
        'user_type': user_data['user_type'],
        'exp': datetime.utcnow() + timedelta(days=7)
    }
    return jwt.encode(payload, JWT_SECRET_KEY, algorithm='HS256')

def verify_jwt_token(token: str) -> dict:
    """Verify JWT token"""
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expiré")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token invalide")

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current user from JWT token"""
    token = credentials.credentials
    payload = verify_jwt_token(token)
    
    conn = sqlite3.connect(DATABASE_URL)
    conn.row_factory = sqlite3.Row
    user = conn.execute(
        'SELECT * FROM users WHERE id = ?',
        (payload['user_id'],)
    ).fetchone()
    conn.close()
    
    if not user:
        raise HTTPException(status_code=401, detail="Utilisateur non trouvé")
    
    return dict(user)

def admin_required(user: dict = Depends(get_current_user)):
    """Admin authorization required"""
    if user['user_type'] != 'admin':
        raise HTTPException(status_code=403, detail="Accès admin requis")
    return user

# =============================================================================
# AUTHENTICATION ENDPOINTS
# =============================================================================

@app.post("/api/auth/register")
async def register(user: UserRegister):
    """User registration"""
    try:
        conn = sqlite3.connect(DATABASE_URL)
        
        # Check if user exists
        existing = conn.execute(
            'SELECT id FROM users WHERE email = ?',
            (user.email,)
        ).fetchone()
        
        if existing:
            raise HTTPException(status_code=400, detail="Utilisateur existant")
        
        # Create user
        password_hash = generate_password_hash(user.password)
        cursor = conn.execute('''
            INSERT INTO users (email, password_hash, user_type, first_name, last_name, company, phone)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (user.email, password_hash, user.user_type, user.first_name, user.last_name, user.company, user.phone))
        
        user_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return {"message": "Inscription réussie", "user_id": user_id}
        
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur inscription")

@app.get("/api/auth/verify")
async def verify_token(user: dict = Depends(get_current_user)):
    """Verify JWT token and return user info"""
    return {"user": user}

@app.post("/api/auth/login")
async def login(user: UserLogin):
    """User login"""
    try:
        conn = sqlite3.connect(DATABASE_URL)
        conn.row_factory = sqlite3.Row
        
        db_user = conn.execute(
            'SELECT * FROM users WHERE email = ?',
            (user.email,)
        ).fetchone()
        conn.close()
        
        if not db_user or not check_password_hash(db_user['password_hash'], user.password):
            raise HTTPException(status_code=401, detail="Identifiants invalides")
        
        if db_user['status'] != 'validated':
            raise HTTPException(status_code=403, detail="Compte en attente de validation")
        
        # Create JWT token
        user_data = dict(db_user)
        token = create_jwt_token(user_data)
        
        # Return user data with token
        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": user_data['id'],
                "email": user_data['email'],
                "first_name": user_data['first_name'],
                "last_name": user_data['last_name'],
                "company": user_data['company'],
                "user_type": user_data['user_type'],
                "visitor_package": user_data['visitor_package'],
                "partnership_package": user_data['partnership_package']
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur connexion")

# =============================================================================
# VISITOR PACKAGES ENDPOINTS
# =============================================================================

@app.get("/api/visitor-packages")
async def get_visitor_packages():
    """Get visitor packages"""
    packages = [
        {
            "id": 1,
            "name": "Free Pass",
            "price": 0,
            "currency": "€",
            "description": "Accès gratuit aux espaces d'exposition",
            "features": [
                "Accès aux espaces d'exposition",
                "Conférences publiques",
                "Application mobile",
                "Plan du salon"
            ],
            "limitations": {
                "b2b_meetings": 0,
                "networking": "Limité"
            }
        },
        {
            "id": 2,
            "name": "Basic Pass",
            "price": 150,
            "currency": "€",
            "description": "Pass essentiel pour 1 journée",
            "features": [
                "Tout du Free Pass",
                "2 rendez-vous B2B garantis",
                "Accès aux pauses café",
                "Badge visiteur personnalisé"
            ],
            "limitations": {
                "b2b_meetings": 2,
                "networking": "Standard"
            }
        },
        {
            "id": 3,
            "name": "Premium Pass",
            "price": 350,
            "currency": "€",
            "description": "Pass complet pour 2 journées",
            "features": [
                "Tout du Basic Pass",
                "5 rendez-vous B2B garantis",
                "Ateliers techniques spécialisés",
                "Déjeuners networking",
                "Accès zone VIP"
            ],
            "popular": True,
            "limitations": {
                "b2b_meetings": 5,
                "networking": "Avancé"
            }
        },
        {
            "id": 4,
            "name": "VIP Pass",
            "price": 750,
            "currency": "€",
            "description": "Accès privilégié 3 journées complètes",
            "features": [
                "Tout du Premium Pass",
                "Rendez-vous B2B illimités",
                "Soirée de gala exclusive",
                "Conférences privées C-Level",
                "Service de conciergerie",
                "Transferts inclus"
            ],
            "limitations": {
                "b2b_meetings": "unlimited",
                "networking": "Premium"
            }
        }
    ]
    return {"packages": packages}

@app.post("/api/visitor-packages/update")
async def update_visitor_package(data: PackageUpdate, user: dict = Depends(get_current_user)):
    """Update user's visitor package"""
    try:
        conn = sqlite3.connect(DATABASE_URL)
        conn.execute(
            'UPDATE users SET visitor_package = ? WHERE id = ?',
            (data.package_type, user['id'])
        )
        conn.commit()
        conn.close()
        
        return {"message": "Forfait mis à jour avec succès"}
        
    except Exception as e:
        logger.error(f"Package update error: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur mise à jour forfait")

# =============================================================================
# PARTNERSHIP PACKAGES ENDPOINTS
# =============================================================================

@app.get("/api/partnership-packages")
async def get_partnership_packages():
    """Get partnership packages"""
    packages = [
        {
            "id": 1,
            "name": "Startup Package",
            "price": 2500,
            "currency": "$",
            "description": "Idéal pour les jeunes entreprises maritimes",
            "features": [
                "Stand 6m² (2x3m)",
                "2 badges exposant",
                "Listing annuaire digital",
                "Support technique de base"
            ],
            "category": "startup"
        },
        {
            "id": 2,
            "name": "Silver Package", 
            "price": 8000,
            "currency": "$",
            "description": "Package standard pour exposants confirmés",
            "features": [
                "Stand 12m² (3x4m)",
                "4 badges exposant",
                "Mobilier standard inclus",
                "1 session de networking sponsorisée",
                "Présence catalogue premium"
            ],
            "category": "standard"
        },
        {
            "id": 3,
            "name": "Gold Package",
            "price": 15000,
            "currency": "$", 
            "description": "Package avancé avec visibilité renforcée",
            "features": [
                "Stand 20m² (4x5m) - Emplacement premium",
                "6 badges exposant",
                "Mobilier sur-mesure",
                "2 conférences sponsorisées (30min)",
                "Logo sur supports officiels",
                "1 cocktail networking privé"
            ],
            "popular": True,
            "category": "premium"
        },
        {
            "id": 4,
            "name": "Platinum Package",
            "price": 25000,
            "currency": "$",
            "description": "Package prestige - Partenaire officiel",
            "features": [
                "Stand 40m² (5x8m) - Hall d'entrée",
                "10 badges exposant",
                "Design stand personnalisé",
                "Keynote session dédiée (45min)",
                "Mini-site SIPORTS Premium dédié",
                "Branding événement (logos, panneaux)",
                "Dîner VIP avec comité d'organisation",
                "Communiqué de presse co-signé"
            ],
            "category": "prestige"
        }
    ]
    return {"packages": packages}

# =============================================================================
# ADMIN ENDPOINTS
# =============================================================================

@app.get("/api/admin/dashboard/stats")
async def get_admin_stats(admin: dict = Depends(admin_required)):
    """Get admin dashboard statistics"""
    try:
        conn = sqlite3.connect(DATABASE_URL)
        
        # Count users by type
        total_users = conn.execute('SELECT COUNT(*) FROM users').fetchone()[0]
        visitors = conn.execute('SELECT COUNT(*) FROM users WHERE user_type = "visitor"').fetchone()[0]
        exhibitors = conn.execute('SELECT COUNT(*) FROM users WHERE user_type = "exhibitor"').fetchone()[0]
        partners = conn.execute('SELECT COUNT(*) FROM users WHERE user_type = "partner"').fetchone()[0]
        
        # Count by status
        pending = conn.execute('SELECT COUNT(*) FROM users WHERE status = "pending"').fetchone()[0]
        validated = conn.execute('SELECT COUNT(*) FROM users WHERE status = "validated"').fetchone()[0]
        rejected = conn.execute('SELECT COUNT(*) FROM users WHERE status = "rejected"').fetchone()[0]
        
        conn.close()
        
        return {
            "total_users": total_users,
            "visitors": visitors,
            "exhibitors": exhibitors,
            "partners": partners,
            "pending": pending,
            "validated": validated,
            "rejected": rejected
        }
        
    except Exception as e:
        logger.error(f"Admin stats error: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur statistiques")

@app.get("/api/admin/users/pending")
async def get_pending_users(admin: dict = Depends(admin_required)):
    """Get users pending validation"""
    try:
        conn = sqlite3.connect(DATABASE_URL)
        conn.row_factory = sqlite3.Row
        
        users = conn.execute('''
            SELECT id, email, first_name, last_name, company, user_type, created_at
            FROM users WHERE status = 'pending'
            ORDER BY created_at DESC
        ''').fetchall()
        conn.close()
        
        return {"users": [dict(user) for user in users]}
        
    except Exception as e:
        logger.error(f"Pending users error: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur récupération utilisateurs")

@app.post("/api/admin/users/{user_id}/validate")
async def validate_user(user_id: int, admin: dict = Depends(admin_required)):
    """Validate a user"""
    try:
        conn = sqlite3.connect(DATABASE_URL)
        conn.execute(
            'UPDATE users SET status = "validated" WHERE id = ?',
            (user_id,)
        )
        conn.commit()
        conn.close()
        
        return {"message": "Utilisateur validé avec succès"}
        
    except Exception as e:
        logger.error(f"User validation error: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur validation utilisateur")

@app.post("/api/admin/users/{user_id}/reject") 
async def reject_user(user_id: int, admin: dict = Depends(admin_required)):
    """Reject a user"""
    try:
        conn = sqlite3.connect(DATABASE_URL)
        conn.execute(
            'UPDATE users SET status = "rejected" WHERE id = ?',
            (user_id,)
        )
        conn.commit()
        conn.close()
        
        return {"message": "Utilisateur rejeté"}
        
    except Exception as e:
        logger.error(f"User rejection error: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur rejet utilisateur")

# =============================================================================
# AI MATCHING ENDPOINTS  
# =============================================================================

@app.post("/api/ai/matching/find")
async def ai_find_matches(request: MatchingRequest, user: dict = Depends(get_current_user)):
    """Recherche de matches avec IA avancée"""
    try:
        matches = ai_matching_service.find_matches(request)
        
        # Conversion pour la réponse API
        matches_data = []
        for match in matches:
            matches_data.append({
                "user_id": match.matched_user_id,
                "compatibility_score": match.compatibility_score,
                "explanation": match.explanation,
                "mutual_interests": match.mutual_interests,
                "business_potential": match.business_potential,
                "matching_factors": match.matching_factors,
                "ai_recommendation": match.ai_recommendation,
                "conversation_topics": match.suggested_conversation_topics
            })
        
        return {"matches": matches_data, "total": len(matches_data)}
        
    except Exception as e:
        logger.error(f"AI matching error: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur matching IA")

@app.get("/api/ai/recommendations/{user_id}")
async def get_proactive_recommendations(user_id: int, user: dict = Depends(get_current_user)):
    """Récupération des recommandations proactives IA"""
    try:
        if user['id'] != user_id and user['user_type'] != 'admin':
            raise HTTPException(status_code=403, detail="Accès non autorisé")
        
        recommendations = ai_matching_service.generate_proactive_recommendations(user_id)
        
        recommendations_data = []
        for rec in recommendations:
            recommendations_data.append({
                "type": rec.recommendation_type,
                "title": rec.title,
                "content": rec.content,
                "confidence_score": rec.confidence_score,
                "actions": rec.action_suggestions,
                "expires_at": rec.expires_at.isoformat()
            })
        
        return {"recommendations": recommendations_data}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"AI recommendations error: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur recommandations IA")

@app.post("/api/ai/profile/detailed")
async def update_detailed_profile(profile: UserProfileDetailed, user: dict = Depends(get_current_user)):
    """Mise à jour du profil détaillé pour l'IA"""
    try:
        conn = sqlite3.connect(DATABASE_URL)
        
        # Conversion des listes en JSON
        profile_data = {
            'sectors_activity': json.dumps(profile.sectors_activity),
            'products_services': json.dumps(profile.products_services),
            'participation_objectives': json.dumps(profile.participation_objectives),
            'interest_themes': json.dumps(profile.interest_themes),
            'visit_objectives': json.dumps(profile.visit_objectives),
            'skills_expertise': json.dumps(profile.skills_expertise),
            'matching_criteria': json.dumps(profile.matching_criteria),
            'looking_for': json.dumps(profile.looking_for),
            'budget_range': profile.budget_range,
            'company_size': profile.company_size,
            'geographic_location': json.dumps(profile.geographic_location),
            'meeting_availability': profile.meeting_availability,
            'languages': json.dumps(profile.languages),
            'certifications': json.dumps(profile.certifications),
            'updated_at': datetime.utcnow().isoformat()
        }
        
        # Vérifier si le profil existe
        existing = conn.execute(
            'SELECT user_id FROM user_profiles_detailed WHERE user_id = ?',
            (user['id'],)
        ).fetchone()
        
        if existing:
            # Mise à jour
            set_clause = ', '.join([f"{key} = ?" for key in profile_data.keys()])
            values = list(profile_data.values()) + [user['id']]
            
            conn.execute(
                f'UPDATE user_profiles_detailed SET {set_clause} WHERE user_id = ?',
                values
            )
        else:
            # Insertion
            profile_data['user_id'] = user['id']
            columns = ', '.join(profile_data.keys())
            placeholders = ', '.join(['?' for _ in profile_data.values()])
            
            conn.execute(
                f'INSERT INTO user_profiles_detailed ({columns}) VALUES ({placeholders})',
                list(profile_data.values())
            )
        
        conn.commit()
        conn.close()
        
        return {"message": "Profil détaillé mis à jour avec succès"}
        
    except Exception as e:
        logger.error(f"Profile update error: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur mise à jour profil")

@app.get("/api/ai/profile/detailed/{user_id}")
async def get_detailed_profile(user_id: int, user: dict = Depends(get_current_user)):
    """Récupération du profil détaillé"""
    try:
        if user['id'] != user_id and user['user_type'] != 'admin':
            raise HTTPException(status_code=403, detail="Accès non autorisé")
        
        conn = sqlite3.connect(DATABASE_URL)
        conn.row_factory = sqlite3.Row
        
        profile = conn.execute(
            'SELECT * FROM user_profiles_detailed WHERE user_id = ?',
            (user_id,)
        ).fetchone()
        conn.close()
        
        if not profile:
            # Retourner un profil vide si pas encore créé
            return {
                "user_id": user_id,
                "sectors_activity": [],
                "products_services": [],
                "participation_objectives": [],
                "interest_themes": [],
                "visit_objectives": [],
                "skills_expertise": [],
                "matching_criteria": {},
                "looking_for": [],
                "budget_range": None,
                "company_size": None,
                "geographic_location": [],
                "meeting_availability": None,
                "languages": [],
                "certifications": []
            }
        
        # Conversion des données JSON
        profile_data = dict(profile)
        json_fields = [
            'sectors_activity', 'products_services', 'participation_objectives',
            'interest_themes', 'visit_objectives', 'skills_expertise',
            'matching_criteria', 'looking_for', 'geographic_location',
            'languages', 'certifications'
        ]
        
        for field in json_fields:
            if profile_data.get(field):
                try:
                    profile_data[field] = json.loads(profile_data[field])
                except:
                    profile_data[field] = [] if field != 'matching_criteria' else {}
            else:
                profile_data[field] = [] if field != 'matching_criteria' else {}
        
        return profile_data
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Profile get error: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur récupération profil")

@app.post("/api/ai/interaction/feedback")
async def record_interaction_feedback(
    request: Request,
    user: dict = Depends(get_current_user)
):
    """Enregistrement du feedback d'interaction pour l'apprentissage IA"""
    try:
        # Récupérer les paramètres de la requête
        target_user_id = int(request.query_params.get('target_user_id'))
        interaction_type = request.query_params.get('interaction_type')
        success = int(request.query_params.get('success'))
        
        ai_matching_service.update_interaction_feedback(
            user['id'], target_user_id, interaction_type, success
        )
        
        return {"message": "Feedback enregistré pour l'amélioration de l'IA"}
        
    except Exception as e:
        logger.error(f"Interaction feedback error: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur enregistrement feedback")

# =============================================================================
# MESSAGING SYSTEM ENDPOINTS
# =============================================================================

class MessageCreate(BaseModel):
    recipient_id: int
    content: str
    message_type: str = "text"  # text, image, document

class MessageResponse(BaseModel):
    id: int
    sender_id: int
    recipient_id: int
    content: str
    message_type: str
    is_read: bool
    created_at: str
    sender_name: str

@app.post("/api/messages/send")
async def send_message(message: MessageCreate, user: dict = Depends(get_current_user)):
    """Envoyer un message à un autre utilisateur"""
    try:
        conn = sqlite3.connect(DATABASE_URL)
        
        # Vérifier que le destinataire existe
        recipient = conn.execute(
            'SELECT id, first_name, last_name FROM users WHERE id = ? AND status = "validated"',
            (message.recipient_id,)
        ).fetchone()
        
        if not recipient:
            raise HTTPException(status_code=404, detail="Destinataire non trouvé")
        
        # Créer la table des messages si elle n'existe pas
        conn.execute('''
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                sender_id INTEGER NOT NULL,
                recipient_id INTEGER NOT NULL,
                content TEXT NOT NULL,
                message_type TEXT DEFAULT 'text',
                is_read BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (sender_id) REFERENCES users(id),
                FOREIGN KEY (recipient_id) REFERENCES users(id)
            )
        ''')
        
        # Insérer le message
        cursor = conn.execute('''
            INSERT INTO messages (sender_id, recipient_id, content, message_type)
            VALUES (?, ?, ?, ?)
        ''', (user['id'], message.recipient_id, message.content, message.message_type))
        
        message_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        # Enregistrer l'interaction pour l'IA
        ai_matching_service.update_interaction_feedback(
            user['id'], message.recipient_id, 'message', 1
        )
        
        return {"message_id": message_id, "status": "sent", "message": "Message envoyé avec succès"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Send message error: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur envoi message")

@app.get("/api/messages/conversations")
async def get_conversations(user: dict = Depends(get_current_user)):
    """Récupérer la liste des conversations de l'utilisateur"""
    try:
        conn = sqlite3.connect(DATABASE_URL)
        conn.row_factory = sqlite3.Row
        
        # Récupérer les conversations avec le dernier message
        conversations = conn.execute('''
            SELECT DISTINCT
                CASE 
                    WHEN m.sender_id = ? THEN m.recipient_id 
                    ELSE m.sender_id 
                END as contact_id,
                u.first_name,
                u.last_name,
                u.company,
                u.user_type,
                (SELECT content FROM messages m2 
                 WHERE (m2.sender_id = ? AND m2.recipient_id = contact_id) 
                    OR (m2.recipient_id = ? AND m2.sender_id = contact_id)
                 ORDER BY m2.created_at DESC LIMIT 1) as last_message,
                (SELECT created_at FROM messages m2 
                 WHERE (m2.sender_id = ? AND m2.recipient_id = contact_id) 
                    OR (m2.recipient_id = ? AND m2.sender_id = contact_id)
                 ORDER BY m2.created_at DESC LIMIT 1) as last_message_at,
                (SELECT COUNT(*) FROM messages m2 
                 WHERE m2.sender_id = contact_id AND m2.recipient_id = ? AND m2.is_read = FALSE) as unread_count
            FROM messages m
            JOIN users u ON u.id = CASE 
                WHEN m.sender_id = ? THEN m.recipient_id 
                ELSE m.sender_id 
            END
            WHERE m.sender_id = ? OR m.recipient_id = ?
            ORDER BY last_message_at DESC
        ''', (user['id'], user['id'], user['id'], user['id'], user['id'], user['id'], user['id'], user['id'], user['id'])).fetchall()
        
        conn.close()
        
        conversations_data = []
        for conv in conversations:
            conversations_data.append({
                "contact_id": conv['contact_id'],
                "contact_name": f"{conv['first_name']} {conv['last_name']}",
                "company": conv['company'],
                "user_type": conv['user_type'],
                "last_message": conv['last_message'],
                "last_message_at": conv['last_message_at'],
                "unread_count": conv['unread_count']
            })
        
        return {"conversations": conversations_data}
        
    except Exception as e:
        logger.error(f"Get conversations error: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur récupération conversations")

@app.get("/api/messages/conversation/{contact_id}")
async def get_conversation_messages(contact_id: int, user: dict = Depends(get_current_user)):
    """Récupérer les messages d'une conversation spécifique"""
    try:
        conn = sqlite3.connect(DATABASE_URL)
        conn.row_factory = sqlite3.Row
        
        # Marquer les messages comme lus
        conn.execute('''
            UPDATE messages SET is_read = TRUE 
            WHERE sender_id = ? AND recipient_id = ?
        ''', (contact_id, user['id']))
        
        # Récupérer les messages
        messages = conn.execute('''
            SELECT 
                m.*,
                u.first_name,
                u.last_name
            FROM messages m
            JOIN users u ON u.id = m.sender_id
            WHERE (m.sender_id = ? AND m.recipient_id = ?) 
               OR (m.sender_id = ? AND m.recipient_id = ?)
            ORDER BY m.created_at ASC
        ''', (user['id'], contact_id, contact_id, user['id'])).fetchall()
        
        conn.commit()
        conn.close()
        
        messages_data = []
        for msg in messages:
            messages_data.append({
                "id": msg['id'],
                "sender_id": msg['sender_id'],
                "recipient_id": msg['recipient_id'],
                "content": msg['content'],
                "message_type": msg['message_type'],
                "is_read": bool(msg['is_read']),
                "created_at": msg['created_at'],
                "sender_name": f"{msg['first_name']} {msg['last_name']}",
                "is_own_message": msg['sender_id'] == user['id']
            })
        
        return {"messages": messages_data}
        
    except Exception as e:
        logger.error(f"Get messages error: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur récupération messages")

@app.get("/api/messages/suggestions/{contact_id}")
async def get_conversation_suggestions(contact_id: int, user: dict = Depends(get_current_user)):
    """Obtenir des suggestions de sujets de conversation basées sur l'IA"""
    try:
        # Utiliser le service IA pour générer des suggestions
        request = MatchingRequest(
            user_id=user['id'],
            match_types=['all'],
            limit=1
        )
        
        # Trouver les informations de compatibilité avec ce contact
        matches = ai_matching_service.find_matches(request)
        
        # Rechercher si ce contact fait partie des matches
        contact_match = None
        for match in matches:
            if match.matched_user_id == contact_id:
                contact_match = match
                break
        
        if contact_match:
            suggestions = contact_match.suggested_conversation_topics
        else:
            # Suggestions génériques si pas de matching trouvé
            suggestions = [
                "Votre participation à SIPORTS",
                "Innovations dans le secteur maritime",
                "Projets de collaboration",
                "Défis du marché portuaire",
                "Technologies émergentes"
            ]
        
        return {"suggestions": suggestions}
        
    except Exception as e:
        logger.error(f"Conversation suggestions error: {str(e)}")
        # Fallback avec suggestions génériques
        return {
            "suggestions": [
                "Votre participation à SIPORTS",
                "Innovations dans le secteur maritime",
                "Opportunités de collaboration",
                "Tendances du marché maritime"
            ]
        }

@app.get("/api/messages/unread/count")
async def get_unread_messages_count(user: dict = Depends(get_current_user)):
    """Compter les messages non lus"""
    try:
        conn = sqlite3.connect(DATABASE_URL)
        
        count = conn.execute(
            'SELECT COUNT(*) FROM messages WHERE recipient_id = ? AND is_read = FALSE',
            (user['id'],)
        ).fetchone()[0]
        
        conn.close()
        
        return {"unread_count": count}
        
    except Exception as e:
        logger.error(f"Unread count error: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur comptage messages non lus")

# =============================================================================
# AI CHATBOT ENDPOINTS
# =============================================================================

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """Main AI chatbot endpoint"""
    try:
        response = await siports_ai_service.generate_response(request)
        logger.info(f"Chatbot response generated for context: {request.context_type}")
        return response
        
    except Exception as e:
        logger.error(f"Chatbot error: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur chatbot")

@app.post("/api/chat/exhibitor", response_model=ChatResponse)
async def exhibitor_chat_endpoint(request: ChatRequest):
    """Specialized endpoint for exhibitor recommendations"""
    request.context_type = "exhibitor"
    return await chat_endpoint(request)

@app.post("/api/chat/package", response_model=ChatResponse) 
async def package_chat_endpoint(request: ChatRequest):
    """Specialized endpoint for package suggestions"""
    request.context_type = "package"
    return await chat_endpoint(request)

@app.post("/api/chat/event", response_model=ChatResponse)
async def event_chat_endpoint(request: ChatRequest):
    """Specialized endpoint for event information"""
    request.context_type = "event"
    return await chat_endpoint(request)

@app.get("/api/chatbot/health")
async def chatbot_health_check():
    """Chatbot health check"""
    try:
        test_request = ChatRequest(message="test health", context_type="general")
        response = await siports_ai_service.generate_response(test_request)
        
        return {
            "status": "healthy",
            "service": "siports-ai-chatbot",
            "version": "2.0.0",
            "mock_mode": siports_ai_service.mock_mode,
            "test_response_length": len(response.response)
        }
    except Exception as e:
        logger.error(f"Chatbot health check failed: {str(e)}")
        return {"status": "unhealthy", "error": str(e)}

# =============================================================================
# HEALTH CHECK
# =============================================================================

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "SIPORTS v2.0 API", "status": "active", "version": "2.0.0"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "siports-api", "version": "2.0.0"}

# =============================================================================
# STARTUP EVENT
# =============================================================================

@app.on_event("startup")
async def startup_event():
    """Initialize application on startup"""
    logger.info("SIPORTS v2.0 API starting...")
    logger.info(f"Database: {DATABASE_URL}")
    logger.info("AI Chatbot service initialized")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8001))
    uvicorn.run(app, host="0.0.0.0", port=port)