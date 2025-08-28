import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  MapPin, 
  Globe, 
  Mail, 
  Phone,
  Star,
  Calendar,
  MessageCircle,
  Share2,
  Download,
  Building,
  Award,
  Package,
  Users,
  ExternalLink,
  Play,
  Image as ImageIcon,
  FileText,
  Send,
  Heart,
  Bookmark,
  Eye,
  Target,
  Zap,
  Shield,
  Truck,
  Settings,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  Quote
} from 'lucide-react';

const ExhibitorMiniSitePro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exhibitor, setExhibitor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Données mini-site style siportevent.com
    const miniSiteData = {
      id: parseInt(id),
      name: 'Maritime Solutions International',
      domain: 'maritime-solutions.siports.com',
      
      // Configuration du site
      siteConfig: {
        primaryColor: '#1e40af',
        secondaryColor: '#3b82f6',
        accentColor: '#fbbf24',
        logo: '/images/msi-logo.png',
        favicon: '/images/msi-favicon.ico'
      },

      // Header/Navigation
      navigation: [
        { label: 'Accueil', href: '#hero', id: 'hero' },
        { label: 'À Propos', href: '#about', id: 'about' },
        { label: 'Solutions', href: '#solutions', id: 'solutions' },
        { label: 'Références', href: '#references', id: 'references' },
        { label: 'Actualités', href: '#news', id: 'news' },
        { label: 'Contact', href: '#contact', id: 'contact' }
      ],

      // Hero Section - Style SIPORTS
      hero: {
        title: 'Maritime Solutions International',
        subtitle: 'Leader mondial des solutions portuaires intelligentes',
        description: 'Nous transformons les ports du monde entier avec nos technologies innovantes et notre expertise de 20 ans dans l\'industrie maritime.',
        backgroundVideo: '/videos/port-automation.mp4',
        backgroundImage: '/images/hero-port-casablanca.jpg',
        ctaButtons: [
          { label: 'Découvrir nos solutions', action: 'scroll-to-solutions', variant: 'primary' },
          { label: 'Nous contacter', action: 'open-contact', variant: 'secondary' }
        ],
        stats: [
          { number: '50+', label: 'Ports équipés', icon: Building },
          { number: '25', label: 'Pays présents', icon: MapPin },
          { number: '98%', label: 'Satisfaction', icon: Star },
          { number: '20ans', label: 'Expérience', icon: Award }
        ]
      },

      // Section À propos
      about: {
        title: 'Une expertise maritime reconnue mondialement',
        subtitle: 'Depuis 2003, nous façonnons l\'avenir des infrastructures portuaires',
        content: `Maritime Solutions International est née d'une vision : révolutionner l'industrie maritime grâce aux technologies les plus avancées. Basés à Casablanca avec des bureaux dans 25 pays, nous avons accompagné plus de 50 ports dans leur transformation digitale.

Notre approche unique combine expertise technique locale et standards internationaux les plus exigeants. Chaque projet est une opportunité de repousser les limites de l'innovation portuaire.`,
        
        highlights: [
          {
            icon: Zap,
            title: 'Innovation Continue',
            description: 'R&D permanente avec 15% de notre CA investi dans l\'innovation'
          },
          {
            icon: Shield,
            title: 'Sécurité Maximale',
            description: 'Certifications ISO 9001, 14001, 45001 et conformité CE'
          },
          {
            icon: Target,
            title: 'Résultats Mesurés',
            description: 'ROI moyen de 300% sur nos solutions d\'automatisation'
          },
          {
            icon: Users,
            title: 'Équipe d\'Experts',
            description: '150+ ingénieurs spécialisés dans 25 pays'
          }
        ],

        timeline: [
          { year: '2003', milestone: 'Création de l\'entreprise à Casablanca' },
          { year: '2007', milestone: 'Premier port automatisé au Maroc' },
          { year: '2012', milestone: 'Expansion internationale - 10 pays' },
          { year: '2018', milestone: 'Lancement de la plateforme PortOS' },
          { year: '2023', milestone: '50ème port équipé - Leader africain' },
          { year: '2024', milestone: 'SmartCrane Pro 2.0 - IA intégrée' }
        ]
      },

      // Solutions
      solutions: {
        title: 'Nos Solutions Technologiques',
        subtitle: 'Une gamme complète pour transformer votre port',
        categories: [
          {
            name: 'Équipements Automatisés',
            description: 'Grues intelligentes et systèmes robotisés',
            icon: Settings,
            color: 'blue'
          },
          {
            name: 'Logiciels de Gestion',
            description: 'Plateformes IoT et intelligence artificielle',
            icon: BarChart3,
            color: 'green'
          },
          {
            name: 'Solutions Durables',
            description: 'Technologies éco-responsables et énergies renouvelables',
            icon: Shield,
            color: 'yellow'
          }
        ],

        products: [
          {
            id: 1,
            name: 'SmartCrane Pro 2.0',
            category: 'Équipements Automatisés',
            tagline: 'L\'avenir de la manutention portuaire',
            description: 'Grues portuaires entièrement automatisées avec intelligence artificielle intégrée pour une efficacité optimale.',
            image: '/images/smartcrane-hero.jpg',
            features: [
              'IA prédictive avancée',
              'Réduction de 40% des temps d\'arrêt',
              'Contrôle à distance 24/7',
              'Maintenance préventive automatique',
              'Interface utilisateur intuitive',
              'Compatibilité tous types de navires'
            ],
            specifications: {
              'Capacité de levage': '65 tonnes',
              'Portée': '40 mètres',
              'Vitesse de levage': '120 m/min',
              'Précision': '±2 cm',
              'Consommation': '-60% vs grues standard'
            },
            benefits: [
              '+45% productivité',
              '-35% coûts opérationnels',
              '99.9% disponibilité',
              '0 accident depuis 2020'
            ],
            pricing: 'À partir de 2.5M€',
            deliveryTime: '12-18 mois'
          },
          {
            id: 2,
            name: 'PortOS Intelligence',
            category: 'Logiciels de Gestion',
            tagline: 'Le système nerveux de votre port',
            description: 'Plateforme IoT complète qui orchestre tous les aspects de votre infrastructure portuaire.',
            image: '/images/portos-dashboard.jpg',
            features: [
              'Tableau de bord temps réel',
              'Prédictions IA traffic maritime',
              'Optimisation automatique des ressources',
              'Intégration API multi-systèmes',
              'Reporting avancé personnalisable',
              'Mobile et web responsive'
            ],
            specifications: {
              'Nombre de capteurs': 'Illimité',
              'Fréquence données': '1 seconde',
              'Temps de réponse': '<100ms',
              'Disponibilité': '99.99%',
              'Intégrations': '50+ systèmes'
            },
            benefits: [
              '-25% temps d\'attente navires',
              '+30% utilisation des quais',
              '-50% coûts de maintenance',
              '100% traçabilité'
            ],
            pricing: 'À partir de 50K€/an',
            deliveryTime: '3-6 mois'
          },
          {
            id: 3,
            name: 'GreenPort Solutions',
            category: 'Solutions Durables',
            tagline: 'Ports durables pour un avenir meilleur',
            description: 'Ensemble de technologies éco-responsables pour réduire l\'empreinte carbone portuaire.',
            image: '/images/greenport-solar.jpg',
            features: [
              'Panneaux solaires haute efficacité',
              'Systèmes de stockage d\'énergie',
              'Bornes de recharge électrique',
              'Recyclage des eaux portuaires',
              'Monitoring environnemental',
              'Certification carbone neutralité'
            ],
            specifications: {
              'Production solaire': '5MW peak',
              'Stockage batterie': '10MWh',
              'Réduction CO2': '-60%',
              'ROI moyen': '3 ans',
              'Garantie': '25 ans'
            },
            benefits: [
              '-60% émissions CO2',
              '-40% facture énergétique',
              'Label Port Vert',
              'Conformité réglementaire'
            ],
            pricing: 'Sur devis personnalisé',
            deliveryTime: '6-12 mois'
          }
        ]
      },

      // Références clients
      references: {
        title: 'Ils Nous Font Confiance',
        subtitle: 'Plus de 50 ports équipés dans 25 pays',
        
        featuredClients: [
          {
            name: 'Tanger Med Port Authority',
            logo: '/images/client-tanger-med.png',
            country: 'Maroc',
            project: 'Automatisation complète Terminal 1',
            year: '2023',
            investment: '25M€',
            results: [
              '+35% efficacité opérationnelle',
              '-28% temps d\'escale',
              '99.8% disponibilité système'
            ],
            testimonial: {
              quote: "Maritime Solutions a transformé notre terminal avec une solution sur-mesure qui a dépassé toutes nos attentes. L'automatisation SmartCrane a révolutionné nos opérations.",
              author: "Mohammed El Kettani",
              position: "Directeur Général, Tanger Med"
            }
          },
          {
            name: 'Port de Casablanca',
            logo: '/images/client-casa-port.png',
            country: 'Maroc',
            project: 'Déploiement PortOS Intelligence',
            year: '2022',
            investment: '8M€',
            results: [
              '-25% temps d\'attente navires',
              '+20% throughput containers',
              '100% digitalisation processus'
            ],
            testimonial: {
              quote: "La plateforme PortOS nous a donné une visibilité complète sur nos opérations. Un investissement qui s'est amorti en moins de 2 ans.",
              author: "Aicha Benali",
              position: "Responsable Innovation, Port Casablanca"
            }
          },
          {
            name: 'Marseille Fos Port',
            logo: '/images/client-marseille.png',
            country: 'France',
            project: 'GreenPort Solutions - Transition énergétique',
            year: '2023',
            investment: '15M€',
            results: [
              '-60% émissions CO2',
              'Certification Port Vert',
              '3 ans ROI énergétique'
            ],
            testimonial: {
              quote: "Grâce à GreenPort Solutions, nous sommes devenus le premier port méditerranéen neutre en carbone. Un exemple pour toute l'industrie.",
              author: "Jean-Claude Martin",
              position: "Directeur Développement Durable, Marseille Fos"
            }
          }
        ],

        clientLogos: [
          'Port Autonome Dakar', 'Lagos Port Complex', 'Port Said Container Terminal',
          'Durban Container Terminal', 'Port de Tunis', 'Agadir Port Authority',
          'Jebel Ali Port', 'Port Kelang Malaysia', 'Barcelona Port Authority',
          'Hamburg Port Authority', 'Rotterdam Port Authority', 'Antwerp Port'
        ]
      },

      // Actualités
      news: {
        title: 'Actualités & Innovation',
        subtitle: 'Restez informé de nos dernières réalisations',
        
        featured: {
          title: 'Maritime Solutions remporte le plus grand contrat portuaire africain',
          date: '15 Décembre 2024',
          category: 'Contrats',
          excerpt: 'Signature d\'un contrat de 75M€ avec l\'Autorité Portuaire du Lagos pour l\'automatisation complète du plus grand port d\'Afrique de l\'Ouest.',
          image: '/images/news-lagos-contract.jpg',
          content: `Maritime Solutions International franchit une étape historique avec la signature du plus grand contrat portuaire jamais attribué en Afrique. Le projet d'automatisation du Port de Lagos, d'un montant de 75 millions d'euros, transformera radicalement les opérations du plus grand port d'Afrique de l'Ouest.

Ce contrat inclut l'installation de 12 grues SmartCrane Pro 2.0, le déploiement de la plateforme PortOS Intelligence sur l'ensemble du terminal, et la mise en œuvre de solutions GreenPort pour une réduction de 50% des émissions carbone.

"Ce projet illustre parfaitement notre capacité à mener des transformations portuaires à grande échelle," déclare Ahmed Benali, CEO de Maritime Solutions. "Lagos Port deviendra une référence mondiale pour l'efficacité et la durabilité portuaire."

Le projet, qui s'échelonnera sur 36 mois, créera plus de 500 emplois locaux et positionnera le Nigeria comme hub logistique majeur pour l'Afrique de l'Ouest.`
        },

        articles: [
          {
            id: 1,
            title: 'SmartCrane Pro 2.0 : L\'IA au service de la manutention',
            date: '03 Décembre 2024',
            category: 'Innovation',
            excerpt: 'Découvrez comment notre nouvelle génération de grues intelligentes révolutionne l\'efficacité portuaire.',
            image: '/images/news-smartcrane-2.jpg'
          },
          {
            id: 2,
            title: 'Partenariat stratégique avec TechnipFMC',
            date: '28 Novembre 2024',
            category: 'Partenariats',
            excerpt: 'Alliance technologique pour développer les ports offshore du futur en Afrique de l\'Ouest.',
            image: '/images/news-technipfmc.jpg'
          },
          {
            id: 3,
            title: 'Prix de l\'Innovation Maritime 2024',
            date: '15 Novembre 2024',
            category: 'Récompenses',
            excerpt: 'Maritime Solutions récompensée au Salon Maritime de Monaco pour PortOS Intelligence.',
            image: '/images/news-award-monaco.jpg'
          },
          {
            id: 4,
            title: 'Ouverture du Centre R&D de Rabat',
            date: '02 Novembre 2024',
            category: 'Expansion',
            excerpt: 'Nouveau centre de recherche dédié aux technologies portuaires du futur.',
            image: '/images/news-rd-rabat.jpg'
          }
        ]
      },

      // Contact & SIPORTS
      contact: {
        title: 'Rencontrons-nous à SIPORTS 2025',
        subtitle: 'Stand A12 - Hall Innovation',
        
        siportsInfo: {
          standNumber: 'A12',
          hallLocation: 'Hall 1 - Zone Innovation',
          packageType: 'Platinum Sponsor',
          standSize: '40m²',
          presentations: [
            {
              title: 'L\'Avenir des Ports Intelligents',
              date: '15 Mars 2025',
              time: '14h30 - 15h15',
              room: 'Auditorium Principal',
              speaker: 'Ahmed Benali, CEO'
            },
            {
              title: 'ROI des Solutions d\'Automatisation Portuaire',
              date: '16 Mars 2025',
              time: '10h00 - 10h45',
              room: 'Salle Innovation',
              speaker: 'Sarah Martinez, CTO'
            }
          ],
          
          specialOffers: [
            'Démonstration live SmartCrane Pro 2.0',
            'Audit gratuit de votre infrastructure',
            '20% réduction sur première installation',
            'Formation gratuite équipe technique'
          ]
        },

        teamOnSite: [
          {
            name: 'Ahmed Benali',
            position: 'CEO & Fondateur',
            expertise: 'Stratégie et vision portuaire',
            email: 'a.benali@maritime-solutions.ma',
            phone: '+212 522 123 456',
            image: '/images/team-ahmed-benali.jpg',
            availability: 'Tous les jours 9h-18h'
          },
          {
            name: 'Fatima Zahra Idrissi',
            position: 'Directrice Commerciale',
            expertise: 'Solutions sur-mesure',
            email: 'f.idrissi@maritime-solutions.ma',
            phone: '+212 522 123 457',
            image: '/images/team-fatima-idrissi.jpg',
            availability: 'Tous les jours 9h-18h'
          },
          {
            name: 'Omar Alaoui',
            position: 'VP International',
            expertise: 'Expansion et partenariats',
            email: 'o.alaoui@maritime-solutions.ma',
            phone: '+212 522 123 458',
            image: '/images/team-omar-alaoui.jpg',
            availability: 'Sur rendez-vous'
          }
        ],

        companyInfo: {
          headquarters: {
            address: 'Marina de Casablanca, Boulevard de la Corniche, 20000 Casablanca, Maroc',
            phone: '+212 522 123 456',
            email: 'contact@maritime-solutions.ma',
            website: 'www.maritime-solutions.ma'
          },
          
          offices: [
            { city: 'Paris', country: 'France', phone: '+33 1 42 86 93 76' },
            { city: 'Dubai', country: 'UAE', phone: '+971 4 399 9999' },
            { city: 'Lagos', country: 'Nigeria', phone: '+234 1 271 2345' },
            { city: 'Barcelone', country: 'Espagne', phone: '+34 93 123 4567' }
          ]
        }
      },

      // Footer
      footer: {
        socialLinks: [
          { platform: 'LinkedIn', url: 'https://linkedin.com/company/maritime-solutions-intl' },
          { platform: 'Twitter', url: 'https://twitter.com/MaritimeSolIntl' },
          { platform: 'YouTube', url: 'https://youtube.com/c/MaritimeSolutionsIntl' }
        ],
        
        certifications: [
          'ISO 9001:2015', 'ISO 14001:2015', 'ISO 45001:2018', 'CE Marking'
        ],
        
        legalLinks: [
          { label: 'Mentions légales', url: '#legal' },
          { label: 'Politique de confidentialité', url: '#privacy' },
          { label: 'Conditions d\'utilisation', url: '#terms' },
          { label: 'Cookies', url: '#cookies' }
        ]
      }
    };

    setExhibitor(miniSiteData);
    setLoading(false);
  }, [id]);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'solutions', 'references', 'news', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Chargement du mini-site...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Header - Style SIPORTS */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Company Name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-900">{exhibitor?.name}</div>
                <div className="text-xs text-blue-600">{exhibitor?.domain}</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {exhibitor?.navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    currentSection === item.id
                      ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Brochure
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              {exhibitor?.navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 bg-[url('/images/maritime-pattern.svg')] opacity-5"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                {exhibitor?.hero.title}
              </h1>
              
              <p className="text-2xl text-blue-100 mb-6">
                {exhibitor?.hero.subtitle}
              </p>
              
              <p className="text-lg text-blue-200 mb-8 leading-relaxed">
                {exhibitor?.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-900 hover:bg-blue-50"
                  onClick={() => scrollToSection('solutions')}
                >
                  <Package className="w-5 h-5 mr-2" />
                  Découvrir nos solutions
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-blue-900"
                  onClick={() => scrollToSection('contact')}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Nous contacter
                </Button>
              </div>

              {/* Stats - Style SIPORTS */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {exhibitor?.hero.stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <Icon className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{stat.number}</div>
                      <div className="text-sm text-blue-200">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-8 flex items-center justify-center">
                <div className="text-center text-white">
                  <Building className="w-24 h-24 mx-auto mb-4 text-blue-200" />
                  <h3 className="text-xl font-semibold mb-2">Mini-Site Premium</h3>
                  <p className="text-blue-200">Découvrez notre univers maritime</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {exhibitor?.about.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {exhibitor?.about.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="prose prose-lg">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {exhibitor?.about.content}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {exhibitor?.about.highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{highlight.title}</h4>
                      <p className="text-gray-600">{highlight.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-center mb-12">Notre Histoire</h3>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
              <div className="space-y-8">
                {exhibitor?.about.timeline.map((item, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-blue-600 mb-1">{item.year}</div>
                        <p className="text-gray-700">{item.milestone}</p>
                      </div>
                    </div>
                    <div className="w-4 h-4 bg-blue-600 rounded-full absolute left-1/2 transform -translate-x-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {exhibitor?.solutions.title}
            </h2>
            <p className="text-xl text-gray-600">
              {exhibitor?.solutions.subtitle}
            </p>
          </div>

          {/* Categories */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {exhibitor?.solutions.categories.map((category, index) => {
              const Icon = category.icon;
              const colorClasses = {
                blue: 'bg-blue-100 text-blue-600',
                green: 'bg-green-100 text-green-600',
                yellow: 'bg-yellow-100 text-yellow-600'
              };
              
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-full ${colorClasses[category.color]} mx-auto mb-4 flex items-center justify-center`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Products */}
          <div className="space-y-16">
            {exhibitor?.solutions.products.map((product, index) => (
              <div key={product.id} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Image */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <Badge className="bg-white/20 text-white mb-2">{product.category}</Badge>
                      <h3 className="text-2xl font-bold">{product.name}</h3>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <Badge variant="outline" className="mb-4">{product.category}</Badge>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-xl text-blue-600 mb-4">{product.tagline}</p>
                  <p className="text-gray-700 mb-6">{product.description}</p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {product.features.slice(0, 6).map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Benefits */}
                  <div className="bg-green-50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-green-800 mb-2">Bénéfices Clés</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {product.benefits.map((benefit, i) => (
                        <div key={i} className="text-sm text-green-700">{benefit}</div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600">Prix indicatif</div>
                      <div className="text-xl font-bold text-gray-900">{product.pricing}</div>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      En savoir plus
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* References Section */}
      <section id="references" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {exhibitor?.references.title}
            </h2>
            <p className="text-xl text-gray-600">
              {exhibitor?.references.subtitle}
            </p>
          </div>

          {/* Featured Clients */}
          <div className="space-y-12 mb-16">
            {exhibitor?.references.featuredClients.map((client, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Client Info */}
                  <div className="lg:col-span-1 p-8 bg-gradient-to-br from-blue-50 to-blue-100">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-4">
                      <Building className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{client.name}</h3>
                    <p className="text-blue-600 mb-4">{client.country}</p>
                    <h4 className="font-semibold mb-2">{client.project}</h4>
                    <div className="text-sm text-gray-600 mb-4">
                      {client.year} • Investissement: {client.investment}
                    </div>
                  </div>

                  {/* Results & Testimonial */}
                  <div className="lg:col-span-2 p-8">
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      {client.results.map((result, i) => (
                        <div key={i} className="bg-green-50 text-green-800 px-3 py-2 rounded-lg text-sm font-medium text-center">
                          {result}
                        </div>
                      ))}
                    </div>

                    <blockquote className="border-l-4 border-blue-500 pl-6">
                      <div className="flex mb-4">
                        <Quote className="w-8 h-8 text-blue-300" />
                      </div>
                      <p className="text-lg text-gray-700 italic mb-4">"{client.testimonial.quote}"</p>
                      <footer className="text-sm">
                        <strong>{client.testimonial.author}</strong>
                        <br />
                        <span className="text-gray-600">{client.testimonial.position}</span>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Client Logos */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-center mb-8">Et bien d'autres...</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {exhibitor?.references.clientLogos.map((logo, index) => (
                <div key={index} className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center p-4">
                  <span className="text-xs text-center text-gray-600 font-medium">{logo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {exhibitor?.news.title}
            </h2>
            <p className="text-xl text-gray-600">
              {exhibitor?.news.subtitle}
            </p>
          </div>

          {/* Featured Article */}
          <Card className="mb-12 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/5">
                <div className="aspect-video md:aspect-square bg-gradient-to-br from-blue-600 to-blue-800"></div>
              </div>
              <div className="md:w-3/5">
                <CardContent className="p-8">
                  <Badge className="bg-red-100 text-red-800 mb-4">{exhibitor?.news.featured.category}</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{exhibitor?.news.featured.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{exhibitor?.news.featured.date}</p>
                  <p className="text-gray-700 mb-6">{exhibitor?.news.featured.excerpt}</p>
                  <Button>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Lire l'article complet
                  </Button>
                </CardContent>
              </div>
            </div>
          </Card>

          {/* Other Articles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {exhibitor?.news.articles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-gray-400 to-gray-600"></div>
                <CardContent className="p-4">
                  <Badge variant="outline" className="text-xs mb-2">{article.category}</Badge>
                  <h4 className="font-semibold text-sm mb-2 line-clamp-2">{article.title}</h4>
                  <p className="text-xs text-gray-500 mb-3">{article.date}</p>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-3">{article.excerpt}</p>
                  <Button variant="outline" size="sm" className="text-xs">
                    Lire plus
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - SIPORTS Focus */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {exhibitor?.contact.title}
            </h2>
            <p className="text-2xl text-blue-100">
              {exhibitor?.contact.subtitle}
            </p>
          </div>

          {/* SIPORTS Info */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-12">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">{exhibitor?.contact.siportsInfo.standNumber}</div>
                  <div className="text-blue-200">Stand</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">{exhibitor?.contact.siportsInfo.standSize}</div>
                  <div className="text-blue-200">Surface</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">{exhibitor?.contact.siportsInfo.packageType.split(' ')[0]}</div>
                  <div className="text-blue-200">Sponsor</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">2</div>
                  <div className="text-blue-200">Présentations</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team & Presentations */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Team on Site */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Notre équipe sur place</h3>
              <div className="space-y-6">
                {exhibitor?.contact.teamOnSite.map((member, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{member.name}</h4>
                          <p className="text-blue-200 text-sm">{member.position}</p>
                        </div>
                      </div>
                      <p className="text-sm text-blue-100 mb-3">{member.expertise}</p>
                      <div className="flex items-center gap-4 text-sm text-blue-200">
                        <span>{member.email}</span>
                        <span>{member.phone}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Presentations */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Nos présentations</h3>
              <div className="space-y-4 mb-8">
                {exhibitor?.contact.siportsInfo.presentations.map((presentation, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-2">{presentation.title}</h4>
                      <div className="text-blue-200 text-sm mb-2">
                        {presentation.speaker}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>{presentation.date} • {presentation.time}</span>
                        <span>{presentation.room}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h4 className="text-xl font-semibold mb-4">Offres spéciales SIPORTS</h4>
              <ul className="space-y-2">
                {exhibitor?.contact.siportsInfo.specialOffers.map((offer, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-blue-100">{offer}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Actions */}
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                <Calendar className="w-5 h-5 mr-2" />
                Planifier un RDV
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                <Download className="w-5 h-5 mr-2" />
                Télécharger notre brochure
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                <MessageCircle className="w-5 h-5 mr-2" />
                Envoyer un message
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-white">{exhibitor?.name}</div>
                  <div className="text-sm text-blue-400">Mini-Site Premium SIPORTS</div>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Leader mondial des solutions portuaires intelligentes depuis 2003.
              </p>
              <div className="flex space-x-4">
                {exhibitor?.footer.socialLinks.map((link, index) => (
                  <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>

            {/* Offices */}
            <div>
              <h4 className="font-semibold text-white mb-4">Nos Bureaux</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <div className="font-medium">Casablanca (Siège)</div>
                  <div className="text-gray-400">+212 522 123 456</div>
                </div>
                {exhibitor?.contact.companyInfo.offices.slice(0, 3).map((office, index) => (
                  <div key={index}>
                    <div className="font-medium">{office.city}</div>
                    <div className="text-gray-400">{office.phone}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h4 className="font-semibold text-white mb-4">Certifications</h4>
              <div className="space-y-2 text-sm">
                {exhibitor?.footer.certifications.map((cert, index) => (
                  <div key={index} className="text-gray-400">{cert}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
              © 2024 {exhibitor?.name}. Tous droits réservés.
            </div>
            <div className="flex space-x-6 text-sm">
              {exhibitor?.footer.legalLinks.map((link, index) => (
                <a key={index} href={link.url} className="text-gray-400 hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Back to SIPORTS Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <Button
          onClick={() => navigate('/exposants')}
          className="bg-white text-blue-900 hover:bg-blue-50 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour SIPORTS
        </Button>
      </div>
    </div>
  );
};

export default ExhibitorMiniSitePro;