import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Calendar, Mail, Phone, Building, FileText } from 'lucide-react'

export default function UserDetailsDialog({ user, open, onOpenChange }) {
  if (!user) return null

  const formatDate = (dateString) => {
    if (!dateString) return 'Non défini'
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'valide':
        return 'bg-green-100 text-green-800'
      case 'en_attente':
        return 'bg-orange-100 text-orange-800'
      case 'rejete':
        return 'bg-red-100 text-red-800'
      case 'desactive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'exposant':
        return 'bg-blue-100 text-blue-800'
      case 'partenaire':
        return 'bg-purple-100 text-purple-800'
      case 'visiteur':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const documents = user.documents_joints ? JSON.parse(user.documents_joints) : []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Détails de l'utilisateur</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Informations principales */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg">{user.prenom} {user.nom}</h3>
              <div className="flex items-center space-x-2 mt-2">
                <Badge className={getStatusColor(user.statut)}>
                  {user.statut.replace('_', ' ')}
                </Badge>
                <Badge className={getTypeColor(user.type_utilisateur)}>
                  {user.type_utilisateur}
                </Badge>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-500">Taux de complétion</div>
              <div className="text-2xl font-bold text-blue-600">{user.taux_completion_profil}%</div>
              <Progress value={user.taux_completion_profil} className="mt-2" />
            </div>
          </div>

          {/* Informations de contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{user.email}</span>
              </div>
              
              {user.telephone && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{user.telephone}</span>
                </div>
              )}
              
              {user.societe && (
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{user.societe}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div className="text-sm">
                  <div className="font-medium">Inscription</div>
                  <div className="text-gray-500">{formatDate(user.date_inscription)}</div>
                </div>
              </div>
              
              {user.date_validation && (
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div className="text-sm">
                    <div className="font-medium">Validation</div>
                    <div className="text-gray-500">{formatDate(user.date_validation)}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Documents joints */}
          {documents.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Documents joints</h4>
              <div className="space-y-2">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Informations de rejet */}
          {user.statut === 'rejete' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-medium text-red-800 mb-2">Raison du rejet</h4>
              <p className="text-sm text-red-700">{user.raison_rejet}</p>
              {user.commentaire_rejet && (
                <p className="text-sm text-red-600 mt-2">{user.commentaire_rejet}</p>
              )}
            </div>
          )}

          {/* Dernière modification */}
          <div className="text-xs text-gray-500 border-t pt-4">
            Dernière modification: {formatDate(user.date_derniere_modification)}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

