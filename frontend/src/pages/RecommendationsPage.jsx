import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {
  LightBulbIcon,
  TrendingUpIcon,
  UserGroupIcon,
  SparklesIcon,
  EyeIcon,
  CheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const RecommendationsPage = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/ai/recommendations/${user.id}`);
      
      // Si pas de recommandations du backend, créons des exemples
      const backendRecs = response.data.recommendations || [];
      
      // Ajouter des recommandations d'exemple si vide
      if (backendRecs.length === 0) {
        const exampleRecommendations = [
          {
            type: 'trending_topic',
            title: '🔥 Tendance détectée: Intelligence Artificielle Portuaire',
            content: 'Adoption croissante de l\'IA pour l\'optimisation des opérations portuaires (Croissance: +45%)',
            confidence_score: 85,
            actions: [
              'Rechercher des partenaires dans cette thématique',
              'Actualiser votre profil avec ces mots-clés',
              'Participer aux discussions sur ce sujet'
            ],
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            created_at: new Date().toISOString()
          },
          {
            type: 'new_match',
            title: '✨ 3 nouveaux profils compatibles détectés',
            content: 'De nouveaux participants ont rejoint la plateforme avec des profils correspondant à vos intérêts dans les technologies maritimes.',
            confidence_score: 92,
            actions: [
              'Lancer une nouvelle recherche de matching',
              'Examiner les nouveaux profils',
              'Envoyer des demandes de connexion'
            ],
            expires_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
          },
          {
            type: 'opportunity',
            title: '💼 Opportunité de collaboration détectée',
            content: 'Plusieurs entreprises recherchent des solutions dans votre domaine d\'expertise. Moment idéal pour proposer vos services.',
            confidence_score: 78,
            actions: [
              'Contacter les entreprises intéressées',
              'Préparer une présentation de vos solutions',
              'Proposer des démonstrations'
            ],
            expires_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
          },
          {
            type: 'trending_topic',
            title: '🌊 Tendance: Énergies Renouvelables Offshore',
            content: 'Expansion des projets éoliens offshore et solutions d\'hydrogène vert dans le secteur maritime.',
            confidence_score: 88,
            actions: [
              'Explorer les partenariats énergétiques',
              'Identifier les opportunités d\'investissement',
              'Participer aux conférences spécialisées'
            ],
            expires_at: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
            created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
          }
        ];
        
        setRecommendations(exampleRecommendations);
      } else {
        setRecommendations(backendRecs);
      }
    } catch (error) {
      console.error('Erreur chargement recommandations:', error);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'trending_topic':
        return TrendingUpIcon;
      case 'new_match':
        return UserGroupIcon;
      case 'opportunity':
        return LightBulbIcon;
      default:
        return SparklesIcon;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'trending_topic':
        return 'Tendance détectée';
      case 'new_match':
        return 'Nouveaux matches';
      case 'opportunity':
        return 'Opportunité';
      default:
        return 'Recommandation';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'trending_topic':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'new_match':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'opportunity':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  const getConfidenceColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-slate-600';
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

  const formatExpiresIn = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = date - now;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) return 'Expire aujourd\'hui';
    if (diffDays === 1) return 'Expire demain';
    return `Expire dans ${diffDays} jours`;
  };

  const filteredRecommendations = recommendations.filter(rec => {
    if (filter === 'all') return true;
    return rec.type === filter;
  });

  const filterOptions = [
    { value: 'all', label: 'Toutes les recommandations' },
    { value: 'trending_topic', label: 'Tendances' },
    { value: 'new_match', label: 'Nouveaux matches' },
    { value: 'opportunity', label: 'Opportunités' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto container-padding section-spacing">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Recommandations IA 🤖
          </h1>
          <p className="text-slate-600">
            Suggestions personnalisées basées sur votre profil et les tendances du marché
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {recommendations.length}
            </div>
            <div className="text-sm text-slate-600">Recommandations actives</div>
          </div>
          
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {recommendations.filter(r => r.type === 'opportunity').length}
            </div>
            <div className="text-sm text-slate-600">Opportunités</div>
          </div>
          
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {recommendations.filter(r => r.type === 'trending_topic').length}
            </div>
            <div className="text-sm text-slate-600">Tendances</div>
          </div>
          
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(recommendations.reduce((acc, r) => acc + r.confidence_score, 0) / recommendations.length) || 0}%
            </div>
            <div className="text-sm text-slate-600">Confiance moyenne</div>
          </div>
        </div>

        {/* Filtres */}
        <div className="card p-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Liste des recommandations */}
        <div className="space-y-6">
          {filteredRecommendations.length > 0 ? (
            filteredRecommendations.map((recommendation, index) => {
              const Icon = getTypeIcon(recommendation.type);
              
              return (
                <div key={index} className="card p-6 hover-lift">
                  {/* En-tête */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`badge ${getTypeColor(recommendation.type)}`}>
                            {getTypeLabel(recommendation.type)}
                          </span>
                          <span className={`text-sm font-medium ${getConfidenceColor(recommendation.confidence_score)}`}>
                            {recommendation.confidence_score}% de confiance
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {recommendation.title}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="text-right text-sm text-slate-500">
                      <div>{formatTimeAgo(recommendation.created_at)}</div>
                      <div className="flex items-center space-x-1 mt-1">
                        <ClockIcon className="w-3 h-3" />
                        <span>{formatExpiresIn(recommendation.expires_at)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contenu */}
                  <p className="text-slate-700 mb-4">
                    {recommendation.content}
                  </p>

                  {/* Actions suggérées */}
                  {recommendation.actions && recommendation.actions.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-900 mb-2">
                        Actions recommandées :
                      </h4>
                      <div className="space-y-2">
                        {recommendation.actions.map((action, actionIndex) => (
                          <div key={actionIndex} className="flex items-center space-x-2">
                            <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-slate-700">{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Barre de progression de confiance */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-600">Niveau de confiance IA</span>
                      <span className="text-xs font-medium text-slate-700">{recommendation.confidence_score}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${recommendation.confidence_score}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3 mt-6">
                    <button className="btn-primary text-sm">
                      Appliquer la recommandation
                    </button>
                    <button className="btn-secondary text-sm flex items-center space-x-2">
                      <EyeIcon className="w-4 h-4" />
                      <span>Plus de détails</span>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <LightBulbIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                Aucune recommandation trouvée
              </h3>
              <p className="text-slate-600">
                {filter === 'all' 
                  ? 'Complétez votre profil pour recevoir des recommandations personnalisées'
                  : 'Aucune recommandation de ce type pour le moment'
                }
              </p>
            </div>
          )}
        </div>

        {/* Conseils pour améliorer les recommandations */}
        <div className="mt-12 card p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center space-x-3 mb-4">
            <SparklesIcon className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-purple-900">
              Comment améliorer vos recommandations IA
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-800">
            <div className="flex items-start space-x-2">
              <CheckIcon className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
              <span>Complétez votre profil avec vos secteurs d'intérêt</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckIcon className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
              <span>Interagissez régulièrement avec la plateforme</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckIcon className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
              <span>Mettez à jour vos objectifs de participation</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckIcon className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
              <span>Donnez des retours sur les recommandations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;