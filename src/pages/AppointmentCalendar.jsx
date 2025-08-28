import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, Clock, Users, MapPin, Plus, Filter, Search,
  ChevronLeft, ChevronRight, Video, Phone, MessageSquare,
  Bell, Check, X, Edit, Trash2, Eye, MoreHorizontal,
  Zap, Star, Globe, AlertCircle, CheckCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AppointmentCalendar = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // month, week, day, agenda
  const [appointments, setAppointments] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Pré-remplir avec les paramètres URL si disponibles
  const prefilledData = {
    exhibitor: searchParams.get('exhibitor'),
    participant: searchParams.get('participant'),
    name: searchParams.get('name')
  };

  // Données simulées d'appointments
  useEffect(() => {
    const mockAppointments = [
      {
        id: 1,
        title: 'Démonstration Maritime Solutions',
        description: 'Présentation des nouvelles grues automatisées',
        date: new Date(2024, 8, 5, 14, 0), // 5 septembre 2024, 14h00
        endDate: new Date(2024, 8, 5, 15, 30),
        attendees: [
          { name: 'Jean Dupont', email: 'j.dupont@maritime.com', company: 'Maritime Solutions' },
          { name: 'Marie Martin', email: 'm.martin@port.ma', company: 'Port de Casablanca' }
        ],
        location: 'Stand A-12, Hall 1',
        type: 'demo',
        status: 'confirmed',
        priority: 'high',
        meetingType: 'physical',
        notes: 'Apporter les spécifications techniques',
        reminders: [15, 60], // minutes avant
        isRecurring: false
      },
      {
        id: 2,
        title: 'Réunion stratégique EuroMarine',
        description: 'Discussion partenariat technologies IoT',
        date: new Date(2024, 8, 6, 10, 0),
        endDate: new Date(2024, 8, 6, 11, 0),
        attendees: [
          { name: 'Dr. Sarah Martinez', email: 's.martinez@euromarine.fr', company: 'EuroMarine Tech' }
        ],
        location: 'Salle de réunion B2',
        type: 'meeting',
        status: 'pending',
        priority: 'medium',
        meetingType: 'hybrid',
        videoLink: 'https://meet.siports.com/room/abc123',
        notes: 'Préparer proposition commerciale',
        reminders: [30],
        isRecurring: false
      },
      {
        id: 3,
        title: 'Webinar Technologies Portuaires',
        description: 'Présentation des dernières innovations IA',
        date: new Date(2024, 8, 7, 16, 0),
        endDate: new Date(2024, 8, 7, 17, 30),
        attendees: [
          { name: 'Ahmed El Fassi', email: 'a.elfassi@ports.ma', company: 'Ports du Maroc' },
          { name: 'Lisa Chen', email: 'l.chen@smartports.com', company: 'Smart Ports Asia' }
        ],
        location: 'En ligne',
        type: 'webinar',
        status: 'confirmed',
        priority: 'low',
        meetingType: 'virtual',
        videoLink: 'https://webinar.siports.com/tech-2024',
        notes: 'Enregistrement autorisé',
        reminders: [15, 60],
        isRecurring: true,
        recurringPattern: 'weekly'
      },
      {
        id: 4,
        title: 'Rendez-vous client - Nordic Port',
        description: 'Négociation contrat équipements lourds',
        date: new Date(2024, 8, 8, 9, 30),
        endDate: new Date(2024, 8, 8, 11, 0),
        attendees: [
          { name: 'Erik Larsson', email: 'e.larsson@nordicport.nl', company: 'Nordic Port Equipment' }
        ],
        location: 'Bureau client, Rotterdam',
        type: 'business',
        status: 'confirmed',
        priority: 'high',
        meetingType: 'physical',
        notes: 'Contrat 2.5M€ en négociation',
        reminders: [30, 120],
        isRecurring: false
      }
    ];

    setAppointments(mockAppointments);
  }, []);

  const [newAppointment, setNewAppointment] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    endTime: '',
    location: '',
    attendees: [],
    type: 'meeting',
    priority: 'medium',
    meetingType: 'physical',
    notes: '',
    reminders: [15]
  });

  // Filtrer les appointments
  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || apt.status === filter || apt.type === filter;
    return matchesSearch && matchesFilter;
  });

  // Fonctions de navigation de date
  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const navigateWeek = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + (direction * 7));
      return newDate;
    });
  };

  const navigateDay = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + direction);
      return newDate;
    });
  };

  const handleNavigation = (direction) => {
    switch(view) {
      case 'month': navigateMonth(direction); break;
      case 'week': navigateWeek(direction); break;
      case 'day': navigateDay(direction); break;
      default: navigateMonth(direction);
    }
  };

  // Gestion des appointments
  const handleAddAppointment = () => {
    const newApt = {
      id: Date.now(),
      ...newAppointment,
      date: new Date(`${newAppointment.date}T${newAppointment.time}`),
      endDate: new Date(`${newAppointment.date}T${newAppointment.endTime}`),
      status: 'pending',
      attendees: newAppointment.attendees.split(',').map(email => ({ 
        email: email.trim(), 
        name: email.trim().split('@')[0] 
      }))
    };
    
    setAppointments(prev => [...prev, newApt]);
    setNewAppointment({
      title: '',
      description: '',
      date: '',
      time: '',
      endTime: '',
      location: '',
      attendees: [],
      type: 'meeting',
      priority: 'medium',
      meetingType: 'physical',
      notes: '',
      reminders: [15]
    });
    setShowAddForm(false);
  };

  const handleStatusChange = (id, newStatus) => {
    setAppointments(prev => 
      prev.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt)
    );
  };

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
      completed: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'high': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'medium': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return null;
    }
  };

  const getTypeIcon = (type) => {
    const icons = {
      demo: <Eye className="h-4 w-4" />,
      meeting: <Users className="h-4 w-4" />,
      webinar: <Globe className="h-4 w-4" />,
      business: <Star className="h-4 w-4" />
    };
    return icons[type] || <Calendar className="h-4 w-4" />;
  };

  // Générer les jours du mois pour la vue calendrier
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getAppointmentsForDay = (date) => {
    return filteredAppointments.filter(apt => 
      apt.date.toDateString() === date.toDateString()
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Calendar className="h-8 w-8 text-cyan-600" />
              Calendrier des Rendez-vous
            </h1>
            <p className="text-slate-600 mt-1">Gérez vos rendez-vous et réunions</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
              Aujourd'hui
            </Button>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau RDV
            </Button>
          </div>
        </div>

        {/* Contrôles et Navigation */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              {/* Navigation temporelle */}
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => handleNavigation(-1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-xl font-semibold min-w-[200px] text-center">
                  {view === 'month' && currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  {view === 'week' && `Semaine du ${currentDate.toLocaleDateString('fr-FR')}`}
                  {view === 'day' && currentDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </h2>
                <Button variant="outline" size="sm" onClick={() => handleNavigation(1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Vues */}
              <div className="flex items-center gap-2">
                {['month', 'week', 'day', 'agenda'].map(viewType => (
                  <Button
                    key={viewType}
                    variant={view === viewType ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setView(viewType)}
                  >
                    {viewType === 'month' && 'Mois'}
                    {viewType === 'week' && 'Semaine'}
                    {viewType === 'day' && 'Jour'}
                    {viewType === 'agenda' && 'Agenda'}
                  </Button>
                ))}
              </div>

              {/* Filtres et recherche */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-48"
                  />
                </div>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="all">Tous</option>
                  <option value="confirmed">Confirmés</option>
                  <option value="pending">En attente</option>
                  <option value="cancelled">Annulés</option>
                  <option value="demo">Démos</option>
                  <option value="meeting">Réunions</option>
                  <option value="webinar">Webinaires</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vue Calendrier */}
        {view === 'month' && (
          <Card>
            <CardContent className="p-0">
              {/* En-têtes des jours */}
              <div className="grid grid-cols-7 bg-slate-100">
                {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
                  <div key={day} className="p-4 text-center font-medium text-slate-600 border-r border-slate-200 last:border-r-0">
                    {day}
                  </div>
                ))}
              </div>

              {/* Grille des jours */}
              <div className="grid grid-cols-7">
                {generateCalendarDays().map((day, index) => {
                  const dayAppointments = getAppointmentsForDay(day);
                  const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                  const isToday = day.toDateString() === new Date().toDateString();

                  return (
                    <div
                      key={index}
                      className={`min-h-[120px] p-2 border-r border-b border-slate-200 ${
                        isCurrentMonth ? 'bg-white' : 'bg-slate-50'
                      } ${isToday ? 'bg-cyan-50' : ''}`}
                    >
                      <div className={`text-sm font-medium mb-2 ${
                        isCurrentMonth ? 'text-slate-900' : 'text-slate-400'
                      } ${isToday ? 'text-cyan-600' : ''}`}>
                        {day.getDate()}
                      </div>
                      
                      <div className="space-y-1">
                        {dayAppointments.slice(0, 3).map(apt => (
                          <div
                            key={apt.id}
                            className={`text-xs p-1 rounded cursor-pointer ${getStatusColor(apt.status)} hover:shadow-sm transition-shadow`}
                            onClick={() => setSelectedAppointment(apt)}
                          >
                            <div className="flex items-center gap-1">
                              {getTypeIcon(apt.type)}
                              <span className="truncate">{apt.title}</span>
                            </div>
                            <div className="text-xs opacity-75">
                              {apt.date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        ))}
                        {dayAppointments.length > 3 && (
                          <div className="text-xs text-slate-500 cursor-pointer hover:text-slate-700">
                            +{dayAppointments.length - 3} autres
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Vue Agenda */}
        {view === 'agenda' && (
          <div className="space-y-4">
            {filteredAppointments.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Aucun rendez-vous</h3>
                  <p className="text-slate-600">Vous n'avez aucun rendez-vous planifié pour le moment.</p>
                </CardContent>
              </Card>
            ) : (
              filteredAppointments.map(apt => (
                <Card key={apt.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white">
                          {getTypeIcon(apt.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{apt.title}</h3>
                            <Badge className={getStatusColor(apt.status)}>
                              {apt.status === 'confirmed' && 'Confirmé'}
                              {apt.status === 'pending' && 'En attente'}
                              {apt.status === 'cancelled' && 'Annulé'}
                              {apt.status === 'completed' && 'Terminé'}
                            </Badge>
                            {getPriorityIcon(apt.priority)}
                          </div>
                          <p className="text-slate-600 mb-3">{apt.description}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-slate-400" />
                              <span>{apt.date.toLocaleDateString('fr-FR')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-slate-400" />
                              <span>
                                {apt.date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} - 
                                {apt.endDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-slate-400" />
                              <span>{apt.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-slate-400" />
                              <span>{apt.attendees.length} participant(s)</span>
                            </div>
                          </div>

                          {apt.notes && (
                            <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                              <p className="text-sm text-slate-600">{apt.notes}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {apt.status === 'pending' && (
                          <>
                            <Button size="sm" onClick={() => handleStatusChange(apt.id, 'confirmed')}>
                              <Check className="h-4 w-4 mr-1" />
                              Confirmer
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleStatusChange(apt.id, 'cancelled')}>
                              <X className="h-4 w-4 mr-1" />
                              Refuser
                            </Button>
                          </>
                        )}
                        
                        {apt.meetingType === 'virtual' && apt.videoLink && (
                          <Button size="sm" variant="outline">
                            <Video className="h-4 w-4 mr-1" />
                            Rejoindre
                          </Button>
                        )}
                        
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Formulaire d'ajout de rendez-vous */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Nouveau Rendez-vous</span>
                  <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Titre *</label>
                    <Input
                      value={newAppointment.title}
                      onChange={(e) => setNewAppointment(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Titre du rendez-vous"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Type</label>
                    <select
                      value={newAppointment.type}
                      onChange={(e) => setNewAppointment(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="meeting">Réunion</option>
                      <option value="demo">Démonstration</option>
                      <option value="webinar">Webinaire</option>
                      <option value="business">Rendez-vous client</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={newAppointment.description}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Description du rendez-vous"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Date *</label>
                    <Input
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Heure début *</label>
                    <Input
                      type="time"
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment(prev => ({ ...prev, time: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Heure fin *</label>
                    <Input
                      type="time"
                      value={newAppointment.endTime}
                      onChange={(e) => setNewAppointment(prev => ({ ...prev, endTime: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Lieu</label>
                    <Input
                      value={newAppointment.location}
                      onChange={(e) => setNewAppointment(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Lieu du rendez-vous"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Priorité</label>
                    <select
                      value={newAppointment.priority}
                      onChange={(e) => setNewAppointment(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="low">Faible</option>
                      <option value="medium">Moyenne</option>
                      <option value="high">Élevée</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Participants (emails séparés par des virgules)</label>
                  <Input
                    value={newAppointment.attendees}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, attendees: e.target.value }))}
                    placeholder="email1@example.com, email2@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Notes</label>
                  <Textarea
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Notes additionnelles"
                    rows={2}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleAddAppointment}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Créer le rendez-vous
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCalendar;

