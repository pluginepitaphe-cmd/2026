import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import {
  TrendingUp, Users, Calendar, MessageSquare, Eye, Heart,
  Download, Share2, Star, Award, Globe, Activity,
  Clock, Target, Zap, BarChart3, Filter, RefreshCw
} from 'lucide-react';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);
  const [realTimeStats, setRealTimeStats] = useState({
    activeUsers: 12,
    totalConnections: 89,
    messagesExchanged: 156,
    meetingsScheduled: 23
  });

  // Données simulées pour les graphiques
  const visitorData = [
    { name: 'Lun', visiteurs: 45, exposants: 12, partenaires: 8 },
    { name: 'Mar', visiteurs: 52, exposants: 15, partenaires: 6 },
    { name: 'Mer', visiteurs: 48, exposants: 11, partenaires: 9 },
    { name: 'Jeu', visiteurs: 61, exposants: 18, partenaires: 7 },
    { name: 'Ven', visiteurs: 55, exposants: 16, partenaires: 12 },
    { name: 'Sam', visiteurs: 67, exposants: 14, partenaires: 10 },
    { name: 'Dim', visiteurs: 43, exposants: 9, partenaires: 5 }
  ];

  const engagementData = [
    { name: 'Jan', connexions: 45, messages: 23, rdv: 12 },
    { name: 'Fév', connexions: 52, messages: 31, rdv: 18 },
    { name: 'Mar', connexions: 48, messages: 27, rdv: 15 },
    { name: 'Avr', connexions: 61, messages: 35, rdv: 22 },
    { name: 'Mai', connexions: 55, messages: 29, rdv: 19 },
    { name: 'Jun', connexions: 67, messages: 42, rdv: 28 },
    { name: 'Jul', connexions: 73, messages: 38, rdv: 25 }
  ];

  const sectorData = [
    { name: 'Gestion Portuaire', value: 35, color: '#0891b2' },
    { name: 'Équipements', value: 25, color: '#0d9488' },
    { name: 'Logistique', value: 20, color: '#7c3aed' },
    { name: 'Technologies', value: 15, color: '#dc2626' },
    { name: 'Services', value: 5, color: '#ea580c' }
  ];

  const topExhibitors = [
    { name: 'Maritime Solutions', views: 245, connections: 89, rating: 4.8 },
    { name: 'Port Authority Maroc', views: 189, connections: 67, rating: 4.6 },
    { name: 'EuroMarine Tech', views: 156, connections: 54, rating: 4.9 },
    { name: 'Atlantic Logistics', views: 134, connections: 43, rating: 4.4 },
    { name: 'Nordic Port Equipment', views: 98, connections: 32, rating: 4.7 }
  ];

  // Simulation de données en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 3) - 1,
        totalConnections: prev.totalConnections + Math.floor(Math.random() * 2),
        messagesExchanged: prev.messagesExchanged + Math.floor(Math.random() * 4),
        meetingsScheduled: prev.meetingsScheduled + Math.floor(Math.random() * 2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const exportData = () => {
    alert('Export des données analytics en cours...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Analytics Dashboard</h1>
            <p className="text-slate-600 mt-1">Tableau de bord analytique en temps réel</p>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
            >
              <option value="24h">Dernières 24h</option>
              <option value="7d">7 derniers jours</option>
              <option value="30d">30 derniers jours</option>
              <option value="90d">3 derniers mois</option>
            </select>
            <Button variant="outline" onClick={refreshData} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
            <Button onClick={exportData}>
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Stats en temps réel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Utilisateurs actifs</p>
                  <p className="text-3xl font-bold">{realTimeStats.activeUsers}</p>
                  <p className="text-blue-100 text-xs mt-1">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +12% vs hier
                  </p>
                </div>
                <Activity className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Connexions totales</p>
                  <p className="text-3xl font-bold">{realTimeStats.totalConnections}</p>
                  <p className="text-green-100 text-xs mt-1">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +8% vs hier
                  </p>
                </div>
                <Users className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-violet-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Messages échangés</p>
                  <p className="text-3xl font-bold">{realTimeStats.messagesExchanged}</p>
                  <p className="text-purple-100 text-xs mt-1">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +15% vs hier
                  </p>
                </div>
                <MessageSquare className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">RDV planifiés</p>
                  <p className="text-3xl font-bold">{realTimeStats.meetingsScheduled}</p>
                  <p className="text-orange-100 text-xs mt-1">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +22% vs hier
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Graphiques principaux */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Évolution des visiteurs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Évolution des participants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={visitorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="visiteurs" stackId="1" stroke="#0891b2" fill="#0891b2" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="exposants" stackId="1" stroke="#0d9488" fill="#0d9488" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="partenaires" stackId="1" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Engagement par mois */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Engagement mensuel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="connexions" stroke="#0891b2" strokeWidth={3} />
                  <Line type="monotone" dataKey="messages" stroke="#0d9488" strokeWidth={3} />
                  <Line type="monotone" dataKey="rdv" stroke="#7c3aed" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Deuxième ligne de graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Répartition par secteur */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Répartition par secteur
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {sectorData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top exposants */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Top Exposants - Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topExhibitors.map((exhibitor, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-cyan-500 to-teal-600 text-white rounded-full font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold">{exhibitor.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-slate-600">
                          <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {exhibitor.views} vues
                          </div>
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {exhibitor.connections} connexions
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-medium">{exhibitor.rating}</span>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Actif
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications en temps réel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Activité en temps réel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nouvelle connexion établie</p>
                  <p className="text-xs text-slate-600">Maritime Solutions ↔ Port Authority Maroc • Il y a 2 minutes</p>
                </div>
                <Clock className="h-4 w-4 text-slate-400" />
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nouveau message envoyé</p>
                  <p className="text-xs text-slate-600">Ahmed Benali → EuroMarine Tech • Il y a 5 minutes</p>
                </div>
                <MessageSquare className="h-4 w-4 text-slate-400" />
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Rendez-vous planifié</p>
                  <p className="text-xs text-slate-600">Atlantic Logistics × Nordic Port Equipment • Il y a 8 minutes</p>
                </div>
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;