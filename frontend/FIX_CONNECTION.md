# 🔧 CORRECTION: Failed to fetch - Guide de Résolution

## 🚨 Problème Identifié
"Failed to fetch" lors de la connexion admin - Le frontend Vercel n'arrive pas à communiquer avec le backend Railway.

## ✅ Corrections Appliquées

### 1. **API Client Corrigé (`/src/lib/api.js`)**
```javascript
const getApiBaseUrl = () => {
  // Pour production Vercel - utiliser directement le backend Railway  
  if (window.location.hostname.includes('vercel.app')) {
    return 'https://siportevent-production.up.railway.app/api';
  }
  // ... autres configurations
};
```

### 2. **Auth API Corrigé (`/src/utils/authAPI.js`)**
```javascript  
const getApiBaseUrl = () => {
  // Pour production Vercel - utiliser directement le backend Railway
  if (window.location.hostname.includes('vercel.app')) {
    return 'https://siportevent-production.up.railway.app/api';
  }
  // ... autres configurations
};
```

### 3. **Vercel.json Simplifié**
```json
{
  "version": 2,
  "framework": "vite",
  "cleanUrls": true,
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://siportevent-production.up.railway.app/api/$1"
    }
  ]
}
```

## 🚀 Solution Immédiate

### Option A: Redéploiement (Recommandé)
1. **Nouveau package**: `SIPORTS_VERCEL_CONNECTION_FIXED.tar.gz`
2. **Extraire et redéployer** sur Vercel
3. **Test**: Admin login devrait fonctionner

### Option B: Modification Manuelle
Si vous voulez corriger le déploiement existant :

1. **Aller dans Vercel Dashboard**
2. **Settings → Environment Variables**  
3. **Ajouter/Modifier** :
   ```
   VITE_BACKEND_URL = https://siportevent-production.up.railway.app
   ```
4. **Redéploiement automatique**

### Option C: Test Direct (Debugging)
Ouvrir la console développeur (F12) sur votre site Vercel et tester :
```javascript
fetch('https://siportevent-production.up.railway.app/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@siportevent.com', password: 'admin123' })
})
.then(r => r.json())
.then(console.log)
```

## 🧪 Test de Connexion

**Backend Railway Status**: ✅ OPERATIONAL
- URL: https://siportevent-production.up.railway.app  
- Test: `curl "https://siportevent-production.up.railway.app/api/auth/login"`
- Réponse: Token JWT valide reçu

**Comptes de Test**:
- Admin: admin@siportevent.com / admin123
- Exposant: exposant@example.com / exhibitor123

## 📞 Diagnostic Supplémentaire

Si le problème persiste :

1. **F12 → Network Tab** - Vérifier les requêtes API
2. **Console Errors** - Noter les erreurs exactes  
3. **CORS Errors** - Vérifier les headers
4. **URL appelée** - Doit pointer vers Railway, pas vers Vercel

---

**Ce package corrigé devrait résoudre le problème "Failed to fetch" !** 🎯