# 🌐 SIPORTS Frontend - React + Vite

## 📋 Description

Frontend React complet pour SIPORTS v2.0 avec :
- Interface utilisateur moderne
- Authentification multi-rôles
- Dashboard administrateur
- Pages exposants professionnelles
- Système de packages
- Intégration chatbot IA

## 🚀 Installation Locale

```bash
# Installer les dépendances
npm install
# ou
yarn install

# Configurer les variables d'environnement
cp .env.example .env
# Modifier .env avec l'URL de votre backend

# Lancer en mode développement
npm run dev
# ou
yarn dev
```

## 📦 Scripts Disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run preview  # Aperçu du build
npm run lint     # Vérification du code
```

## 🏗️ Build de Production

```bash
# Build optimisé
npm run build

# Le dossier dist/ contient les fichiers prêts pour déploiement
```

## 🔗 Configuration Backend

### Développement Local
```env
VITE_BACKEND_URL=http://localhost:8001
```

### Production
```env
VITE_BACKEND_URL=https://siportevent-production.up.railway.app
```

## 📱 Pages Principales

### Publiques
- `/` - Page d'accueil
- `/login` - Connexion
- `/register` - Inscription
- `/exposants` - Annuaire exposants
- `/partenaires` - Page partenaires
- `/forfaits` - Forfaits visiteur

### Authentifiées
- `/dashboard` - Dashboard utilisateur
- `/admin/dashboard` - Dashboard administrateur
- `/calendrier` - Calendrier des RDV
- `/messages` - Messagerie
- `/networking` - Réseautage
- `/analytics` - Analytics (admin)

## 🧪 Comptes de Test

- **Admin**: admin@siportevent.com / admin123
- **Exposant**: exposant@example.com / exhibitor123
- **Visiteur**: visitor@example.com / visitor123

## 🎨 Technologies Utilisées

- **React 18** - Framework principal
- **Vite 6** - Build tool moderne
- **Tailwind CSS** - Framework CSS
- **React Router** - Navigation
- **Recharts** - Graphiques analytics
- **Lucide React** - Icônes
- **Axios** - Appels API

## 🚀 Déploiement Vercel

Voir `../docs/DEPLOY_FRONTEND.md` pour les instructions complètes.