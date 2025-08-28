import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  ExternalLink
} from 'lucide-react';

const ExhibitorProfilePage = () => {
  const { id } = useParams();
  const [exhibitor, setExhibitor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation de chargement des données de l'exposant
    const mockExhibitor = {
      id: parseInt(id),
      name: 'Maritime Solutions',
      category: 'Équipement lourd',
      country: 'Maroc',
      city: 'Casablanca',
      description: 'Maritime Solutions est un leader dans les solutions portuaires innovantes depuis plus de 20 ans. Nous nous spécialisons dans l\'automatisation des ports, les systèmes IoT et la gestion intelligente des infrastructures maritimes.',
      longDescription: `Maritime Solutions a été fondée en 2003 avec pour mission de révolutionner l'industrie portuaire grâce à des technologies de pointe. Basée à Casablanca, notre entreprise s'est imposée comme un acteur majeur dans la transformation digitale des ports africains et européens.

Notre expertise couvre l'ensemble de la chaîne logistique portuaire, de la conception d'équipements automatisés à la mise en place de systèmes de gestion intelligents. Nous travaillons avec les plus grands ports du monde pour optimiser leurs opérations et réduire leur impact environnemental.`,
      products: [
        {
          name: 'Grues automatisées',
          description: 'Systèmes de grues entièrement automatisés pour améliorer l\'efficacité portuaire',
          features: ['Contrôle à distance', 'IA intégrée', 'Maintenance prédictive']
        },
        {
          name: 'Systèmes de gestion IoT',
          description: 'Plateforme IoT complète pour la surveillance en temps réel des opérations',
          features: ['Monitoring 24/7', 'Analytics avancés', 'Alertes intelligentes']
        },
        {
          name: 'Solutions de sécurité',
          description: 'Systèmes de sécurité intégrés pour la protection des infrastructures',
          features: ['Vidéosurveillance IA', 'Contrôle d\'accès', 'Détection d\'intrusion']
        }
      ],
      rating: 4.8,
      reviewCount: 24,
      employeeCount: '50-100',
      founded: 2003,
      website: 'maritime-solutions.com',
      email: 'contact@maritime-solutions.com',
      phone: '+212 522 123 456',
      logo: null,
      featured: true,
      certifications: ['ISO 9001', 'ISO 14001', 'ISO 45001'],
      specialties: ['Automatisation', 'IoT', 'Gestion portuaire', 'Intelligence artificielle'],
      gallery: [
        '/images/port-automation-1.jpg',
        '/images/crane-system-2.jpg',
        '/images/control-room-3.jpg',
        '/images/iot-sensors-4.jpg'
      ],
      awards: [
        'Prix Innovation Maritime 2023',
        'Meilleur Solution IoT Portuaire 2022',
        'Excellence Environnementale 2021'
      ],
      clients: [
        'Port de Casablanca',
        'Tanger Med',
        'Port de Marseille',
        'Port de Rotterdam'
      ],
      news: [
        {
          title: 'Nouveau contrat avec le Port de Tanger Med',
          date: '2024-01-15',
          summary: 'Maritime Solutions signe un contrat majeur pour l\'automatisation du terminal 3'
        },
        {
          title: 'Certification ISO 45001 obtenue',
          date: '2023-12-10',
          summary: 'Notre entreprise renforce son engagement en matière de sécurité au travail'
        }
      ]
    };

    setTimeout(() => {
      setExhibitor(mockExhibitor);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleContact = () => {
    const subject = `Contact depuis SIPORTS - ${exhibitor.name}`;
    const body = `Bonjour,\n\nJe souhaite entrer en contact avec votre entreprise ${exhibitor.name} suite à votre présence au salon SIPORTS.\n\nCordialement`;
    window.location.href = `/contact?to=${encodeURIComponent(exhibitor.email)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleRequestMeeting = () => {
    window.location.href = `/calendrier?exhibitor=${exhibitor.id}&name=${encodeURIComponent(exhibitor.name)}`;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (!exhibitor) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Exposant non trouvé</p>
          <Link to="/exposants">
            <Button className="mt-4">Retour à l'annuaire</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        {/* Navigation */}
        <div className="mb-6">
          <Link to="/exposants">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'annuaire
            </Button>
          </Link>
        </div>

        {/* En-tête du profil */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                {exhibitor.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{exhibitor.name}</h1>
                  {exhibitor.featured && (
                    <Badge className="bg-gradient-to-r from-cyan-500 to-teal-600">
                      <Star className="h-3 w-3 mr-1" />
                      Partenaire Officiel
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-6 text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {exhibitor.city}, {exhibitor.country}
                  </div>
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    {exhibitor.employeeCount} employés
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Fondée en {exhibitor.founded}
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline">{exhibitor.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{exhibitor.rating}</span>
                    <span className="text-muted-foreground">({exhibitor.reviewCount} avis)</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">{exhibitor.description}</p>
                <div className="flex gap-3">
                  <Button onClick={handleContact} className="bg-cyan-600 hover:bg-cyan-700">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contacter
                  </Button>
                  <Button variant="outline" onClick={handleRequestMeeting}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Planifier RDV
                  </Button>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Partager
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Brochure
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description détaillée */}
            <Card>
              <CardHeader>
                <CardTitle>À propos de l'entreprise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {exhibitor.longDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Produits et services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Produits et Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {exhibitor.products.map((product, index) => (
                    <div key={index} className="border-l-4 border-cyan-500 pl-4">
                      <h4 className="font-semibold text-lg mb-2">{product.name}</h4>
                      <p className="text-muted-foreground mb-3">{product.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {product.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actualités */}
            <Card>
              <CardHeader>
                <CardTitle>Actualités récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {exhibitor.news.map((news, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold mb-1">{news.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{news.summary}</p>
                          <p className="text-xs text-muted-foreground">{new Date(news.date).toLocaleDateString('fr-FR')}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Coordonnées */}
            <Card>
              <CardHeader>
                <CardTitle>Coordonnées</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a href={`https://${exhibitor.website}`} target="_blank" rel="noopener noreferrer" 
                     className="text-cyan-600 hover:underline">
                    {exhibitor.website}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${exhibitor.email}`} className="text-cyan-600 hover:underline">
                    {exhibitor.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{exhibitor.phone}</span>
                </div>
              </CardContent>
            </Card>

            {/* Spécialités */}
            <Card>
              <CardHeader>
                <CardTitle>Spécialités</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {exhibitor.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {exhibitor.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-cyan-600" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Récompenses */}
            <Card>
              <CardHeader>
                <CardTitle>Récompenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {exhibitor.awards.map((award, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      🏆 {award}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Clients de référence */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Clients de référence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {exhibitor.clients.map((client, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      • {client}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExhibitorProfilePage;