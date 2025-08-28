// Données de démonstration pour la plateforme SIPORTS
export const demoData = {
  // Utilisateurs de démonstration
  users: [
    {
      id: 1,
      email: 'admin@siportevent.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'SIPORTS',
      role: 'admin',
      company: 'SIPORTS',
      phone: '+212 522 000 000',
      avatar: null
    },
    {
      id: 2,
      email: 'exposant@example.com',
      password: 'expo123',
      firstName: 'Ahmed',
      lastName: 'Benali',
      role: 'exposant',
      company: 'Maritime Solutions',
      phone: '+212 522 123 456',
      avatar: null,
      approved: true
    },
    {
      id: 3,
      email: 'visiteur@example.com',
      password: 'visit123',
      firstName: 'Fatima',
      lastName: 'El Mansouri',
      role: 'visiteur',
      company: 'Port de Rabat',
      phone: '+212 537 123 456',
      avatar: null
    }
  ],

  // Exposants et partenaires
  exhibitors: [
    {
      id: 1,
      name: 'Maritime Solutions',
      category: 'Équipement lourd',
      country: 'Maroc',
      city: 'Casablanca',
      description: 'Leader dans les solutions portuaires innovantes depuis plus de 20 ans. Nous développons des équipements de pointe pour l\'automatisation des ports et terminaux.',
      longDescription: 'Maritime Solutions est une entreprise marocaine spécialisée dans la conception, fabrication et installation d\'équipements portuaires de haute technologie. Fondée en 2003, notre société s\'est imposée comme un acteur majeur dans la modernisation des infrastructures portuaires en Afrique du Nord et en Europe. Nos solutions intègrent les dernières innovations en matière d\'automatisation, d\'IoT et d\'intelligence artificielle pour optimiser les opérations portuaires.',
      products: [
        {
          id: 1,
          name: 'Grue portuaire automatisée SkyLift Pro',
          category: 'Équipement lourd',
          description: 'Grue automatisée haute performance pour la manutention de conteneurs avec système de guidage GPS et contrôle à distance.',
          price: 850000,
          currency: 'EUR',
          availability: 'En stock',
          specifications: {
            capacite: '65 tonnes',
            portee: '45 mètres',
            hauteur: '35 mètres',
            vitesse: '120 conteneurs/heure'
          }
        },
        {
          id: 2,
          name: 'Système de gestion SmartPort',
          category: 'Logiciel',
          description: 'Solution logicielle complète pour la gestion et l\'optimisation des opérations portuaires en temps réel.',
          price: 25000,
          currency: 'EUR',
          availability: 'Sur commande',
          specifications: {
            modules: 'Gestion des navires, Planification, Facturation',
            integration: 'API REST, EDI, XML',
            support: '24/7',
            langues: 'Français, Anglais, Arabe'
          }
        },
        {
          id: 3,
          name: 'Capteurs IoT MarineSense',
          category: 'Technologie',
          description: 'Réseau de capteurs intelligents pour la surveillance en temps réel des infrastructures portuaires.',
          price: 1200,
          currency: 'EUR',
          availability: 'En stock',
          specifications: {
            autonomie: '5 ans',
            portee: '2 km',
            precision: '±0.1%',
            resistance: 'IP68'
          }
        }
      ],
      rating: 4.8,
      reviewCount: 24,
      employeeCount: '50-100',
      founded: 2003,
      website: 'maritime-solutions.com',
      email: 'contact@maritime-solutions.com',
      phone: '+212 522 123 456',
      address: 'Zone Portuaire, Casablanca 20000, Maroc',
      logo: null,
      featured: true,
      certifications: ['ISO 9001:2015', 'ISO 14001:2015', 'OHSAS 18001'],
      specialties: ['Automatisation', 'IoT', 'Gestion portuaire'],
      socialLinks: {
        website: 'https://maritime-solutions.com',
        linkedin: 'https://linkedin.com/company/maritime-solutions',
        twitter: '',
        facebook: ''
      },
      stats: {
        experience: '20+ ans',
        projects: '150+ projets',
        clients: '50+ clients',
        countries: '15 pays'
      }
    },
    {
      id: 2,
      name: 'Port Authority of Tangier',
      category: 'Services',
      country: 'Maroc',
      city: 'Tanger',
      description: 'Autorité portuaire leader dans la gestion des infrastructures maritimes et la facilitation du commerce international.',
      longDescription: 'L\'Autorité Portuaire de Tanger Med est l\'un des ports les plus modernes et efficaces de la Méditerranée. Situé au carrefour des routes commerciales mondiales, le port de Tanger Med joue un rôle stratégique dans les échanges entre l\'Europe, l\'Afrique et l\'Amérique. Nos services couvrent la gestion portuaire, la logistique, la sécurité maritime et l\'accompagnement des entreprises.',
      products: [
        {
          id: 4,
          name: 'Services de gestion portuaire',
          category: 'Services',
          description: 'Gestion complète des opérations portuaires incluant pilotage, remorquage et amarrage.',
          price: 0,
          currency: 'EUR',
          availability: 'Disponible 24/7'
        },
        {
          id: 5,
          name: 'Solutions logistiques intégrées',
          category: 'Services',
          description: 'Services logistiques complets pour l\'import/export et le transit de marchandises.',
          price: 0,
          currency: 'EUR',
          availability: 'Disponible 24/7'
        }
      ],
      rating: 4.6,
      reviewCount: 18,
      employeeCount: '200+',
      founded: 1995,
      website: 'port-tangier.ma',
      email: 'info@port-tangier.ma',
      phone: '+212 539 456 789',
      address: 'Port de Tanger Med, Tanger 90000, Maroc',
      logo: null,
      featured: false,
      certifications: ['ISO 9001:2015', 'OHSAS 18001', 'ISPS Code'],
      specialties: ['Infrastructure', 'Logistique', 'Sécurité'],
      socialLinks: {
        website: 'https://port-tangier.ma',
        linkedin: 'https://linkedin.com/company/port-tangier',
        twitter: '',
        facebook: ''
      },
      stats: {
        experience: '28+ ans',
        projects: '200+ projets',
        clients: '100+ clients',
        countries: '50+ pays'
      }
    },
    {
      id: 3,
      name: 'EuroMarine Technologies',
      category: 'Technologie',
      country: 'France',
      city: 'Marseille',
      description: 'Innovation technologique pour l\'industrie maritime européenne avec des solutions de navigation et sécurité de pointe.',
      longDescription: 'EuroMarine Technologies est un leader européen dans le développement de solutions technologiques avancées pour le secteur maritime. Basée à Marseille, notre entreprise conçoit et fabrique des systèmes de navigation, équipements de sécurité et solutions digitales pour les ports, navires et installations offshore. Nos innovations contribuent à améliorer la sécurité maritime et l\'efficacité opérationnelle.',
      products: [
        {
          id: 6,
          name: 'Système de navigation NaviPro',
          category: 'Technologie',
          description: 'Système de navigation intégré avec radar, GPS et cartographie électronique.',
          price: 45000,
          currency: 'EUR',
          availability: 'En stock'
        },
        {
          id: 7,
          name: 'Équipements de sécurité SafeMarine',
          category: 'Sécurité',
          description: 'Gamme complète d\'équipements de sécurité maritime certifiés IMO.',
          price: 15000,
          currency: 'EUR',
          availability: 'Sur commande'
        }
      ],
      rating: 4.9,
      reviewCount: 31,
      employeeCount: '100-200',
      founded: 1998,
      website: 'euromarine-tech.fr',
      email: 'contact@euromarine-tech.fr',
      phone: '+33 4 91 123 456',
      address: '123 Avenue de la Joliette, 13002 Marseille, France',
      logo: null,
      featured: true,
      certifications: ['ISO 9001:2015', 'CE', 'IMO'],
      specialties: ['Navigation', 'Sécurité', 'Digital'],
      socialLinks: {
        website: 'https://euromarine-tech.fr',
        linkedin: 'https://linkedin.com/company/euromarine-tech',
        twitter: '',
        facebook: ''
      },
      stats: {
        experience: '25+ ans',
        projects: '300+ projets',
        clients: '80+ clients',
        countries: '25+ pays'
      }
    }
  ],

  // Événements et actualités
  events: [
    {
      id: 1,
      title: 'Salon Maritime International 2025',
      description: 'Le plus grand salon maritime du Maghreb',
      date: '2025-03-15',
      endDate: '2025-03-18',
      location: 'Casablanca, Maroc',
      type: 'Salon',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Conférence sur la Digitalisation Portuaire',
      description: 'Les enjeux de la transformation digitale des ports',
      date: '2025-02-20',
      location: 'Rabat, Maroc',
      type: 'Conférence',
      status: 'upcoming'
    }
  ],

  // Catégories d'activités
  categories: [
    'Équipement lourd',
    'Logiciel',
    'Technologie',
    'Services',
    'Maintenance',
    'Formation',
    'Consulting',
    'Transport',
    'Logistique',
    'Sécurité',
    'Environnement',
    'Énergie'
  ],

  // Pays représentés
  countries: [
    'Maroc',
    'France',
    'Espagne',
    'Italie',
    'Allemagne',
    'Pays-Bas',
    'Belgique',
    'Royaume-Uni',
    'Portugal',
    'Tunisie',
    'Algérie',
    'Égypte'
  ]
};

export default demoData;

