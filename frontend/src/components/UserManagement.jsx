import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Search, 
  Download, 
  Mail, 
  UserX,
  RefreshCw 
} from 'lucide-react'
import { toast } from 'sonner'
import apiClient from '@/lib/api'

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    status: '',
    page: 1,
    perPage: 20
  })
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    loadUsers()
  }, [filters])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const response = await apiClient.getUsers(filters)
      setUsers(response.data.users)
      setTotalPages(response.data.pages)
    } catch (error) {
      toast.error('Erreur lors du chargement des utilisateurs')
      console.error('Error loading users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemindUser = async (userId) => {
    try {
      await apiClient.remindUser(userId)
      toast.success('Rappel envoyé avec succès')
    } catch (error) {
      toast.error('Erreur lors de l\'envoi du rappel')
      console.error('Error sending reminder:', error)
    }
  }

  const handleDeactivateUser = async (userId) => {
    try {
      await apiClient.deactivateUser(userId)
      toast.success('Utilisateur désactivé avec succès')
      loadUsers() // Recharger les données
    } catch (error) {
      toast.error('Erreur lors de la désactivation')
      console.error('Error deactivating user:', error)
    }
  }

  const handleExportCSV = async () => {
    try {
      const response = await apiClient.exportUsers({
        type: filters.type,
        status: filters.status
      })
      
      // Créer et télécharger le fichier CSV
      const blob = new Blob([response.data.csv_content], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = response.data.filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      toast.success('Export CSV téléchargé avec succès')
    } catch (error) {
      toast.error('Erreur lors de l\'export')
      console.error('Error exporting CSV:', error)
    }
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestion des utilisateurs</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filtres */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom, email, société..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select
              value={filters.type}
              onValueChange={(value) => setFilters({ ...filters, type: value, page: 1 })}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Type d'utilisateur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les types</SelectItem>
                <SelectItem value="exposant">Exposant</SelectItem>
                <SelectItem value="partenaire">Partenaire</SelectItem>
                <SelectItem value="visiteur">Visiteur</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.status}
              onValueChange={(value) => setFilters({ ...filters, status: value, page: 1 })}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les statuts</SelectItem>
                <SelectItem value="valide">Validé</SelectItem>
                <SelectItem value="en_attente">En attente</SelectItem>
                <SelectItem value="rejete">Rejeté</SelectItem>
                <SelectItem value="desactive">Désactivé</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleExportCSV} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>

          {/* Liste des utilisateurs */}
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="space-y-4">
              {users.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Aucun utilisateur trouvé
                </p>
              ) : (
                users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div>
                          <h3 className="font-medium">{user.prenom} {user.nom}</h3>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          {user.societe && (
                            <p className="text-sm text-gray-500">{user.societe}</p>
                          )}
                        </div>
                        <Badge className={getTypeColor(user.type_utilisateur)}>
                          {user.type_utilisateur}
                        </Badge>
                        <Badge className={getStatusColor(user.statut)}>
                          {user.statut.replace('_', ' ')}
                        </Badge>
                        <div className="text-sm text-gray-500">
                          Profil: {user.taux_completion_profil}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {user.statut === 'en_attente' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemindUser(user.id)}
                        >
                          <Mail className="h-4 w-4 mr-1" />
                          Relancer
                        </Button>
                      )}
                      
                      {user.statut === 'valide' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeactivateUser(user.id)}
                        >
                          <UserX className="h-4 w-4 mr-1" />
                          Désactiver
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                disabled={filters.page === 1}
                onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
              >
                Précédent
              </Button>
              
              <span className="text-sm text-gray-500">
                Page {filters.page} sur {totalPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                disabled={filters.page === totalPages}
                onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
              >
                Suivant
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

