# SiPortEvent 2026 - Application de Gestion d'Événements Sportifs

## Correction de l'erreur 502 Bad Gateway sur Railway

Cette application a été corrigée pour résoudre l'erreur 502 Bad Gateway sur Railway en :

1. **Migration de MongoDB vers PostgreSQL** - Le backend utilise maintenant SQLAlchemy avec asyncpg
2. **Configuration Railway** - Ajout des fichiers de configuration nécessaires
3. **Variables d'environnement** - Configuration appropriée pour Railway

## Structure du Projet

```
/app/
├── backend/          # API FastAPI avec PostgreSQL
├── frontend/         # Application React
├── railway.toml      # Configuration Railway
├── Procfile         # Configuration de démarrage
├── nixpacks.toml    # Configuration Nixpacks
└── server.js        # Serveur Node.js pour Railway
```

## Configuration Railway

### Variables d'environnement requises sur Railway :

**Pour le service backend :**
- `DATABASE_URL` : URL de connexion PostgreSQL (automatiquement fournie par Railway Database)
- `CORS_ORIGINS` : Origins autorisées pour CORS (optionnel, défaut : "*")
- `PORT` : Port d'écoute (automatiquement fourni par Railway)

**Pour le service frontend :**
- `REACT_APP_BACKEND_URL` : URL du backend Railway

### Étapes de déploiement sur Railway :

1. **Créer une base de données PostgreSQL** :
   ```bash
   railway add postgresql
   ```

2. **Déployer l'application** :
   ```bash
   railway up
   ```

3. **Configurer les variables d'environnement** :
   - `DATABASE_URL` sera automatiquement configurée par Railway Database
   - Définir `REACT_APP_BACKEND_URL` vers l'URL de votre service Railway

## API Endpoints

- `GET /api/` - Hello World
- `GET /api/health` - Health check avec vérification base de données
- `POST /api/status` - Créer un status check
- `GET /api/status` - Récupérer tous les status checks

## Développement Local

### Backend :
```bash
cd backend
pip install -r requirements.txt
DATABASE_URL=postgresql+asyncpg://user:pass@localhost/db python server.py
```

### Frontend :
```bash
cd frontend
yarn install
yarn start
```

## Correction des Problèmes Identifiés

1. **MongoDB → PostgreSQL** : Remplacé motor/pymongo par SQLAlchemy/asyncpg
2. **Configuration des ports** : Le serveur écoute maintenant sur `0.0.0.0:$PORT`
3. **Health check** : Ajout d'un endpoint `/api/health` pour Railway
4. **Fichiers de configuration** : Ajout de `railway.toml`, `Procfile`, `nixpacks.toml`
5. **Variables d'environnement** : Configuration appropriée dans les fichiers `.env`

## URL de Production

- Frontend : https://siportevent-2026-v2.vercel.app
- Backend : https://2026-production.up.railway.app

L'erreur 502 Bad Gateway devrait maintenant être résolue après redéploiement sur Railway.
