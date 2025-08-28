import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Users,
  Handshake,
  Star
} from 'lucide-react';

const PartnersPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('PartnersPage mounted');
  }, []);
  
  // Données de démonstration des partenaires
  const partners = [
    {
      id: 1,
      slug: "port-authority-morocco",
      name: "Port Authority of Morocco",
      type: "Institutionnel",
      description: "Autorité portuaire nationale supervisant le développement et la gestion des ports marocains.",
      location: "Casablanca, Maroc",
      website: "www.portauthority.ma",
      email: "contact@portauthority.ma",
      phone: "+212 522 123 456",
      logo: "🏛️",
      services: ["Gestion portuaire", "Développement infrastructure", "Réglementation"],
      rating: 5,
      featured: true
    },
    {
      id: 2,
      slug: "mediterranean-shipping",
      name: "Mediterranean Shipping Company",
      type: "Transport Maritime",
      description: "Leader mondial du transport maritime et de la logistique avec une forte présence en Méditerranée.",
      location: "Tanger, Maroc",
      website: "www.msc.com",
      email: "morocco@msc.com",
      phone: "+212 539 987 654",
      logo: "🚢",
      services: ["Transport conteneurs", "Logistique", "Services portuaires"],
      rating: 4,
      featured: true
    },
    {
      id: 3,
      slug: "techport-solutions",
      name: "TechPort Solutions",
      type: "Technologie",
      description: "Solutions technologiques innovantes pour la digitalisation des opérations portuaires.",
      location: "Rabat, Maroc",
      website: "www.techport.ma",
      email: "info@techport.ma",
      phone: "+212 537 456 789",
      logo: "💻",
      services: ["Digitalisation", "IoT portuaire", "Systèmes de gestion"],
      rating: 4,
      featured: false
    },
    {
      id: 4,
      name: "Green Marine Initiative",
      type: "Environnement",
      description: "Organisation dédiée au développement durable et à la protection environnementale dans le secteur maritime.",
      location: "El Jadida, Maroc",
      website: "www.greenmarine.org",
      email: "contact@greenmarine.org",
      phone: "+212 523 321 654",
      logo: "🌱",
      services: ["Conseil environnemental", "Certification verte", "Formation"],
      rating: 5,
      featured: false
    },
    {
      id: 5,
      name: "Atlantic Logistics Hub",
      type: "Logistique",
      description: "Hub logistique spécialisé dans les solutions de stockage et distribution pour le commerce international.",
      location: "Agadir, Maroc",
      website: "www.atlanticlogistics.ma",
      email: "operations@atlanticlogistics.ma",
      phone: "+212 528 789 123",
      logo: "📦",
      services: ["Entreposage", "Distribution", "Transit douanier"],
      rating: 4,
      featured: false
    },
    {
      id: 6,
      name: "Maritime Training Center",
      type: "Formation",
      description: "Centre de formation spécialisé dans les métiers maritimes et portuaires.",
      location: "Mohammedia, Maroc",
      website: "www.maritimetraining.ma",
      email: "formation@maritimetraining.ma",
      phone: "+212 523 654 987",
      logo: "🎓",
      services: ["Formation maritime", "Certification", "Développement des compétences"],
      rating: 4,
      featured: false
    }
  ];

  const partnerTypes = ["Tous", "Institutionnel", "Transport Maritime", "Technologie", "Environnement", "Logistique", "Formation"];
  const [selectedType, setSelectedType] = React.useState("Tous");

  const filteredPartners = selectedType === "Tous" 
    ? partners 
    : partners.filter(partner => partner.type === selectedType);

  const featuredPartners = partners.filter(partner => partner.featured);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Handshake className="h-12 w-12 text-primary mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Nos Partenaires</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre écosystème de partenaires stratégiques qui contribuent au succès de SIPORTS 
            et au développement du secteur maritime au Maroc et en Afrique.
          </p>
        </div>

        {/* Partenaires en vedette */}
        {featuredPartners.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Star className="h-6 w-6 text-yellow-400 mr-2" />
              Partenaires en Vedette
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPartners.map(partner => (
                <Card key={partner.id} className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{partner.logo}</div>
                        <div>
                          <CardTitle className="text-xl">{partner.name}</CardTitle>
                          <Badge variant="secondary" className="mt-1">{partner.type}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {renderStars(partner.rating)}
                      </div>
                    </div>
                    <CardDescription className="text-sm mt-2">
                      {partner.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {partner.location}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {partner.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Globe className="h-4 w-4 mr-1" />
                            Site Web
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="h-4 w-4 mr-1" />
                            Contact
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Filtres */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Users className="h-6 w-6 text-primary mr-2" />
            Tous nos Partenaires
          </h2>
          <div className="flex flex-wrap gap-2">
            {partnerTypes.map(type => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                onClick={() => setSelectedType(type)}
                className="mb-2"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Liste des partenaires */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map(partner => (
            <Card key={partner.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{partner.logo}</div>
                    <div>
                      <CardTitle className="text-lg">{partner.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1">{partner.type}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderStars(partner.rating)}
                  </div>
                </div>
                <CardDescription className="text-sm mt-2">
                  {partner.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {partner.location}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {partner.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      {partner.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Globe className="h-4 w-4 mr-2" />
                      {partner.website}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {partner.services.map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Button 
                      className="w-full" 
                      size="sm"
                      onClick={() => navigate(`/partenaires/${partner.slug}`)}
                    >
                      <Building2 className="h-4 w-4 mr-2" />
                      Voir le Profil
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section d'appel à l'action */}
        <div className="mt-16 bg-primary rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-primary-foreground mb-4">
            Devenir Partenaire SIPORTS
          </h3>
          <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            Rejoignez notre réseau de partenaires et participez au développement 
            de l'écosystème maritime au Maroc et en Afrique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              <Handshake className="h-5 w-5 mr-2" />
              Devenir Partenaire
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Mail className="h-5 w-5 mr-2" />
              Nous Contacter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersPage;

