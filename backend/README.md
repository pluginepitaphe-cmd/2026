# 🔧 SIPORTS Backend - FastAPI + PostgreSQL

## 📋 Description

Backend FastAPI complet pour SIPORTS v2.0 avec :
- Authentification JWT multi-rôles
- Base de données PostgreSQL/SQLite
- API REST complète
- Service chatbot IA
- Dashboard administrateur

## 🚀 Installation Locale

```bash
# Installer les dépendances
pip install -r requirements.txt

# Configurer les variables d'environnement
cp .env.example .env
# Modifier .env avec vos valeurs

# Lancer le serveur
python server.py
```

## 📡 Endpoints API

### Authentification
- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription
- `POST /api/auth/visitor-login` - Connexion visiteur
- `GET /api/auth/me` - Profil utilisateur

### Administration
- `GET /api/admin/dashboard/stats` - Statistiques
- `GET /api/admin/users/pending` - Utilisateurs en attente
- `POST /api/admin/users/{id}/validate` - Valider utilisateur

### Packages
- `GET /api/visitor-packages` - Forfaits visiteur
- `GET /api/partnership-packages` - Forfaits partenaire
- `POST /api/update-package` - Mettre à jour forfait

### Chatbot IA
- `POST /api/chat` - Chat principal
- `GET /api/chatbot/health` - Santé du service
- `GET /api/chatbot/stats` - Statistiques chatbot

## 🗄️ Base de Données

### Local (SQLite)
```bash
# Automatiquement créée au premier lancement
DATABASE_URL=sqlite:///siports.db
```

### Production (PostgreSQL)
```bash
# Railway fournit automatiquement
DATABASE_URL=${{DATABASE_URL}}
```

## 🔑 Utilisateurs de Test

- **Admin**: admin@siportevent.com / admin123
- **Exposant**: exposant@example.com / exhibitor123
- **Visiteur**: visitor@example.com / visitor123

## 📊 Monitoring

- Health Check: `GET /`
- API Docs: `GET /api/docs`
- Metrics: `GET /api/health`

## 🚀 Déploiement Railway

Voir `../docs/DEPLOY_BACKEND.md` pour les instructions complètes.