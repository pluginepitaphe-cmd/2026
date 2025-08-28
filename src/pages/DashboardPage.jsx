import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {
  HeartIcon,
  ChatBubbleLeftRightIcon,
  LightBulbIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon as TrendingUpIcon,
  BellIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Charger les recommandations IA
      const [recommendationsRes, messagesRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/ai/recommendations/${user.id}`).catch(() => ({ data: { recommendations: [] } })),
        axios.get(`${BACKEND_URL}/api/messages/unread/count`).catch(() => ({ data: { count: 0 } }))
      ]);

      setRecommendations(recommendationsRes.data.recommendations || []);
      setUnreadMessages(messagesRes.data.count || 0);

      // Simuler quelques matches récents pour l'affichage
      setRecentMatches([
        {
          id: 1,
          name: 'Maritime Solutions Ltd',
          compatibility: 92,
          type: 'Fournisseur technologique',
          matched_at: new Date().toISOString()
        },
        {
          id: 2,
          name: 'Port Autonome Technologies',
          compatibility: 87,
          type: 'Expertise portuaire',
          matched_at: new Date(Date.now() - 86400000).toISOString()
        }
      ]);

      // Stats utilisateur
      setStats({
        total_matches: 24,
        pending_meetings: 3,
        active_conversations: 8,
        profile_views: 156
      });

    } catch (error) {
      console.error('Erreur chargement dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCompatibilityColor = (score) => {
    if (score >= 90) return 'compatibility-excellent';
    if (score >= 80) return 'compatibility-good';
    if (score >= 70) return 'compatibility-moderate';
    return 'compatibility-low';
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'À l\'instant';
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    return `Il y a ${diffDays}j`;
  };

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
            Bonjour, {user?.first_name} ! 👋
          </h1>
          <p className="text-slate-600">
            Découvrez vos nouvelles opportunités de collaboration maritime
          </p>
        </div>

        {/* Cards de stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-4">
                <HeartIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats?.total_matches || 0}</p>
                <p className="text-sm text-slate-600">Matches IA</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg mr-4">
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats?.active_conversations || 0}</p>
                <p className="text-sm text-slate-600">Conversations actives</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg mr-4">
                <UserGroupIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats?.pending_meetings || 0}</p>
                <p className="text-sm text-slate-600">RDV en attente</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg mr-4">
                <EyeIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats?.profile_views || 0}</p>
                <p className="text-sm text-slate-600">Vues du profil</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Actions rapides */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Actions rapides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/matching" className="card-interactive p-6 group">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-pink-100 to-red-100 rounded-xl group-hover:from-pink-200 group-hover:to-red-200 transition-colors">
                    <HeartIcon className="w-8 h-8 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-pink-600 transition-colors">
                      Matching IA
                    </h3>
                    <p className="text-sm text-slate-600">Trouvez vos partenaires idéaux</p>
                  </div>
                </div>
              </Link>

              <Link to="/messages" className="card-interactive p-6 group relative">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl group-hover:from-blue-200 group-hover:to-cyan-200 transition-colors">
                    <ChatBubbleLeftRightIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Messages
                    </h3>
                    <p className="text-sm text-slate-600">Gérez vos conversations</p>
                  </div>
                </div>
                {unreadMessages > 0 && (
                  <div className="notification-dot">
                    <span className="text-xs text-white font-medium">{unreadMessages}</span>
                  </div>
                )}
              </Link>

              <Link to="/recommendations" className="card-interactive p-6 group">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl group-hover:from-yellow-200 group-hover:to-orange-200 transition-colors">
                    <LightBulbIcon className="w-8 h-8 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-yellow-600 transition-colors">
                      Recommandations IA
                    </h3>
                    <p className="text-sm text-slate-600">Suggestions personnalisées</p>
                  </div>
                </div>
              </Link>

              <Link to="/profile" className="card-interactive p-6 group">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl group-hover:from-green-200 group-hover:to-emerald-200 transition-colors">
                    <TrendingUpIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors">
                      Optimiser le profil
                    </h3>
                    <p className="text-sm text-slate-600">Améliorez votre visibilité</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Matches récents */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Matches récents</h2>
                <Link to="/matching" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Voir tous
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentMatches.map((match) => (
                  <div key={match.id} className="card p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {match.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-900">{match.name}</h3>
                          <p className="text-sm text-slate-600">{match.type}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCompatibilityColor(match.compatibility)}`}>
                          {match.compatibility}% compatible
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{formatTimeAgo(match.matched_at)}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {recentMatches.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <HeartIcon className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    <p>Aucun match récent</p>
                    <Link to="/matching" className="text-blue-600 hover:text-blue-700 text-sm">
                      Lancez une recherche
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recommandations IA */}
            <div className="card p-6">
              <div className="flex items-center space-x-2 mb-4">
                <LightBulbIcon className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold text-slate-900">Recommandations IA</h3>
              </div>
              
              <div className="space-y-3">
                {recommendations.slice(0, 3).map((rec, index) => (
                  <div key={index} className="p-3 bg-slate-50 rounded-lg">
                    <h4 className="text-sm font-medium text-slate-900 mb-1">
                      {rec.title}
                    </h4>
                    <p className="text-xs text-slate-600">{rec.content}</p>
                  </div>
                ))}
                
                {recommendations.length === 0 && (
                  <p className="text-sm text-slate-500 text-center py-4">
                    Aucune recommandation pour le moment
                  </p>
                )}
              </div>
              
              <Link 
                to="/recommendations" 
                className="block text-center text-blue-600 hover:text-blue-700 text-sm font-medium mt-4"
              >
                Voir toutes les recommandations
              </Link>
            </div>

            {/* Activité récente */}
            <div className="card p-6">
              <div className="flex items-center space-x-2 mb-4">
                <BellIcon className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-slate-900">Activité récente</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm text-slate-600">Nouveau match trouvé</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-sm text-slate-600">Message reçu de Maritime Tech</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <p className="text-sm text-slate-600">Profil consulté 12 fois</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;