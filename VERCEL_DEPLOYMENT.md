# 🚀 Guide de déploiement Vercel

## 📋 Étapes de déploiement

### 1. ✅ Save to GitHub (À faire maintenant)
- Dans l'interface Emergent, cliquez sur **"Save to GitHub"**
- Sélectionnez votre repository ou créez-en un nouveau
- Pushez le code

### 2. 🔗 Connecter à Vercel
1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec votre compte GitHub
3. Cliquez sur **"New Project"**
4. Sélectionnez le repository que vous venez de pusher
5. Vercel détectera automatiquement la configuration

### 3. ⚙️ Configuration des variables d'environnement sur Vercel

#### Variables requises :
```env
# Backend PostgreSQL (requis)
DATABASE_URL=postgresql://username:password@host:port/dbname

# Frontend (automatiquement configuré)
REACT_APP_BACKEND_URL=https://siporteventeljadida.vercel.app
```

#### Comment configurer :
1. Dans le tableau de bord Vercel de votre projet
2. Allez dans **Settings** → **Environment Variables**
3. Ajoutez `DATABASE_URL` avec vos credentials PostgreSQL

### 4. 🗄️ Base de données PostgreSQL

#### Options pour PostgreSQL :
- **Vercel Postgres** (recommandé - intégré)
- **Neon** (gratuit avec bonne intégration Vercel)
- **Supabase** (alternative robuste)
- **Railway Postgres** (si vous voulez garder Railway)

#### Configuration Vercel Postgres :
1. Dans votre projet Vercel, allez dans **Storage**
2. Créez une **Postgres Database**
3. Copiez la `DATABASE_URL` automatiquement générée
4. Ajoutez-la dans **Environment Variables**

### 5. 🚀 Déploiement automatique

Une fois configuré :
- Chaque push sur la branche principale déclenche un redéploiement
- Vercel build automatiquement frontend et backend
- L'URL `https://siporteventeljadida.vercel.app/` sera mise à jour

## 🔧 Structure Vercel configurée

```
/
├── frontend/          # React app (build vers /)
├── backend/           # FastAPI serverless functions
└── vercel.json        # Configuration Vercel
```

## 📊 Routing configuré

- **Frontend** : `/*` → React App
- **Backend API** : `/api/*` → FastAPI functions
- **Health Check** : `/api/health`
- **Status Management** : `/api/status`

## ⚡ Fonctionnalités activées

✅ **Serverless Functions** - Backend FastAPI  
✅ **Static Site** - Frontend React optimisé  
✅ **PostgreSQL** - Base de données intégrée  
✅ **Auto-deployment** - CI/CD automatique  
✅ **Custom Domain** - siporteventeljadida.vercel.app  

## 🔍 Vérification post-déploiement

1. **Frontend** : `https://siporteventeljadida.vercel.app/`
2. **API Health** : `https://siporteventeljadida.vercel.app/api/health`
3. **API Root** : `https://siporteventeljadida.vercel.app/api/`

---

**Prêt pour le déploiement ! 🎉**