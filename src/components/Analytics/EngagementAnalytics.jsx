import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const EngagementAnalytics = () => {
  const { user, token } = useAuth();
  const [engagementData, setEngagementData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && token) {
      fetchEngagementData();
    }
  }, [user, token]);

  const fetchEngagementData = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/analytics/engagement', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setEngagementData(data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données d\'engagement:', error);
    } finally {
      setLoading(false);
    }
  };

  const trackEvent = async (eventType, eventData = {}) => {
    try {
      await fetch('http://localhost:5001/api/analytics/track', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session_id: sessionStorage.getItem('session_id') || 'unknown',
          event_type: eventType,
          event_data: eventData
        })
      });
    } catch (error) {
      console.error('Erreur lors du tracking:', error);
    }
  };

  const getEngagementLevel = (score) => {
    if (score >= 80) return { level: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (score >= 60) return { level: 'Bon', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (score >= 40) return { level: 'Moyen', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { level: 'Faible', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const getProgressColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!engagementData) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics d'engagement</h3>
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-2">📊</div>
          <p className="text-gray-500">Aucune donnée d'engagement disponible.</p>
          <p className="text-sm text-gray-400 mt-1">
            Commencez à utiliser la plateforme pour voir vos statistiques.
          </p>
        </div>
      </div>
    );
  }

  const { engagement_score, total_events, unique_sessions, insights, recommendations } = engagementData;
  const engagementLevel = getEngagementLevel(engagement_score);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Analytics d'engagement</h3>
        <button
          onClick={() => trackEvent('engagement_view')}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Actualiser
        </button>
      </div>

      {/* Score principal */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-bold ${engagementLevel.color} ${engagementLevel.bgColor}`}>
          {engagement_score}% - {engagementLevel.level}
        </div>
        <div className="mt-3 w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(engagement_score)}`}
            style={{ width: `${engagement_score}%` }}
          ></div>
        </div>
      </div>

      {/* Métriques détaillées */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">{total_events}</div>
          <div className="text-sm text-gray-600">Actions totales</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">{unique_sessions}</div>
          <div className="text-sm text-gray-600">Sessions uniques</div>
        </div>
      </div>

      {/* Insights */}
      {insights && insights.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Insights :</h4>
          <div className="space-y-2">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommandations */}
      {recommendations && recommendations.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Recommandations pour améliorer votre engagement :</h4>
          <div className="space-y-2">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions rapides */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Actions rapides :</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => trackEvent('profile_view_action')}
            className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full hover:bg-blue-200 transition-colors"
          >
            Voir profils
          </button>
          <button
            onClick={() => trackEvent('product_browse_action')}
            className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full hover:bg-green-200 transition-colors"
          >
            Explorer produits
          </button>
          <button
            onClick={() => trackEvent('networking_action')}
            className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full hover:bg-purple-200 transition-colors"
          >
            Réseauter
          </button>
        </div>
      </div>
    </div>
  );
};

export default EngagementAnalytics;

