import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
  Image,
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
  ArrowRight
} from 'lucide-react';

const ExhibitorProfilePremium = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exhibitor, setExhibitor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    // Données enrichies pour le mini-site premium
    const premiumExhibitor = {
      id: parseInt(id),
      name: 'Maritime Solutions International',
      tagline: 'Pioneering the Future of Smart Ports',
      category: 'Port Equipment & Technology',
      country: 'Morocco',
      city: 'Casablanca',
      established: '2003',
      employees: '150+',
      website: 'www.maritime-solutions.ma',
      email: 'contact@maritime-solutions.ma',
      phone: '+212 522 123 456',
      
      // Hero section
      hero: {
        backgroundImage: '/images/port-hero-bg.jpg',
        logo: '/images/maritime-solutions-logo.png',
        video: '/videos/company-presentation.mp4',
        stats: [
          { value: '20+', label: 'Années d\'expérience' },
          { value: '50+', label: 'Ports équipés' },
          { value: '25', label: 'Pays présents' },
          { value: '98%', label: 'Satisfaction client' }
        ]
      },

      // Description détaillée
      description: 'Leader mondial des solutions portuaires intelligentes, Maritime Solutions International révolutionne l\'industrie maritime grâce à des technologies de pointe et une expertise reconnue mondialement.',
      
      longDescription: `Depuis 2003, Maritime Solutions International s'impose comme le partenaire de référence pour la transformation digitale des infrastructures portuaires. Basés à Casablanca avec des bureaux dans 25 pays, nous combinons expertise locale et standards internationaux.

Notre mission est claire : accompagner les ports du monde entier dans leur transition vers des opérations plus intelligentes, durables et efficaces. Nous croyons fermement que l'innovation technologique est la clé pour relever les défis logistiques du 21ème siècle.`,

      // Vision & Mission
      vision: "Devenir le leader mondial incontesté des solutions portuaires intelligentes d'ici 2030",
      mission: "Transformer les ports en écosystèmes connectés et durables grâce à l'innovation technologique",
      
      // Valeurs
      values: [
        { icon: Zap, title: 'Innovation', description: 'Pionnier des technologies disruptives' },
        { icon: Shield, title: 'Fiabilité', description: 'Solutions robustes et sécurisées' },
        { icon: Target, title: 'Excellence', description: 'Standards de qualité exceptionnels' },
        { icon: Users, title: 'Collaboration', description: 'Partenariats durables et transparents' }
      ],

      // Produits et services
      products: [
        {
          id: 1,
          name: 'SmartCrane Pro',
          category: 'Équipements Automatisés',
          description: 'Grues portuaires entièrement automatisées avec IA intégrée',
          image: '/images/smartcrane-pro.jpg',
          features: [
            'Contrôle autonome par IA',
            'Maintenance prédictive',
            'Réduction de 40% des temps d\'arrêt',
            'Interface tactile intuitive'
          ],
          pricing: 'À partir de 2.5M€',
          deliveryTime: '12-18 mois'
        },
        {
          id: 2,
          name: 'PortOS Intelligence',
          category: 'Logiciels de Gestion',
          description: 'Plateforme IoT complète pour la gestion intelligente des ports',
          image: '/images/portos-intelligence.jpg',
          features: [
            'Surveillance temps réel',
            'Analytics avancés',
            'Intégration multi-systèmes',
            'Reporting automatisé'
          ],
          pricing: 'À partir de 50K€/an',
          deliveryTime: '3-6 mois'
        },
        {
          id: 3,
          name: 'GreenPort Solutions',
          category: 'Technologies Durables',
          description: 'Solutions éco-responsables pour ports du futur',
          image: '/images/greenport-solutions.jpg',
          features: [
            'Réduction 60% émissions CO2',
            'Énergie renouvelable intégrée',
            'Certification ISO 14001',
            'ROI en moins de 3 ans'
          ],
          pricing: 'Sur devis',
          deliveryTime: '6-12 mois'
        }
      ],

      // Services
      services: [
        {
          icon: Settings,
          title: 'Conseil & Audit',
          description: 'Analyse complète de vos infrastructures et recommandations d\'optimisation'
        },
        {
          icon: Truck,
          title: 'Installation & Formation',
          description: 'Déploiement clé en main avec formation complète de vos équipes'
        },
        {
          icon: Shield,
          title: 'Maintenance & Support',
          description: 'Support 24/7 et maintenance préventive pour une disponibilité maximale'
        },
        {
          icon: BarChart3,
          title: 'Analytics & Optimisation',
          description: 'Analyse de performance continue et optimisation des opérations'
        }
      ],

      // Références clients
      clients: [
        {
          name: 'Port de Tanger Med',
          logo: '/images/client-tanger.png',
          project: 'Automatisation complète Terminal 1',
          year: '2023',
          results: '+35% efficacité opérationnelle'
        },
        {
          name: 'Port de Casablanca',
          logo: '/images/client-casa.png',
          project: 'Plateforme IoT PortOS',
          year: '2022',
          results: '-25% temps d\'attente navires'
        },
        {
          name: 'Marseille Fos Port',
          logo: '/images/client-marseille.png',
          project: 'GreenPort Solutions',
          year: '2023',
          results: '-60% émissions CO2'
        }
      ],

      // Actualités
      news: [
        {
          id: 1,
          title: 'Maritime Solutions remporte le contrat du Port d\'Agadir',
          date: '15 Décembre 2024',
          category: 'Contrats',
          excerpt: 'Un projet d\'automatisation de 50M€ sur 3 ans pour moderniser l\'infrastructure portuaire.',
          image: '/images/news-agadir.jpg'
        },
        {
          id: 2,
          title: 'Lancement de SmartCrane Pro 2.0',
          date: '03 Décembre 2024',
          category: 'Innovation',
          excerpt: 'Nouvelle génération avec IA avancée et réduction de 60% de la consommation énergétique.',
          image: '/images/news-smartcrane.jpg'
        },
        {
          id: 3,
          title: 'Partenariat stratégique avec TechnipFMC',
          date: '28 Novembre 2024',
          category: 'Partenariats',
          excerpt: 'Alliance pour développer les ports offshore du futur en Afrique de l\'Ouest.',
          image: '/images/news-partnership.jpg'
        }
      ],

      // Équipe dirigeante
      team: [
        {
          name: 'Ahmed Benali',
          position: 'CEO & Fondateur',
          bio: '20 ans d\'expérience dans l\'industrie portuaire',
          image: '/images/team-ahmed.jpg',
          linkedin: 'https://linkedin.com/in/ahmed-benali-maritime'
        },
        {
          name: 'Sarah Martinez',
          position: 'CTO',
          bio: 'Experte en IA et automatisation industrielle',
          image: '/images/team-sarah.jpg',
          linkedin: 'https://linkedin.com/in/sarah-martinez-tech'
        },
        {
          name: 'Omar Alaoui',
          position: 'VP Sales International',
          bio: 'Développement commercial dans 25 pays',
          image: '/images/team-omar.jpg',
          linkedin: 'https://linkedin.com/in/omar-alaoui-sales'
        }
      ],

      // Certifications
      certifications: [
        { name: 'ISO 9001', description: 'Qualité' },
        { name: 'ISO 14001', description: 'Environnement' },
        { name: 'ISO 45001', description: 'Sécurité' },
        { name: 'CE Marking', description: 'Conformité européenne' }
      ],

      // Informations SIPORTS
      siportsInfo: {
        boothNumber: 'A12',
        hallLocation: 'Hall 1 - Zone Innovation',
        packageType: 'Platinum',
        presentations: [
          {
            title: 'L\'avenir des ports intelligents',
            date: '15 Mars 2025',
            time: '14h30 - 15h15',
            room: 'Auditorium A'
          },
          {
            title: 'ROI des solutions d\'automatisation',
            date: '16 Mars 2025', 
            time: '10h00 - 10h45',
            room: 'Salle Innovation'
          }
        ]
      },

      socialProof: {
        rating: 4.9,
        reviews: 127,
        recommendations: 98
      },

      contact: {
        mainContact: {
          name: 'Fatima Zahra Idrissi',
          position: 'Responsable Développement Commercial',
          email: 'f.idrissi@maritime-solutions.ma',
          phone: '+212 522 123 457',
          image: '/images/contact-fatima.jpg'
        }
      }
    };

    setExhibitor(premiumExhibitor);
    setLoading(false);
  }, [id]);

  const handleContact = () => {
    setShowContactForm(true);
  };

  const handleBookmark = () => {
    // Logique bookmark
    alert('Exposant ajouté aux favoris !');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: exhibitor?.name,
        text: exhibitor?.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papier !');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-gray-600">Chargement du profil...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button
              variant="ghost"
              onClick={() => navigate('/exposants')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux exposants
            </Button>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleBookmark}>
                <Bookmark className="w-4 h-4 mr-1" />
                Favoris
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-1" />
                Partager
              </Button>
              <Button onClick={handleContact} className="bg-blue-600 hover:bg-blue-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contacter
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Style SIPORTS */}
      <div className="relative h-96 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('/images/port-hero-pattern.png')] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            {/* Company Info */}
            <div className="text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                  <Building className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">{exhibitor?.name}</h1>
                  <p className="text-xl text-blue-100">{exhibitor?.tagline}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-blue-100 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{exhibitor?.city}, {exhibitor?.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  <span>Depuis {exhibitor?.established}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{exhibitor?.employees} employés</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {exhibitor?.category}
                </Badge>
                <Badge variant="secondary" className="bg-yellow-500/90 text-yellow-900">
                  <Award className="w-3 h-3 mr-1" />
                  Partenaire {exhibitor?.siportsInfo?.packageType}
                </Badge>
              </div>

              <p className="text-lg text-blue-100 leading-relaxed">
                {exhibitor?.description}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              {exhibitor?.hero?.stats.map((stat, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="text-blue-100">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Rating & Social Proof */}
        <div className="absolute bottom-4 left-4 flex items-center gap-4 text-white">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span>{exhibitor?.socialProof?.rating}</span>
            <span className="text-blue-200">({exhibitor?.socialProof?.reviews} avis)</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { key: 'overview', label: 'Vue d\'ensemble', icon: Eye },
              { key: 'products', label: 'Produits & Services', icon: Package },
              { key: 'clients', label: 'Références', icon: Building },
              { key: 'team', label: 'Équipe', icon: Users },
              { key: 'news', label: 'Actualités', icon: FileText },
              { key: 'contact', label: 'Contact', icon: Mail }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Vue d'ensemble */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-blue-600" />
                  À propos de {exhibitor?.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {exhibitor?.longDescription}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Notre Vision</h4>
                    <p className="text-gray-700">{exhibitor?.vision}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Notre Mission</h4>
                    <p className="text-gray-700">{exhibitor?.mission}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Values */}
            <Card>
              <CardHeader>
                <CardTitle>Nos Valeurs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {exhibitor?.values.map((value, index) => {
                    const Icon = value.icon;
                    return (
                      <div key={index} className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-8 h-8 text-blue-600" />
                        </div>
                        <h4 className="font-semibold mb-2">{value.title}</h4>
                        <p className="text-sm text-gray-600">{value.description}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* SIPORTS Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Informations SIPORTS 2025
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      Stand {exhibitor?.siportsInfo?.boothNumber}
                    </div>
                    <p className="text-gray-600">{exhibitor?.siportsInfo?.hallLocation}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600 mb-1">
                      Partenaire {exhibitor?.siportsInfo?.packageType}
                    </div>
                    <p className="text-gray-600">Sponsor Premium</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      2 Présentations
                    </div>
                    <p className="text-gray-600">Sessions dédiées</p>
                  </div>
                </div>

                <Separator className="my-6" />
                
                <h4 className="font-semibold mb-4">Présentations Prévues</h4>
                <div className="space-y-3">
                  {exhibitor?.siportsInfo?.presentations.map((presentation, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h5 className="font-medium">{presentation.title}</h5>
                        <p className="text-sm text-gray-600">{presentation.room}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{presentation.date}</div>
                        <div className="text-sm text-gray-600">{presentation.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Produits & Services */}
        {activeTab === 'products' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Solutions</h2>
              <p className="text-xl text-gray-600">Découvrez notre gamme complète de produits et services</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {exhibitor?.products.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-700 relative">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <Badge className="bg-white/20 text-white mb-2">{product.category}</Badge>
                      <h3 className="text-xl font-bold">{product.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600">Prix</div>
                        <div className="font-semibold">{product.pricing}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Délai</div>
                        <div className="font-semibold">{product.deliveryTime}</div>
                      </div>
                    </div>

                    <Button className="w-full mt-4" variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      En savoir plus
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle>Services Complémentaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {exhibitor?.services.map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <div key={index} className="flex gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">{service.title}</h4>
                          <p className="text-gray-600">{service.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Références Clients */}
        {activeTab === 'clients' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Références Clients</h2>
              <p className="text-xl text-gray-600">Ils nous font confiance</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {exhibitor?.clients.map((client, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Building className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{client.name}</h3>
                        <p className="text-sm text-gray-600">{client.year}</p>
                      </div>
                    </div>
                    <h4 className="font-medium mb-2">{client.project}</h4>
                    <div className="bg-green-50 text-green-800 px-3 py-2 rounded-lg text-sm font-medium">
                      {client.results}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle>Certifications & Accréditations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  {exhibitor?.certifications.map((cert, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Award className="w-8 h-8 text-blue-600" />
                      </div>
                      <h4 className="font-semibold">{cert.name}</h4>
                      <p className="text-sm text-gray-600">{cert.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Équipe */}
        {activeTab === 'team' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Équipe</h2>
              <p className="text-xl text-gray-600">Les experts qui font la différence</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {exhibitor?.team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-2">{member.position}</p>
                    <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Actualités */}
        {activeTab === 'news' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Actualités</h2>
              <p className="text-xl text-gray-600">Restez informé de nos dernières innovations</p>
            </div>

            <div className="space-y-6">
              {exhibitor?.news.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="aspect-video md:aspect-square bg-gradient-to-br from-blue-500 to-blue-700"></div>
                    </div>
                    <div className="md:w-2/3">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-3">
                          <Badge variant="outline">{article.category}</Badge>
                          <span className="text-sm text-gray-500">{article.date}</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                        <p className="text-gray-700 mb-4">{article.excerpt}</p>
                        <Button variant="outline">
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Lire la suite
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Contact */}
        {activeTab === 'contact' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contactez-nous</h2>
              <p className="text-xl text-gray-600">Parlons de votre projet</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Principal */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Commercial</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{exhibitor?.contact.mainContact.name}</h3>
                      <p className="text-blue-600">{exhibitor?.contact.mainContact.position}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <a href={`mailto:${exhibitor?.contact.mainContact.email}`} className="text-blue-600 hover:underline">
                        {exhibitor?.contact.mainContact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <a href={`tel:${exhibitor?.contact.mainContact.phone}`} className="text-blue-600 hover:underline">
                        {exhibitor?.contact.mainContact.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-gray-400" />
                      <a href={`https://${exhibitor?.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {exhibitor?.website}
                      </a>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Envoyer un message
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Calendar className="w-4 h-4 mr-2" />
                      Planifier un RDV
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger la brochure
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Formulaire de contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Envoyez-nous un message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Prénom</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Nom</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Société</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Votre société"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Sujet</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Demande d'information</option>
                        <option>Devis commercial</option>
                        <option>Support technique</option>
                        <option>Partenariat</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Message</label>
                      <textarea
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Décrivez votre projet ou votre demande..."
                      ></textarea>
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExhibitorProfilePremium;