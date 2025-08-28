import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Check, Star, Crown, Gift, Users, Calendar, Coffee,
  Plane, Music, Award, Sparkles, ArrowRight, Zap
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const VisitorPackagesPage = () => {
  const { user, updateUserPackage } = useAuth();
  const [selectedPackage, setSelectedPackage] = useState(user?.visitor_package || null);

  const packages = [
    {
      id: 'free',
      name: 'Free Pass',
      subtitle: 'Accès limité',
      price: 'Gratuit',
      duration: 'Accès de base',
      color: 'border-gray-200 bg-gray-50',
      headerColor: 'bg-gray-100',
      textColor: 'text-gray-600',
      buttonColor: 'bg-gray-600 hover:bg-gray-700',
      popular: false,
      features: [
        { icon: Users, text: 'Accès à l\'espace exposition', included: true },
        { icon: Users, text: 'Conférences publiques', included: true },
        { icon: Award, text: 'Documentation générale', included: true },
        { icon: Zap, text: 'Application mobile du salon', included: true },
        { icon: Coffee, text: 'Événements de réseautage', included: true },
        { icon: Calendar, text: 'Réunions B2B', included: false },
        { icon: Star, text: 'Ateliers spécialisés', included: false },
        { icon: Crown, text: 'Accès salon VIP', included: false }
      ],
      limitations: [
        'Accès limité aux espaces',
        'Pas de réservation RDV B2B',
        'Documentation de base uniquement'
      ]
    },
    {
      id: 'basic',
      name: 'Basic Pass',
      subtitle: 'Accès 1 jour',
      price: '150€',
      duration: '1 jour d\'accès',
      color: 'border-blue-200 bg-blue-50',
      headerColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      popular: false,
      features: [
        { icon: Users, text: 'Accès aux expositions', included: true },
        { icon: Award, text: 'Conférences principales', included: true },
        { icon: Award, text: 'Documentation exposition', included: true },
        { icon: Coffee, text: 'Pause café réseautage', included: true },
        { icon: Calendar, text: '2 réunions B2B garanties', included: true },
        { icon: Star, text: 'Ateliers spécialisés', included: false },
        { icon: Crown, text: 'Accès salon VIP', included: false },
        { icon: Music, text: 'Soirée de gala', included: false }
      ],
      limitations: [
        'Accès limité à 1 jour',
        'Maximum 2 RDV B2B',
        'Pas d\'accès VIP'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Pass',
      subtitle: 'Accès 2 jours',
      price: '350€',
      duration: '2 jours d\'accès',
      color: 'border-purple-200 bg-purple-50',
      headerColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
      textColor: 'text-purple-600',
      buttonColor: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
      popular: true,
      features: [
        { icon: Users, text: 'Tous les avantages Basic', included: true },
        { icon: Star, text: 'Ateliers spécialisés', included: true },
        { icon: Coffee, text: 'Déjeuners de réseautage', included: true },
        { icon: Calendar, text: '5 réunions B2B garanties', included: true },
        { icon: Crown, text: 'Accès salon VIP', included: true },
        { icon: Award, text: 'Documentation premium', included: true },
        { icon: Gift, text: 'Kit de bienvenue', included: true },
        { icon: Music, text: 'Soirée de gala', included: false }
      ],
      limitations: [
        'Accès limité à 2 jours',
        'Pas de service conciergerie'
      ]
    },
    {
      id: 'vip',
      name: 'VIP Pass',
      subtitle: 'Accès 3 jours tout inclus',
      price: '750€',
      duration: '3 jours d\'accès complet',
      color: 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50',
      headerColor: 'bg-gradient-to-r from-yellow-400 to-orange-500',
      textColor: 'text-yellow-600',
      buttonColor: 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700',
      popular: false,
      features: [
        { icon: Crown, text: 'Tous les avantages Premium', included: true },
        { icon: Music, text: 'Soirée de gala', included: true },
        { icon: Star, text: 'Accès aux conférences exclusives', included: true },
        { icon: Users, text: 'Service de conciergerie dédié', included: true },
        { icon: Plane, text: 'Transferts aéroport inclus', included: true },
        { icon: Gift, text: 'Kit VIP premium', included: true },
        { icon: Calendar, text: 'RDV B2B illimités', included: true },
        { icon: Award, text: 'Accès backstage', included: true }
      ],
      limitations: []
    }
  ];

  const handleSelectPackage = async (packageId) => {
    setSelectedPackage(packageId);
    
    // Simuler la mise à jour du forfait
    try {
      await updateUserPackage(packageId);
      alert(`Forfait ${packages.find(p => p.id === packageId)?.name} sélectionné avec succès !`);
    } catch (error) {
      alert('Erreur lors de la sélection du forfait. Veuillez réessayer.');
    }
  };

  const getCurrentPackageInfo = () => {
    if (!user?.visitor_package) return null;
    return packages.find(p => p.id === user.visitor_package);
  };

  const currentPackage = getCurrentPackageInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Forfaits Visiteur SIPORTS 2026
          </h1>
          <p className="text-xl text-slate-600 mb-6">
            Choisissez le forfait qui correspond le mieux à vos besoins et maximisez votre expérience
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>5-7 Février 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>El Jadida, Maroc</span>
            </div>
          </div>

          {/* Current Package Status */}
          {currentPackage && (
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full">
              <Check className="h-4 w-4" />
              <span>Forfait actuel : <strong>{currentPackage.name}</strong></span>
            </div>
          )}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${pkg.color} ${
                selectedPackage === pkg.id ? 'ring-2 ring-cyan-500 shadow-lg' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 text-xs font-semibold">
                  <Sparkles className="inline h-3 w-3 mr-1" />
                  Populaire
                </div>
              )}
              
              <CardHeader className={`${pkg.headerColor} text-white`}>
                <div className="text-center">
                  <CardTitle className="text-xl font-bold mb-2">{pkg.name}</CardTitle>
                  <p className="text-sm opacity-90 mb-4">{pkg.subtitle}</p>
                  <div className="text-3xl font-bold mb-2">{pkg.price}</div>
                  <p className="text-xs opacity-75">{pkg.duration}</p>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border border-gray-300 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-slate-700' : 'text-slate-400'}`}>
                          {feature.text}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {pkg.limitations.length > 0 && (
                  <div className="mb-6 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-xs font-medium text-orange-800 mb-2">Limitations :</p>
                    <ul className="text-xs text-orange-700 space-y-1">
                      {pkg.limitations.map((limitation, index) => (
                        <li key={index}>• {limitation}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button
                  onClick={() => handleSelectPackage(pkg.id)}
                  className={`w-full ${pkg.buttonColor} text-white`}
                  disabled={currentPackage?.id === pkg.id}
                >
                  {currentPackage?.id === pkg.id ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Forfait actuel
                    </>
                  ) : pkg.id === 'free' ? (
                    'S\'inscrire gratuitement'
                  ) : (
                    <>
                      Réserver maintenant
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center">Comparaison détaillée des forfaits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Fonctionnalités</th>
                    {packages.map(pkg => (
                      <th key={pkg.id} className="text-center p-4 font-medium">{pkg.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Durée d'accès</td>
                    <td className="text-center p-4">Limité</td>
                    <td className="text-center p-4">1 jour</td>
                    <td className="text-center p-4">2 jours</td>
                    <td className="text-center p-4">3 jours</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Réunions B2B garanties</td>
                    <td className="text-center p-4">0</td>
                    <td className="text-center p-4">2</td>
                    <td className="text-center p-4">5</td>
                    <td className="text-center p-4">Illimitées</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Accès salon VIP</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">✅</td>
                    <td className="text-center p-4">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Soirée de gala</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Service conciergerie</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">✅</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Package Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Réseautage Premium</h3>
              <p className="text-sm text-slate-600">
                Connectez-vous avec les leaders du secteur portuaire mondial
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Contenu Exclusif</h3>
              <p className="text-sm text-slate-600">
                Accédez aux dernières innovations et tendances du secteur
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Opportunités Business</h3>
              <p className="text-sm text-slate-600">
                Découvrez de nouvelles opportunités d'affaires et partenariats
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact for Custom Package */}
        <Card className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Besoin d'un forfait sur mesure pour votre équipe ?</h3>
            <p className="text-lg mb-6 opacity-90">
              Contactez-nous pour des forfaits groupes et des solutions personnalisées
            </p>
            <Button className="bg-white text-cyan-600 hover:bg-gray-100">
              <Users className="h-4 w-4 mr-2" />
              Nous contacter
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VisitorPackagesPage;