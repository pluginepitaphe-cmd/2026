// Configuration de base pour les appels API d'authentification
const getApiBaseUrl = () => {
  // Pour production Vercel - utiliser directement le backend Railway
  if (window.location.hostname.includes('vercel.app')) {
    return 'https://siportevent-production.up.railway.app/api';
  }
  
  // Utiliser la variable d'environnement VITE_BACKEND_URL si disponible
  if (import.meta.env.VITE_BACKEND_URL) {
    return `${import.meta.env.VITE_BACKEND_URL}/api`;
  }
  
  // Utiliser la variable d'environnement REACT_APP_BACKEND_URL si disponible  
  if (import.meta.env.REACT_APP_BACKEND_URL) {
    return `${import.meta.env.REACT_APP_BACKEND_URL}/api`;
  }
  
  // En développement local
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8001/api';
  }
  
  // En production ou avec URL publique
  const currentHost = window.location.hostname;
  if (currentHost.includes('manusvm.computer') || currentHost.includes('emergentagent.com')) {
    return `${window.location.protocol}//${window.location.hostname}/api`;
  }
  
  // Fallback direct vers Railway
  return 'https://siportevent-production.up.railway.app/api';
};

const API_BASE_URL = getApiBaseUrl();

// Fonction utilitaire pour faire des appels API d'authentification
const authApiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Erreur API');
    }
    
    return data;
  } catch (error) {
    console.error('Erreur API Auth:', error);
    throw error;
  }
};

// API d'authentification
export const authAPI = {
  // Connexion
  login: async (email, password) => {
    return authApiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // Inscription
  register: async (userData) => {
    return authApiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Récupérer l'utilisateur connecté
  getCurrentUser: async (token) => {
    return authApiCall('/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Récupérer tous les utilisateurs (admin)
  getUsers: async (token) => {
    return authApiCall('/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Approuver un utilisateur (admin)
  approveUser: async (userId, token) => {
    return authApiCall(`/users/${userId}/approve`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Rejeter un utilisateur (admin)
  rejectUser: async (userId, token) => {
    return authApiCall(`/users/${userId}/reject`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Connexion visiteur
  visitorLogin: async () => {
    return authApiCall("/auth/visitor-login", {
      method: "POST",
    });
  },
};

export default authAPI;

