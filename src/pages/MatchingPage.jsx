import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {
  HeartIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  AdjustmentsHorizontalIcon,
  SparklesIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { toast } from 'sonner';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const MatchingPage = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({
    match_types: ['all'],
    min_compatibility: 70,
    limit: 10
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    findMatches();
  }, []);

  const findMatches = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/ai/matching/find`, {
        user_id: user.id,
        match_types: searchCriteria.match_types,
        min_compatibility: searchCriteria.min_compatibility,
        limit: searchCriteria.limit
      });

      setMatches(response.data.matches || []);
    } catch (error) {
      console.error('Erreur recherche matches:', error);
      toast.error('Erreur lors de la recherche de matches');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (matchUserId) => {
    try {
      const message = "Bonjour ! Votre profil m'intéresse pour une éventuelle collaboration. Pourrions-nous échanger ?";
      
      const response = await axios.post(`${BACKEND_URL}/api/messages/send`, {
        recipient_id: matchUserId,
        content: message,
        message_type: 'text'
      });

      if (response.data.status === 'sent') {
        toast.success('Message envoyé avec succès !');
        
        // Enregistrer l'interaction pour l'IA
        await axios.post(`${BACKEND_URL}/api/ai/interaction/feedback?target_user_id=${matchUserId}&interaction_type=message&success=1`);
      }
    } catch (error) {
      console.error('Erreur envoi message:', error);
      toast.error('Erreur lors de l\'envoi du message');
    }
  };

  const recordInteraction = async (matchUserId, interactionType, success = 1) => {
    try {
      await axios.post(`${BACKEND_URL}/api/ai/interaction/feedback?target_user_id=${matchUserId}&interaction_type=${interactionType}&success=${success}`);
    } catch (error) {
      console.error('Erreur enregistrement interaction:', error);
    }
  };

  const getCompatibilityColor = (score) => {
    if (score >= 90) return 'compatibility-excellent';
    if (score >= 80) return 'compatibility-good';
    if (score >= 70) return 'compatibility-moderate';
    return 'compatibility-low';
  };

  const getCompatibilityLabel = (score) => {
    if (score >= 90) return 'Excellente';
    if (score >= 80) return 'Très bonne';
    if (score >= 70) return 'Bonne';
    return 'Modérée';
  };

  const handleCriteriaChange = (field, value) => {
    setSearchCriteria(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const matchTypes = [
    { value: 'all', label: 'Tous types' },
    { value: 'visitor', label: 'Visiteurs' },
    { value: 'exhibitor', label: 'Exposants' },
    { value: 'partner', label: 'Partenaires' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto container-padding section-spacing">
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Matching IA Maritime 🤖
            </h1>
            <p className="text-slate-600">
              Découvrez vos partenaires idéaux grâce à l'intelligence artificielle
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center space-x-2"
            >
              <AdjustmentsHorizontalIcon className="w-4 h-4" />
              <span>Filtres</span>
            </button>
            
            <button
              onClick={findMatches}
              disabled={loading}
              className="btn-primary flex items-center space-x-2"
            >
              {loading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <SparklesIcon className="w-4 h-4" />
              )}
              <span>Nouvelle recherche</span>
            </button>
          </div>
        </div>

        {/* Filtres */}
        {showFilters && (
          <div className="card p-6 mb-8 animate-fade-in">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Critères de recherche</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Types de profils */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Types de profils
                </label>
                <select
                  value={searchCriteria.match_types[0]}
                  onChange={(e) => handleCriteriaChange('match_types', [e.target.value])}
                  className="input-field"
                >
                  {matchTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Compatibilité minimale */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Compatibilité minimale ({searchCriteria.min_compatibility}%)
                </label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  step="5"
                  value={searchCriteria.min_compatibility}
                  onChange={(e) => handleCriteriaChange('min_compatibility', parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Nombre de résultats */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nombre de résultats
                </label>
                <select
                  value={searchCriteria.limit}
                  onChange={(e) => handleCriteriaChange('limit', parseInt(e.target.value))}
                  className="input-field"
                >
                  <option value={5}>5 résultats</option>
                  <option value={10}>10 résultats</option>
                  <option value={20}>20 résultats</option>
                  <option value={50}>50 résultats</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={findMatches}
                disabled={loading}
                className="btn-primary"
              >
                Appliquer les filtres
              </button>
            </div>
          </div>
        )}

        {/* État de chargement */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <LoadingSpinner size="xl" />
              <p className="text-slate-600 mt-4">L'IA analyse les profils pour vous...</p>
            </div>
          </div>
        )}

        {/* Résultats */}
        {!loading && (
          <div>
            {matches.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">
                    {matches.length} match{matches.length > 1 ? 's' : ''} trouvé{matches.length > 1 ? 's' : ''}
                  </h2>
                  <div className="text-sm text-slate-500">
                    Triés par compatibilité IA décroissante
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {matches.map((match) => (
                <div key={match.user_id} className="card p-6 hover-lift">
                  {/* En-tête du match */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <UserGroupIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          Profil #{match.user_id}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {match.business_potential} potentiel business
                        </p>
                      </div>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getCompatibilityColor(match.compatibility_score)}`}>
                      {match.compatibility_score}% compatible
                    </div>
                  </div>

                  {/* Explication de l'IA */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <SparklesIcon className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-slate-700">Analyse IA</span>
                    </div>
                    <p className="text-sm text-slate-600 bg-blue-50 p-3 rounded-lg">
                      {match.explanation}
                    </p>
                  </div>

                  {/* Intérêts communs */}
                  {match.mutual_interests && match.mutual_interests.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-slate-700 mb-2">Intérêts communs</h4>
                      <div className="flex flex-wrap gap-2">
                        {match.mutual_interests.slice(0, 3).map((interest, index) => (
                          <span key={index} className="badge bg-green-100 text-green-800">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommandation IA */}
                  <div className="mb-4">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-200">
                      <p className="text-sm text-purple-700 font-medium">
                        {match.ai_recommendation}
                      </p>
                    </div>
                  </div>

                  {/* Sujets de conversation suggérés */}
                  {match.conversation_topics && match.conversation_topics.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-slate-700 mb-2">Sujets de conversation</h4>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {match.conversation_topics.slice(0, 2).map((topic, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        sendMessage(match.user_id);
                        recordInteraction(match.user_id, 'view');
                      }}
                      className="flex-1 btn-primary text-sm py-2 flex items-center justify-center space-x-2"
                    >
                      <ChatBubbleLeftRightIcon className="w-4 h-4" />
                      <span>Contacter</span>
                    </button>
                    
                    <button
                      onClick={() => recordInteraction(match.user_id, 'view')}
                      className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center space-x-2"
                    >
                      <EyeIcon className="w-4 h-4" />
                      <span>Voir profil</span>
                    </button>
                    
                    <button
                      onClick={() => recordInteraction(match.user_id, 'reject', 0)}
                      className="px-3 py-2 text-slate-400 hover:text-red-500 transition-colors"
                      title="Pas intéressé"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Aucun résultat */}
            {matches.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-slate-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <HeartIcon className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  Aucun match trouvé
                </h3>
                <p className="text-slate-600 mb-6">
                  Essayez d'ajuster vos critères de recherche ou complétez votre profil pour de meilleurs résultats.
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => {
                      setSearchCriteria(prev => ({ ...prev, min_compatibility: 50 }));
                      setShowFilters(true);
                    }}
                    className="btn-secondary"
                  >
                    Ajuster les critères
                  </button>
                  <button
                    onClick={findMatches}
                    className="btn-primary"
                  >
                    Relancer la recherche
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Conseils IA */}
        <div className="mt-12 card p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-center space-x-3 mb-4">
            <SparklesIcon className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-900">Conseils IA pour améliorer vos matches</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div className="flex items-start space-x-2">
              <CheckIcon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>Complétez votre profil détaillé pour des suggestions plus précises</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckIcon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>Interagissez avec les profils pour améliorer l'algorithme</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckIcon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>Utilisez les sujets de conversation suggérés par l'IA</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckIcon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>Consultez régulièrement les recommandations proactives</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchingPage;