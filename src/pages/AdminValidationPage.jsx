import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Mail, 
  Building, 
  Phone,
  Eye,
  MessageSquare
} from 'lucide-react';
import { useAuth, USER_TYPES, APPROVAL_STATUS } from '@/contexts/AuthContext';

const AdminValidationPage = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [actionType, setActionType] = useState(''); // 'approve' or 'reject'
  const [rejectionReason, setRejectionReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Données de démonstration pour les utilisateurs en attente
  useEffect(() => {
    const demoUsers = [
      {
        id: 4,
        firstName: 'Ahmed',
        lastName: 'Benali',
        email: 'ahmed.benali@portcasablanca.ma',
        company: 'Port de Casablanca',
        phone: '+212 522 123 456',
        type: USER_TYPES.EXHIBITOR,
        description: 'Autorité portuaire de Casablanca, spécialisée dans la gestion des infrastructures portuaires et la logistique maritime.',
        approvalStatus: APPROVAL_STATUS.PENDING,
        createdAt: '2025-01-10T10:30:00Z',
        documents: ['business_license.pdf', 'company_profile.pdf']
      },
      {
        id: 5,
        firstName: 'Fatima',
        lastName: 'El Mansouri',
        email: 'f.elmansouri@maritimetech.com',
        company: 'Maritime Tech Solutions',
        phone: '+212 661 234 567',
        type: USER_TYPES.PARTNER,
        description: 'Société spécialisée dans les solutions technologiques pour l\'industrie maritime et portuaire. Développement de systèmes de gestion portuaire.',
        approvalStatus: APPROVAL_STATUS.PENDING,
        createdAt: '2025-01-09T14:15:00Z',
        documents: ['tech_portfolio.pdf']
      },
      {
        id: 6,
        firstName: 'Mohamed',
        lastName: 'Alami',
        email: 'm.alami@oceanlogistics.ma',
        company: 'Ocean Logistics',
        phone: '+212 537 345 678',
        type: USER_TYPES.EXHIBITOR,
        description: 'Entreprise de logistique maritime offrant des services de transport, stockage et manutention portuaire.',
        approvalStatus: APPROVAL_STATUS.PENDING,
        createdAt: '2025-01-08T09:45:00Z',
        documents: ['logistics_license.pdf', 'certifications.pdf']
      },
      {
        id: 7,
        firstName: 'Aicha',
        lastName: 'Tazi',
        email: 'a.tazi@greenport.org',
        company: 'Green Port Initiative',
        phone: '+212 524 456 789',
        type: USER_TYPES.PARTNER,
        description: 'Organisation dédiée au développement durable dans l\'industrie portuaire. Promotion des technologies vertes et des pratiques écologiques.',
        approvalStatus: APPROVAL_STATUS.PENDING,
        createdAt: '2025-01-07T16:20:00Z',
        documents: ['sustainability_report.pdf', 'green_certifications.pdf']
      }
    ];
    setPendingUsers(demoUsers);
  }, []);

  const handleAction = (user, action) => {
    setSelectedUser(user);
    setActionType(action);
    setShowDialog(true);
    setRejectionReason('');
  };

  const confirmAction = async () => {
    setIsLoading(true);
    
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mettre à jour la liste des utilisateurs
      setPendingUsers(prev => prev.filter(u => u.id !== selectedUser.id));
      
      // Simulation d'envoi d'email
      console.log(`Email ${actionType === 'approve' ? 'approbation' : 'rejet'} envoyé à ${selectedUser.email}`);
      
      setShowDialog(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Erreur lors de l\'action:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case APPROVAL_STATUS.PENDING:
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><Clock className="h-3 w-3 mr-1" />En attente</Badge>;
      case APPROVAL_STATUS.APPROVED:
        return <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="h-3 w-3 mr-1" />Approuvé</Badge>;
      case APPROVAL_STATUS.REJECTED:
        return <Badge variant="outline" className="text-red-600 border-red-600"><XCircle className="h-3 w-3 mr-1" />Rejeté</Badge>;
      default:
        return null;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case USER_TYPES.EXHIBITOR:
        return 'Exposant';
      case USER_TYPES.PARTNER:
        return 'Partenaire';
      default:
        return type;
    }
  };

  if (user?.type !== USER_TYPES.ADMIN) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>
            Accès refusé. Cette page est réservée aux administrateurs.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Administration - Validation des Comptes
        </h1>
        <p className="text-muted-foreground">
          Gérez les demandes d'inscription des exposants et partenaires
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{pendingUsers.length}</p>
                <p className="text-sm text-muted-foreground">En attente</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Approuvés</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Rejetés</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des utilisateurs en attente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Demandes en attente de validation
          </CardTitle>
          <CardDescription>
            Examinez et validez les demandes d'inscription des exposants et partenaires
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingUsers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucune demande en attente</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingUsers.map((user) => (
                <Card key={user.id} className="border-l-4 border-l-yellow-500">
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">
                            {user.firstName} {user.lastName}
                          </h3>
                          {getStatusBadge(user.approvalStatus)}
                          <Badge variant="secondary">{getTypeLabel(user.type)}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            {user.email}
                          </div>
                          <div className="flex items-center">
                            <Building className="h-4 w-4 mr-2" />
                            {user.company}
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            {user.phone}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        
                        {user.description && (
                          <p className="mt-3 text-sm text-foreground bg-muted/50 p-3 rounded">
                            {user.description}
                          </p>
                        )}
                        
                        {user.documents && user.documents.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium mb-1">Documents fournis:</p>
                            <div className="flex flex-wrap gap-2">
                              {user.documents.map((doc, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAction(user, 'view')}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Détails
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleAction(user, 'approve')}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approuver
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleAction(user, 'reject')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Rejeter
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog de confirmation */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'approve' ? 'Approuver le compte' : 'Rejeter le compte'}
            </DialogTitle>
            <DialogDescription>
              {actionType === 'approve' 
                ? `Êtes-vous sûr de vouloir approuver le compte de ${selectedUser?.firstName} ${selectedUser?.lastName} ?`
                : `Êtes-vous sûr de vouloir rejeter le compte de ${selectedUser?.firstName} ${selectedUser?.lastName} ?`
              }
            </DialogDescription>
          </DialogHeader>
          
          {actionType === 'reject' && (
            <div className="space-y-2">
              <Label htmlFor="rejectionReason">Raison du rejet (optionnel)</Label>
              <Textarea
                id="rejectionReason"
                placeholder="Expliquez la raison du rejet..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Annuler
            </Button>
            <Button
              variant={actionType === 'approve' ? 'default' : 'destructive'}
              onClick={confirmAction}
              disabled={isLoading}
            >
              {isLoading ? 'Traitement...' : (actionType === 'approve' ? 'Approuver' : 'Rejeter')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminValidationPage;

