#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Service IA de Matching Simulé - SIPORTS v2.0
Implémentation des fonctionnalités IA avancées selon les spécifications PDF
"""

import os
import json
import random
import sqlite3
import logging
from datetime import datetime, timedelta
from typing import List, Dict, Optional, Tuple
from dataclasses import dataclass
from pydantic import BaseModel
import re
import math

logger = logging.getLogger(__name__)

# =============================================================================
# MODÈLES DE DONNÉES
# =============================================================================

@dataclass
class UserProfile:
    """Profil utilisateur complet selon spécifications PDF"""
    user_id: int
    user_type: str  # visitor, exhibitor, partner
    
    # Informations de base
    first_name: str
    last_name: str
    company: str
    title: str
    email: str
    phone: str
    description: str
    
    # Spécifique selon type d'utilisateur
    sectors_activity: List[str] = None  # Secteurs d'activité
    products_services: List[str] = None  # Produits/services proposés
    participation_objectives: List[str] = None  # Objectifs de participation
    interest_themes: List[str] = None  # Thématiques d'intérêt
    visit_objectives: List[str] = None  # Objectifs de visite (visiteurs)
    skills_expertise: List[str] = None  # Compétences et expertises
    
    # Critères de matching personnalisables
    matching_criteria: Dict = None
    looking_for: List[str] = None
    budget_range: str = None
    company_size: str = None
    geographic_location: List[str] = None
    
    # Données comportementales (pour IA)
    interaction_history: List[Dict] = None
    preferences: Dict = None
    meeting_availability: str = None
    languages: List[str] = None
    certifications: List[str] = None


class MatchingRequest(BaseModel):
    """Requête de matching avec critères"""
    user_id: int
    match_types: List[str] = ["all"]  # partners, exhibitors, visitors, all
    sectors: List[str] = ["all"]
    min_compatibility: int = 70
    location_filter: List[str] = ["all"]
    package_filter: List[str] = ["all"]
    budget_filter: str = "all"
    custom_criteria: Dict = {}
    limit: int = 20


class MatchResult(BaseModel):
    """Résultat de matching avec score IA"""
    matched_user_id: int
    compatibility_score: int
    explanation: str
    mutual_interests: List[str]
    business_potential: str
    matching_factors: Dict
    ai_recommendation: str
    suggested_conversation_topics: List[str]


class ProactiveRecommendation(BaseModel):
    """Suggestion proactive par l'IA"""
    user_id: int
    recommendation_type: str  # new_match, trending_topic, opportunity
    title: str
    content: str
    confidence_score: int
    action_suggestions: List[str]
    expires_at: datetime

# =============================================================================
# SERVICE IA DE MATCHING
# =============================================================================

