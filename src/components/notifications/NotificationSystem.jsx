import React, { createContext, useContext, useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, X, Check, AlertCircle, Info, MessageSquare, 
  Calendar, Users, Star, Gift, Zap, Clock
} from 'lucide-react';

// Context pour les notifications
const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Provider des notifications
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Simuler des notifications en temps réel
  useEffect(() => {
    const notificationTypes = [
      {
        type: 'connection',
        icon: Users,
        title: 'Nouvelle connexion',
        message: 'Maritime Solutions veut se connecter avec vous',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50'
      },
      {
        type: 'message',
        icon: MessageSquare,
        title: 'Nouveau message',
        message: 'Ahmed Benali vous a envoyé un message',
        color: 'text-green-600',
        bgColor: 'bg-green-50'
      },
      {
        type: 'meeting',
        icon: Calendar,
        title: 'Demande de rendez-vous',
        message: 'EuroMarine Tech propose un rendez-vous demain à 14h',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50'
      },
      {
        type: 'review',
        icon: Star,
        title: 'Nouvel avis',
        message: 'Port Authority Maroc a laissé un avis 5 étoiles',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50'
      },
      {
        type: 'system',
        icon: Zap,
        title: 'Mise à jour système',
        message: 'Nouvelles fonctionnalités disponibles sur votre tableau de bord',
        color: 'text-cyan-600',
        bgColor: 'bg-cyan-50'
      }
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% de chance d'avoir une notification
        const randomNotif = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
        const newNotification = {
          id: Date.now(),
          ...randomNotif,
          timestamp: new Date(),
          read: false,
          priority: Math.random() > 0.8 ? 'high' : 'normal'
        };
        
        setNotifications(prev => [newNotification, ...prev.slice(0, 19)]); // Garder max 20 notifications
        setUnreadCount(prev => prev + 1);
      }
    }, 8000); // Nouvelle notification toutes les 8 secondes

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    setUnreadCount(0);
  };

  const removeNotification = (id) => {
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date(),
      read: false,
      priority: 'normal',
      ...notification
    };
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      removeNotification,
      addNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Composant Bell de notification
export const NotificationBell = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const getTimeAgo = (timestamp) => {
    const diff = Date.now() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes}min`;
    if (hours < 24) return `Il y a ${hours}h`;
    return timestamp.toLocaleDateString('fr-FR');
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notification Panel */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel */}
          <Card className="absolute right-0 top-full mt-2 w-96 max-h-96 overflow-hidden z-50 shadow-xl border-0 bg-white">
            <div className="p-4 border-b bg-slate-50">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={markAllAsRead}
                      className="text-xs"
                    >
                      Tout marquer lu
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  <Bell className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                  <p>Aucune notification</p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-slate-50 transition-colors ${
                          !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-full ${notification.bgColor}`}>
                            <Icon className={`h-4 w-4 ${notification.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-sm">{notification.title}</p>
                              <div className="flex items-center gap-1">
                                {notification.priority === 'high' && (
                                  <AlertCircle className="h-3 w-3 text-red-500" />
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeNotification(notification.id)}
                                  className="h-6 w-6 p-0"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-xs text-slate-400 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {getTimeAgo(notification.timestamp)}
                              </p>
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-xs text-blue-600 hover:text-blue-800"
                                >
                                  Marquer lu
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-3 border-t bg-slate-50 text-center">
                <Button variant="ghost" size="sm" className="text-xs text-slate-600">
                  Voir toutes les notifications
                </Button>
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
};

// Toast notifications
export const ToastNotification = ({ notification, onClose }) => {
  const Icon = notification.icon || Info;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Card className={`fixed bottom-4 right-4 w-80 shadow-lg border-l-4 ${
      notification.type === 'success' ? 'border-l-green-500 bg-green-50' :
      notification.type === 'error' ? 'border-l-red-500 bg-red-50' :
      notification.type === 'warning' ? 'border-l-yellow-500 bg-yellow-50' :
      'border-l-blue-500 bg-blue-50'
    } z-50 animate-in slide-in-from-right`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`p-1 rounded-full ${
            notification.type === 'success' ? 'bg-green-100' :
            notification.type === 'error' ? 'bg-red-100' :
            notification.type === 'warning' ? 'bg-yellow-100' :
            'bg-blue-100'
          }`}>
            <Icon className={`h-4 w-4 ${
              notification.type === 'success' ? 'text-green-600' :
              notification.type === 'error' ? 'text-red-600' :
              notification.type === 'warning' ? 'text-yellow-600' :
              'text-blue-600'
            }`} />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">{notification.title}</p>
            <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationProvider;