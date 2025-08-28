import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const REJECTION_REASONS = [
  { value: 'EMAIL_INVALIDE', label: 'Email invalide' },
  { value: 'PROFIL_INCOMPLET', label: 'Profil incomplet' },
  { value: 'DOCUMENT_MANQUANT', label: 'Document manquant' },
]

export default function RejectUserDialog({ user, open, onOpenChange, onReject }) {
  const [reason, setReason] = useState('')
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!reason) return

    setLoading(true)
    try {
      await onReject(user.id, reason, comment)
      // Reset form
      setReason('')
      setComment('')
    } catch (error) {
      console.error('Error rejecting user:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenChange = (newOpen) => {
    if (!loading) {
      onOpenChange(newOpen)
      if (!newOpen) {
        // Reset form when closing
        setReason('')
        setComment('')
      }
    }
  }

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rejeter l'utilisateur</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Vous êtes sur le point de rejeter le compte de{' '}
              <span className="font-medium">{user.prenom} {user.nom}</span>{' '}
              ({user.email}).
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Raison du rejet *</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une raison" />
              </SelectTrigger>
              <SelectContent>
                {REJECTION_REASONS.map((reasonOption) => (
                  <SelectItem key={reasonOption.value} value={reasonOption.value}>
                    {reasonOption.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Commentaire (optionnel)</Label>
            <Textarea
              id="comment"
              placeholder="Ajoutez des détails supplémentaires..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
          </div>

          <div className="text-xs text-gray-500">
            Un email sera automatiquement envoyé à l'utilisateur avec la raison du rejet.
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={loading}
          >
            Annuler
          </Button>
          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={!reason || loading}
          >
            {loading ? 'Rejet en cours...' : 'Rejeter'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

