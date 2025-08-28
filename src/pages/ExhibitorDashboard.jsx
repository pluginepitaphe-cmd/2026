import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AIRecommendationsEngine from '@/components/ai/AIRecommendationsEngine';
import { 
  Building, 
  Package, 
  Calendar, 
  Users, 
  TrendingUp, 
  Eye, 
  Edit, 
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  FileText,
  Settings,
  Globe,
  Brain,
  Sparkles
} from 'lucide-react';
import { useAuth, USER_TYPES, APPROVAL_STATUS } from '@/contexts/AuthContext';

const ExhibitorDashboard = () => {
  const { user } = useAuth();
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [stats, setStats] = useState({
    products: 8,
    views: 245,
    contacts: 12,
    appointments: 5
  });

  // Calculer le pourcentage de completion du profil
  useEffect(() => {
    let completion = 0;
    if (user?.first_name && user?.last_name) completion += 20;
    if (user?.email) completion += 20;
    if (user?.company) completion += 20;
    if (user?.phone) completion += 20;
    if (user?.bio) completion += 20;
    
    setProfileCompletion(completion);
  }, [user]);

  const getStatusBadge = (status) => {
    switch (status) {
      case APPROVAL_STATUS.PENDING:
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><Clock className="h-3 w-3 mr-1" />En attente</Badge>;
      case APPROVAL_STATUS.APPROVED:
        return <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="h-3 w-3 mr-1" />Approuvé</Badge>;
      case APPROVAL_STATUS.REJECTED:
        return <Badge variant="outline" className="text-red-600 border-red-600"><AlertCircle className="h-3 w-3 mr-1" />Rejeté</Badge>;
      default:
        return null;
    }
  };

  const quickActions = [
    {
      title: 'Ajouter un produit',
      description: 'Enrichissez votre catalogue',
      icon: Plus,
      action: '/products/add',
      color: 'bg-blue-500'
    },
    {
      title: 'Personnaliser mon mini-site',
      description: 'Modifiez votre présentation',
      icon: Edit,
      action: '/mini-site',
      color: 'bg-purple-500'
    },
    {
      title: 'Gérer mon calendrier',
      description: 'Disponibilités pour RDV',
      icon: Calendar,
      action: '/calendar',
      color: 'bg-green-500'
    },
    {
      title: 'Voir mon mini-site',
      description: 'Aperçu public',
      icon: Globe,
      action: '/mini-site/preview',
      color: 'bg-orange-500'
    }
  ];

  const recentProducts = [
    {
      id: 1,
      name: 'Grue portuaire automatisée',
      category: 'Équipement lourd',
      status: 'Publié',
      views: 45,
      image: '/api/placeholder/100/100'
    },
    {
      id: 2,
      name: 'Système de gestion des conteneurs',
      category: 'Logiciel',
      status: 'Brouillon',
      views: 0,
      image: '/api/placeholder/100/100'
    },
    {
      id: 3,
      name: 'Capteurs IoT pour surveillance',
      category: 'Technologie',
      status: 'Publié',
      views: 23,
      image: '/api/placeholder/100/100'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      company: 'Port Authority of Tangier',
      contact: 'Hassan El Amrani',
      date: '2025-01-15',
      time: '14:00',
      type: 'Présentation produit'
    },
    {
      id: 2,
      company: 'Maritime Logistics Co.',
      contact: 'Fatima Zahra',
      date: '2025-01-16',
      time: '10:30',
      type: 'Négociation commerciale'
    }
  ];

  if (user?.user_type !== USER_TYPES.EXHIBITOR && user?.user_type !== USER_TYPES.PARTNER) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>
            Accès refusé. Cette page est réservée aux exposants et partenaires.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* En-tête avec statut du compte */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Tableau de bord {user?.user_type === USER_TYPES.EXHIBITOR ? 'Exposant' : 'Partenaire'}
            </h1>
            <p className="text-muted-foreground">
              Bienvenue {user?.first_name} {user?.last_name} - {user?.company}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {getStatusBadge(user?.approval_status || APPROVAL_STATUS.APPROVED)}
            <Badge variant="secondary" className="capitalize">
              {user?.user_type === USER_TYPES.EXHIBITOR ? 'Exposant' : 'Partenaire'}
            </Badge>
          </div>
        </div>

        {user?.approval_status === APPROVAL_STATUS.PENDING && (
          <Alert className="mt-4">
            <Clock className="h-4 w-4" />
            <AlertDescription>
              Votre compte est en attente d'approbation. Vous recevrez un email de confirmation une fois validé par notre équipe.
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{stats.products}</p>
                <p className="text-sm text-muted-foreground">Produits</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{stats.views}</p>
                <p className="text-sm text-muted-foreground">Vues profil</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{stats.contacts}</p>
                <p className="text-sm text-muted-foreground">Contacts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{stats.appointments}</p>
                <p className="text-sm text-muted-foreground">RDV prévus</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recommandations IA */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-600" />
                Recommandations IA
                <Badge className="ml-2 bg-purple-100 text-purple-700">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Nouveau
                </Badge>
              </CardTitle>
              <CardDescription>
                Suggestions personnalisées pour optimiser votre présence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AIRecommendationsEngine />
            </CardContent>
          </Card>

          {/* Completion du profil */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Completion du profil
              </CardTitle>
              <CardDescription>
                Complétez votre profil pour maximiser votre visibilité
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progression</span>
                  <span className="text-sm text-muted-foreground">{profileCompletion}%</span>
                </div>
                <Progress value={profileCompletion} className="w-full" />
                {profileCompletion < 100 && (
                  <div className="text-sm text-muted-foreground">
                    <p>Pour compléter votre profil :</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      {!user?.bio && <li>Ajoutez une description de votre entreprise</li>}
                      {profileCompletion < 80 && <li>Complétez vos informations de contact</li>}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions rapides */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
              <CardDescription>
                Accès direct aux fonctionnalités principales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-start space-y-2"
                      onClick={() => console.log(`Navigate to ${action.action}`)}
                    >
                      <div className="flex items-center w-full">
                        <div className={`p-2 rounded-md ${action.color} text-white mr-3`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{action.title}</div>
                          <div className="text-xs text-muted-foreground">{action.description}</div>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Produits récents */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Produits récents
                  </CardTitle>
                  <CardDescription>
                    Vos derniers produits ajoutés
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div key={product.id} className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={product.status === 'Publié' ? 'default' : 'secondary'} className="text-xs">
                          {product.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {product.views} vues
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Colonne latérale */}
        <div className="space-y-6">
          {/* Rendez-vous à venir */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Prochains RDV
              </CardTitle>
              <CardDescription>
                Vos rendez-vous planifiés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-3 border rounded-lg">
                    <div className="font-medium text-sm">{appointment.company}</div>
                    <div className="text-sm text-muted-foreground">{appointment.contact}</div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs text-muted-foreground">
                        {new Date(appointment.date).toLocaleDateString('fr-FR')} à {appointment.time}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {appointment.type}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Gérer le calendrier
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Activité récente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Activité récente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Nouveau contact de <strong>Port de Rabat</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Produit <strong>Grue automatisée</strong> consulté 5 fois</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Mini-site mis à jour</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>RDV confirmé avec <strong>Maritime Logistics</strong></span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Aide et support */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Aide & Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Guide d'utilisation
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Contacter le support
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Paramètres du compte
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExhibitorDashboard;

