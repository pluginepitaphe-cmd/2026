// Configuration de base pour les appels API
const getApiBaseUrl = () => {
  // Pour production Vercel - utiliser directement le backend Railway  
  if (window.location.hostname.includes('vercel.app')) {
    return 'https://siportevent-production.up.railway.app/api';
  }
  
  // Utiliser la variable d'environnement VITE_BACKEND_URL pour Vite
  if (import.meta.env.VITE_BACKEND_URL) {
    return `${import.meta.env.VITE_BACKEND_URL}/api`;
  }
  
  // Fallback pour REACT_APP_BACKEND_URL si défini
  if (import.meta.env.REACT_APP_BACKEND_URL) {
    return `${import.meta.env.REACT_APP_BACKEND_URL}/api`;
  }
  
  // En développement local
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8001/api';
  }
  
  // En production ou avec URL publique - utiliser directement Railway
  const currentHost = window.location.hostname;
  if (currentHost.includes('manusvm.computer') || currentHost.includes('emergentagent.com')) {
    return `${window.location.protocol}//${window.location.hostname}/api`;
  }
  
  // Fallback direct vers Railway
  return 'https://siportevent-production.up.railway.app/api';
};

const API_BASE_URL = getApiBaseUrl();

class ApiClient {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    
    // Récupérer le token d'authentification depuis localStorage
    const token = localStorage.getItem('token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body)
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.detail || data.error || `HTTP error! status: ${response.status}`)
      }
      
      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Dashboard stats
  async getDashboardStats() {
    return this.request('/admin/dashboard/stats')
  }

  // Users management
  async getPendingUsers(page = 1, perPage = 10) {
    return this.request(`/admin/users/pending?page=${page}&per_page=${perPage}`)
  }

  async getUsers(filters = {}) {
    const params = new URLSearchParams()
    
    if (filters.page) params.append('page', filters.page)
    if (filters.perPage) params.append('per_page', filters.perPage)
    if (filters.type) params.append('type', filters.type)
    if (filters.status) params.append('status', filters.status)
    if (filters.search) params.append('search', filters.search)
    
    return this.request(`/admin/users?${params.toString()}`)
  }

  async validateUser(userId, adminEmail = 'admin@salon-maritime.fr') {
    return this.request(`/admin/users/${userId}/validate`, {
      method: 'POST',
      body: { admin_email: adminEmail }
    })
  }

  async rejectUser(userId, reason, comment = '', adminEmail = 'admin@salon-maritime.fr') {
    return this.request(`/admin/users/${userId}/reject`, {
      method: 'POST',
      body: {
        raison: reason,
        commentaire: comment,
        admin_email: adminEmail
      }
    })
  }

  async remindUser(userId, adminEmail = 'admin@salon-maritime.fr') {
    return this.request(`/admin/users/${userId}/remind`, {
      method: 'POST',
      body: { admin_email: adminEmail }
    })
  }

  async deactivateUser(userId) {
    return this.request(`/admin/users/${userId}/deactivate`, {
      method: 'POST'
    })
  }

  async exportUsers(filters = {}) {
    const params = new URLSearchParams()
    
    if (filters.type) params.append('type', filters.type)
    if (filters.status) params.append('status', filters.status)
    
    return this.request(`/admin/users/export?${params.toString()}`)
  }

  // Reports management
  async getReports(page = 1, perPage = 10) {
    return this.request(`/admin/reports?page=${page}&per_page=${perPage}`)
  }

  async handleReport(reportId, action) {
    return this.request(`/admin/reports/${reportId}/action`, {
      method: 'POST',
      body: { action }
    })
  }
}

export const apiClient = new ApiClient()
export default apiClient

