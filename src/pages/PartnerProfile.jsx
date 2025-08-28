import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Globe, Mail, Phone, MapPin, Star, Users, Award, Calendar } from 'lucide-react';

const PartnerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
      services: [
        'Gestion et développement des infrastructures portuaires',
        'Réglementation et contrôle des activités portuaires',
        'Coordination avec les autorités internationales',
        'Développement de nouvelles technologies portuaires',
        'Formation et certification du personnel portuaire'
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
          description: 'Extension du plus grand port du Maroc',
          status: 'En cours',
          completion: '2025'
        },
        {
          name: 'Digitalisation des Services Portuaires',
          description: 'Mise en place d\'une plateforme numérique unifiée',
          status: 'Terminé',
          completion: '2024'
        }
      ]
    },
    'mediterranean-shipping': {
      id: 'mediterranean-shipping',
      name: 'Mediterranean Shipping Company',
      category: 'Transport Maritime',
      icon: '🚢',
      description: 'Leader mondial du transport maritime et de la logistique avec une forte présence en Méditerranée.',
      fullDescription: 'Mediterranean Shipping Company (MSC) est l\'une des plus grandes compagnies de transport maritime au monde. Avec une flotte de plus de 600 navires, MSC dessert plus de 500 ports dans 155 pays, offrant des solutions complètes de transport et de logistique.',
      location: 'Tanger, Maroc',
      phone: '+212 539 987 654',
      email: 'morocco@msc.com',
      website: 'www.msc.com',
      specialties: ['Transport conteneurs', 'Logistique', 'Services portuaires'],
      rating: 4,
      employees: '1000+',
      founded: '1970',
      services: [
        'Transport maritime de conteneurs',
        'Services de logistique intégrée',
        'Gestion de la chaîne d\'approvisionnement',
        'Services de terminal portuaire',
        'Transport de marchandises spécialisées'
      ],
      achievements: [
        '2ème plus grande compagnie maritime mondiale',
        'Flotte de 600+ navires',
        'Présence dans 155 pays',
        'Transport de 23+ millions de conteneurs par an'
      ],
      projects: [
        {
          name: 'Terminal MSC Tanger',
          description: 'Nouveau terminal de conteneurs à Tanger Med',
          status: 'En cours',
          completion: '2025'
        },
        {
          name: 'Flotte Verte MSC',
          description: 'Programme de réduction des émissions carbone',
          status: 'En cours',
          completion: '2030'
        }
      ]
    },
    'techport-solutions': {
      id: 'techport-solutions',
      name: 'TechPort Solutions',
      category: 'Technologie',
      icon: '💻',
      description: 'Solutions technologiques innovantes pour la digitalisation des opérations portuaires.',
      fullDescription: 'TechPort Solutions est une entreprise technologique spécialisée dans le développement de solutions numériques pour l\'industrie portuaire. Nous créons des systèmes intelligents qui optimisent les opérations portuaires et améliorent l\'efficacité logistique.',
      location: 'Rabat, Maroc',
      phone: '+212 537 456 789',
      email: 'info@techport.ma',
      website: 'www.techport.ma',
      specialties: ['Digitalisation', 'IoT portuaire', 'Systèmes de gestion'],
      rating: 4.5,
      employees: '150+',
      founded: '2015',
      services: [
        'Systèmes de gestion portuaire (PMS)',
        'Solutions IoT pour le suivi des conteneurs',
        'Plateformes de digitalisation',
        'Intelligence artificielle pour la logistique',
        'Applications mobiles portuaires'
      ],
      achievements: [
        'Solutions déployées dans 25+ ports',
        'Réduction de 40% des temps d\'attente',
        'Certification ISO 27001 pour la sécurité',
        'Prix Innovation Technologique 2023'
      ],
      projects: [
        {
          name: 'Smart Port Platform',
          description: 'Plateforme intelligente de gestion portuaire',
          status: 'En cours',
          completion: '2025'
        },
        {
          name: 'AI Logistics Optimizer',
          description: 'Système d\'IA pour l\'optimisation logistique',
          status: 'En développement',
          completion: '2026'
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/partenaires')}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux partenaires
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center space-x-6">
            <div className="text-6xl">{partner.icon}</div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{partner.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {partner.category}
                </span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < partner.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm">({partner.rating}/5)</span>
                </div>
              </div>
              <p className="text-xl text-blue-100 mb-6">{partner.description}</p>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {partner.location}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {partner.employees} employés
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Fondé en {partner.founded}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">À propos</h2>
              <p className="text-gray-600 leading-relaxed">{partner.fullDescription}</p>
            </div>

            {/* Services */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {partner.services.map((service, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Projets en cours</h2>
              <div className="space-y-6">
                {partner.projects.map((project, index) => (
                  <div key={index} className="border-l-4 border-blue-600 pl-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Terminé' 
                          ? 'bg-green-100 text-green-800'
                          : project.status === 'En cours'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{project.description}</p>
                    <p className="text-sm text-gray-500">Achèvement prévu: {project.completion}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Réalisations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {partner.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Award className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{partner.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{partner.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{partner.website}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{partner.location}</span>
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Spécialités</h3>
              <div className="flex flex-wrap gap-2">
                {partner.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <Button className="w-full" variant="default">
                  <Globe className="w-4 h-4 mr-2" />
                  Visiter le site web
                </Button>
                <Button className="w-full" variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Envoyer un message
                </Button>
                <Button className="w-full" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Programmer un appel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerProfile;

