import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, Users, MessageSquare, Calendar, Star, TrendingUp,
  Target, Zap, Brain, Eye, Heart, ArrowRight, RefreshCw,
  Lightbulb, Gift, Award, Clock, CheckCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AIRecommendationsEngine = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Simulation d'un moteur de recommandations IA
  const generateRecommendations = () => {
    setLoading(true);
    
    setTimeout(() => {
      const allRecommendations = [
        {
          id: 1,
          type: 'connection',
          category: 'networking',
          title: 'Connexions recommandées',
          description: 'Basé sur vos intérêts et votre secteur d\'activité',
          icon: Users,
          color: 'blue',
          priority: 'high',
          confidence: 95,
          items: [
            {
              name: 'Dr. Sarah Martinez',
              company: 'Port Innovation Lab',
              reason: 'Expertise commune en automatisation portuaire',
              match: 92,
              avatar: null
            },
            {
              name: 'Jean-Michel Durand',
              company: 'Logistics Plus Europe',
              reason: 'Projets similaires en cours',
              match: 88,
              avatar: null
            },
            {
              name: 'Ahmed El Fassi',
              company: 'Moroccan Ports Authority',
              reason: 'Même zone géographique, synergies possibles',
              match: 85,
              avatar: null
            }
          ]
        },
        {
          id: 2,
          type: 'meeting',
          category: 'business',
          title: 'Rendez-vous suggérés',
          description: 'Opportunités d\'affaires détectées par l\'IA',
          icon: Calendar,
          color: 'green',
          priority: 'high',
          confidence: 88,
          items: [
            {
              company: 'Nordic Port Equipment',
              purpose: 'Partenariat stratégique équipements',
              potential: 'Contrat estimé: 2.5M€',
              urgency: 'Cette semaine',
              match: 94
            },
            {
              company: 'Digital Harbor Solutions',
              purpose: 'Intégration solutions IoT',
              potential: 'Projet pilote: 500K€',
              urgency: 'Prochains 15 jours',
              match: 89
            }
          ]
        },
        {
          id: 3,
          type: 'content',
          category: 'learning',
          title: 'Contenus personnalisés',
          description: 'Sélectionnés selon votre profil professionnel',
          icon: Lightbulb,
          color: 'purple',
          priority: 'medium',
          confidence: 82,
          items: [
            {
              title: 'Guide: Automatisation Portuaire 2024',
              type: 'Document',
              relevance: 'Très pertinent pour vos projets actuels',
              timeToRead: '15 min'
            },
            {
              title: 'Webinar: IoT dans les Ports Intelligents',
              type: 'Vidéo',
              relevance: 'Basé sur vos recherches récentes',
              timeToRead: '45 min'
            },
            {
              title: 'Étude de cas: Port de Singapour',
              type: 'Analyse',
              relevance: 'Méthodologie applicable à vos enjeux',
              timeToRead: '20 min'
            }
          ]
        },
        {
          id: 4,
          type: 'market',
          category: 'insights',
          title: 'Tendances marché',
          description: 'Insights personnalisés pour votre secteur',
          icon: TrendingUp,
          color: 'orange',
          priority: 'medium',
          confidence: 90,
          items: [
            {
              trend: 'Croissance IA portuaire',
              impact: '+45% d\'investissements prévus en 2024',
              opportunity: 'Positionnement sur solutions prédictives',
              timeframe: '6-12 mois'
            },
            {
              trend: 'Décarbonation maritime',
              impact: 'Nouvelles réglementations européennes',
              opportunity: 'Solutions éco-responsables',
              timeframe: '3-6 mois'
            }
          ]
        },
        {
          id: 5,
          type: 'optimization',
          category: 'performance',
          title: 'Optimisations suggérées',
          description: 'Améliorations détectées pour votre profil',
          icon: Target,
          color: 'cyan',
          priority: 'low',
          confidence: 78,
          items: [
            {
              area: 'Profil incomplet',
              suggestion: 'Ajoutez vos certifications pour +25% de visibilité',
              impact: 'Augmentation des connexions entrantes',
              effort: 'Facile - 5 min'
            },
            {
              area: 'Activité réseau',
              suggestion: 'Publiez 2-3 updates par semaine',
              impact: 'Meilleur engagement de votre réseau',
              effort: 'Modéré - 10 min/jour'
            }
          ]
        },
        {
          id: 6,
          type: 'events',
          category: 'opportunities',
          title: 'Événements recommandés',
          description: 'Sélectionnés pour maximiser votre ROI',
          icon: Award,
          color: 'pink',
          priority: 'medium',
          confidence: 85,
          items: [
            {
              event: 'Smart Ports Summit 2024',
              date: '15-17 Mars 2024',
              location: 'Rotterdam',
              relevance: 'Speakers de votre réseau présents',
              type: 'Conférence'
            },
            {
              event: 'Maritime Tech Innovation Day',
              date: '22 Mars 2024',
              location: 'Casablanca',
              relevance: 'Focus sur vos domaines d\'expertise',
              type: 'Workshop'
            }
          ]
        }
      ];

      const filtered = selectedCategory === 'all' 
        ? allRecommendations 
        : allRecommendations.filter(rec => rec.category === selectedCategory);

      setRecommendations(filtered);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    generateRecommendations();
  }, [selectedCategory]);

  const getColorClasses = (color) => {
    const colorMap = {
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', icon: 'text-blue-500' },
      green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', icon: 'text-green-500' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', icon: 'text-purple-500' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', icon: 'text-orange-500' },
      cyan: { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-600', icon: 'text-cyan-500' },
      pink: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-600', icon: 'text-pink-500' }
    };
    return colorMap[color] || colorMap.blue;
  };

  const categories = [
    { id: 'all', label: 'Toutes', icon: Sparkles },
    { id: 'networking', label: 'Réseautage', icon: Users },
    { id: 'business', label: 'Business', icon: Target },
    { id: 'learning', label: 'Formation', icon: Lightbulb },
    { id: 'insights', label: 'Insights', icon: TrendingUp },
    { id: 'performance', label: 'Performance', icon: Zap },
    { id: 'opportunities', label: 'Opportunités', icon: Gift }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Recommandations IA</h2>
            <p className="text-slate-600">Suggestions personnalisées basées sur votre activité</p>
          </div>
        </div>
        <Button onClick={generateRecommendations} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Analyse...' : 'Actualiser'}
        </Button>
      </div>

      {/* Filtres par catégorie */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {category.label}
            </Button>
          );
        })}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="h-6 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-200 rounded"></div>
                    <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Recommandations */}
      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recommendations.map(recommendation => {
            const Icon = recommendation.icon;
            const colors = getColorClasses(recommendation.color);
            
            return (
              <Card key={recommendation.id} className={`${colors.bg} ${colors.border} border-2 hover:shadow-lg transition-all duration-200`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 ${colors.bg} border ${colors.border} rounded-lg`}>
                        <Icon className={`h-5 w-5 ${colors.icon}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                        <p className="text-sm text-slate-600 mt-1">{recommendation.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={recommendation.priority === 'high' ? 'destructive' : recommendation.priority === 'medium' ? 'default' : 'outline'}>
                        {recommendation.priority === 'high' ? 'Priorité' : recommendation.priority === 'medium' ? 'Important' : 'Optionnel'}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Brain className="h-3 w-3" />
                        {recommendation.confidence}%
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Contenu spécifique selon le type */}
                    {recommendation.type === 'connection' && (
                      <div className="space-y-3">
                        {recommendation.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {item.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-slate-600">{item.company}</p>
                                <p className="text-xs text-slate-500">{item.reason}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className={colors.text}>
                                {item.match}% match
                              </Badge>
                              <Button size="sm">
                                <Users className="h-4 w-4 mr-1" />
                                Connecter
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {recommendation.type === 'meeting' && (
                      <div className="space-y-3">
                        {recommendation.items.map((item, index) => (
                          <div key={index} className="p-4 bg-white rounded-lg border">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium">{item.company}</h4>
                              <Badge variant="outline" className="text-green-600">
                                {item.match}% match
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 mb-2">{item.purpose}</p>
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <p className="text-xs text-slate-500">{item.potential}</p>
                                <p className="text-xs text-orange-600 font-medium">{item.urgency}</p>
                              </div>
                              <Button size="sm">
                                <Calendar className="h-4 w-4 mr-1" />
                                Planifier
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {recommendation.type === 'content' && (
                      <div className="space-y-3">
                        {recommendation.items.map((item, index) => (
                          <div key={index} className="p-3 bg-white rounded-lg border flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-sm">{item.title}</h4>
                              <p className="text-xs text-slate-600 mt-1">{item.relevance}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="secondary" className="text-xs">{item.type}</Badge>
                                <span className="text-xs text-slate-500 flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {item.timeToRead}
                                </span>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {recommendation.type === 'market' && (
                      <div className="space-y-3">
                        {recommendation.items.map((item, index) => (
                          <div key={index} className="p-4 bg-white rounded-lg border">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium">{item.trend}</h4>
                              <Badge variant="outline" className="text-orange-600">
                                {item.timeframe}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 mb-2">{item.impact}</p>
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-green-600">{item.opportunity}</p>
                              <Button size="sm" variant="outline">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                Analyser
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {recommendation.type === 'optimization' && (
                      <div className="space-y-3">
                        {recommendation.items.map((item, index) => (
                          <div key={index} className="p-4 bg-white rounded-lg border">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium">{item.area}</h4>
                              <Badge variant="outline" className="text-cyan-600">
                                {item.effort}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 mb-2">{item.suggestion}</p>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-slate-500">{item.impact}</p>
                              <Button size="sm">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Appliquer
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {recommendation.type === 'events' && (
                      <div className="space-y-3">
                        {recommendation.items.map((item, index) => (
                          <div key={index} className="p-4 bg-white rounded-lg border">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium">{item.event}</h4>
                              <Badge variant="outline">{item.type}</Badge>
                            </div>
                            <div className="space-y-1 mb-3">
                              <p className="text-sm text-slate-600">{item.date} • {item.location}</p>
                              <p className="text-xs text-slate-500">{item.relevance}</p>
                            </div>
                            <Button size="sm" className="w-full">
                              <Calendar className="h-4 w-4 mr-1" />
                              S'inscrire
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* État vide */}
      {!loading && recommendations.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Brain className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Aucune recommandation disponible
            </h3>
            <p className="text-slate-600 mb-4">
              L'IA analyse votre activité pour générer des suggestions personnalisées.
            </p>
            <Button onClick={generateRecommendations}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Générer des recommandations
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIRecommendationsEngine;