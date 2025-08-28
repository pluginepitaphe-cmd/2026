import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const UserRecommendations = () => {
  const { user, token } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [compatibilityData, setCompatibilityData] = useState(null);

  useEffect(() => {
    if (user && token) {
      fetchRecommendations();
    }
  }, [user, token]);

  const fetchRecommendations = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/analytics/recommendations/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setRecommendations(data.recommendations || []);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des recommandations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompatibility = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/analytics/compatibility/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCompatibilityData(data);
      }
    } catch (error) {
      console.error('Erreur lors du calcul de compatibilité:', error);
    }
  };

  const handleUserClick = async (recommendation) => {
    setSelectedUser(recommendation);
    await fetchCompatibility(recommendation.user_id);
  };

  const getCompatibilityColor = (score) => {
    if (score >= 0.8) return 'text-green-600 bg-green-100';
    if (score >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getUserTypeIcon = (userType) => {
    switch (userType) {
      case 'exhibitor':
        return '🏢';
      case 'visitor':
        return '👤';
      case 'partner':
        return '🤝';
      case 'admin':
        return '⚙️';
      default:
        return '👤';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recommandations de contacts
      </h3>

      {recommendations.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-2">🤝</div>
          <p className="text-gray-500">Aucune recommandation disponible pour le moment.</p>
          <p className="text-sm text-gray-400 mt-1">
            Complétez votre profil pour obtenir de meilleures recommandations.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {recommendations.slice(0, 5).map((rec, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleUserClick(rec)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  {rec.user_data.profile_image ? (
                    <img
                      src={rec.user_data.profile_image}
                      alt={rec.user_data.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-lg">
                      {getUserTypeIcon(rec.user_data.user_type)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{rec.user_data.name}</p>
                  <p className="text-sm text-gray-600">
                    {rec.user_data.position} - {rec.user_data.company}
                  </p>
                  <p className="text-xs text-gray-500">{rec.reasoning}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCompatibilityColor(rec.compatibility_score)}`}>
                  {Math.round(rec.compatibility_score * 100)}% compatible
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {Math.round(rec.success_probability * 100)}% succès
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de détails de compatibilité */}
      {selectedUser && compatibilityData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-semibold text-gray-900">
                Compatibilité avec {selectedUser.user_data.name}
              </h4>
              <button
                onClick={() => {
                  setSelectedUser(null);
                  setCompatibilityData(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-bold ${getCompatibilityColor(compatibilityData.compatibility.compatibility_score)}`}>
                  {Math.round(compatibilityData.compatibility.compatibility_score * 100)}% Compatible
                </div>
              </div>

              {compatibilityData.compatibility.recommended_topics && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Sujets de conversation suggérés :</h5>
                  <div className="flex flex-wrap gap-2">
                    {compatibilityData.compatibility.recommended_topics.map((topic, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {compatibilityData.meeting_suggestions && compatibilityData.meeting_suggestions.best_suggestion && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Meilleur créneau suggéré :</h5>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-800">
                      {new Date(compatibilityData.meeting_suggestions.best_suggestion.datetime).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      Confiance: {Math.round(compatibilityData.meeting_suggestions.best_suggestion.confidence * 100)}%
                    </p>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Contacter
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
                  Planifier RDV
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRecommendations;

