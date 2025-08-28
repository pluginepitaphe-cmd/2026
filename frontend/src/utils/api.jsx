// Configuration de base pour les appels API
const getApiBaseUrl = () => {
  // Utiliser la variable d'environnement VITE_BACKEND_URL si disponible
  if (import.meta.env.VITE_BACKEND_URL) {
    return `${import.meta.env.VITE_BACKEND_URL}/api`;
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
  
  // Fallback
  return 'http://localhost:8001/api';
};

const API_BASE_URL = getApiBaseUrl();

// Fonction utilitaire pour faire des appels API
const apiCall = async (endpoint, options = {}) => {
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
    console.error('Erreur API:', error);
    throw error;
  }
};

// API pour les produits
export const productAPI = {
  // Récupérer tous les produits ou filtrer par utilisateur
  getProducts: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiCall(`/products?${params}`);
  },

  // Récupérer un produit spécifique
  getProduct: (id) => apiCall(`/products/${id}`),

  // Créer un nouveau produit
  createProduct: (productData) => apiCall('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  }),

  // Mettre à jour un produit
  updateProduct: (id, productData) => apiCall(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  }),

  // Supprimer un produit
  deleteProduct: (id) => apiCall(`/products/${id}`, {
    method: 'DELETE',
  }),

  // Rechercher des produits
  searchProducts: (query, category = '') => {
    const params = new URLSearchParams({ q: query, category });
    return apiCall(`/products/search?${params}`);
  },

  // Récupérer les catégories
  getCategories: () => apiCall('/products/categories'),
};

// API pour les rendez-vous
export const appointmentAPI = {
  // Récupérer les rendez-vous
  getAppointments: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiCall(`/appointments?${params}`);
  },

  // Créer un nouveau rendez-vous
  createAppointment: (appointmentData) => apiCall('/appointments', {
    method: 'POST',
    body: JSON.stringify(appointmentData),
  }),

  // Mettre à jour un rendez-vous
  updateAppointment: (id, appointmentData) => apiCall(`/appointments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(appointmentData),
  }),

  // Supprimer un rendez-vous
  deleteAppointment: (id) => apiCall(`/appointments/${id}`, {
    method: 'DELETE',
  }),

  // Récupérer les disponibilités
  getAvailabilities: (userId) => {
    const params = new URLSearchParams({ user_id: userId });
    return apiCall(`/availabilities?${params}`);
  },

  // Ajouter une disponibilité
  addAvailability: (availabilityData) => apiCall('/availabilities', {
    method: 'POST',
    body: JSON.stringify(availabilityData),
  }),

  // Supprimer une disponibilité
  deleteAvailability: (id) => apiCall(`/availabilities/${id}`, {
    method: 'DELETE',
  }),

  // Récupérer le calendrier global
  getGlobalCalendar: () => apiCall('/global-calendar'),
};

// API pour le réseautage
export const networkingAPI = {
  // Récupérer les connexions
  getConnections: (userId, status = '') => {
    const params = new URLSearchParams({ user_id: userId, status });
    return apiCall(`/connections?${params}`);
  },

  // Envoyer une demande de connexion
  sendConnectionRequest: (connectionData) => apiCall('/connections', {
    method: 'POST',
    body: JSON.stringify(connectionData),
  }),

  // Mettre à jour le statut d'une connexion
  updateConnectionStatus: (id, status) => apiCall(`/connections/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }),

  // Récupérer les messages entre deux utilisateurs
  getMessages: (user1Id, user2Id) => {
    const params = new URLSearchParams({ user1_id: user1Id, user2_id: user2Id });
    return apiCall(`/messages?${params}`);
  },

  // Envoyer un message
  sendMessage: (messageData) => apiCall('/messages', {
    method: 'POST',
    body: JSON.stringify(messageData),
  }),

  // Marquer un message comme lu
  markMessageAsRead: (id) => apiCall(`/messages/${id}/read`, {
    method: 'PUT',
  }),

  // Récupérer les conversations
  getConversations: (userId) => {
    const params = new URLSearchParams({ user_id: userId });
    return apiCall(`/conversations?${params}`);
  },

  // Récupérer les discussions
  getDiscussions: (category = '') => {
    const params = new URLSearchParams({ category });
    return apiCall(`/discussions?${params}`);
  },

  // Créer une discussion
  createDiscussion: (discussionData) => apiCall('/discussions', {
    method: 'POST',
    body: JSON.stringify(discussionData),
  }),

  // Récupérer les posts d'une discussion
  getDiscussionPosts: (discussionId) => apiCall(`/discussions/${discussionId}/posts`),

  // Ajouter un post à une discussion
  addDiscussionPost: (discussionId, postData) => apiCall(`/discussions/${discussionId}/posts`, {
    method: 'POST',
    body: JSON.stringify(postData),
  }),
};

// API pour les utilisateurs
export const userAPI = {
  // Créer un utilisateur
  createUser: (userData) => apiCall('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  // Récupérer tous les utilisateurs
  getUsers: () => apiCall('/users'),

  // Récupérer un utilisateur spécifique
  getUser: (id) => apiCall(`/users/${id}`),
};

