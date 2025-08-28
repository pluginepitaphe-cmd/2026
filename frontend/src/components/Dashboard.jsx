import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  UserPlus, 
  RefreshCw,
  Eye,
  Check,
  X
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { toast } from 'sonner'
import apiClient from '@/lib/api'
import UserDetailsDialog from './UserDetailsDialog'
import RejectUserDialog from './RejectUserDialog'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [pendingUsers, setPendingUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState(null)
  const [showUserDetails, setShowUserDetails] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [userToReject, setUserToReject] = useState(null)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const [statsResponse, usersResponse] = await Promise.all([
        apiClient.getDashboardStats(),
        apiClient.getPendingUsers(1, 10)
      ])
      
      setStats(statsResponse.data)
      setPendingUsers(usersResponse.data.users)
    } catch (error) {
      toast.error('Erreur lors du chargement des données')
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleValidateUser = async (userId) => {
    try {
      await apiClient.validateUser(userId)
      toast.success('Utilisateur validé avec succès')
      loadDashboardData() // Recharger les données
    } catch (error) {
      toast.error('Erreur lors de la validation')
      console.error('Error validating user:', error)
    }
  }

  const handleRejectUser = async (userId, reason, comment) => {
    try {
      await apiClient.rejectUser(userId, reason, comment)
      toast.success('Utilisateur rejeté avec succès')
      setShowRejectDialog(false)
      setUserToReject(null)
      loadDashboardData() // Recharger les données
    } catch (error) {
      toast.error('Erreur lors du rejet')
      console.error('Error rejecting user:', error)
    }
  }

  const openRejectDialog = (user) => {
    setUserToReject(user)
    setShowRejectDialog(true)
  }

  const openUserDetails = (user) => {
    setSelectedUser(user)
    setShowUserDetails(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* KPI Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Validés</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats?.valides || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats?.en_attente || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejetés</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats?.rejetes || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inscrits 24h</CardTitle>
            <UserPlus className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats?.inscrits_24h || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Modifs récentes</CardTitle>
            <RefreshCw className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats?.modifs_recentes || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Graphique des validations/rejets */}
      <Card>
        <CardHeader>
          <CardTitle>Validations et rejets (7 derniers jours)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats?.graphique_7_jours || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="validations" fill="#10b981" name="Validations" />
              <Bar dataKey="rejets" fill="#ef4444" name="Rejets" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* File d'attente de validation */}
      <Card>
        <CardHeader>
          <CardTitle>File d'attente de validation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingUsers.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Aucun utilisateur en attente de validation
              </p>
            ) : (
              pendingUsers.map((user) => (
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
                      <Badge variant="outline">
                        {user.type_utilisateur}
                      </Badge>
                      <div className="text-sm text-gray-500">
                        Profil: {user.taux_completion_profil}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openUserDetails(user)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Détails
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 hover:text-green-700"
                      onClick={() => handleValidateUser(user.id)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Valider
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => openRejectDialog(user)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Rejeter
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <UserDetailsDialog
        user={selectedUser}
        open={showUserDetails}
        onOpenChange={setShowUserDetails}
      />
      
      <RejectUserDialog
        user={userToReject}
        open={showRejectDialog}
        onOpenChange={setShowRejectDialog}
        onReject={handleRejectUser}
      />
    </div>
  )
}

