/**
 * Service API pour le matching IA - SIPORTS v2.0
 * Intégration avec le backend FastAPI
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

// Instance axios configurée
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré, rediriger vers login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Service de matching IA
 */
export class AIMatchingService {
  
  /**
   * Recherche de matches avec IA
   */
  static async findMatches(criteria = {}) {
    try {
      const requestData = {
        user_id: criteria.userId,
        match_types: criteria.matchTypes || ['all'],
        sectors: criteria.sectors || ['all'],
        min_compatibility: criteria.minCompatibility || 70,
        location_filter: criteria.locationFilter || ['all'],
        package_filter: criteria.packageFilter || ['all'],
        budget_filter: criteria.budgetFilter || 'all',
        custom_criteria: criteria.customCriteria || {},
        limit: criteria.limit || 20
      };

      const response = await apiClient.post('/api/ai/matching/find', requestData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Erreur lors de la recherche de matches:', error);
      return {
        success: false,
        error: error.response?.data?.detail || 'Erreur lors de la recherche'
      };
    }
  }

  /**
   * Récupération des recommandations proactives
   */
  static async getRecommendations(userId) {
    try {
      const response = await apiClient.get(`/api/ai/recommendations/${userId}`);
      return {
        success: true,
        data: response.data.recommendations
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des recommandations:', error);
      return {
        success: false,
        error: error.response?.data?.detail || 'Erreur lors de la récupération'
      };
    }
  }

  /**
   * Mise à jour du profil détaillé
   */
  static async updateDetailedProfile(profileData) {
    try {
      const response = await apiClient.post('/api/ai/profile/detailed', profileData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      return {
        success: false,
        error: error.response?.data?.detail || 'Erreur lors de la mise à jour'
      };
    }
  }

  /**
   * Récupération du profil détaillé
   */
  static async getDetailedProfile(userId) {
    try {
      const response = await apiClient.get(`/api/ai/profile/detailed/${userId}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      return {
        success: false,
        error: error.response?.data?.detail || 'Erreur lors de la récupération'
      };
    }
  }

  /**
   * Enregistrement du feedback d'interaction
   */
  static async recordInteractionFeedback(targetUserId, interactionType, success) {
    try {
      const response = await apiClient.post('/api/ai/interaction/feedback', null, {
        params: {
          target_user_id: targetUserId,
          interaction_type: interactionType,
          success: success
        }
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du feedback:', error);
      return {
        success: false,
        error: error.response?.data?.detail || 'Erreur lors de l\'enregistrement'
      };
    }
  }
}

/**
 * Service utilisateurs pour récupérer les données publiques
 */
export class UserService {
  
  /**
   * Récupération des informations publiques d'un utilisateur
   */
  static async getPublicUserInfo(userId) {
    try {
      // Pour l'instant, on simule avec les données de base
      // À terme, créer un endpoint dédié pour les infos publiques
      const response = await apiClient.get(`/api/users/${userId}/public`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      // Fallback avec données simulées pour le développement
      return {
        success: true,
        data: this.getMockUserData(userId)
      };
    }
  }

  /**
   * Données utilisateur simulées (pour développement)
   */
  static getMockUserData(userId) {
    const mockUsers = {
      1: {
        id: 1,
        name: 'Maritime Solutions International',
        type: 'partner',
        level: 'platinum',
        company: 'Maritime Solutions International',
        sector: 'Équipements portuaires',
        location: 'Maroc',
        description: 'Leader mondial en automatisation portuaire',
        email: 'contact@maritime-solutions.com',
        phone: '+212 522 123 456',
        languages: ['Français', 'Anglais', 'Arabe'],
        certifications: ['ISO 9001', 'ISO 14001']
      },
      2: {
        id: 2,
        name: 'Port Authority Maroc',
        type: 'visitor',
        level: 'vip',
        company: 'Port Authority Maroc',
        sector: 'Gestion portuaire',
        location: 'Maroc',
        description: 'Autorité portuaire nationale du Maroc',
        position: 'Directeur Général'
      },
      3: {
        id: 3,
        name: 'EuroMarine Technology',
        type: 'exhibitor',
        level: 'premium',
        company: 'EuroMarine Technology',
        sector: 'Technologies marines',
        location: 'France',
        description: 'Innovations en technologies marines et offshore',
        standLocation: 'Hall A-15'
      }
    };

    return mockUsers[userId] || {
      id: userId,
      name: `Utilisateur ${userId}`,
      type: 'visitor',
      level: 'basic',
      company: 'Entreprise',
      description: 'Professionnel du secteur maritime'
    };
  }
}

/**
 * Helpers et utilitaires
 */
export const MatchingUtils = {
  
  /**
   * Formatage du score de compatibilité
   */
  formatCompatibilityScore(score) {
    if (score >= 90) return { color: 'green', label: 'Excellent' };
    if (score >= 80) return { color: 'blue', label: 'Très bon' };
    if (score >= 70) return { color: 'yellow', label: 'Bon' };
    return { color: 'orange', label: 'Modéré' };
  },

  /**
   * Icône selon le type d'utilisateur
   */
  getTypeIcon(type) {
    const icons = {
      partner: '👑',
      exhibitor: '🏢',
      visitor: '👤'
    };
    return icons[type] || '👤';
  },

  /**
   * Couleur selon le niveau
   */
  getLevelColor(level) {
    const colors = {
      platinum: 'slate',
      gold: 'yellow',
      premium: 'purple',
      silver: 'gray',
      vip: 'amber',
      basic: 'blue'
    };
    return colors[level] || 'blue';
  },

  /**
   * Secteurs maritimes prédéfinis
   */
  getMaritimeSectors() {
    return [
      'Gestion Portuaire',
      'Équipements Portuaires',
      'Technologies Marines',
      'Solutions Digitales',
      'Développement Durable',
      'Transport Maritime',
      'Logistique Maritime',
      'Services Portuaires',
      'Énergies Renouvelables',
      'Sécurité Maritime'
    ];
  },

  /**
   * Localisations prédéfinies
   */
  getLocations() {
    return [
      'Maroc',
      'France', 
      'Singapour',
      'Pays-Bas',
      'Espagne',
      'Italie',
      'Allemagne',
      'Royaume-Uni',
      'Norvège',
      'Danemark'
    ];
  }
};

export default AIMatchingService;