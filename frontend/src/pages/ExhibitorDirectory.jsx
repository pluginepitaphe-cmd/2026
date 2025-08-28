import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  Filter, 
  MapPin, 
  Globe, 
  Mail, 
  Phone,
  Star,
  Users,
  Package,
  Calendar,
  MessageCircle,
  ExternalLink,
  Building,
  Award,
  Eye,
  Heart,
  Share2
} from 'lucide-react';

const ExhibitorDirectory = () => {
  const navigate = useNavigate();
  const [exhibitors, setExhibitors] = useState([]);
  const [filteredExhibitors, setFilteredExhibitors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [favorites, setFavorites] = useState([]);

  const categories = [
    'Équipement lourd',
    'Logiciel',
    'Technologie',
    'Services',
    'Maintenance',
    'Formation',
    'Consulting',
    'Transport',
    'Logistique'
  ];

  const countries = [
    'Maroc',
    'France',
    'Espagne',
    'Italie',
    'Allemagne',
    'Pays-Bas',
    'Belgique',
    'Royaume-Uni'
  ];

  useEffect(() => {
    // Simulation de chargement des données exposants
    const mockExhibitors = [
      {
        id: 1,
        name: 'Maritime Solutions',
        category: 'Équipement lourd',
        country: 'Maroc',
        city: 'Casablanca',
        description: 'Spécialisés dans les solutions portuaires innovantes depuis plus de 20 ans.',
        products: ['Grues automatisées', 'Systèmes de gestion', 'Capteurs IoT'],
        rating: 4.8,
        reviewCount: 24,
        employeeCount: '50-100',
        founded: 2003,
        website: 'maritime-solutions.com',
        email: 'contact@maritime-solutions.com',
        phone: '+212 522 123 456',
        logo: null,
        featured: true,
        certifications: ['ISO 9001', 'ISO 14001'],
        specialties: ['Automatisation', 'IoT', 'Gestion portuaire']
      },
      {
        id: 2,
        name: 'Port Authority of Tangier',
        category: 'Services',
        country: 'Maroc',
        city: 'Tanger',
        description: 'Autorité portuaire leader dans la gestion des infrastructures maritimes.',
        products: ['Gestion portuaire', 'Services logistiques', 'Sécurité maritime'],
        rating: 4.6,
        reviewCount: 18,
        employeeCount: '200+',
        founded: 1995,
        website: 'port-tangier.ma',
        email: 'info@port-tangier.ma',
        phone: '+212 539 456 789',
        logo: null,
        featured: false,
        certifications: ['ISO 9001', 'OHSAS 18001'],
        specialties: ['Infrastructure', 'Logistique', 'Sécurité']
      },
      {
        id: 3,
        name: 'EuroMarine Technologies',
        category: 'Technologie',
        country: 'France',
        city: 'Marseille',
        description: 'Innovation technologique pour l\'industrie maritime européenne.',
        products: ['Systèmes de navigation', 'Équipements de sécurité', 'Solutions digitales'],
        rating: 4.9,
        reviewCount: 31,
        employeeCount: '100-200',
        founded: 1998,
        website: 'euromarine-tech.fr',
        email: 'contact@euromarine-tech.fr',
        phone: '+33 4 91 123 456',
        logo: null,
        featured: true,
        certifications: ['ISO 9001', 'CE', 'IMO'],
        specialties: ['Navigation', 'Sécurité', 'Digital']
      },
      {
        id: 4,
        name: 'Atlantic Logistics',
        category: 'Logistique',
        country: 'Espagne',
        city: 'Barcelone',
        description: 'Solutions logistiques intégrées pour le transport maritime.',
        products: ['Transport maritime', 'Entreposage', 'Distribution'],
        rating: 4.4,
        reviewCount: 12,
        employeeCount: '50-100',
        founded: 2005,
        website: 'atlantic-logistics.es',
        email: 'info@atlantic-logistics.es',
        phone: '+34 93 123 456',
        logo: null,
        featured: false,
        certifications: ['ISO 9001', 'AEO'],
        specialties: ['Transport', 'Entreposage', 'Distribution']
      },
      {
        id: 5,
        name: 'Nordic Port Equipment',
        category: 'Équipement lourd',
        country: 'Pays-Bas',
        city: 'Rotterdam',
        description: 'Fabricant d\'équipements portuaires de haute qualité.',
        products: ['Grues portuaires', 'Équipements de manutention', 'Systèmes automatisés'],
        rating: 4.7,
        reviewCount: 28,
        employeeCount: '100-200',
        founded: 1987,
        website: 'nordic-port.nl',
        email: 'sales@nordic-port.nl',
        phone: '+31 10 123 456',
        logo: null,
        featured: true,
        certifications: ['ISO 9001', 'CE', 'DNV'],
        specialties: ['Équipements lourds', 'Automatisation', 'Maintenance']
      },
      {
        id: 6,
        name: 'Digital Harbor Solutions',
        category: 'Logiciel',
        country: 'Allemagne',
        city: 'Hambourg',
        description: 'Solutions logicielles avancées pour la digitalisation portuaire.',
        products: ['Logiciels de gestion', 'IA et Big Data', 'Plateformes collaboratives'],
        rating: 4.8,
        reviewCount: 22,
        employeeCount: '20-50',
        founded: 2010,
        website: 'digital-harbor.de',
        email: 'contact@digital-harbor.de',
        phone: '+49 40 123 456',
        logo: null,
        featured: false,
        certifications: ['ISO 27001', 'GDPR'],
        specialties: ['Logiciels', 'IA', 'Big Data']
      }
    ];

    setExhibitors(mockExhibitors);
    setFilteredExhibitors(mockExhibitors);
  }, []);

  useEffect(() => {
    let filtered = exhibitors.filter(exhibitor => {
      const matchesSearch = exhibitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           exhibitor.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           exhibitor.specialties.some(specialty => 
                             specialty.toLowerCase().includes(searchTerm.toLowerCase())
                           );
      const matchesCategory = selectedCategory === 'all' || exhibitor.category === selectedCategory;
      const matchesCountry = selectedCountry === 'all' || exhibitor.country === selectedCountry;
      
      return matchesSearch && matchesCategory && matchesCountry;
    });

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'founded':
          return b.founded - a.founded;
        case 'featured':
          return b.featured - a.featured;
        default:
          return 0;
      }
    });

    setFilteredExhibitors(filtered);
  }, [exhibitors, searchTerm, selectedCategory, selectedCountry, sortBy]);

  const toggleFavorite = (exhibitorId) => {
    setFavorites(prev => 
      prev.includes(exhibitorId) 
        ? prev.filter(id => id !== exhibitorId)
        : [...prev, exhibitorId]
    );
  };

  const handleViewMiniSite = (exhibitor) => {
    // Naviguer vers le profil de l'exposant avec React Router
    navigate(`/exposants/${exhibitor.id}`);
  };

  const handleContact = (exhibitor) => {
    // Rediriger vers la page de contact avec les informations pré-remplies
    const subject = `Contact depuis SIPORTS - ${exhibitor.name}`;
    const body = `Bonjour,\n\nJe souhaite entrer en contact avec votre entreprise ${exhibitor.name} suite à votre présence au salon SIPORTS.\n\nCordialement`;
    navigate(`/contact?to=${encodeURIComponent(exhibitor.email)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const handleRequestMeeting = (exhibitor) => {
    // Rediriger vers le calendrier avec l'exposant sélectionné
    navigate(`/calendrier?exhibitor=${exhibitor.id}&name=${encodeURIComponent(exhibitor.name)}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Annuaire des Exposants
        </h1>
        <p className="text-muted-foreground">
          Découvrez nos {exhibitors.length} exposants et partenaires du salon maritime
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-600">{exhibitors.length}</div>
              <div className="text-sm text-muted-foreground">Exposants</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-600">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Catégories</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-600">{countries.length}</div>
              <div className="text-sm text-muted-foreground">Pays</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-600">{exhibitors.filter(e => e.featured).length}</div>
              <div className="text-sm text-muted-foreground">Partenaires</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filtres et Recherche
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <Label htmlFor="search">Rechercher</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Nom, description, spécialités..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label>Catégorie</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes catégories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Pays</Label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous pays</SelectItem>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Trier par</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nom A-Z</SelectItem>
                  <SelectItem value="rating">Note</SelectItem>
                  <SelectItem value="founded">Plus récent</SelectItem>
                  <SelectItem value="featured">Partenaires</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Résultats */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-muted-foreground">
          {filteredExhibitors.length} résultat{filteredExhibitors.length > 1 ? 's' : ''} trouvé{filteredExhibitors.length > 1 ? 's' : ''}
        </p>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {favorites.length} favoris
          </Badge>
        </div>
      </div>

      {/* Liste des exposants */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredExhibitors.map((exhibitor) => (
          <Card key={exhibitor.id} className={`hover:shadow-lg transition-all duration-300 ${exhibitor.featured ? 'ring-2 ring-cyan-500/20' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    {exhibitor.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold">{exhibitor.name}</h3>
                      {exhibitor.featured && (
                        <Badge className="bg-gradient-to-r from-cyan-500 to-teal-600">
                          <Star className="h-3 w-3 mr-1" />
                          Partenaire
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {exhibitor.city}, {exhibitor.country}
                      </div>
                      <div className="flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        {exhibitor.employeeCount}
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(exhibitor.id)}
                  className={favorites.includes(exhibitor.id) ? 'text-red-500' : ''}
                >
                  <Heart className={`h-4 w-4 ${favorites.includes(exhibitor.id) ? 'fill-current' : ''}`} />
                </Button>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">{exhibitor.description}</p>

                <div className="flex items-center gap-2">
                  <Badge variant="outline">{exhibitor.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{exhibitor.rating}</span>
                    <span className="text-xs text-muted-foreground">({exhibitor.reviewCount})</span>
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Spécialités</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {exhibitor.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Produits principaux</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {exhibitor.products.slice(0, 3).map((product, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Package className="h-2 w-2 mr-1" />
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      <span>{exhibitor.website}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      <span>{exhibitor.certifications.length} certifications</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewMiniSite(exhibitor)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Voir profil
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleContact(exhibitor)}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRequestMeeting(exhibitor)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    RDV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExhibitors.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Aucun exposant ne correspond à vos critères de recherche
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedCountry('all');
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExhibitorDirectory;

