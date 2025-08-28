import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  MessageSquare, 
  Calendar,
  Search,
  Filter,
  Star,
  Building,
  MapPin,
  Phone,
  Mail,
  Globe,
  UserPlus,
  Send,
  Eye,
  Heart,
  BarChart3
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const NetworkingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('directory');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    type: 'all',
    sector: 'all',
    location: 'all'
  });

  // Données simulées pour les participants
  const [participants, setParticipants] = useState([
    {
      id: 1,
      type: 'exposant',
      name: 'Port Authority Maroc',
      logo: '/images/company-logo-1.jpg',
      description: 'Leader dans la gestion portuaire et les solutions logistiques maritimes.',
      sector: 'Gestion Portuaire',
      location: 'Casablanca, Maroc',
      products: ['Gestion de terminaux', 'Logistique maritime', 'Solutions IoT'],
      website: 'www.portauthority.ma',
      email: 'contact@portauthority.ma',
      phone: '+212 522 123 456',
      social: {
        linkedin: 'portauthority-maroc',
        twitter: '@portauthority_ma'
      },
      stats: {
        profileViews: 245,
        connections: 89
      },
      isFavorite: false
    },
    {
      id: 2,
      type: 'partenaire',
      name: 'Maritime Solutions International',
      logo: '/images/company-logo-2.jpg',
      description: 'Partenaire officiel spécialisé dans les équipements portuaires innovants.',
      sector: 'Équipements Portuaires',
      location: 'Rotterdam, Pays-Bas',
      products: ['Grues portuaires', 'Systèmes automatisés', 'Maintenance'],
      website: 'www.maritime-solutions.com',
      email: 'info@maritime-solutions.com',
      phone: '+31 10 123 4567',
      social: {
        linkedin: 'maritime-solutions-intl',
        twitter: '@maritime_sol'
      },
      stats: {
        profileViews: 189,
        connections: 156
      },
      isFavorite: true
    },
    {
      id: 3,
      type: 'visiteur',
      name: 'Ahmed Benali',
      company: 'Tanger Med Port',
      position: 'Directeur Technique',
      description: 'Expert en technologies portuaires avec 15 ans d\'expérience.',
      sector: 'Technologies Portuaires',
      location: 'Tanger, Maroc',
      interests: ['Automatisation', 'IoT', 'Développement durable'],
      email: 'a.benali@tangermed.ma',
      phone: '+212 539 123 456',
      social: {
        linkedin: 'ahmed-benali-port'
      },
      stats: {
        profileViews: 67,
        connections: 34
      },
      isFavorite: false
    }
  ]);

  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    filterParticipants();
  }, [searchTerm, selectedFilters, participants]); // Ajouter participants dans les dépendances

  const filterParticipants = () => {
    let filtered = participants.filter(participant => {
      const matchesSearch = participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           participant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           participant.sector.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedFilters.type === 'all' || participant.type === selectedFilters.type;
      const matchesSector = selectedFilters.sector === 'all' || participant.sector === selectedFilters.sector;
      
      return matchesSearch && matchesType && matchesSector;
    });
    
    setFilteredParticipants(filtered);
  };

  const handleAddToFavorites = (participantId) => {
    setFavorites(prev => 
      prev.includes(participantId) 
        ? prev.filter(id => id !== participantId)
        : [...prev, participantId]
    );
  };

  const handleSendMessage = (participantId) => {
    if (!user) {
      alert('Veuillez vous connecter pour accéder à la messagerie');
      navigate('/login');
      return;
    }
    
    // Vérifier les droits selon le forfait
    const userPackage = user.visitor_package || 'Free';
    const allowedMessages = {
      'Free': 0,
      'Basic': 2, 
      'Premium': 5,
      'VIP': 'unlimited'
    };
    
    const limit = allowedMessages[userPackage];
    if (limit === 0) {
      alert('Votre forfait gratuit ne permet pas l\'envoi de messages. Passez au forfait Basic pour débloquer cette fonctionnalité.');
      navigate('/visiter/forfaits');
      return;
    }
    
    // Rediriger vers la messagerie
    const participant = participants.find(p => p.id === participantId);
    navigate(`/messages?to=${participantId}&name=${encodeURIComponent(participant.name)}`);
  };

  const handleScheduleMeeting = (participantId) => {
    if (!user) {
      alert('Veuillez vous connecter pour planifier des rendez-vous');
      navigate('/login');
      return;
    }
    
    // Vérifier les droits selon le forfait  
    const userPackage = user.visitor_package || 'Free';
    const allowedMeetings = {
      'Free': 0,
      'Basic': 2,
      'Premium': 5, 
      'VIP': 'unlimited'
    };
    
    const limit = allowedMeetings[userPackage];
    if (limit === 0) {
      alert('Votre forfait gratuit ne permet pas la planification de RDV. Passez au forfait Basic pour débloquer cette fonctionnalité.');
      navigate('/visiter/forfaits');
      return;
    }
    
    // Rediriger vers le calendrier
    navigate(`/calendrier?participant=${participantId}`);
  };

  const tabs = [
    { id: 'directory', label: 'Annuaire', icon: Users },
    { id: 'network', label: 'Mon Réseau', icon: UserPlus },
    { id: 'messages', label: 'Messagerie', icon: MessageSquare },
    { id: 'meetings', label: 'Rendez-vous', icon: Calendar },
    { id: 'stats', label: 'Statistiques', icon: BarChart3 }
  ];

  const sectors = [
    'Gestion Portuaire',
    'Équipements Portuaires',
    'Technologies Portuaires',
    'Logistique Maritime',
    'Transport Maritime',
    'Services Portuaires'
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Réseautage</h1>
          <p className="text-slate-600">
            Connectez-vous avec les exposants, partenaires et visiteurs du salon maritime
          </p>
        </div>

        {/* Navigation par onglets */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'outline'}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Contenu des onglets */}
        {activeTab === 'directory' && (
          <div className="space-y-6">
            {/* Barre de recherche et filtres */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        placeholder="Rechercher par nom, secteur, produits..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <select
                      value={selectedFilters.type}
                      onChange={(e) => setSelectedFilters(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    >
                      <option value="all">Tous les types</option>
                      <option value="exposant">Exposants</option>
                      <option value="partenaire">Partenaires</option>
                      <option value="visiteur">Visiteurs</option>
                    </select>
                  </div>
                  <div>
                    <select
                      value={selectedFilters.sector}
                      onChange={(e) => setSelectedFilters(prev => ({ ...prev, sector: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    >
                      <option value="all">Tous les secteurs</option>
                      {sectors.map(sector => (
                        <option key={sector} value={sector}>{sector}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Liste des participants */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredParticipants.map(participant => (
                <Card key={participant.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                        {participant.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg text-slate-900">{participant.name}</h3>
                          <Badge variant={
                            participant.type === 'exposant' ? 'default' :
                            participant.type === 'partenaire' ? 'secondary' : 'outline'
                          }>
                            {participant.type}
                          </Badge>
                        </div>
                        {participant.company && (
                          <p className="text-slate-600 text-sm">{participant.position} chez {participant.company}</p>
                        )}
                        <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                          <MapPin className="w-3 h-3" />
                          {participant.location}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAddToFavorites(participant.id)}
                        className={favorites.includes(participant.id) ? 'text-red-500' : 'text-slate-400'}
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(participant.id) ? 'fill-current' : ''}`} />
                      </Button>
                    </div>

                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {participant.description}
                    </p>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-slate-700 mb-2">Secteur d'activité:</p>
                      <Badge variant="outline">{participant.sector}</Badge>
                    </div>

                    {participant.products && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-slate-700 mb-2">Produits/Services:</p>
                        <div className="flex flex-wrap gap-1">
                          {participant.products.slice(0, 3).map((product, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {product}
                            </Badge>
                          ))}
                          {participant.products.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{participant.products.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {participant.interests && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-slate-700 mb-2">Centres d'intérêt:</p>
                        <div className="flex flex-wrap gap-1">
                          {participant.interests.map((interest, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {participant.stats.profileViews} vues
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {participant.stats.connections} connexions
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {!user ? (
                        // Si l'utilisateur n'est pas connecté, bouton pour se connecter
                        <Button
                          size="sm"
                          onClick={() => navigate('/login')}
                          className="flex-1"
                        >
                          <UserPlus className="w-4 h-4 mr-1" />
                          Se connecter
                        </Button>
                      ) : (
                        // Si l'utilisateur est connecté, boutons d'interaction
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleSendMessage(participant.id)}
                            className="flex-1"
                          >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleScheduleMeeting(participant.id)}
                          >
                            <Calendar className="w-4 h-4 mr-1" />
                            RDV
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredParticipants.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Aucun participant trouvé</h3>
                  <p className="text-slate-600">
                    Essayez de modifier vos critères de recherche ou vos filtres.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'network' && (
          <Card>
            <CardHeader>
              <CardTitle>Mon Réseau</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <UserPlus className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Votre réseau</h3>
                <p className="text-slate-600 mb-4">
                  Gérez vos connexions établies et les demandes en attente.
                </p>
                <p className="text-sm text-slate-500">
                  Fonctionnalité en cours de développement...
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'messages' && (
          <Card>
            <CardHeader>
              <CardTitle>Messagerie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Messagerie instantanée</h3>
                <p className="text-slate-600 mb-4">
                  Communiquez directement avec vos contacts et partenaires.
                </p>
                <p className="text-sm text-slate-500">
                  Fonctionnalité en cours de développement...
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'meetings' && (
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Rendez-vous</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Planification de rendez-vous</h3>
                <p className="text-slate-600 mb-4">
                  Proposez et gérez vos rendez-vous avec les participants du salon.
                </p>
                <p className="text-sm text-slate-500">
                  Fonctionnalité en cours de développement...
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'stats' && (
          <Card>
            <CardHeader>
              <CardTitle>Statistiques de Profil</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Statistiques et analytics</h3>
                <p className="text-slate-600 mb-4">
                  Consultez les statistiques de consultation de votre profil et d'interaction.
                </p>
                <p className="text-sm text-slate-500">
                  Fonctionnalité en cours de développement...
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NetworkingPage;

