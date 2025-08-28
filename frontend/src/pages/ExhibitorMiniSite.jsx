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
  Package,
  FolderOpen,
  MessageCircle,
  Download,
  FileText,
  Image,
  Video,
  ExternalLink,
  Building,
  ShoppingCart,
  Truck,
  Shield,
  Zap,
  Eye
} from 'lucide-react';

const ExhibitorMiniSite = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('accueil');

  // Données des exposants (normalement récupérées d'une API)
  const exhibitors = {
    'maritime-tech-solutions': {
      id: 'maritime-tech-solutions',
      name: 'Maritime Tech Solutions',
      category: 'Technologie',
      icon: '⚓',
      description: 'Solutions technologiques innovantes pour l\'industrie maritime et portuaire.',
      fullDescription: 'Maritime Tech Solutions est un leader mondial dans le développement de technologies avancées pour l\'industrie maritime. Depuis 2010, nous concevons et déployons des solutions numériques qui révolutionnent les opérations portuaires, la navigation maritime et la gestion logistique.',
      location: 'Rotterdam, Pays-Bas',
      phone: '+31 10 123 4567',
      email: 'contact@maritimetech.nl',
      website: 'www.maritimetech.nl',
      specialties: ['IoT Maritime', 'Intelligence Artificielle', 'Blockchain', 'Automatisation'],
      rating: 4.8,
      employees: '250+',
      founded: '2010',
      logo: '/images/maritime-solutions-logo.png',
      coverImage: '/images/siports-hero.jpg',
      standNumber: 'A-125',
      pavilion: 'Pavillon Technologie',
      products: [
        {
          name: 'SmartPort Platform',
          category: 'Logiciel',
          description: 'Plateforme de gestion portuaire intelligente avec IA intégrée',
          price: 'Sur devis',
          image: '/images/smart-port-system.jpg',
          features: ['Gestion en temps réel', 'Prédictions IA', 'Interface intuitive', 'API complète']
        },
        {
          name: 'NaviGuard System',
          category: 'Sécurité',
          description: 'Système de surveillance maritime avancé avec détection automatique',
          price: '€45,000',
          image: '/images/maritime-safety.jpg',
          features: ['Détection radar', 'Vision nocturne', 'Alertes automatiques', 'Intégration satellite']
        },
        {
          name: 'CargoTrack IoT',
          category: 'Logistique',
          description: 'Solution de traçabilité des conteneurs avec capteurs IoT',
          price: '€12,500',
          image: '/images/iot-sensors.jpg',
          features: ['Géolocalisation GPS', 'Capteurs environnementaux', 'Alertes temps réel', 'Dashboard web']
        },
        {
          name: 'PortOptimizer AI',
          category: 'Intelligence Artificielle',
          description: 'Optimisation des opérations portuaires par intelligence artificielle',
          price: 'Sur devis',
          image: '/images/port-authority.jpg',
          features: ['Optimisation des flux', 'Prédiction de trafic', 'Réduction des coûts', 'Reporting avancé']
        }
      ],
      services: [
        {
          title: 'Consulting Maritime',
          description: 'Conseil stratégique pour la transformation digitale des ports',
          icon: '🎯',
          duration: '3-6 mois',
          price: 'À partir de €25,000'
        },
        {
          title: 'Intégration Système',
          description: 'Intégration complète de nos solutions dans votre infrastructure',
          icon: '🔧',
          duration: '2-4 mois',
          price: 'À partir de €15,000'
        },
        {
          title: 'Formation & Support',
          description: 'Formation des équipes et support technique 24/7',
          icon: '🎓',
          duration: 'Continu',
          price: 'À partir de €5,000/an'
        },
        {
          title: 'Maintenance Préventive',
          description: 'Maintenance proactive de tous nos équipements installés',
          icon: '🛠️',
          duration: 'Continu',
          price: 'À partir de €8,000/an'
        }
      ],
      achievements: [
        'Plus de 150 ports équipés dans le monde',
        'Réduction moyenne de 35% des coûts opérationnels',
        'Certification ISO 27001 pour la sécurité des données',
        'Prix Innovation Maritime 2023 et 2024',
        'Partenariat avec 25+ autorités portuaires',
        'Économies de CO2 : 2.5 millions de tonnes/an'
      ],
      projects: [
        {
          name: 'Port Autonome de Rotterdam',
          description: 'Déploiement de la plateforme SmartPort sur l\'ensemble du port',
          status: 'En cours',
          completion: '2025',
          budget: '€12M',
          image: '/images/smart-port-system.jpg',
          client: 'Port of Rotterdam Authority'
        },
        {
          name: 'Terminal Conteneurs Anvers',
          description: 'Système de traçabilité IoT pour 500,000 conteneurs/an',
          status: 'Terminé',
          completion: '2024',
          budget: '€3.5M',
          image: '/images/iot-sensors.jpg',
          client: 'Port of Antwerp'
        },
        {
          name: 'Port de Singapour - Phase 2',
          description: 'Extension du système IA d\'optimisation des flux',
          status: 'En planification',
          completion: '2026',
          budget: '€8M',
          image: '/images/port-authority.jpg',
          client: 'Maritime and Port Authority of Singapore'
        }
      ],
      brochures: [
        {
          title: 'Catalogue Produits 2024',
          description: 'Catalogue complet de toutes nos solutions technologiques',
          type: 'PDF',
          size: '15.2 MB',
          pages: 84,
          language: 'Français/Anglais/Néerlandais',
          downloadUrl: '/brochures/catalogue-produits-2024.txt'
        },
        {
          title: 'Étude de Cas - Port de Rotterdam',
          description: 'Analyse détaillée de notre déploiement au Port de Rotterdam',
          type: 'PDF',
          size: '6.8 MB',
          pages: 32,
          language: 'Anglais',
          downloadUrl: '/brochures/etude-cas-rotterdam.txt'
        },
        {
          title: 'Guide d\'Intégration Technique',
          description: 'Documentation technique pour l\'intégration de nos APIs',
          type: 'PDF',
          size: '22.1 MB',
          pages: 156,
          language: 'Anglais',
          downloadUrl: '#'
        },
        {
          title: 'Présentation Commerciale',
          description: 'Présentation PowerPoint de nos solutions et services',
          type: 'PPTX',
          size: '45.3 MB',
          pages: 48,
          language: 'Multilingue',
          downloadUrl: '#'
        }
      ],
      gallery: [
        { type: 'image', url: '/api/placeholder/400/300', title: 'Centre de contrôle SmartPort' },
        { type: 'image', url: '/api/placeholder/400/300', title: 'Installation NaviGuard' },
        { type: 'image', url: '/api/placeholder/400/300', title: 'Équipe technique' },
        { type: 'video', url: '#', title: 'Démonstration SmartPort', thumbnail: '/api/placeholder/400/300' },
        { type: 'image', url: '/api/placeholder/400/300', title: 'Capteurs IoT CargoTrack' },
        { type: 'image', url: '/api/placeholder/400/300', title: 'Dashboard PortOptimizer' }
      ],
      news: [
        {
          title: 'Nouveau contrat avec le Port de Hambourg',
          date: '2024-07-18',
          summary: 'Maritime Tech Solutions déploiera sa solution SmartPort sur le 3ème plus grand port d\'Europe.',
          image: '/api/placeholder/300/200'
        },
        {
          title: 'Prix Innovation Maritime 2024',
          date: '2024-07-12',
          summary: 'Notre solution PortOptimizer AI remporte le prix de l\'innovation technologique.',
          image: '/api/placeholder/300/200'
        },
        {
          title: 'Partenariat stratégique avec Maersk',
          date: '2024-07-08',
          summary: 'Accord de partenariat pour équiper 50 terminaux Maersk avec nos solutions IoT.',
          image: '/api/placeholder/300/200'
        }
      ],
      certifications: [
        { name: 'ISO 27001', description: 'Sécurité de l\'information', year: '2023' },
        { name: 'ISO 9001', description: 'Management de la qualité', year: '2022' },
        { name: 'SOC 2 Type II', description: 'Sécurité des données cloud', year: '2024' },
        { name: 'CE Marking', description: 'Conformité européenne', year: '2021' }
      ]
    },
    'digital-harbor-solutions': {
      id: 'digital-harbor-solutions',
      name: 'Digital Harbor Solutions',
      category: 'Logiciel',
      icon: '💻',
      description: 'Solutions logicielles avancées pour la digitalisation portuaire.',
      fullDescription: 'Digital Harbor Solutions développe des logiciels innovants pour moderniser les opérations portuaires. Nos solutions basées sur l\'IA et le Big Data permettent aux ports d\'optimiser leurs performances et de réduire leurs coûts opérationnels.',
      location: 'Hambourg, Allemagne',
      phone: '+49 40 123 456',
      email: 'contact@digital-harbor.de',
      website: 'www.digital-harbor.de',
      specialties: ['Logiciels', 'IA', 'Big Data', 'Analytics'],
      rating: 4.8,
      employees: '20-50',
      founded: '2010',
      logo: '/images/digital-harbor-logo.png',
      coverImage: '/images/digital-harbor-cover.jpg',
      standNumber: 'B-87',
      pavilion: 'Pavillon Digital',
      products: [
        {
          name: 'PortAnalytics Pro',
          category: 'Analytics',
          description: 'Plateforme d\'analyse avancée pour optimiser les opérations portuaires',
          price: '€25,000/an',
          image: '/images/smart-port-system.jpg',
          features: ['Tableaux de bord temps réel', 'Prédictions IA', 'Rapports automatisés', 'API REST']
        },
        {
          name: 'CargoFlow Manager',
          category: 'Logistique',
          description: 'Gestion intelligente des flux de marchandises et conteneurs',
          price: '€18,000/an',
          image: '/images/iot-sensors.jpg',
          features: ['Suivi temps réel', 'Optimisation des routes', 'Alertes automatiques', 'Intégration ERP']
        }
      ],
      services: [
        {
          title: 'Consulting Digital',
          description: 'Accompagnement dans la transformation digitale portuaire',
          icon: '🎯',
          duration: '2-4 mois',
          price: 'À partir de €15,000'
        },
        {
          title: 'Formation Utilisateurs',
          description: 'Formation complète sur nos outils logiciels',
          icon: '🎓',
          duration: '1-2 semaines',
          price: 'À partir de €3,000'
        }
      ],
      achievements: [
        'Plus de 25 ports équipés en Europe',
        'Réduction moyenne de 20% des temps d\'attente',
        'Certification ISO 27001 pour la sécurité',
        'Prix Innovation Logistique 2023'
      ],
      projects: [
        {
          name: 'Port de Hambourg',
          description: 'Déploiement de PortAnalytics Pro sur l\'ensemble du port',
          status: 'En cours',
          completion: '2025',
          budget: '€2.5M',
          image: '/images/smart-port-system.jpg',
          client: 'Hamburg Port Authority'
        }
      ],
      brochures: [
        {
          title: 'Catalogue Produits 2024',
          description: 'Catalogue complet de nos solutions logicielles',
          type: 'PDF',
          size: '8.5 MB',
          pages: 42,
          language: 'Français/Anglais/Allemand',
          downloadUrl: '/brochures/catalogue-produits-2024.txt'
        }
      ],
      gallery: [
        { type: 'image', url: '/api/placeholder/400/300', title: 'Interface PortAnalytics' },
        { type: 'image', url: '/api/placeholder/400/300', title: 'Dashboard CargoFlow' }
      ],
      news: [
        {
          title: 'Nouveau partenariat avec le Port de Hambourg',
          date: '2024-06-15',
          summary: 'Extension de notre solution PortAnalytics à 5 nouveaux terminaux.',
          image: '/api/placeholder/300/200'
        }
      ],
      certifications: [
        { name: 'ISO 27001', description: 'Sécurité de l\'information', year: '2023' },
        { name: 'GDPR Compliant', description: 'Conformité RGPD', year: '2024' }
      ]
    },
    'atlantic-logistics': {
      id: 'atlantic-logistics',
      name: 'Atlantic Logistics',
      category: 'Logistique et Transport',
      icon: '🚢',
      description: 'Solutions complètes de logistique et de transport maritime.',
      fullDescription: 'Atlantic Logistics est une entreprise leader dans le domaine de la logistique et du transport maritime, offrant des services intégrés pour optimiser la chaîne d\'approvisionnement de ses clients. Avec une présence mondiale et une expertise reconnue, nous garantissons des solutions fiables et efficaces pour tous vos besoins en fret.',
      location: 'Casablanca, Maroc',
      phone: '+212 522 123 456',
      email: 'contact@atlanticlogistics.ma',
      website: 'www.atlanticlogistics.ma',
      specialties: ['Fret Maritime', 'Logistique Internationale', 'Douane', 'Entreposage'],
      rating: 4.5,
      employees: '100+',
      founded: '2005',
      logo: '/images/atlantic-logistics-logo.png',
      coverImage: '/images/atlantic-logistics-cover.jpg',
      standNumber: 'C-05',
      pavilion: 'Pavillon Logistique',
      products: [
        {
          name: 'Service Fret Conteneurisé',
          category: 'Transport',
          description: 'Transport de conteneurs complets (FCL) et partiels (LCL) à l\'échelle mondiale.',
          price: 'Sur devis',
          image: '/images/port-crane.jpg',
          features: ['FCL/LCL', 'Suivi en temps réel', 'Assurance cargo', 'Documentation complète']
        },
        {
          name: 'Solutions d\'Entreposage',
          category: 'Logistique',
          description: 'Services d\'entreposage sécurisés et optimisés pour tous types de marchandises.',
          price: 'Sur devis',
          image: '/images/navigation-system.jpg',
          features: ['Gestion des stocks', 'Préparation de commandes', 'Distribution', 'Sécurité 24/7']
        }
      ],
      services: [
        {
          title: 'Conseil en Chaîne d\'Approvisionnement',
          description: 'Optimisation des processus logistiques pour réduire les coûts et les délais.',
          icon: '💡',
          duration: 'Variable',
          price: 'Sur devis'
        },
        {
          title: 'Dédouanement',
          description: 'Gestion complète des formalités douanières pour une importation/exportation fluide.',
          icon: '📄',
          duration: 'Rapide',
          price: 'Sur devis'
        }
      ],
      achievements: [
        'Plus de 1000 clients satisfaits à travers le monde',
        'Réduction moyenne de 15% des coûts logistiques pour nos clients',
        'Certifié AEO (Opérateur Économique Agréé)',
        'Prix de l\'Excellence Logistique 2022'
      ],
      projects: [
        {
          name: 'Projet X - Importation de Véhicules',
          description: 'Gestion complète de l\'importation de 500 véhicules depuis l\'Asie.',
          status: 'Terminé',
          completion: '2023',
          budget: '€1.2M',
          image: '/images/port-crane.jpg',
          client: 'AutoCorp'
        }
      ],
      brochures: [
        {
          title: 'Brochure Services Fret',
          description: 'Détails de nos services de transport maritime et aérien.',
          type: 'PDF',
          size: '5.5 MB',
          pages: 20,
          language: 'Français/Anglais',
          downloadUrl: '/brochures/fret-services.txt'
        }
      ],
      gallery: [
        { type: 'image', url: '/api/placeholder/400/300', title: 'Navire de Fret' },
        { type: 'image', url: '/api/placeholder/400/300', title: 'Entrepôt Logistique' }
      ],
      news: [
        {
          title: 'Ouverture d\'un nouveau hub logistique à Tanger',
          date: '2024-07-01',
          summary: 'Atlantic Logistics étend sa présence avec un nouveau centre de distribution au Maroc.',
          image: '/api/placeholder/300/200'
        }
      ],
      certifications: [
        { name: 'ISO 9001', description: 'Management de la qualité', year: '2021' }
      ]
    },
    'euromarine-technologies': {
      id: 'euromarine-technologies',
      name: 'EuroMarine Technologies',
      category: 'Technologie',
      icon: '🚢',
      description: 'Innovation technologique pour l\'industrie maritime européenne.',
      fullDescription: 'EuroMarine Technologies est un leader européen dans le développement de solutions technologiques avancées pour l\'industrie maritime. Depuis 2005, nous concevons et déployons des systèmes de navigation, équipements de sécurité et solutions digitales qui transforment les opérations maritimes.',
      location: 'Marseille, France',
      phone: '+33 4 91 XX XX XX',
      email: 'contact@euromarine-tech.fr',
      website: 'www.euromarine-tech.fr',
      specialties: ['Navigation', 'Sécurité', 'Digital'],
      rating: 4.9,
      employees: '100-200',
      founded: '2005',
      logo: '/images/euromarine-logo.png',
      coverImage: '/images/siports-hero.jpg',
      standNumber: 'B-45',
      pavilion: 'Pavillon Technologie',
      products: [
        {
          name: 'NaviPro Advanced',
          category: 'Navigation',
          description: 'Système de navigation maritime de nouvelle génération avec IA intégrée',
          price: 'Sur devis',
          image: '/api/placeholder/400/300',
          features: ['GPS haute précision', 'Radar intégré', 'Interface tactile', 'Alertes automatiques']
        },
        {
          name: 'SecureMarine Suite',
          category: 'Sécurité',
          description: 'Suite complète d\'équipements de sécurité maritime',
          price: '€35,000',
          image: '/api/placeholder/400/300',
          features: ['Détection d\'intrusion', 'Surveillance 24/7', 'Alertes en temps réel', 'Intégration satellite']
        }
      ],
      services: [
        {
          title: 'Installation & Configuration',
          description: 'Installation complète et configuration de nos systèmes',
          icon: '🔧',
          duration: '1-2 mois',
          price: 'À partir de €10,000'
        },
        {
          title: 'Maintenance Maritime',
          description: 'Maintenance préventive et corrective de tous nos équipements',
          icon: '🛠️',
          duration: 'Continu',
          price: 'À partir de €5,000/an'
        }
      ],
      achievements: [
        'Plus de 200 navires équipés en Europe',
        'Certification CE pour tous nos produits',
        'Partenaire officiel des garde-côtes français',
        'Prix Innovation Maritime 2023'
      ],
      projects: [
        {
          name: 'Flotte CMA CGM',
          description: 'Équipement de 50 navires avec nos systèmes de navigation',
          status: 'En cours',
          completion: '2025',
          budget: '€15M',
          image: '/api/placeholder/400/300',
          client: 'CMA CGM Group'
        }
      ],
      brochures: [
        {
          title: 'Catalogue Navigation 2024',
          description: 'Catalogue complet de nos systèmes de navigation',
          type: 'PDF',
          size: '12.5 MB',
          pages: 64,
          language: 'Français/Anglais',
          downloadUrl: '#'
        }
      ],
      gallery: [
        { type: 'image', url: '/api/placeholder/400/300', title: 'Système de Navigation' },
        { type: 'image', url: '/api/placeholder/400/300', title: 'Équipements de Sécurité' }
      ],
      news: [
        {
          title: 'Nouveau partenariat avec les garde-côtes',
          date: '2024-06-15',
          summary: 'EuroMarine Technologies signe un contrat majeur avec les garde-côtes français.',
          image: '/api/placeholder/300/200'
        }
      ],
      certifications: [
        { name: 'CE Marking', description: 'Conformité européenne', year: '2023' },
        { name: 'ISO 9001', description: 'Management de la qualité', year: '2022' }
      ]
    },
    'maritime-solutions': {
      id: 'maritime-solutions',
      name: 'Maritime Solutions',
      category: 'Équipement lourd',
      icon: '⚙️',
      description: 'Spécialisés dans les solutions portuaires innovantes depuis plus de 20 ans.',
      fullDescription: 'Maritime Solutions est une entreprise marocaine leader dans les solutions portuaires innovantes. Depuis plus de 20 ans, nous développons et déployons des équipements automatisés, systèmes IoT et solutions de gestion portuaire qui optimisent les opérations des ports modernes.',
      location: 'Casablanca, Maroc',
      phone: '+212 522 XX XX XX',
      email: 'contact@maritime-solutions.com',
      website: 'www.maritime-solutions.com',
      specialties: ['Automatisation', 'IoT', 'Gestion portuaire'],
      rating: 4.8,
      employees: '50-100',
      founded: '2003',
      logo: '/images/maritime-solutions-logo.png',
      coverImage: '/images/siports-hero.jpg',
      standNumber: 'C-78',
      pavilion: 'Pavillon Équipements',
      products: [
        {
          name: 'AutoCrane Pro',
          category: 'Automatisation',
          description: 'Grues portuaires entièrement automatisées avec IA',
          price: '€2,500,000',
          image: '/api/placeholder/400/300',
          features: ['Automatisation complète', 'IA prédictive', 'Maintenance préventive', 'Interface intuitive']
        },
        {
          name: 'PortIoT Network',
          category: 'IoT',
          description: 'Réseau de capteurs IoT pour surveillance portuaire',
          price: '€150,000',
          image: '/api/placeholder/400/300',
          features: ['Capteurs multi-usage', 'Connectivité 5G', 'Dashboard temps réel', 'Alertes automatiques']
        }
      ],
      services: [
        {
          title: 'Consulting Portuaire',
          description: 'Conseil en optimisation des opérations portuaires',
          icon: '🎯',
          duration: '2-4 mois',
          price: 'À partir de €20,000'
        },
        {
          title: 'Formation Technique',
          description: 'Formation des équipes sur nos équipements',
          icon: '🎓',
          duration: '1-2 semaines',
          price: 'À partir de €3,000'
        }
      ],
      achievements: [
        'Plus de 15 ports équipés au Maroc',
        'Réduction de 40% des temps de manutention',
        'Certification ISO 14001 environnementale',
        'Partenaire officiel de l\'ANP Maroc'
      ],
      projects: [
        {
          name: 'Port de Casablanca',
          description: 'Modernisation complète du terminal conteneurs',
          status: 'Terminé',
          completion: '2024',
          budget: '€25M',
          image: '/api/placeholder/400/300',
          client: 'ANP - Agence Nationale des Ports'
        }
      ],
      brochures: [
        {
          title: 'Solutions Portuaires 2024',
          description: 'Catalogue de nos équipements et services portuaires',
          type: 'PDF',
          size: '18.2 MB',
          pages: 96,
          language: 'Français/Arabe',
          downloadUrl: '#'
        }
      ],
      gallery: [
        { type: 'image', url: '/api/placeholder/400/300', title: 'Grues Automatisées' },
        { type: 'image', url: '/api/placeholder/400/300', title: 'Capteurs IoT' }
      ],
      news: [
        {
          title: 'Expansion vers l\'Afrique de l\'Ouest',
          date: '2024-05-20',
          summary: 'Maritime Solutions annonce son expansion vers les ports de l\'Afrique de l\'Ouest.',
          image: '/api/placeholder/300/200'
        }
      ],
      certifications: [
        { name: 'ISO 9001', description: 'Management de la qualité', year: '2023' },
        { name: 'ISO 14001', description: 'Management environnemental', year: '2023' }
      ]
    },
    'nordic-port-equipment': {
      id: 'nordic-port-equipment',
      name: 'Nordic Port Equipment',
      category: 'Équipement lourd',
      icon: '🏗️',
      description: 'Fabricant d\'équipements portuaires de haute qualité.',
      fullDescription: 'Nordic Port Equipment est un fabricant européen de premier plan d\'équipements portuaires de haute qualité. Basée à Rotterdam, l\'entreprise conçoit et fabrique des grues portuaires, équipements de manutention et systèmes automatisés pour les ports du monde entier depuis plus de 30 ans.',
      location: 'Rotterdam, Pays-Bas',
      phone: '+31 10 XXX XX XX',
      email: 'info@nordic-port.nl',
      website: 'www.nordic-port.nl',
      specialties: ['Équipements lourds', 'Automatisation', 'Maintenance'],
      rating: 4.7,
      employees: '100-200',
      founded: '1992',
      logo: '/images/nordic-port-logo.png',
      coverImage: '/images/siports-hero.jpg',
      standNumber: 'A-12',
      pavilion: 'Pavillon Équipements',
      products: [
        {
          name: 'MegaCrane 5000',
          category: 'Grues',
          description: 'Grue portuaire de très haute capacité pour conteneurs',
          price: '€8,500,000',
          image: '/api/placeholder/400/300',
          features: ['Capacité 65 tonnes', 'Portée 70m', 'Automatisation avancée', 'Efficacité énergétique']
        },
        {
          name: 'AutoStacker Pro',
          category: 'Manutention',
          description: 'Système automatisé de stockage de conteneurs',
          price: '€3,200,000',
          image: '/api/placeholder/400/300',
          features: ['Stockage automatisé', 'Optimisation espace', 'Interface intelligente', 'Maintenance prédictive']
        }
      ],
      services: [
        {
          title: 'Installation Clé en Main',
          description: 'Installation complète et mise en service de nos équipements',
          icon: '🔧',
          duration: '6-12 mois',
          price: 'Inclus dans l\'équipement'
        },
        {
          title: 'Contrat de Maintenance',
          description: 'Maintenance préventive et corrective avec garantie de disponibilité',
          icon: '🛠️',
          duration: '5-10 ans',
          price: '8-12% de la valeur équipement/an'
        }
      ],
      achievements: [
        'Plus de 500 grues installées mondialement',
        'Présence dans 45 pays',
        'Certification CE et ISO 9001',
        'Leader européen des équipements portuaires',
        '99.2% de disponibilité moyenne des équipements'
      ],
      projects: [
        {
          name: 'Port de Rotterdam - Terminal APM',
          description: 'Installation de 12 grues automatisées MegaCrane',
          status: 'En cours',
          completion: '2025',
          budget: '€95M',
          image: '/api/placeholder/400/300',
          client: 'APM Terminals Rotterdam'
        }
      ],
      brochures: [
        {
          title: 'Équipements Portuaires 2024',
          description: 'Catalogue complet de nos grues et équipements de manutention',
          type: 'PDF',
          size: '25.8 MB',
          pages: 128,
          language: 'Anglais/Néerlandais/Français',
          downloadUrl: '#'
        }
      ],
      gallery: [
        { type: 'image', url: '/api/placeholder/400/300', title: 'MegaCrane en Action' },
        { type: 'image', url: '/api/placeholder/400/300', title: 'Centre de Production' }
      ],
      news: [
        {
          title: 'Nouveau record de capacité avec MegaCrane 6000',
          date: '2024-04-10',
          summary: 'Nordic Port Equipment annonce le développement de sa nouvelle grue de 80 tonnes.',
          image: '/api/placeholder/300/200'
        }
      ],
      certifications: [
        { name: 'CE Marking', description: 'Conformité européenne', year: '2024' },
        { name: 'ISO 9001', description: 'Management de la qualité', year: '2023' }
      ]
    },
    'port-authority-tangier': {
      id: 'port-authority-tangier',
      name: 'Port Authority of Tangier',
      category: 'Services',
      icon: '🏛️',
      description: 'Autorité portuaire leader dans la gestion des infrastructures maritimes.',
      fullDescription: 'L\'Autorité Portuaire de Tanger est l\'organisme public responsable de la gestion et du développement du complexe portuaire de Tanger Med, l\'un des plus grands ports de conteneurs en Méditerranée et en Afrique. Avec plus de 200 employés, nous gérons les infrastructures, la logistique et la sécurité maritime.',
      location: 'Tanger, Maroc',
      phone: '+212 539 XX XX XX',
      email: 'contact@port-tangier.ma',
      website: 'www.port-tangier.ma',
      specialties: ['Infrastructure', 'Logistique', 'Sécurité'],
      rating: 4.6,
      employees: '200+',
      founded: '2007',
      logo: '/images/port-tangier-logo.png',
      coverImage: '/images/siports-hero.jpg',
      standNumber: 'D-25',
      pavilion: 'Pavillon Institutionnel',
      products: [
        {
          name: 'Services Portuaires Intégrés',
          category: 'Services',
          description: 'Gamme complète de services portuaires et logistiques',
          price: 'Selon tarification',
          image: '/api/placeholder/400/300',
          features: ['Manutention conteneurs', 'Stockage sécurisé', 'Services douaniers', 'Logistique intégrée']
        },
        {
          name: 'Plateforme Digitale PortNet',
          category: 'Digital',
          description: 'Plateforme numérique pour toutes les formalités portuaires',
          price: 'Gratuit',
          image: '/api/placeholder/400/300',
          features: ['Dématérialisation', 'Suivi temps réel', 'Interface unique', 'Intégration douanes']
        }
      ],
      services: [
        {
          title: 'Gestion Portuaire',
          description: 'Gestion complète des opérations portuaires et terminaux',
          icon: '🏗️',
          duration: 'Continu',
          price: 'Selon tarification officielle'
        },
        {
          title: 'Services Logistiques',
          description: 'Services de logistique et distribution pour l\'import/export',
          icon: '📦',
          duration: 'À la demande',
          price: 'Selon volume et destination'
        }
      ],
      achievements: [
        '1er port en Méditerranée par capacité',
        'Plus de 5 millions de conteneurs/an',
        'Connexion avec 186 ports mondiaux',
        'Zone franche de 2000 hectares',
        'Certification ISO 14001 environnementale'
      ],
      projects: [
        {
          name: 'Extension Tanger Med 3',
          description: 'Nouvelle extension portuaire pour doubler la capacité',
          status: 'En cours',
          completion: '2026',
          budget: '€1.5B',
          image: '/api/placeholder/400/300',
          client: 'Royaume du Maroc'
        }
      ],
      brochures: [
        {
          title: 'Guide des Services Portuaires',
          description: 'Guide complet des services et tarifications du port',
          type: 'PDF',
          size: '8.5 MB',
          pages: 45,
          language: 'Français/Arabe/Anglais',
          downloadUrl: '#'
        }
      ],
      gallery: [
        { type: 'image', url: '/api/placeholder/400/300', title: 'Vue Aérienne du Port' },
        { type: 'image', url: '/api/placeholder/400/300', title: 'Terminal Conteneurs' }
      ],
      news: [
        {
          title: 'Record historique de trafic en 2024',
          date: '2024-03-15',
          summary: 'Le port de Tanger Med bat un nouveau record avec 6.2 millions de conteneurs traités.',
          image: '/api/placeholder/300/200'
        }
      ],
      certifications: [
        { name: 'ISO 9001', description: 'Management de la qualité', year: '2023' },
        { name: 'ISO 14001', description: 'Management environnemental', year: '2024' }
      ]
    }
  };

  const exhibitor = exhibitors[id];

  if (!exhibitor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Exposant non trouvé</h1>
          <Button onClick={() => navigate('/exposants')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux exposants
          </Button>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: 'accueil', label: 'Accueil', icon: Home },
    { id: 'apropos', label: 'À propos', icon: Info },
    { id: 'produits', label: 'Produits', icon: Package },
    { id: 'services', label: 'Services', icon: Zap },
    { id: 'projets', label: 'Projets', icon: FolderOpen },
    { id: 'brochures', label: 'Brochures', icon: Download },
    { id: 'contact', label: 'Contact', icon: MessageCircle }
  ];

  const renderAccueil = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-96 rounded-lg overflow-hidden">
        <img 
          src={exhibitor.coverImage} 
          alt={exhibitor.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/60 flex items-center">
          <div className="max-w-4xl mx-auto px-8 text-white">
            <div className="flex items-center space-x-6 mb-6">
              <div className="text-6xl">{exhibitor.icon}</div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{exhibitor.name}</h1>
                <p className="text-xl text-blue-100 mb-4">{exhibitor.description}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {exhibitor.pavilion}
                  </Badge>
                  <span>Stand {exhibitor.standNumber}</span>
                </div>
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
            <div className="text-2xl font-bold text-gray-900">{exhibitor.employees}</div>
            <div className="text-sm text-gray-600">Employés</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{exhibitor.founded}</div>
            <div className="text-sm text-gray-600">Année de création</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Package className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{exhibitor.products.length}</div>
            <div className="text-sm text-gray-600">Produits</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{exhibitor.rating}/5</div>
            <div className="text-sm text-gray-600">Note moyenne</div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Products */}
      <Card>
        <CardHeader>
          <CardTitle>Produits Phares</CardTitle>
          <CardDescription>Découvrez nos solutions les plus populaires</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exhibitor.products.slice(0, 2).map((product, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <Badge variant="outline">{product.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-blue-600">{product.price}</span>
                    <Button size="sm" variant="outline">Voir détails</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Latest News */}
      <Card>
        <CardHeader>
          <CardTitle>Actualités récentes</CardTitle>
          <CardDescription>Dernières nouvelles et annonces</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {exhibitor.news.map((news, index) => (
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
              {exhibitor.fullDescription}
            </p>
            <p className="text-gray-600 leading-relaxed">
              Depuis sa création en {exhibitor.founded}, l\'entreprise n\'a cessé de croître et d\'innover 
              pour répondre aux défis technologiques du secteur maritime moderne. Avec plus de {exhibitor.employees} employés 
              dévoués, nous continuons à façonner l\'avenir de la technologie maritime.
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
            {exhibitor.achievements.map((achievement, index) => (
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
          <CardTitle>Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exhibitor.certifications.map((cert, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                <Shield className="w-8 h-8 text-green-600" />
                <div>
                  <div className="font-semibold text-gray-900">{cert.name}</div>
                  <div className="text-sm text-gray-600">{cert.description}</div>
                  <div className="text-xs text-gray-500">Obtenu en {cert.year}</div>
                </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exhibitor.gallery.map((item, index) => (
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

  const renderProduits = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Produits</h2>
        <p className="text-lg text-gray-600">
          Découvrez notre gamme complète de solutions technologiques
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {exhibitor.products.map((product, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge variant="secondary">{product.category}</Badge>
              </div>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <span className="text-lg font-bold text-blue-600">{product.price}</span>
              </div>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Fonctionnalités clés :</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Demander un devis
                  </Button>
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Démo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Services</h2>
        <p className="text-lg text-gray-600">
          Services complets d'accompagnement et de support
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exhibitor.services.map((service, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="text-4xl">{service.icon}</div>
                <div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Durée :</span>
                  <span className="font-medium">{service.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Prix :</span>
                  <span className="font-medium">{service.price}</span>
                </div>
                <Button className="w-full mt-4">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Demander des informations
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProjets = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Projets</h2>
        <p className="text-lg text-gray-600">
          Découvrez nos réalisations et projets en cours
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {exhibitor.projects.map((project, index) => (
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
                  <span>Client:</span>
                  <span className="font-medium">{project.client}</span>
                </div>
                <div className="flex justify-between">
                  <span>Achèvement:</span>
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
          Téléchargez nos catalogues, études de cas et documentation technique
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exhibitor.brochures.map((brochure, index) => (
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
          <CardTitle className="text-blue-900">Besoin d'informations techniques ?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-800 mb-4">
            Notre équipe technique est disponible pour répondre à toutes vos questions 
            et vous fournir des informations détaillées sur nos produits.
          </p>
          <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
            <Mail className="w-4 h-4 mr-2" />
            Contacter l'équipe technique
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
          Rencontrez-nous sur notre stand ou contactez-nous directement
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
                <Building className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Stand</div>
                <div className="text-gray-600">{exhibitor.standNumber} - {exhibitor.pavilion}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Téléphone</div>
                <div className="text-gray-600">{exhibitor.phone}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Email</div>
                <div className="text-gray-600">{exhibitor.email}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Globe className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Site Web</div>
                <div className="text-gray-600">{exhibitor.website}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <MapPin className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Siège Social</div>
                <div className="text-gray-600">{exhibitor.location}</div>
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
              <Building className="w-5 h-5 mr-3" />
              Visiter notre stand
              <Badge variant="secondary" className="ml-auto">{exhibitor.standNumber}</Badge>
            </Button>
            
            <Button className="w-full justify-start" variant="outline" size="lg">
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

      {/* Specialties */}
      <Card>
        <CardHeader>
          <CardTitle>Domaines d'Expertise</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {exhibitor.specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {specialty}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'accueil': return renderAccueil();
      case 'apropos': return renderApropos();
      case 'produits': return renderProduits();
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
              onClick={() => navigate('/exposants')}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux exposants
            </Button>
            
            <div className="flex items-center space-x-4">
              <img src={exhibitor.logo} alt={exhibitor.name} className="h-8" />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{exhibitor.name}</h1>
                <p className="text-sm text-gray-500">{exhibitor.category} • Stand {exhibitor.standNumber}</p>
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

export default ExhibitorMiniSite;

