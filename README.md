# SIPORTS v2.0 - Application Maritime Complète

## 🌊 Description

SIPORTS v2.0 est une plateforme web complète pour la gestion d'événements maritimes professionnels. Cette application permet la gestion des visiteurs, exposants, partenaires avec un système de forfaits avancé et un chatbot IA intégré.

## 🏗️ Architecture Technique

### Stack Technologique
- **Frontend**: React 18 + Vite + Tailwind CSS + TypeScript
- **Backend**: FastAPI + Python 3.11 + SQLite 
- **Base de données**: SQLite (production-ready) + MongoDB (optionnel)
- **AI Chatbot**: Service IA avec simulation intelligente
- **Authentification**: JWT avec gestion des rôles

### Fonctionnalités Principales

#### 🎫 Gestion des Forfaits
- **Visiteurs**: Free (0€), Basic (150€), Premium (350€), VIP (750€)
- **Partenaires**: Startup (2500$), Silver (8000$), Gold (15000$), Platinum (25000$)
- **Système de matching automatique**

#### 👥 Gestion des Utilisateurs
- **3 types d'utilisateurs**: Visiteurs, Exposants, Admins
- **Workflow de validation**: Inscription → Validation admin → Accès complet
- **Profils personnalisables** avec completion tracking

#### 🤖 Chatbot IA Maritime
- **Spécialisé maritime**: Terminologie portuaire, réglementations
- **Multicontexte**: Forfaits, exposants, événements, général
- **Mode simulation intelligent** pour développement
- **Support multilingue** (français par défaut)

#### 📊 Dashboard Admin
- **Statistiques en temps réel**
- **Gestion des validations utilisateurs**
- **Analytics avancés**

## 🚀 Installation et Déploiement

### Prérequis
```bash
- Node.js 18+ 
- Python 3.11+
- yarn/npm
- Git
```

### Installation Rapide

1. **Cloner le projet**
```bash
git clone <repository_url>
cd siports-v2
```

2. **Backend Setup**
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

3. **Frontend Setup**  
```bash
cd frontend
yarn install
yarn start
```

### Variables d'Environnement

#### Backend (.env)
```bash
MONGO_URL=mongodb://localhost:27017
DB_NAME=siports_database
JWT_SECRET_KEY=super_secret_key_change_in_production
PORT=8001
```

#### Frontend (.env)
```bash
REACT_APP_BACKEND_URL=http://localhost:8001
WDS_SOCKET_PORT=3000
```

## 📡 API Documentation

### Endpoints Authentification
```bash
POST /api/auth/register - Inscription utilisateur
POST /api/auth/login - Connexion utilisateur
```

### Endpoints Forfaits
```bash
GET /api/visitor-packages - Liste forfaits visiteurs
GET /api/partnership-packages - Liste forfaits partenaires
POST /api/visitor-packages/update - Mise à jour forfait
```

### Endpoints Admin
```bash
GET /api/admin/dashboard/stats - Statistiques dashboard
GET /api/admin/users/pending - Utilisateurs en attente
POST /api/admin/users/{id}/validate - Valider utilisateur
POST /api/admin/users/{id}/reject - Rejeter utilisateur
```

### Endpoints Chatbot IA
```bash
POST /api/chat - Chat principal
POST /api/chat/exhibitor - Chat spécialisé exposants
POST /api/chat/package - Chat spécialisé forfaits
POST /api/chat/event - Chat spécialisé événements
GET /api/chatbot/health - Health check chatbot
```

## 🎨 Guide Frontend

### Structure des Composants
```
src/
├── components/
│   ├── ai/                 # Composants chatbot IA
│   ├── layout/            # Layout et navigation
│   ├── notifications/     # Système de notifications
│   └── Analytics/         # Composants analytics
├── pages/                 # Pages principales
├── contexts/             # Contexts React (Auth, Package)
└── styles/               # Thèmes CSS
```

### Thème Maritime
- **Couleurs principales**: Bleu marine, Cyan, Turquoise
- **Typographie**: Inter, Fira Code
- **Composants**: Cards, Buttons, Forms avec style maritime

## 🔧 Guide Backend

