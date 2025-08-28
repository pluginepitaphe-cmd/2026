import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {
  UserGroupIcon,
  ChartBarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { toast } from 'sonner';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const AdminPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState({});

  useEffect(() => {
    if (user?.user_type === 'admin') {
      loadAdminData();
    }
  }, [user]);

  const loadAdminData = async () => {
    try {
      const [statsResponse, usersResponse] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/admin/dashboard/stats`),
        axios.get(`${BACKEND_URL}/api/admin/users/pending`)
      ]);

      setStats(statsResponse.data);
      setPendingUsers(usersResponse.data.users || []);
    } catch (error) {
      console.error('Erreur chargement données admin:', error);
      toast.error('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (userId, action) => {
    setProcessing(prev => ({ ...prev, [userId]: true }));
    
    try {
      const endpoint = action === 'validate' 
        ? `${BACKEND_URL}/api/admin/users/${userId}/validate`
        : `${BACKEND_URL}/api/admin/users/${userId}/reject`;
      
      await axios.post(endpoint);
      
      toast.success(action === 'validate' ? 'Utilisateur validé' : 'Utilisateur rejeté');
      
      // Recharger les données
      loadAdminData();
    } catch (error) {
      console.error('Erreur action utilisateur:', error);
      toast.error('Erreur lors de l\'action');
    } finally {
      setProcessing(prev => ({ ...prev, [userId]: false }));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUserTypeLabel = (type) => {
    switch (type) {
      case 'visitor': return 'Visiteur';
      case 'exhibitor': return 'Exposant';
      case 'partner': return 'Partenaire';
      default: return type;
    }
  };

  const getUserTypeBadge = (type) => {
    const colors = {
      visitor: 'bg-blue-100 text-blue-800',
      exhibitor: 'bg-green-100 text-green-800',
      partner: 'bg-purple-100 text-purple-800'
    };
    return `badge ${colors[type] || 'bg-slate-100 text-slate-800'}`;
  };

  if (user?.user_type !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <XCircleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Accès refusé</h1>
          <p className="text-slate-600">Vous n'avez pas les droits administrateur requis.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto container-padding section-spacing">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Administration SIPORTS ⚙️
          </h1>
          <p className="text-slate-600">
            Tableau de bord administrateur - Gestion des utilisateurs et statistiques
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <UserGroupIcon className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats?.total_users || 0}</p>
                <p className="text-sm text-slate-600">Utilisateurs totaux</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <CheckCircleIcon className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats?.validated || 0}</p>
                <p className="text-sm text-slate-600">Comptes validés</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                <ClockIcon className="w-8 h-8 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats?.pending || 0}</p>
                <p className="text-sm text-slate-600">En attente</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg mr-4">
                <XCircleIcon className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats?.rejected || 0}</p>
                <p className="text-sm text-slate-600">Rejetés</p>
              </div>
            </div>
          </div>
        </div>

        {/* Répartition par type d'utilisateur */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="card p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Répartition par type</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-700">Visiteurs</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ 
                        width: `${stats?.total_users > 0 ? (stats.visitors / stats.total_users * 100) : 0}%` 
                      }}
                    ></div>
                  </div>
                  <span className="font-medium text-slate-900">{stats?.visitors || 0}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-700">Exposants</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ 
                        width: `${stats?.total_users > 0 ? (stats.exhibitors / stats.total_users * 100) : 0}%` 
                      }}
                    ></div>
                  </div>
                  <span className="font-medium text-slate-900">{stats?.exhibitors || 0}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-700">Partenaires</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ 
                        width: `${stats?.total_users > 0 ? (stats.partners / stats.total_users * 100) : 0}%` 
                      }}
                    ></div>
                  </div>
                  <span className="font-medium text-slate-900">{stats?.partners || 0}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Statut des comptes</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-medium">Validés</span>
                </div>
                <span className="text-green-900 font-bold">{stats?.validated || 0}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <ClockIcon className="w-5 h-5 text-yellow-600" />
                  <span className="text-yellow-800 font-medium">En attente</span>
                </div>
                <span className="text-yellow-900 font-bold">{stats?.pending || 0}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <XCircleIcon className="w-5 h-5 text-red-600" />
                  <span className="text-red-800 font-medium">Rejetés</span>
                </div>
                <span className="text-red-900 font-bold">{stats?.rejected || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Utilisateurs en attente */}
        <div className="card">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">
              Utilisateurs en attente de validation ({pendingUsers.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            {pendingUsers.length > 0 ? (
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left py-3 px-6 text-sm font-medium text-slate-700">Utilisateur</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-slate-700">Type</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-slate-700">Entreprise</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-slate-700">Date d'inscription</th>
                    <th className="text-center py-3 px-6 text-sm font-medium text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {pendingUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50">
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-medium text-slate-900">
                            {user.first_name} {user.last_name}
                          </div>
                          <div className="text-sm text-slate-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={getUserTypeBadge(user.user_type)}>
                          {getUserTypeLabel(user.user_type)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-700">
                        {user.company || '-'}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600">
                        {formatDate(user.created_at)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleUserAction(user.id, 'validate')}
                            disabled={processing[user.id]}
                            className="flex items-center space-x-1 px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                          >
                            {processing[user.id] ? (
                              <LoadingSpinner size="sm" />
                            ) : (
                              <CheckCircleIcon className="w-4 h-4" />
                            )}
                            <span>Valider</span>
                          </button>

                          <button
                            onClick={() => handleUserAction(user.id, 'reject')}
                            disabled={processing[user.id]}
                            className="flex items-center space-x-1 px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                          >
                            <XCircleIcon className="w-4 h-4" />
                            <span>Rejeter</span>
                          </button>

                          <button className="p-1 text-slate-400 hover:text-slate-600">
                            <EyeIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12">
                <UserGroupIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  Aucun utilisateur en attente
                </h3>
                <p className="text-slate-600">
                  Tous les utilisateurs ont été traités.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;