import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Target, Users, Brain, Zap, TrendingUp, Heart, MessageSquare,
  Calendar, Star, Award, Building, Globe, ArrowRight, Filter,
  Search, ChevronDown, ChevronUp, Eye, UserPlus, Sparkles,
  Network, Briefcase, Handshake, Crown, Gift, Clock, AlertCircle,
  Loader2, CheckCircle, XCircle, Info
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AIMatchingService, UserService, MatchingUtils } from '@/services/aiMatchingAPI';

const AdvancedMatchingSystem = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [filters, setFilters] = useState({
    matchTypes: ['all'],
    sectors: ['all'],
    minCompatibility: 70,
    locationFilter: ['all'],
    packageFilter: ['all'],
    limit: 20
  });
  const [loading, setLoading] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [selectedMatchDetails, setSelectedMatchDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('recommendations');
  const [error, setError] = useState(null);
  const [analytics, setAnalytics] = useState({
    totalMatches: 0,
    averageCompatibility: 0,
    topSectors: [],
    matchingTrends: []
  });

  // Chargement initial des données
  useEffect(() => {
    if (user?.id) {
      loadMatches();
      loadRecommendations();
    }
  }, [user?.id, filters]);

  // Chargement des matches IA
  const loadMatches = async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const result = await AIMatchingService.findMatches({
        userId: user.id,
        ...filters
      });

      if (result.success) {
        const matchesData = result.data.matches || [];
        setMatches(matchesData);
        
        // Calculer les analytics
        calculateAnalytics(matchesData);
      } else {
        setError(result.error || 'Erreur lors du chargement des matches');
        console.error('Erreur matches:', result.error);
      }
    } catch (err) {
      setError('Erreur de connexion au service de matching');
      console.error('Erreur matching:', err);
    } finally {
      setLoading(false);
    }
  };

  // Chargement des recommandations proactives
  const loadRecommendations = async () => {
    if (!user?.id) return;

    try {
      const result = await AIMatchingService.getRecommendations(user.id);
      
      if (result.success) {
        setRecommendations(result.data || []);
      } else {
        console.error('Erreur recommandations:', result.error);
      }
    } catch (err) {
      console.error('Erreur recommandations:', err);
    }
  };

  // Calcul des analytics
  const calculateAnalytics = (matchesData) => {
    if (!matchesData.length) {
      setAnalytics({
        totalMatches: 0,
        averageCompatibility: 0,
        topSectors: [],
        matchingTrends: []
      });
      return;
    }

    const totalMatches = matchesData.length;
    const avgCompatibility = Math.round(
      matchesData.reduce((sum, match) => sum + match.compatibility_score, 0) / totalMatches
    );

    // Analyse des secteurs
    const sectorCount = {};
    matchesData.forEach(match => {
      const interests = match.mutual_interests || [];
      interests.forEach(interest => {
        sectorCount[interest] = (sectorCount[interest] || 0) + 1;
      });
    });

    const topSectors = Object.entries(sectorCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([sector, count]) => ({ sector, count }));

    setAnalytics({
      totalMatches,
      averageCompatibility: avgCompatibility,
      topSectors,
      matchingTrends: [
        { trend: "IA & Automatisation", growth: "+45%" },
        { trend: "Énergies Renouvelables", growth: "+32%" },
        { trend: "Durabilité", growth: "+28%" }
      ]
    });
  };

  // Gestion de la sélection d'un match
  const handleMatchSelect = async (match) => {
    setSelectedMatch(match);
    
    // Charger les détails utilisateur
    try {
      const userResult = await UserService.getPublicUserInfo(match.user_id);
      if (userResult.success) {
        setSelectedMatchDetails(userResult.data);
      }
    } catch (err) {
      console.error('Erreur détails utilisateur:', err);
    }
  };

  // Enregistrement d'une interaction
  const recordInteraction = async (targetUserId, type, success = 1) => {
    try {
      await AIMatchingService.recordInteractionFeedback(targetUserId, type, success);
    } catch (err) {
      console.error('Erreur feedback:', err);
    }
  };

  // Gestion des actions sur les matches
  const handleSendMessage = (match) => {
    recordInteraction(match.user_id, 'message', 1);
    // TODO: Rediriger vers la messagerie
    alert(`Message envoyé à ${selectedMatchDetails?.name || 'l\'utilisateur'}`);
  };

  const handleScheduleMeeting = (match) => {
    recordInteraction(match.user_id, 'meeting', 1);
    // TODO: Rediriger vers le calendrier
    alert(`Rendez-vous planifié avec ${selectedMatchDetails?.name || 'l\'utilisateur'}`);
  };

  // Formatage des données pour l'affichage
  const getCompatibilityInfo = (score) => MatchingUtils.formatCompatibilityScore(score);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header avec IA branding */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
            <Brain className="h-8 w-8 text-purple-600" />
            Système de Matching IA Avancé
            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
              <Sparkles className="h-3 w-3 mr-1" />
              IA Simulée
            </Badge>
          </h1>
          <p className="text-lg text-slate-600">
            Intelligence artificielle pour connecter partenaires, exposants et visiteurs selon leurs affinités
          </p>
        </div>

        {/* Affichage d'erreur */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-red-700">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs principaux */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-lg shadow-lg p-1">
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === 'recommendations' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Target className="h-4 w-4" />
              Recommandations IA
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === 'analytics' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('proactive')}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === 'proactive' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              Suggestions IA
              {recommendations.length > 0 && (
                <Badge className="bg-red-500 text-white text-xs">
                  {recommendations.length}
                </Badge>
              )}
            </button>
          </div>
        </div>

        {/* Filtres avancés */}
        {activeTab === 'recommendations' && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Critères de matching IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Types d'utilisateurs</label>
                  <select
                    value={filters.matchTypes[0]}
                    onChange={(e) => setFilters({...filters, matchTypes: [e.target.value]})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">Tous les types</option>
                    <option value="partners">Partenaires</option>
                    <option value="exhibitors">Exposants</option>
                    <option value="visitors">Visiteurs</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Secteurs d'activité</label>
                  <select
                    value={filters.sectors[0]}
                    onChange={(e) => setFilters({...filters, sectors: [e.target.value]})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">Tous secteurs</option>
                    {MatchingUtils.getMaritimeSectors().map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Localisation</label>
                  <select
                    value={filters.locationFilter[0]}
                    onChange={(e) => setFilters({...filters, locationFilter: [e.target.value]})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">Toutes localisations</option>
                    {MatchingUtils.getLocations().map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Compatibilité min: {filters.minCompatibility}%
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={filters.minCompatibility}
                    onChange={(e) => setFilters({...filters, minCompatibility: parseInt(e.target.value)})}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button 
                  onClick={loadMatches}
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyse IA...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Rechercher avec l'IA
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contenu des onglets */}
        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-slate-600">L'IA analyse les profils et calcule la compatibilité...</p>
                <p className="text-sm text-slate-500 mt-2">
                  Filtrage collaboratif • Analyse NLP • Scoring avancé
                </p>
              </div>
            ) : matches.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Target className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    Aucune correspondance trouvée
                  </h3>
                  <p className="text-slate-600 mb-4">
                    L'IA n'a pas trouvé de profils correspondant à vos critères actuels
                  </p>
                  <Button 
                    onClick={() => setFilters({...filters, minCompatibility: Math.max(50, filters.minCompatibility - 10)})}
                    variant="outline"
                  >
                    Élargir les critères de recherche
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {matches.map((match, index) => {
                  const compatibilityInfo = getCompatibilityInfo(match.compatibility_score);
                  
                  return (
                    <Card 
                      key={match.user_id || index} 
                      className="hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 border-l-purple-500" 
                      onClick={() => handleMatchSelect(match)}
                    >
                      <CardContent className="p-6">
                        {/* Header avec score IA */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                              {match.user_id ? match.user_id.toString().charAt(0) : 'U'}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">Utilisateur {match.user_id}</h3>
                              <div className="flex items-center gap-1 text-sm text-slate-500">
                                <Brain className="h-3 w-3" />
                                Score IA calculé
                              </div>
                            </div>
                          </div>
                          <Badge 
                            className={`bg-${compatibilityInfo.color}-100 text-${compatibilityInfo.color}-800 font-semibold`}
                          >
                            {match.compatibility_score}% • {compatibilityInfo.label}
                          </Badge>
                        </div>

                        {/* Explication IA */}
                        <div className="mb-4">
                          <p className="text-sm text-slate-600 mb-2 font-medium">
                            🧠 Analyse IA:
                          </p>
                          <p className="text-sm text-slate-700 bg-slate-50 p-2 rounded">
                            {match.explanation || "Compatibilité calculée par algorithme d'apprentissage automatique"}
                          </p>
                        </div>

                        {/* Intérêts communs */}
                        {match.mutual_interests && match.mutual_interests.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-slate-700 mb-2">Intérêts communs:</p>
                            <div className="flex flex-wrap gap-1">
                              {match.mutual_interests.slice(0, 3).map((interest, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {interest}
                                </Badge>
                              ))}
                              {match.mutual_interests.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{match.mutual_interests.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Métriques business */}
                        <div className="space-y-2 mb-4 text-xs text-slate-600">
                          <div className="flex justify-between">
                            <span>Potentiel business:</span>
                            <span className={`font-medium ${
                              match.business_potential === 'Très élevé' ? 'text-green-600' :
                              match.business_potential === 'Élevé' ? 'text-blue-600' : 'text-yellow-600'
                            }`}>
                              {match.business_potential || 'Moyen'}
                            </span>
                          </div>
                        </div>

                        {/* Recommandation IA */}
                        {match.ai_recommendation && (
                          <div className="mb-4 p-2 bg-purple-50 border border-purple-200 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <Sparkles className="h-3 w-3 text-purple-600" />
                              <span className="text-xs font-medium text-purple-800">Recommandation IA</span>
                            </div>
                            <p className="text-xs text-purple-700">
                              {match.ai_recommendation}
                            </p>
                          </div>
                        )}

                        {/* Sujets de conversation suggérés */}
                        {match.conversation_topics && match.conversation_topics.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-slate-700 mb-2">💬 Sujets suggérés:</p>
                            <div className="flex flex-wrap gap-1">
                              {match.conversation_topics.slice(0, 2).map((topic, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1 bg-purple-600 hover:bg-purple-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSendMessage(match);
                            }}
                          >
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleScheduleMeeting(match);
                            }}
                          >
                            <Calendar className="h-4 w-4 mr-1" />
                            RDV
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Onglet Analytics */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Performance du matching IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Compatibilité moyenne</span>
                      <span className="font-semibold">{analytics.averageCompatibility}%</span>
                    </div>
                    <Progress value={analytics.averageCompatibility} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Matches trouvés</span>
                      <span className="font-semibold">{analytics.totalMatches}</span>
                    </div>
                    <Progress value={Math.min(100, (analytics.totalMatches / 20) * 100)} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Précision de l'IA</span>
                      <span className="font-semibold">89%</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Insights IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.matchingTrends.map((trend, index) => (
                    <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800">Tendance détectée</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        <strong>{trend.trend}</strong> est en croissance de <strong>{trend.growth}</strong> 
                        parmi vos matches potentiels.
                      </p>
                    </div>
                  ))}

                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-purple-600" />
                      <span className="font-medium text-purple-800">Recommandation</span>
                    </div>
                    <p className="text-sm text-purple-700">
                      L'IA suggère de mettre à jour vos centres d'intérêt pour améliorer la précision du matching.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Onglet Suggestions proactives */}
        {activeTab === 'proactive' && (
          <div className="space-y-6">
            {recommendations.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Sparkles className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    Aucune suggestion pour le moment
                  </h3>
                  <p className="text-slate-600">
                    L'IA analysera votre activité pour vous proposer des suggestions personnalisées
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {recommendations.map((rec, index) => (
                  <Card key={index} className="border-l-4 border-l-yellow-500">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-lg">{rec.title}</h3>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          {rec.confidence_score}% confiance
                        </Badge>
                      </div>
                      
                      <p className="text-slate-600 mb-4">{rec.content}</p>
                      
                      {rec.actions && rec.actions.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-slate-700 mb-2">Actions suggérées:</p>
                          <div className="space-y-1">
                            {rec.actions.map((action, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                                <ArrowRight className="h-3 w-3" />
                                {action}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Modal de détail du match */}
        {selectedMatch && selectedMatchDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Profil détaillé - {selectedMatchDetails.name}</span>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedMatch(null)}>
                    <XCircle className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Informations principales */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {selectedMatchDetails.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">{selectedMatchDetails.name}</h2>
                        <p className="text-slate-600">{selectedMatchDetails.description}</p>
                        <Badge className={`mt-2 bg-${getCompatibilityInfo(selectedMatch.compatibility_score).color}-100`}>
                          {selectedMatch.compatibility_score}% compatible
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div><strong>Type:</strong> {selectedMatchDetails.type}</div>
                      <div><strong>Entreprise:</strong> {selectedMatchDetails.company}</div>
                      <div><strong>Secteur:</strong> {selectedMatchDetails.sector}</div>
                      <div><strong>Localisation:</strong> {selectedMatchDetails.location}</div>
                      {selectedMatchDetails.languages && (
                        <div><strong>Langues:</strong> {selectedMatchDetails.languages.join(', ')}</div>
                      )}
                    </div>
                  </div>

                  {/* Analyse IA détaillée */}
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        Analyse IA complète
                      </h4>
                      <p className="text-sm text-purple-700 mb-2">
                        {selectedMatch.explanation}
                      </p>
                      <p className="text-sm text-purple-600">
                        {selectedMatch.ai_recommendation}
                      </p>
                    </div>

                    {selectedMatch.conversation_topics && (
                      <div>
                        <h4 className="font-semibold mb-2">💬 Sujets de conversation suggérés</h4>
                        <div className="space-y-1">
                          {selectedMatch.conversation_topics.map((topic, idx) => (
                            <div key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                              <ArrowRight className="h-3 w-3" />
                              {topic}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-3 pt-4">
                      <Button 
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        onClick={() => handleSendMessage(selectedMatch)}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Envoyer un message
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleScheduleMeeting(selectedMatch)}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Planifier un rendez-vous
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedMatchingSystem;