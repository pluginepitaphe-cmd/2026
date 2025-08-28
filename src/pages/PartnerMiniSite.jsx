import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Star, 
  Users, 
  Award, 
  Calendar,
  Home,
  Info,
  Briefcase,
  FolderOpen,
  MessageCircle,
  Download,
  FileText,
  Image,
  Video,
  ExternalLink
} from 'lucide-react';

const PartnerMiniSite = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('accueil');

  // Données des partenaires (normalement récupérées d'une API)
  const partners = {
    'port-authority-morocco': {
      id: 'port-authority-morocco',
      name: 'Port Authority of Morocco',
      category: 'Institutionnel',
      icon: '🏛️',
      description: 'Autorité portuaire nationale supervisant le développement et la gestion des ports marocains.',
      fullDescription: 'L\'Autorité Portuaire du Maroc est l\'organisme gouvernemental responsable de la supervision, du développement et de la gestion stratégique de tous les ports marocains. Créée pour moderniser l\'infrastructure portuaire du pays, elle joue un rôle crucial dans le développement économique du Maroc et de l\'Afrique.',
      location: 'Casablanca, Maroc',
      phone: '+212 522 123 456',
      email: 'contact@portauthority.ma',
      website: 'www.portauthority.ma',
      specialties: ['Gestion portuaire', 'Développement infrastructure', 'Réglementation'],
      rating: 5,
      employees: '500+',
      founded: '1985',
      logo: '/api/placeholder/200/100',
      coverImage: '/api/placeholder/1200/400',
      services: [
        {
          title: 'Gestion et développement des infrastructures portuaires',
          description: 'Supervision complète des installations portuaires marocaines',
          icon: '🏗️'
        },
        {
          title: 'Réglementation et contrôle des activités portuaires',
          description: 'Mise en place et application des normes portuaires',
          icon: '📋'
        },
        {
          title: 'Coordination avec les autorités internationales',
          description: 'Partenariats stratégiques avec les ports mondiaux',
          icon: '🌍'
        },
        {
          title: 'Développement de nouvelles technologies portuaires',
          description: 'Innovation et modernisation des équipements',
          icon: '⚡'
        },
        {
          title: 'Formation et certification du personnel portuaire',
          description: 'Programmes de formation spécialisés',
          icon: '🎓'
        }
      ],
      achievements: [
        'Modernisation de 12 ports majeurs au Maroc',
        'Certification ISO 9001:2015 pour la gestion de la qualité',
        'Partenariat avec 50+ ports internationaux',
        'Réduction de 30% des délais de traitement des marchandises'
      ],
      projects: [
        {
          name: 'Port Tanger Med Phase 3',
          description: 'Extension du plus grand port du Maroc avec de nouvelles installations de dernière génération',
          status: 'En cours',
          completion: '2025',
          budget: '2.5 milliards MAD',
          image: '/api/placeholder/300/200'
        },
        {
          name: 'Digitalisation des Services Portuaires',
          description: 'Mise en place d\'une plateforme numérique unifiée pour tous les services portuaires',
          status: 'Terminé',
          completion: '2024',
          budget: '150 millions MAD',
          image: '/api/placeholder/300/200'
        },
        {
          name: 'Port Vert Casablanca',
          description: 'Initiative environnementale pour un port durable et écologique',
          status: 'En planification',
          completion: '2026',
          budget: '800 millions MAD',
          image: '/api/placeholder/300/200'
        }
      ],
      brochures: [
        {
          title: 'Rapport Annuel 2024',
          description: 'Bilan complet des activités et performances de l\'année 2024',
          type: 'PDF',
          size: '12.5 MB',
          pages: 68,
          language: 'Français/Arabe',
          downloadUrl: '/brochures/rapport-annuel-2024.txt'
        },
        {
          title: 'Guide des Services Portuaires',
          description: 'Guide complet des services offerts par l\'Autorité Portuaire',
          type: 'PDF',
          size: '8.2 MB',
          pages: 45,
          language: 'Français/Anglais',
          downloadUrl: '/brochures/guide-services-portuaires.txt'
        },
        {
          title: 'Présentation Institutionnelle',
          description: 'Présentation PowerPoint de l\'organisation et de ses missions',
          type: 'PPTX',
          size: '25.3 MB',
          pages: 32,
          language: 'Français',
          downloadUrl: '#'
        },
        {
          title: 'Catalogue des Infrastructures',
          description: 'Catalogue visuel de toutes les infrastructures portuaires',
          type: 'PDF',
          size: '35.7 MB',
          pages: 120,
          language: 'Multilingue',
          downloadUrl: '#'
        }
      ],
      gallery: [
        { type: 'image', url: '/api/placeholder/400/300', title: 'Port de Casablanca' },
        { type: 'image', url: '/api/placeholder/400/300', title: 'Terminal Conteneurs' },
        { type: 'image', url: '/api/placeholder/400/300', title: 'Équipes de travail' },
        { type: 'video', url: '#', title: 'Visite virtuelle du port', thumbnail: '/api/placeholder/400/300' }
      ],
      news: [
        {
          title: 'Nouveau record de trafic au Port de Tanger Med',
          date: '2024-07-15',
          summary: 'Le port de Tanger Med a enregistré un nouveau record avec 8 millions de conteneurs traités.',
          image: '/api/placeholder/300/200'
        },
        {
          title: 'Signature d\'un partenariat avec le Port de Rotterdam',
          date: '2024-07-10',
          summary: 'Accord de coopération technique et commerciale avec le plus grand port d\'Europe.',
          image: '/api/placeholder/300/200'
        },
        {
          title: 'Lancement du programme de formation maritime',
          date: '2024-07-05',
          summary: 'Nouveau programme de formation pour 500 techniciens portuaires.',
          image: '/api/placeholder/300/200'
        }
      ]
    }
  };

  const partner = partners[id];

  if (!partner) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Partenaire non trouvé</h1>
          <Button onClick={() => navigate('/partenaires')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux partenaires
          </Button>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: 'accueil', label: 'Accueil', icon: Home },
    { id: 'apropos', label: 'À propos', icon: Info },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'projets', label: 'Projets', icon: FolderOpen },
    { id: 'brochures', label: 'Brochures', icon: Download },
    { id: 'contact', label: 'Contact', icon: MessageCircle }
  ];

  const renderAccueil = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-96 rounded-lg overflow-hidden">
        <img 
          src={partner.coverImage} 
          alt={partner.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/60 flex items-center">
          <div className="max-w-4xl mx-auto px-8 text-white">
            <div className="flex items-center space-x-6 mb-6">
              <div className="text-6xl">{partner.icon}</div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{partner.name}</h1>
                <p className="text-xl text-blue-100">{partner.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{partner.employees}</div>
            <div className="text-sm text-gray-600">Employés</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{partner.founded}</div>
            <div className="text-sm text-gray-600">Année de création</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{partner.achievements.length}</div>
            <div className="text-sm text-gray-600">Réalisations</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{partner.rating}/5</div>
            <div className="text-sm text-gray-600">Note moyenne</div>
          </CardContent>
        </Card>
      </div>

      {/* Latest News */}
      <Card>
        <CardHeader>
          <CardTitle>Actualités récentes</CardTitle>
          <CardDescription>Dernières nouvelles et annonces</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partner.news.map((news, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <img src={news.image} alt={news.title} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-1">{news.date}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{news.title}</h3>
                  <p className="text-sm text-gray-600">{news.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderApropos = () => (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Notre Histoire</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {partner.fullDescription}
            </p>
            <p className="text-gray-600 leading-relaxed">
              Depuis sa création en {partner.founded}, l'organisation n'a cessé de croître et d'innover 
              pour répondre aux défis du secteur maritime moderne. Avec plus de {partner.employees} employés 
              dévoués, nous continuons à façonner l'avenir du transport maritime au Maroc et en Afrique.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nos Réalisations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partner.achievements.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Award className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{achievement}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Galerie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {partner.gallery.map((item, index) => (
              <div key={index} className="relative group cursor-pointer">
                <img 
                  src={item.type === 'video' ? item.thumbnail : item.url} 
                  alt={item.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 rounded-b-lg">
                  <p className="text-white text-sm font-medium">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Services</h2>
        <p className="text-lg text-gray-600">
          Découvrez l'ensemble de nos services et expertises
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partner.services.map((service, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-4xl mb-4">{service.icon}</div>
              <CardTitle className="text-lg">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Domaines d'Expertise</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {partner.specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {specialty}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProjets = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Projets</h2>
        <p className="text-lg text-gray-600">
          Découvrez nos projets en cours et réalisations marquantes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {partner.projects.map((project, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="relative">
              <img 
                src={project.image} 
                alt={project.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge 
                  variant={
                    project.status === 'Terminé' ? 'default' :
                    project.status === 'En cours' ? 'secondary' : 'outline'
                  }
                >
                  {project.status}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Achèvement prévu:</span>
                  <span className="font-medium">{project.completion}</span>
                </div>
                <div className="flex justify-between">
                  <span>Budget:</span>
                  <span className="font-medium">{project.budget}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderBrochures = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Centre de Téléchargement</h2>
        <p className="text-lg text-gray-600">
          Téléchargez nos brochures, rapports et documents officiels
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {partner.brochures.map((brochure, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{brochure.title}</CardTitle>
                    <CardDescription>{brochure.description}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Type:</span> {brochure.type}
                  </div>
                  <div>
                    <span className="font-medium">Taille:</span> {brochure.size}
                  </div>
                  <div>
                    <span className="font-medium">Pages:</span> {brochure.pages}
                  </div>
                  <div>
                    <span className="font-medium">Langue:</span> {brochure.language}
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => {
                    if (brochure.downloadUrl === '#') {
                      alert('Ce document sera bientôt disponible au téléchargement.');
                    } else {
                      // Créer un lien de téléchargement
                      const link = document.createElement('a');
                      link.href = brochure.downloadUrl;
                      link.download = brochure.title.replace(/\s+/g, '-').toLowerCase() + '.txt';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Besoin d'un document spécifique ?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-800 mb-4">
            Si vous ne trouvez pas le document que vous cherchez, n'hésitez pas à nous contacter. 
            Nous serons ravis de vous fournir les informations dont vous avez besoin.
          </p>
          <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
            <Mail className="w-4 h-4 mr-2" />
            Demander un document
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Contactez-nous</h2>
        <p className="text-lg text-gray-600">
          Nous sommes là pour répondre à toutes vos questions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informations de Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Téléphone</div>
                <div className="text-gray-600">{partner.phone}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Email</div>
                <div className="text-gray-600">{partner.email}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Site Web</div>
                <div className="text-gray-600">{partner.website}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <MapPin className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Adresse</div>
                <div className="text-gray-600">{partner.location}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions Rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" size="lg">
              <Globe className="w-5 h-5 mr-3" />
              Visiter notre site web
              <ExternalLink className="w-4 h-4 ml-auto" />
            </Button>
            
            <Button className="w-full justify-start" variant="outline" size="lg">
              <Mail className="w-5 h-5 mr-3" />
              Envoyer un email
            </Button>
            
            <Button className="w-full justify-start" variant="outline" size="lg">
              <Phone className="w-5 h-5 mr-3" />
              Programmer un appel
            </Button>
            
            <Button className="w-full justify-start" variant="outline" size="lg">
              <MessageCircle className="w-5 h-5 mr-3" />
              Chat en direct
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Map placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Notre Localisation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-2" />
              <p>Carte interactive</p>
              <p className="text-sm">{partner.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'accueil': return renderAccueil();
      case 'apropos': return renderApropos();
      case 'services': return renderServices();
      case 'projets': return renderProjets();
      case 'brochures': return renderBrochures();
      case 'contact': return renderContact();
      default: return renderAccueil();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/partenaires')}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux partenaires
            </Button>
            
            <div className="flex items-center space-x-4">
              <img src={partner.logo} alt={partner.name} className="h-8" />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{partner.name}</h1>
                <p className="text-sm text-gray-500">{partner.category}</p>
              </div>
            </div>
          </div>
          
          {/* Navigation Menu */}
          <div className="border-t">
            <nav className="flex space-x-8 overflow-x-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === item.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default PartnerMiniSite;