### Architecture FastAPI
```
backend/
├── server.py                 # Application principale
├── chatbot_service.py       # Service chatbot mock
├── ai_chatbot_system.py     # Service chatbot avancé
└── requirements.txt         # Dépendances Python
```

### Base de Données
- **SQLite** pour simplicité et portabilité
- **Tables principales**: users, chat_sessions, chat_messages
- **Sample data** inclus pour tests

### Sécurité
- **JWT Authentication** avec expiration 7 jours
- **CORS configuré** pour développement/production
- **Validation Pydantic** sur tous les inputs

## 🧪 Tests et Validation

### Tests Backend
```bash
cd backend
pytest test_*.py
```

### Tests Frontend
```bash
cd frontend  
yarn test
```

### Health Checks
```bash
# Backend
curl http://localhost:8001/health

# Chatbot
curl http://localhost:8001/api/chatbot/health
```

## 🚢 Fonctionnalités Maritimes Spécialisées

### Chatbot IA Maritime
- **Base de connaissances**: 200+ exposants, 50+ conférences
- **Contextes spécialisés**: 
  - Technologies maritimes
  - Équipements navals  
  - Logistique portuaire
  - Réglementations internationales (OMI, SOLAS, MARPOL)

### Matching System
- **Algorithmes avancés** pour matching exposants-visiteurs
- **Recommandations personnalisées** basées sur profils
- **Scoring de compatibilité** business

### Système de Forfaits
- **Pricing dynamique** selon demande
- **Avantages évolutifs** par niveau
- **B2B meetings** avec quotas

## 🔨 Corrections Appliquées

### Erreurs Frontend Résolues ✅
1. **Dépendances manquantes**: Toutes installées (sonner, react-hook-form, @radix-ui/*, etc.)
2. **Configuration Vite**: Host et HMR configurés pour accès externe  
3. **Tailwind CSS**: @import "tailwindcss" supprimé, @layer base remplacé

### Erreurs Backend Résolues ✅
1. **Dépendances Python**: Toutes installées et compatibles
2. **Chatbot service**: Mock mode opérationnel
3. **Base de données**: SQLite configurée avec données de test
4. **APIs**: Tous les endpoints testés et fonctionnels

## 📈 Performances

### Frontend
- **Bundle optimisé** avec Vite
- **Code splitting** par routes
- **Lazy loading** des composants
- **Cache assets** pour images

### Backend  
- **FastAPI async** pour haute performance
- **SQLite optimisé** avec index appropriés
- **JWT caching** pour authentification rapide
- **CORS optimisé** pour production

## 🛠️ Développement

### Scripts Utiles
```bash
# Frontend
yarn dev          # Développement avec hot reload
yarn build        # Build production
yarn preview      # Preview build local

# Backend  
python server.py  # Lancement serveur
uvicorn server:app --reload  # Mode développement
```

### Debug Mode
- **Frontend**: Ouvrir DevTools, console logs activés
- **Backend**: Logs détaillés avec niveau INFO
- **Chatbot**: Mode simulation avec réponses contextuelles

## 🌍 Déploiement Production

### Docker (Recommandé)
```dockerfile
# Frontend
FROM node:18-alpine
COPY . .
RUN yarn install && yarn build
EXPOSE 3000

# Backend
FROM python:3.11-slim
COPY . .
RUN pip install -r requirements.txt
EXPOSE 8001
```

### Variables Production
```bash
# Frontend
REACT_APP_BACKEND_URL=https://api.siports.com

# Backend  
JWT_SECRET_KEY=production_secret_256_chars
DB_NAME=siports_production
```

## 📞 Support

### Contacts
- **Technique**: support@siports.com
- **Documentation**: docs.siports.com
- **GitHub Issues**: github.com/siports/v2-issues

### Logs et Debug
```bash
# Frontend logs
tail -f logs/frontend.log

# Backend logs  
tail -f logs/backend.log

# Supervisor logs
sudo supervisorctl tail -f backend
```

---

**SIPORTS v2.0** - Plateforme Maritime de Nouvelle Génération 🚢⚓
*Version complètement corrigée et opérationnelle*