import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Trash2, 
  AlertTriangle, 
  RefreshCw,
  Eye
} from 'lucide-react'
import { toast } from 'sonner'
import apiClient from '@/lib/api'

export default function Reports() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    loadReports()
  }, [page])

  const loadReports = async () => {
    try {
      setLoading(true)
      const response = await apiClient.getReports(page, 10)
      setReports(response.data.reports)
      setTotalPages(response.data.pages)
    } catch (error) {
      toast.error('Erreur lors du chargement des signalements')
      console.error('Error loading reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReportAction = async (reportId, action) => {
    try {
      await apiClient.handleReport(reportId, action)
      
      let message = ''
      switch (action) {
        case 'supprimer_contenu':
          message = 'Contenu supprimé avec succès'
          break
        case 'avertir_utilisateur':
          message = 'Utilisateur averti avec succès'
          break
        case 'ignorer':
          message = 'Signalement ignoré'
          break
        default:
          message = 'Action effectuée avec succès'
      }
      
      toast.success(message)
      loadReports() // Recharger les données
    } catch (error) {
      toast.error('Erreur lors du traitement du signalement')
      console.error('Error handling report:', error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <span>Modération des signalements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Aucun signalement en attente
              </p>
            ) : (
              reports.map((report) => (
                <div key={report.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium">
                          Utilisateur signalé: {report.user_signale?.prenom} {report.user_signale?.nom}
                        </h3>
                        <Badge variant="outline" className="text-orange-600">
                          {report.statut}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <p><strong>Email:</strong> {report.user_signale?.email}</p>
                        <p><strong>Raison:</strong> {report.raison}</p>
                        {report.description && (
                          <p><strong>Description:</strong> {report.description}</p>
                        )}
                        <p><strong>Date du signalement:</strong> {formatDate(report.date_signalement)}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleReportAction(report.id, 'supprimer_contenu')}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Supprimer contenu
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-orange-600 hover:text-orange-700"
                        onClick={() => handleReportAction(report.id, 'avertir_utilisateur')}
                      >
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Avertir utilisateur
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-600 hover:text-gray-700"
                        onClick={() => handleReportAction(report.id, 'ignorer')}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ignorer
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Précédent
              </Button>
              
              <span className="text-sm text-gray-500">
                Page {page} sur {totalPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
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

