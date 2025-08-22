# 🚀 Guide de Déploiement Railway - SiPortEvent 2026

## ✅ Corrections Appliquées pour Résoudre l'Erreur 502

### 🔧 **Problèmes Identifiés et Corrigés**

1. **Migration Database** : MongoDB → PostgreSQL avec SQLAlchemy + asyncpg
2. **Configuration Python** : Environnement virtuel + installation des dépendances 
3. **Variables d'environnement** : Configuration Railway appropriée
4. **Health Check** : Endpoint `/api/health` pour Railway
5. **Port Configuration** : Écoute sur `0.0.0.0:$PORT`

### 📋 **Fichiers de Configuration Créés**

- ✅ `railway.toml` - Configuration Railway (Dockerfile)
- ✅ `Dockerfile` - Build container avec Python + Node.js
- ✅ `start.sh` - Script de démarrage robuste
- ✅ `nixpacks.toml` - Configuration Nixpacks alternative
- ✅ `railway.json` - Configuration JSON alternative
- ✅ `.dockerignore` - Optimisation du build

### 🗄️ **Configuration Base de Données**

**Railway PostgreSQL :**
```bash
railway add postgresql
```

**Variables automatiquement configurées :**
- `DATABASE_URL` - URL PostgreSQL Railway (automatique)
- `PORT` - Port d'écoute Railway (automatique)

**Variables à configurer manuellement :**
- `CORS_ORIGINS` - Origins autorisées (optionnel, défaut: "*")

### 🌐 **Variables d'Environnement Frontend**

**Dans Railway, configurer :**
- `REACT_APP_BACKEND_URL` = `https://votre-service-railway.up.railway.app`

### 🚀 **Étapes de Déploiement**

#### 1. **Préparer le Repository**
```bash
git add .
git commit -m "Fix 502 Bad Gateway - Railway PostgreSQL configuration"
git push origin main
```

#### 2. **Configurer Railway**
```bash
# Connecter le repository
railway link

# Ajouter PostgreSQL
railway add postgresql

# Déployer
railway up
```

#### 3. **Vérifier le Déploiement**
```bash
# Tester l'API
curl https://votre-service.up.railway.app/api/health

# Réponse attendue:
# {"status":"healthy","database":"connected"}
```

### 🔍 **Troubleshooting**

#### **Si l'erreur 502 persiste :**

1. **Vérifier les logs Railway** :
   ```bash
   railway logs
   ```

2. **Vérifier les variables d'environnement** :
   ```bash
   railway variables
   ```

3. **Tester localement** :
   ```bash
   ./start.sh
   curl http://localhost:8001/api/health
   ```

#### **Erreurs Communes** :

- ❌ `DATABASE_URL` manquante → Vérifier la database Railway
- ❌ Port incorrect → Railway configure automatiquement `PORT`
- ❌ Build fails → Voir logs Dockerfile, vérifier Python dependencies

### 📊 **API Endpoints Disponibles**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/` | GET | Hello World |
| `/api/health` | GET | Health check + DB status |
| `/api/status` | POST | Créer status check |
| `/api/status` | GET | Récupérer status checks |

### 🎯 **Résultat Attendu**

✅ **Application accessible sur** : `https://2026-production.up.railway.app`  
✅ **API fonctionnelle** : `https://2026-production.up.railway.app/api/health`  
✅ **Base PostgreSQL connectée**  
✅ **Erreur 502 Bad Gateway résolue**  

---

## 📞 **Support**

Si l'erreur 502 persiste après ces corrections, vérifiez :
1. Les logs Railway détaillés
2. La configuration de la base PostgreSQL
3. Les variables d'environnement dans Railway

**L'application est maintenant optimisée pour Railway avec PostgreSQL !** 🎉