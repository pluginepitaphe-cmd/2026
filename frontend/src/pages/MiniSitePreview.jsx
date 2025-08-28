import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  ExternalLink,
  MessageCircle,
  Star,
  Package,
  Users,
  Award,
  Clock,
  CheckCircle
} from 'lucide-react';

const MiniSitePreview = () => {
  const { companyId } = useParams();
  const [siteData, setSiteData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation de chargement des données du mini-site
    setTimeout(() => {
      setSiteData({
        id: companyId || 'maritime-solutions',
        title: 'Maritime Solutions',
        subtitle: 'Votre partenaire maritime de confiance',
        description: 'Spécialisés dans les solutions portuaires innovantes depuis plus de 20 ans, nous accompagnons les ports et terminaux dans leur transformation digitale et leur optimisation opérationnelle.',
        theme: 'maritime',
        primaryColor: '#0891b2',
        secondaryColor: '#0e7490',
        accentColor: '#06b6d4',
        logo: null,
        bannerImage: null,
        sections: {
          about: {
            enabled: true,
            title: 'À propos de nous',
            content: 'Maritime Solutions est une entreprise leader dans le domaine des technologies portuaires. Nous développons des solutions innovantes pour optimiser les opérations portuaires, améliorer la sécurité et réduire l\'impact environnemental. Notre équipe d\'experts combine une connaissance approfondie du secteur maritime avec les dernières technologies pour offrir des solutions sur mesure.'
          },
          products: {
            enabled: true,
            title: 'Nos Produits & Services',
            content: 'Découvrez notre gamme complète de solutions : systèmes de gestion portuaire, équipements de manutention automatisés, solutions IoT pour la surveillance, et services de conseil en optimisation opérationnelle.'
          },
          contact: {
            enabled: true,
            title: 'Nous Contacter',
            content: 'Notre équipe est à votre disposition pour discuter de vos projets et vous accompagner dans vos défis maritimes. Contactez-nous pour une consultation personnalisée.'
          }
        },
        contact: {
          email: 'contact@maritime-solutions.com',
          phone: '+212 522 123 456',
          address: 'Zone Portuaire, Casablanca, Maroc',
          website: 'www.maritime-solutions.com'
        },
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
        },
        certifications: [
          'ISO 9001:2015',
          'ISO 14001:2015',
          'OHSAS 18001'
        ]
      });

      setProducts([
        {
          id: 1,
          name: 'Grue portuaire automatisée SkyLift Pro',
          category: 'Équipement lourd',
          shortDescription: 'Grue automatisée haute performance pour conteneurs',
          price: 850000,
          currency: 'EUR',
          availability: 'En stock',
          image: null
        },
        {
          id: 2,
          name: 'Système de gestion SmartPort',
          category: 'Logiciel',
          shortDescription: 'Solution logicielle complète pour la gestion portuaire',
          price: 25000,
          currency: 'EUR',
          availability: 'Sur commande',
          image: null
        },
        {
          id: 3,
          name: 'Capteurs IoT MarineSense',
          category: 'Technologie',
          shortDescription: 'Réseau de capteurs intelligents pour ports',
          price: 1200,
          currency: 'EUR',
          availability: 'En stock',
          image: null
        }
      ]);

      setLoading(false);
    }, 1000);
  }, [companyId]);

  const handleContactRequest = () => {
    alert('Demande de contact envoyée ! L\'entreprise vous contactera sous 24h.');
  };

  const handleAppointmentRequest = () => {
    alert('Demande de rendez-vous envoyée ! Vous recevrez une confirmation par email.');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement du mini-site...</p>
        </div>
      </div>
    );
  }

  if (!siteData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Mini-site non trouvé</h1>
          <p className="text-muted-foreground">Ce mini-site n'existe pas ou n'est plus disponible.</p>
        </div>
      </div>
    );
  }

  const getPreviewStyles = () => ({
    '--primary-color': siteData.primaryColor,
    '--secondary-color': siteData.secondaryColor,
    '--accent-color': siteData.accentColor
  });

  return (
    <div className="min-h-screen bg-gray-50" style={getPreviewStyles()}>
      {/* En-tête avec bannière */}
      <div 
        className="relative bg-gradient-to-br from-cyan-600 to-teal-700 text-white"
        style={{ backgroundColor: siteData.primaryColor }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              {siteData.logo ? (
                <img src={siteData.logo} alt="Logo" className="h-16 mx-auto mb-4" />
              ) : (
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8" />
                </div>
              )}
            </div>
            <h1 className="text-5xl font-bold mb-4">{siteData.title}</h1>
            <p className="text-xl opacity-90 mb-8">{siteData.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-cyan-600 hover:bg-gray-100"
                onClick={handleContactRequest}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Nous contacter
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-cyan-600"
                onClick={handleAppointmentRequest}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Prendre RDV
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-cyan-600 mb-1">{siteData.stats.experience}</div>
              <div className="text-sm text-muted-foreground">d'expérience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-600 mb-1">{siteData.stats.projects}</div>
              <div className="text-sm text-muted-foreground">projets réalisés</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-600 mb-1">{siteData.stats.clients}</div>
              <div className="text-sm text-muted-foreground">clients satisfaits</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-600 mb-1">{siteData.stats.countries}</div>
              <div className="text-sm text-muted-foreground">pays d'intervention</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <section>
              <p className="text-lg text-gray-700 leading-relaxed">{siteData.description}</p>
            </section>

            {/* Sections */}
            {Object.entries(siteData.sections)
              .filter(([_, section]) => section.enabled)
              .map(([key, section]) => (
                <section key={key}>
                  <h2 
                    className="text-3xl font-bold mb-6"
                    style={{ color: siteData.secondaryColor }}
                  >
                    {section.title}
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed">{section.content}</p>
                  </div>
                </section>
              ))}

            {/* Produits */}
            {siteData.sections.products.enabled && (
              <section>
                <h2 
                  className="text-3xl font-bold mb-6"
                  style={{ color: siteData.secondaryColor }}
                >
                  Nos Produits Phares
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {products.slice(0, 4).map((product) => (
                    <Card key={product.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Package className="h-8 w-8 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{product.shortDescription}</p>
                            <div className="flex items-center justify-between">
                              <Badge variant="outline">{product.category}</Badge>
                              <div className="text-right">
                                <div className="font-bold text-cyan-600">
                                  {product.price.toLocaleString()} {product.currency}
                                </div>
                                <div className="text-xs text-muted-foreground">{product.availability}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-cyan-600" />
                  Contact
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${siteData.contact.email}`} className="text-cyan-600 hover:underline">
                      {siteData.contact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${siteData.contact.phone}`} className="text-cyan-600 hover:underline">
                      {siteData.contact.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                    <span className="text-sm">{siteData.contact.address}</span>
                  </div>
                  {siteData.contact.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a 
                        href={siteData.socialLinks.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-cyan-600 hover:underline flex items-center"
                      >
                        {siteData.contact.website}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <Button 
                    className="w-full" 
                    style={{ backgroundColor: siteData.primaryColor }}
                    onClick={handleContactRequest}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Demander un devis
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleAppointmentRequest}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Prendre rendez-vous
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-cyan-600" />
                  Certifications
                </h3>
                <div className="space-y-2">
                  {siteData.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Disponibilité */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-cyan-600" />
                  Disponibilité
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Lun - Ven:</span>
                    <span>8h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi:</span>
                    <span>9h00 - 13h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimanche:</span>
                    <span>Fermé</span>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Disponible maintenant</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">{siteData.title}</h3>
            <p className="text-gray-400 mb-4">{siteData.subtitle}</p>
            <div className="flex justify-center gap-4">
              {siteData.socialLinks.linkedin && (
                <a 
                  href={siteData.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  LinkedIn
                </a>
              )}
              {siteData.socialLinks.website && (
                <a 
                  href={siteData.socialLinks.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  Site web
                </a>
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800 text-sm text-gray-500">
              © 2025 {siteData.title}. Tous droits réservés. | Propulsé par SIPORTS
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MiniSitePreview;