class AIMatchingService:
    """Service principal de matching IA simulé"""
    
    def __init__(self, db_path: str = "instance/siports_production.db"):
        self.db_path = db_path
        self.init_ai_tables()
        
        # Base de connaissances maritime pour simulation NLP
        self.maritime_keywords = {
            "port_management": ["gestion portuaire", "terminaux", "logistique", "manutention", "stockage"],
            "port_equipment": ["grues", "portiques", "équipements", "automatisation", "robotique"],
            "maritime_tech": ["navigation", "sécurité maritime", "communication", "radar", "GPS"],
            "green_energy": ["éolien offshore", "hydrogène", "batteries", "énergies renouvelables"],
            "digitalization": ["IoT", "IA", "big data", "digitalisation", "capteurs", "blockchain"],
            "regulations": ["OMI", "SOLAS", "MARPOL", "conformité", "certification", "audit"],
            "logistics": ["supply chain", "transport multimodal", "conteneurs", "fret", "douane"]
        }
        
        # Simulation des modèles d'apprentissage
        self.ml_models = {
            "compatibility_predictor": self._simulate_compatibility_model,
            "content_analyzer": self._simulate_nlp_analysis,
            "collaborative_filter": self._simulate_collaborative_filtering,
            "trend_detector": self._simulate_trend_detection
        }

    def init_ai_tables(self):
        """Initialisation des tables IA dans la base de données"""
        conn = sqlite3.connect(self.db_path)
        
        # Table des profils détaillés
        conn.execute('''
            CREATE TABLE IF NOT EXISTS user_profiles_detailed (
                user_id INTEGER PRIMARY KEY,
                sectors_activity TEXT,  -- JSON array
                products_services TEXT,  -- JSON array  
                participation_objectives TEXT,  -- JSON array
                interest_themes TEXT,  -- JSON array
                visit_objectives TEXT,  -- JSON array
                skills_expertise TEXT,  -- JSON array
                matching_criteria TEXT,  -- JSON object
                looking_for TEXT,  -- JSON array
                budget_range TEXT,
                company_size TEXT,
                geographic_location TEXT,  -- JSON array
                meeting_availability TEXT,
                languages TEXT,  -- JSON array
                certifications TEXT,  -- JSON array
                preferences TEXT,  -- JSON object
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Table historique des interactions (pour apprentissage)
        conn.execute('''
            CREATE TABLE IF NOT EXISTS interaction_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                target_user_id INTEGER,
                interaction_type TEXT,  -- view, message, meeting, connection
                compatibility_score INTEGER,
                success_indicator INTEGER,  -- 0=failed, 1=success, 2=ongoing
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Table des recommandations proactives
        conn.execute('''
            CREATE TABLE IF NOT EXISTS ai_recommendations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                recommendation_type TEXT,
                title TEXT,
                content TEXT,
                confidence_score INTEGER,
                action_suggestions TEXT,  -- JSON array
                is_read INTEGER DEFAULT 0,
                expires_at TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Table des tendances détectées par l'IA
        conn.execute('''
            CREATE TABLE IF NOT EXISTS ai_trends (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                trend_topic TEXT,
                trend_strength REAL,
                affected_sectors TEXT,  -- JSON array
                description TEXT,
                detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        conn.commit()
        conn.close()

    # ========================================================================
    # SIMULATION DES MODÈLES IA
    # ========================================================================
    
    def _simulate_nlp_analysis(self, text: str) -> Dict:
        """Simulation de l'analyse NLP des descriptions textuelles"""
        if not text:
            return {"keywords": [], "sentiment": "neutral", "topics": []}
            
        text_lower = text.lower()
        detected_keywords = []
        detected_topics = []
        
        # Détection de mots-clés maritimes
        for category, keywords in self.maritime_keywords.items():
            for keyword in keywords:
                if keyword in text_lower:
                    detected_keywords.append(keyword)
                    if category not in detected_topics:
                        detected_topics.append(category)
        
        # Simulation d'analyse de sentiment
        positive_words = ["innovation", "leader", "expert", "qualité", "excellence", "performance"]
        negative_words = ["problème", "difficulté", "défi", "limitation"]
        
        positive_count = sum(1 for word in positive_words if word in text_lower)
        negative_count = sum(1 for word in negative_words if word in text_lower)
        
        if positive_count > negative_count:
            sentiment = "positive"
        elif negative_count > positive_count:
            sentiment = "negative"
        else:
            sentiment = "neutral"
        
        return {
            "keywords": detected_keywords,
            "topics": detected_topics,
            "sentiment": sentiment,
            "confidence": random.uniform(0.75, 0.95)
        }
    
    def _simulate_compatibility_model(self, profile1: Dict, profile2: Dict) -> int:
        """Simulation du modèle d'apprentissage supervisé pour la compatibilité"""
        score = 0
        max_score = 100
        
        # Facteur 1: Secteurs d'activité complémentaires (25 points)
        sectors1 = json.loads(profile1.get('sectors_activity', '[]')) if profile1.get('sectors_activity') else []
        sectors2 = json.loads(profile2.get('sectors_activity', '[]')) if profile2.get('sectors_activity') else []
        
        if sectors1 and sectors2:
            common_sectors = set(sectors1) & set(sectors2)
            score += min(25, len(common_sectors) * 8)
        
        # Facteur 2: Objectifs complémentaires (20 points)
        obj1 = json.loads(profile1.get('participation_objectives', '[]')) if profile1.get('participation_objectives') else []
        looking1 = json.loads(profile1.get('looking_for', '[]')) if profile1.get('looking_for') else []
        obj2 = json.loads(profile2.get('participation_objectives', '[]')) if profile2.get('participation_objectives') else []
        
        # Vérifier si les objectifs de l'un correspondent aux offres de l'autre
        complementarity = 0
        for objective in obj1:
            for service in json.loads(profile2.get('products_services', '[]')) if profile2.get('products_services') else []:
                if any(word in service.lower() for word in objective.lower().split()):
                    complementarity += 1
        
        score += min(20, complementarity * 4)
        
        # Facteur 3: Thématiques d'intérêt communes (20 points)
        themes1 = json.loads(profile1.get('interest_themes', '[]')) if profile1.get('interest_themes') else []
        themes2 = json.loads(profile2.get('interest_themes', '[]')) if profile2.get('interest_themes') else []
        
        if themes1 and themes2:
            common_themes = set(themes1) & set(themes2)
            score += min(20, len(common_themes) * 5)
        
        # Facteur 4: Proximité géographique (15 points)
        geo1 = json.loads(profile1.get('geographic_location', '[]')) if profile1.get('geographic_location') else []
        geo2 = json.loads(profile2.get('geographic_location', '[]')) if profile2.get('geographic_location') else []
        
        if geo1 and geo2:
            geo_match = set(geo1) & set(geo2)
            if geo_match:
                score += 15
            elif any(g1 in geo2 or g2 in geo1 for g1 in geo1 for g2 in geo2):
                score += 8
        
        # Facteur 5: Taille d'entreprise compatible (10 points)
        size1 = profile1.get('company_size', '')
        size2 = profile2.get('company_size', '')
        
        if size1 and size2:
            # Logique de compatibilité des tailles d'entreprise
            size_compatibility = {
                ("startup", "enterprise"): 8,
                ("sme", "enterprise"): 10,
                ("sme", "sme"): 10,
                ("startup", "startup"): 7
            }
            
            for (s1, s2), points in size_compatibility.items():
                if (s1 in size1.lower() and s2 in size2.lower()) or (s2 in size1.lower() and s1 in size2.lower()):
                    score += points
                    break
        
        # Facteur 6: Disponibilité de meeting (10 points)
        avail1 = profile1.get('meeting_availability', '')
        avail2 = profile2.get('meeting_availability', '')
        
        if "immédiat" in avail1.lower() or "immédiat" in avail2.lower():
            score += 10
        elif avail1 and avail2:
            score += 5
        
        return min(max_score, score)
    
    def _simulate_collaborative_filtering(self, user_id: int, target_users: List[int]) -> Dict[int, float]:
        """Simulation du filtrage collaboratif basé sur les comportements"""
        conn = sqlite3.connect(self.db_path)
        
        # Récupérer l'historique d'interactions similaires
        similar_interactions = conn.execute('''
            SELECT target_user_id, AVG(compatibility_score), COUNT(*), AVG(success_indicator)
            FROM interaction_history 
            WHERE user_id IN (
                SELECT DISTINCT ih2.user_id FROM interaction_history ih2
                WHERE ih2.target_user_id IN (
                    SELECT target_user_id FROM interaction_history 
                    WHERE user_id = ? AND success_indicator >= 1
                )
            ) AND user_id != ?
            GROUP BY target_user_id
            HAVING COUNT(*) >= 2
        ''', (user_id, user_id)).fetchall()
        
        conn.close()
        
        collaborative_scores = {}
        for target_id in target_users:
            # Score basé sur les interactions similaires
            base_score = 0.5
            for interaction in similar_interactions:
                if interaction[0] == target_id:
                    # Weighted score based on past success
                    avg_compatibility = interaction[1] or 70
                    interaction_count = interaction[2]
                    success_rate = interaction[3] or 0.5
                    
                    collaborative_score = (avg_compatibility / 100) * (1 + success_rate) * math.log(1 + interaction_count)
                    base_score = max(base_score, collaborative_score)
            
            collaborative_scores[target_id] = base_score
        
        return collaborative_scores
    
    def _simulate_trend_detection(self) -> List[Dict]:
        """Simulation de détection de tendances par l'IA"""
        
        # Tendances simulées basées sur l'actualité maritime
        current_trends = [
            {
                "topic": "Intelligence Artificielle Portuaire",
                "strength": 0.85,
                "sectors": ["digitalization", "port_management"],
                "description": "Adoption croissante de l'IA pour l'optimisation des opérations portuaires",
                "growth_rate": "+45%"
            },
            {
                "topic": "Énergies Renouvelables Offshore",
                "strength": 0.78,
                "sectors": ["green_energy", "maritime_tech"],
                "description": "Expansion des projets éoliens offshore et solutions d'hydrogène vert",
                "growth_rate": "+32%"
            },
            {
                "topic": "Automatisation Terminaux",
                "strength": 0.72,
                "sectors": ["port_equipment", "digitalization"],
                "description": "Investissement massif dans l'automatisation des terminaux à conteneurs",
                "growth_rate": "+28%"
            },
            {
                "topic": "Durabilité et Décarbonation",
                "strength": 0.68,
                "sectors": ["green_energy", "regulations"],
                "description": "Nouvelles réglementations environnementales et solutions vertes",
                "growth_rate": "+25%"
            }
        ]
        
        return current_trends

    # ========================================================================
    # API PRINCIPALES DE MATCHING
    # ========================================================================
    
    def find_matches(self, request: MatchingRequest) -> List[MatchResult]:
        """Recherche de matches avec IA avancée"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        
        # Récupérer le profil de l'utilisateur demandeur
        user_profile = conn.execute('''
            SELECT u.*, upd.*
            FROM users u
            LEFT JOIN user_profiles_detailed upd ON u.id = upd.user_id
            WHERE u.id = ?
        ''', (request.user_id,)).fetchone()
        
        if not user_profile:
            return []
        
        # Construire la requête de candidats
        type_filter = ""
        if "all" not in request.match_types:
            placeholders = ",".join(["?" for _ in request.match_types])
            type_filter = f"AND u.user_type IN ({placeholders})"
        
        query = f'''
            SELECT u.*, upd.*
            FROM users u
            LEFT JOIN user_profiles_detailed upd ON u.id = upd.user_id
            WHERE u.id != ? AND u.status = 'validated'
            {type_filter}
            ORDER BY u.id
            LIMIT ?
        '''
        
        params = [request.user_id] + (request.match_types if "all" not in request.match_types else []) + [request.limit * 2]
        candidates = conn.execute(query, params).fetchall()
        
        conn.close()
        
        # Calcul des scores de compatibilité avec IA
        matches = []
        for candidate in candidates:
            # Score du modèle de compatibilité
            compatibility_score = self._simulate_compatibility_model(
                dict(user_profile), dict(candidate)
            )
            
            if compatibility_score >= request.min_compatibility:
                # Analyse NLP des descriptions
                user_analysis = self._simulate_nlp_analysis(user_profile.get('description', ''))
                candidate_analysis = self._simulate_nlp_analysis(candidate.get('description', ''))
                
                # Facteurs de matching détaillés
                matching_factors = self._analyze_matching_factors(
                    dict(user_profile), dict(candidate), user_analysis, candidate_analysis
                )
                
                # Génération de l'explication IA
                explanation = self._generate_ai_explanation(matching_factors, compatibility_score)
                
                # Suggestions de sujets de conversation
                conversation_topics = self._suggest_conversation_topics(
                    user_analysis, candidate_analysis, matching_factors
                )
                
                match_result = MatchResult(
                    matched_user_id=candidate['id'],
                    compatibility_score=compatibility_score,
                    explanation=explanation,
                    mutual_interests=matching_factors.get('common_interests', []),
                    business_potential=self._assess_business_potential(compatibility_score, matching_factors),
                    matching_factors=matching_factors,
                    ai_recommendation=self._generate_ai_recommendation(compatibility_score, matching_factors),
                    suggested_conversation_topics=conversation_topics
                )
                
                matches.append(match_result)
        
        # Tri par score de compatibilité et filtrage collaboratif
        if matches:
            target_ids = [m.matched_user_id for m in matches]
            collaborative_scores = self._simulate_collaborative_filtering(request.user_id, target_ids)
            
            # Ajustement des scores avec filtrage collaboratif
            for match in matches:
                collab_boost = collaborative_scores.get(match.matched_user_id, 0.5)
                match.compatibility_score = min(100, int(match.compatibility_score * (1 + collab_boost * 0.1)))
        
        # Tri final et limitation
        matches.sort(key=lambda x: x.compatibility_score, reverse=True)
        return matches[:request.limit]
    
    def _analyze_matching_factors(self, profile1: Dict, profile2: Dict, 
                                analysis1: Dict, analysis2: Dict) -> Dict:
        """Analyse détaillée des facteurs de matching"""
        factors = {
            "common_interests": [],
            "complementary_needs": [],
            "sector_alignment": 0,
            "geographic_proximity": 0,
            "business_size_match": 0,
            "innovation_alignment": 0
        }
        
        # Intérêts communs basés sur l'analyse NLP
        common_topics = set(analysis1.get('topics', [])) & set(analysis2.get('topics', []))
        factors['common_interests'] = list(common_topics)
        
        # Alignement sectoriel
        sectors1 = json.loads(profile1.get('sectors_activity', '[]')) if profile1.get('sectors_activity') else []
        sectors2 = json.loads(profile2.get('sectors_activity', '[]')) if profile2.get('sectors_activity') else []
        if sectors1 and sectors2:
            overlap = len(set(sectors1) & set(sectors2))
            factors['sector_alignment'] = min(1.0, overlap / max(len(sectors1), len(sectors2)))
        
        # Besoins complémentaires
        looking_for1 = json.loads(profile1.get('looking_for', '[]')) if profile1.get('looking_for') else []
        products2 = json.loads(profile2.get('products_services', '[]')) if profile2.get('products_services') else []
        
        complementary = []
        for need in looking_for1:
            for product in products2:
                if any(word in product.lower() for word in need.lower().split()):
                    complementary.append(f"{need} ← {product}")
        
        factors['complementary_needs'] = complementary
        
        return factors
    
    def _generate_ai_explanation(self, factors: Dict, score: int) -> str:
        """Génération d'explication IA du matching"""
        explanations = []
        
        if factors['common_interests']:
            explanations.append(f"Intérêts communs en {', '.join(factors['common_interests'][:2])}")
        
        if factors['complementary_needs']:
            explanations.append(f"Besoins complémentaires identifiés ({len(factors['complementary_needs'])} correspondances)")
        
        if factors['sector_alignment'] > 0.5:
            explanations.append("Fort alignement sectoriel")
        
        if score >= 90:
            tone = "Correspondance exceptionnelle"
        elif score >= 80:
            tone = "Très bonne compatibilité"
        elif score >= 70:
            tone = "Bonne compatibilité"
        else:
            tone = "Compatibilité modérée"
        
        if explanations:
            return f"{tone}: {', '.join(explanations)}"
        else:
            return f"{tone} basée sur l'analyse comportementale"
    
    def _assess_business_potential(self, score: int, factors: Dict) -> str:
        """Évaluation du potentiel business"""
        if score >= 90 and len(factors.get('complementary_needs', [])) >= 2:
            return "Très élevé"
        elif score >= 80 and (factors.get('sector_alignment', 0) > 0.7 or len(factors.get('common_interests', [])) >= 2):
            return "Élevé"
        elif score >= 70:
            return "Moyen"
        else:
            return "Faible"
    
    def _generate_ai_recommendation(self, score: int, factors: Dict) -> str:
        """Génération de recommandation d'action IA"""
        recommendations = []
        
        if score >= 85:
            recommendations.append("🎯 Contact prioritaire recommandé")
        
        if factors.get('complementary_needs'):
            recommendations.append("💼 Proposez une collaboration directe")
        
        if len(factors.get('common_interests', [])) >= 2:
            recommendations.append("🤝 Excellent potentiel de partenariat")
        
        if not recommendations:
            recommendations.append("📈 Explorez les opportunités de collaboration")
        
        return " • ".join(recommendations)
    
    def _suggest_conversation_topics(self, analysis1: Dict, analysis2: Dict, factors: Dict) -> List[str]:
        """Suggestions de sujets de conversation par l'IA"""
        topics = []
        
        # Basé sur les intérêts communs
        common_interests = factors.get('common_interests', [])
        if 'digitalization' in common_interests:
            topics.append("Transformation digitale des ports")
        if 'green_energy' in common_interests:
            topics.append("Solutions énergies renouvelables offshore")
        if 'port_management' in common_interests:
            topics.append("Optimisation des opérations portuaires")
        
        # Basé sur les besoins complémentaires
        if factors.get('complementary_needs'):
            topics.append("Opportunités de collaboration business")
        
        # Sujets génériques maritimes
        generic_topics = [
            "Innovations technologiques maritimes",
            "Réglementations internationales récentes",
            "Tendances du marché portuaire",
            "Projets de développement durable"
        ]
        
        # Ajout de sujets génériques si pas assez spécifiques
        while len(topics) < 3:
            topic = random.choice(generic_topics)
            if topic not in topics:
                topics.append(topic)
        
        return topics[:4]
    
    def generate_proactive_recommendations(self, user_id: int) -> List[ProactiveRecommendation]:
        """Génération de recommandations proactives par l'IA"""
        recommendations = []
        
        # Détection des tendances actuelles
        trends = self._simulate_trend_detection()
        
        # Récupération du profil utilisateur
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        
        user_profile = conn.execute('''
            SELECT u.*, upd.*
            FROM users u
            LEFT JOIN user_profiles_detailed upd ON u.id = upd.user_id
            WHERE u.id = ?
        ''', (user_id,)).fetchone()
        
        if not user_profile:
            conn.close()
            return recommendations
        
        user_interests = json.loads(user_profile['interest_themes']) if user_profile['interest_themes'] else []
        
        # Recommandations basées sur les tendances
        for trend in trends:
            if any(interest in trend['sectors'] for interest in user_interests):
                recommendation = ProactiveRecommendation(
                    user_id=user_id,
                    recommendation_type="trending_topic",
                    title=f"🔥 Tendance détectée: {trend['topic']}",
                    content=f"{trend['description']} (Croissance: {trend.get('growth_rate', 'N/A')})",
                    confidence_score=int(trend['strength'] * 100),
                    action_suggestions=[
                        "Rechercher des partenaires dans cette thématique",
                        "Actualiser votre profil avec ces mots-clés",
                        "Participer aux discussions sur ce sujet"
                    ],
                    expires_at=datetime.now() + timedelta(days=7)
                )
                recommendations.append(recommendation)
        
        # Nouveaux matches potentiels
        recent_matches = conn.execute('''
            SELECT COUNT(*) FROM users u
            LEFT JOIN user_profiles_detailed upd ON u.id = upd.user_id
            WHERE u.id != ? AND u.status = 'validated'
            AND u.created_at > datetime('now', '-7 days')
        ''', (user_id,)).fetchone()[0]
        
        if recent_matches > 0:
            recommendation = ProactiveRecommendation(
                user_id=user_id,
                recommendation_type="new_match",
                title=f"✨ {recent_matches} nouveaux profils compatibles détectés",
                content="De nouveaux participants ont rejoint la plateforme avec des profils correspondant à vos intérêts.",
                confidence_score=85,
                action_suggestions=[
                    "Lancer une nouvelle recherche de matching",
                    "Examiner les nouveaux profils",
                    "Envoyer des demandes de connexion"
                ],
                expires_at=datetime.now() + timedelta(days=3)
            )
            recommendations.append(recommendation)
        
        # Sauvegarde des recommandations
        for rec in recommendations:
            conn.execute('''
                INSERT INTO ai_recommendations 
                (user_id, recommendation_type, title, content, confidence_score, action_suggestions, expires_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (
                rec.user_id, rec.recommendation_type, rec.title, rec.content,
                rec.confidence_score, json.dumps(rec.action_suggestions), rec.expires_at
            ))
        
        conn.commit()
        conn.close()
        
        return recommendations
    
    def update_interaction_feedback(self, user_id: int, target_user_id: int, 
                                  interaction_type: str, success_indicator: int):
        """Mise à jour du feedback d'interaction pour l'apprentissage par renforcement"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        
        # Récalcul du score de compatibilité pour ce feedback
        user_profile = conn.execute('''
            SELECT u.*, upd.*
            FROM users u
            LEFT JOIN user_profiles_detailed upd ON u.id = upd.user_id
            WHERE u.id = ?
        ''', (user_id,)).fetchone()
        
        target_profile = conn.execute('''
            SELECT u.*, upd.*
            FROM users u
            LEFT JOIN user_profiles_detailed upd ON u.id = upd.user_id
            WHERE u.id = ?
        ''', (target_user_id,)).fetchone()
        
        if user_profile and target_profile:
            # Convert Row objects to dictionaries
            user_dict = {key: user_profile[key] for key in user_profile.keys()}
            target_dict = {key: target_profile[key] for key in target_profile.keys()}
            
            compatibility_score = self._simulate_compatibility_model(
                user_dict, target_dict
            )
            
            conn.execute('''
                INSERT INTO interaction_history 
                (user_id, target_user_id, interaction_type, compatibility_score, success_indicator)
                VALUES (?, ?, ?, ?, ?)
            ''', (user_id, target_user_id, interaction_type, compatibility_score, success_indicator))
        
        conn.commit()
        conn.close()

# =============================================================================
# INSTANCE GLOBALE
# =============================================================================

ai_matching_service = AIMatchingService()