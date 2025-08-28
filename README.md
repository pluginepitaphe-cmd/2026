# Application PostgreSQL 2026

## 📋 Vue d'ensemble

Application fullstack migrée vers **PostgreSQL** et organisée pour intégration dans le repository **"2026"** avec préservation des configurations **Railway**.

## 🏗️ Architecture

### Backend (FastAPI + PostgreSQL)
- **Framework:** FastAPI avec SQLAlchemy async
- **Base de données:** PostgreSQL (migration depuis MongoDB)
- **ORM:** SQLAlchemy avec modèles async
- **API:** Endpoints RESTful avec préfixe `/api`

### Frontend (React + Tailwind)
- **Framework:** React 19 avec hooks modernes
- **Styling:** Tailwind CSS + Radix UI
- **Routing:** React Router DOM
- **HTTP Client:** Axios

## 🚀 Fonctionnalités

### API Endpoints
- `GET /api/` - Message de bienvenue
- `GET /api/health` - Health check avec status DB
- `GET /api/status` - Liste des status checks
- `POST /api/status` - Création d'un nouveau status check

### Interface Utilisateur
- Dashboard avec status de l'API
- Health check en temps réel
- Gestion des status checks (CRUD)
- Interface responsive avec Tailwind

## 🔧 Configuration

### Variables d'environnement

#### Backend (`/app/backend/.env`)
```env
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
CORS_ORIGINS=*
```

#### Frontend (`/app/frontend/.env`) 
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

### Railway Configuration
> ⚠️ **IMPORTANT**: Les configurations Railway existantes dans le repository "2026" 
> doivent être préservées lors de l'intégration de cette application.

## 📦 Installation

### Backend
```bash
cd backend
pip install -r requirements.txt
```

### Frontend  
```bash
cd frontend
yarn install
```

## 🚢 Déploiement Railway

### Configuration automatique
- Railway détectera automatiquement PostgreSQL
- `DATABASE_URL` sera fourni automatiquement
- Les services démarreront via les configurations existantes

### Variables à configurer sur Railway
- `CORS_ORIGINS` (optionnel, défaut: `*`)
- `REACT_APP_BACKEND_URL` (URL backend Railway)

## 🔄 Migration

### Changements effectués
1. **Suppression MongoDB**: Remplacement par PostgreSQL + SQLAlchemy
2. **Modèles de données**: Migration vers SQLAlchemy models
3. **Connexion async**: Utilisation d'asyncpg pour performances
4. **Health checks**: Monitoring de la connexion DB
5. **UI améliorée**: Interface moderne pour tester les fonctionnalités

### Fichiers modifiés
- `backend/server.py` - API FastAPI avec PostgreSQL
- `backend/database.py` - Configuration DB et modèles
- `backend/requirements.txt` - Dépendances PostgreSQL
- `frontend/src/App.js` - Interface utilisateur complète
- `backend/.env` & `frontend/.env` - Variables d'environnement

## ⚡ Prêt pour production

✅ **Migration PostgreSQL complète**  
✅ **Variables d'environnement configurées**  
✅ **API endpoints testés**  
✅ **Interface utilisateur fonctionnelle**  
✅ **Compatible Railway**  
✅ **Prêt pour commit dans "2026"**  

---

**Note**: Cette application préserve les configurations Railway existantes et est prête à être intégrée dans le repository "2026" sans conflit.