import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  User,
  LogOut,
  Settings,
  Ship,
  Users,
  Calendar,
  MessageSquare,
  Home,
  Handshake,
  Anchor,
  BarChart3,
  Brain,
  Crown
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { NotificationBell } from '@/components/notifications/NotificationSystem';
import VisitorPackageBadge from '@/components/packages/VisitorPackageBadge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const SiportsNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Navigation publique avec badges colorés
  const publicNavItems = [
    { path: '/', label: 'Accueil', icon: Home, badge: '1', badgeColor: 'green' },
    { path: '/exposants', label: 'Exposants', icon: Ship, badge: '2', badgeColor: 'orange' },
    { path: '/partenaires', label: 'Partenaires', icon: Handshake, badge: '3', badgeColor: 'purple' },
    { path: '/reseautage', label: 'Réseautage', icon: Users, badge: '4', badgeColor: 'blue' },
    { path: '/forfaits-visiteur', label: 'Forfaits', icon: Crown, badge: '5', badgeColor: 'yellow' },
    { path: '/contact', label: 'Contact', icon: MessageSquare, badge: '6', badgeColor: 'magenta' }
  ];

  // Navigation authentifiée avec badges colorés
  const authenticatedNavItems = [
    { path: '/dashboard', label: 'Tableau de bord', icon: Home, badge: '1', badgeColor: 'green' },
    { path: '/exposants', label: 'Exposants', icon: Ship, badge: '2', badgeColor: 'orange' },
    { path: '/partenaires', label: 'Partenaires', icon: Handshake, badge: '3', badgeColor: 'purple' },
    { path: '/reseautage', label: 'Réseautage', icon: Users, badge: '4', badgeColor: 'blue' },
    { path: '/calendrier', label: 'Calendrier', icon: Calendar, badge: '5', badgeColor: 'cyan' },
    { path: '/messages', label: 'Messages', icon: MessageSquare, badge: '6', badgeColor: 'magenta' },
    { path: '/analytics', label: 'Analytics', icon: BarChart3, badge: '7', badgeColor: 'indigo' }
  ];

  const navItems = isAuthenticated ? authenticatedNavItems : publicNavItems;

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="siports-header">
      <nav className="siports-nav">
        {/* Logo */}
        <Link to="/" className="siports-logo">
          <Anchor className="w-6 h-6" />
          <span>SIPORTS</span>
          <span className="text-sm font-normal opacity-75">Salon Maritime</span>
        </Link>

        {/* Navigation Desktop */}
        <ul className="siports-nav-menu hidden md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);
            
            return (
              <li key={item.path} className="siports-nav-item">
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`siports-nav-link ${isActive ? 'bg-white/10' : ''}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  <span className={`siports-nav-badge siports-nav-badge--${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Actions utilisateur */}
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link to="/connexion">
                <Button variant="outline" size="sm" className="siports-btn--outline">
                  <User className="w-4 h-4 mr-2" />
                  Connexion
                </Button>
              </Link>
              <Link to="/inscription">
                <Button className="siports-btn--primary">
                  Inscription
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {/* Bouton de notifications */}
              <NotificationBell />
              
              {/* Recommandations IA */}
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="text-white hover:bg-white/10"
                title="Recommandations IA"
              >
                <Brain className="h-5 w-5" />
              </Button>

              {/* Menu utilisateur */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-white/10">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="hidden sm:flex flex-col items-start">
                      <span className="text-sm">{user?.name || 'Utilisateur'}</span>
                      {user?.visitor_package && (
                        <VisitorPackageBadge 
                          packageId={user.visitor_package} 
                          size="sm" 
                          showIcon={false}
                        />
                      )}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <div className="p-3 border-b">
                    <p className="font-medium">{user?.name || 'Utilisateur'}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                    {user?.visitor_package && (
                      <div className="mt-2">
                        <VisitorPackageBadge packageId={user.visitor_package} />
                      </div>
                    )}
                  </div>
                  <DropdownMenuItem onClick={() => navigate('/profil')}>
                    <User className="mr-2 h-4 w-4" />
                    Profil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/forfaits-visiteur')}>
                    <Crown className="mr-2 h-4 w-4" />
                    Gérer mon forfait
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/analytics')}>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Analytics Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/parametres')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {/* Menu mobile */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </nav>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-white/10">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-white transition-colors ${
                    isActive ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  <span className={`siports-nav-badge siports-nav-badge--${item.badgeColor} ml-auto`}>
                    {item.badge}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default SiportsNavigation;


