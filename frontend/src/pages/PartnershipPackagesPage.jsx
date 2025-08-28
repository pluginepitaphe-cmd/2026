import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Crown, Star, Award, Building, Globe, Users, Calendar, Mail,
  Check, Sparkles, ArrowRight, Zap, Eye, MessageSquare, TrendingUp,
  Target, Search, Filter, Heart, UserPlus, Briefcase, Network
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const PartnershipPackagesPage = () => {
  const { user } = useAuth();
  const [selectedPackage, setSelectedPackage] = useState(user?.partnership_package || null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [activeTab, setActiveTab] = useState('packages');

  const packages = [
    {
      id: 'platinum',
      name: 'Partenaire Platinum',
      subtitle: 'Niveau Premium - Visibilité maximale',
      price: '98.000 $',
      originalPrice: '120.000 $',
      discount: '18%',
      duration: 'Partenariat annuel',
      color: 'border-slate-300 bg-gradient-to-br from-slate-50 to-gray-100',
      headerColor: 'bg-gradient-to-r from-slate-600 to-gray-700',
      textColor: 'text-slate-600',
      buttonColor: 'bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800',
      popular: true,
      features: [
        { category: 'Web & Digital', items: [
          'Logo en 1ère ligne sur le site web',
          'Bannière web rotative',
          'Mini-site dédié SIPORTS Premium',
          'Section "Top Innovations" dédiée',
          'Mise en avant sur newsletter mensuelle'
        ]},
        { category: 'Relations Presse & Marketing', items: [
          'Logo 1ère ligne dossiers de presse',
          'Branding conférence de presse',
          'Insertions presse spécialisée',
          'Catalogue officiel + pub',
          '10.000 invitations personnalisées',
          '6.000 badges et goodies'
        ]},
        { category: 'Affichage & Visibilité', items: [
          '4 flags à l\'entrée du salon',
          'Vidéos sur écrans LED',
          'Campagne affichage public',
          'Signalétique premium'
        ]},
        { category: 'Événements & Networking', items: [
          'Prise de parole inauguration',
          'Prise de parole dîner de clôture',
          '1 atelier ou live démo (3h)',
          'Accès VIP exclusif'
        ]}
      ],
      benefits: [
        'ROI estimé: 300-500%',
        'Portée: 50.000+ professionnels',
        'Leads qualifiés: 500+',
        'Médiatisation internationale'
      ]
    },
    {
      id: 'gold',
      name: 'Partenaire Gold',
      subtitle: 'Niveau Élevé - Forte visibilité',
      price: '68.000 $',
      originalPrice: '85.000 $',
      discount: '20%',
      duration: 'Partenariat annuel',
      color: 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-100',
      headerColor: 'bg-gradient-to-r from-yellow-500 to-amber-600',
      textColor: 'text-yellow-600',
      buttonColor: 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700',
      popular: false,
      features: [
        { category: 'Web & Digital', items: [
          'Logo en 2ème ligne sur le site web',
          'Bannière web rotative',
          'Présence newsletter',
          'Mini-présentation vidéo (2min)'
        ]},
        { category: 'Relations Presse & Marketing', items: [
          'Logo 2ème ligne dossiers de presse',
          'Insertions presse spécialisée',
          'Catalogue officiel',
          '5.000 invitations',
          '3.000 badges et goodies'
        ]},
        { category: 'Affichage & Visibilité', items: [
          '2 flags à l\'entrée',
          'Présence écrans LED',
          'Signalétique premium'
        ]},
        { category: 'Événements & Networking', items: [
          'Espace Musée des ports',
          '1 atelier ou live démo (2h)',
          'Accès événements VIP'
        ]}
      ],
      benefits: [
        'ROI estimé: 200-400%',
        'Portée: 30.000+ professionnels',
        'Leads qualifiés: 300+',
        'Visibilité internationale'
      ]
    },
    {
      id: 'silver',
      name: 'Partenaire Silver',
      subtitle: 'Niveau Moyen - Bonne visibilité',
      price: '48.000 $',
      originalPrice: '60.000 $',
      discount: '20%',
      duration: 'Partenariat annuel',
      color: 'border-gray-300 bg-gradient-to-br from-gray-50 to-slate-100',
      headerColor: 'bg-gradient-to-r from-gray-400 to-slate-500',
      textColor: 'text-gray-600',
      buttonColor: 'bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700',
      popular: false,
      features: [
        { category: 'Web & Digital', items: [
          'Logo en 3ème ligne sur le site web',
          'Bannière web rotative',
          'Présence newsletter'
        ]},
        { category: 'Relations Presse & Marketing', items: [
          'Logo 3ème ligne dossiers de presse',
          'Branding conférence de presse',
          'Insertions presse économique',
          'Catalogue officiel',
          '2.000 invitations'
        ]},
        { category: 'Affichage & Visibilité', items: [
          '1 flag à l\'entrée',
          'Présence écrans LED',
          'Signalétique standard'
        ]},
        { category: 'Événements & Networking', items: [
          'Accès événements networking',
          'Espace exposition prioritaire'
        ]}
      ],
      benefits: [
        'ROI estimé: 150-250%',
        'Portée: 20.000+ professionnels',
        'Leads qualifiés: 200+',
        'Visibilité régionale'
      ]
    },
    {
      id: 'museum',
      name: 'Partenaire Musée des Ports',
      subtitle: 'Spécialisé - Patrimoine Maritime',
      price: '20.000 $',
      originalPrice: '25.000 $',
      discount: '20%',
      duration: 'Partenariat spécialisé',
      color: 'border-blue-300 bg-gradient-to-br from-blue-50 to-cyan-100',
      headerColor: 'bg-gradient-to-r from-blue-500 to-cyan-600',
      textColor: 'text-blue-600',
      buttonColor: 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700',
      popular: false,
      features: [
        { category: 'Espace Musée', items: [
          'Espace dédié Musée des ports',
          'Présentation patrimoine maritime',
          'Exposition historique'
        ]},
        { category: 'Communication', items: [
          'Insertions presse spécialisée',
          'Catalogue officiel',
          '15 invitations VIP',
          'Logo sur supports musée'
        ]},
        { category: 'Événements', items: [
          'Accès événements culturels',
          'Inauguration espace musée',
          'Réception patrimoniale'
        ]}
      ],
      benefits: [
        'ROI estimé: 100-200%',
        'Portée: 10.000+ professionnels',
        'Positionnement patrimoine',
        'Audience culturelle'
      ]
    }
  ];

  const expositorPackages = [
    {
      id: 'premium_booth',
      name: 'Stand Premium',
      price: '15.000 $',
      size: '54 m²',
      features: [
        'Emplacement premium',
        'Design stand personnalisé',
        'Équipement audiovisuel inclus',
        'Service hostessing',
        '50 invitations VIP',
        'Catalogue exposants premium'
      ]
    },
    {
      id: 'standard_booth',
      name: 'Stand Standard',
      price: '8.000 $',
      size: '18 m²',
      features: [
        'Emplacement standard',
        'Équipement de base',
        '20 invitations',
        'Catalogue exposants'
      ]
    },
    {
      id: 'startup_booth',
      name: 'Stand Startup',
      price: '3.000 $',
      size: '9 m²',
      features: [
        'Emplacement dédié startups',
        'Package jeune entreprise',
        '10 invitations',
        'Mentorat inclus'
      ]
    }
  ];

  const handleSelectPackage = async (packageId) => {
    setSelectedPackage(packageId);
    alert(`Demande de partenariat ${packages.find(p => p.id === packageId)?.name} envoyée !`);
  };

  const handleQuoteRequest = () => {
    setShowQuoteForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Partenariats & Expositions SIPORTS 2026
          </h1>
          <p className="text-xl text-slate-600 mb-6">
            Rejoignez l'événement de référence du secteur portuaire mondial
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>+300 Exposants</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>+6.000 Visiteurs</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Rayonnement International</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-white rounded-lg shadow-lg p-1">
            <button
              onClick={() => setActiveTab('packages')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'packages' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Crown className="h-4 w-4 inline mr-2" />
              Partenariats
            </button>
            <button
              onClick={() => setActiveTab('exhibition')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'exhibition' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Building className="h-4 w-4 inline mr-2" />
              Expositions
            </button>
          </div>
        </div>

        {/* Partnership Packages */}
        {activeTab === 'packages' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {packages.map((pkg) => (
                <Card 
                  key={pkg.id} 
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${pkg.color} ${
                    selectedPackage === pkg.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 text-sm font-semibold">
                      <Sparkles className="inline h-3 w-3 mr-1" />
                      Plus Populaire
                    </div>
                  )}
                  
                  <CardHeader className={`${pkg.headerColor} text-white`}>
                    <div className="text-center">
                      <CardTitle className="text-2xl font-bold mb-2">{pkg.name}</CardTitle>
                      <p className="text-sm opacity-90 mb-4">{pkg.subtitle}</p>
                      <div className="flex items-center justify-center gap-3 mb-2">
                        <span className="text-3xl font-bold">{pkg.price}</span>
                        {pkg.originalPrice && (
                          <div className="text-right">
                            <div className="text-sm line-through opacity-75">{pkg.originalPrice}</div>
                            <Badge className="bg-red-500 text-white text-xs">
                              -{pkg.discount}
                            </Badge>
                          </div>
                        )}
                      </div>
                      <p className="text-xs opacity-75">{pkg.duration}</p>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div className="space-y-6 mb-6">
                      {pkg.features.map((category, index) => (
                        <div key={index}>
                          <h4 className="font-semibold text-sm text-slate-700 mb-3 flex items-center">
                            <Target className="h-4 w-4 mr-2 text-blue-600" />
                            {category.category}
                          </h4>
                          <div className="space-y-2">
                            {category.items.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-slate-600">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Benefits */}
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Bénéfices attendus
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {pkg.benefits.map((benefit, idx) => (
                          <div key={idx} className="text-xs text-green-700">
                            • {benefit}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={() => handleSelectPackage(pkg.id)}
                      className={`w-full ${pkg.buttonColor} text-white`}
                    >
                      <Crown className="h-4 w-4 mr-2" />
                      Demander ce partenariat
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Custom Quote Section */}
            <Card className="bg-gradient-to-r from-purple-500 to-blue-600 text-white mb-12">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Partenariat sur mesure ?</h3>
                <p className="text-lg mb-6 opacity-90">
                  Nos équipes peuvent créer un package personnalisé selon vos besoins spécifiques
                </p>
                <Button 
                  onClick={handleQuoteRequest}
                  className="bg-white text-purple-600 hover:bg-gray-100"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Demander un devis personnalisé
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {/* Exhibition Packages */}
        {activeTab === 'exhibition' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {expositorPackages.map((pkg, index) => (
              <Card key={pkg.id} className="hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{pkg.name}</span>
                    <Badge variant="outline">{pkg.size}</Badge>
                  </CardTitle>
                  <div className="text-2xl font-bold text-blue-600">{pkg.price}</div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full">
                    <Building className="h-4 w-4 mr-2" />
                    Réserver ce stand
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quote Form Modal */}
        {showQuoteForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Demande de devis personnalisé</span>
                  <Button variant="ghost" size="sm" onClick={() => setShowQuoteForm(false)}>
                    ×
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Entreprise *</label>
                    <Input placeholder="Nom de votre entreprise" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Secteur d'activité</label>
                    <Input placeholder="Ex: Équipementier portuaire" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Contact *</label>
                    <Input placeholder="Nom du responsable" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input type="email" placeholder="contact@entreprise.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Objectifs du partenariat *</label>
                  <Textarea 
                    placeholder="Décrivez vos objectifs, votre audience cible, et le type de visibilité recherchée..."
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Budget approximatif</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                    <option value="">Sélectionnez une fourchette</option>
                    <option value="10k-30k">10.000 - 30.000 $</option>
                    <option value="30k-60k">30.000 - 60.000 $</option>
                    <option value="60k-100k">60.000 - 100.000 $</option>
                    <option value="100k+">100.000 $ et plus</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowQuoteForm(false)}>
                    Annuler
                  </Button>
                  <Button onClick={() => {
                    alert('Demande de devis envoyée ! Nous vous recontacterons sous 48h.');
                    setShowQuoteForm(false);
                  }}>
                    <Mail className="h-4 w-4 mr-2" />
                    Envoyer la demande
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnershipPackagesPage;