import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
  Handshake
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Navigation publique
  const publicNavItems = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/exposants', label: 'Exposants', icon: Ship },
    { path: '/partenaires', label: 'Partenaires', icon: Handshake },
    { path: '/calendrier', label: 'Calendrier', icon: Calendar },
    { path: '/contact', label: 'Contact', icon: MessageSquare }
  ];

  // Navigation authentifiée
  const authenticatedNavItems = [
    { path: '/dashboard', label: 'Tableau de bord', icon: Home },
    { path: '/exposants', label: 'Exposants', icon: Ship },
    { path: '/partenaires', label: 'Partenaires', icon: Handshake },
    { path: '/reseautage', label: 'Réseautage', icon: Users },
    { path: '/calendrier', label: 'Calendrier', icon: Calendar },
    { path: '/messages', label: 'Messages', icon: MessageSquare }
  ];

  const navItems = isAuthenticated ? authenticatedNavItems : publicNavItems;

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-primary shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo et titre */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Ship className="h-8 w-8 text-secondary" />
              <div className="text-primary-foreground">
                <div className="font-bold text-xl">SIPORTS</div>
                <div className="text-xs opacity-90">Salon Maritime</div>
              </div>
            </Link>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActivePath(item.path)
                      ? 'bg-secondary text-secondary-foreground'
                      : 'text-primary-foreground hover:bg-primary/80'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Actions utilisateur */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80">
                    <User className="h-4 w-4 mr-2" />
                    {user?.firstName} {user?.lastName}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user?.type}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profil')}>
                    <Settings className="h-4 w-4 mr-2" />
                    Profil
                  </DropdownMenuItem>
                  {(user?.type === 'exhibitor' || user?.type === 'partner') && (
                    <DropdownMenuItem onClick={() => navigate('/mini-site')}>
                      <Ship className="h-4 w-4 mr-2" />
                      Mon Mini-Site
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  className="text-primary-foreground hover:bg-primary/80"
                  onClick={() => navigate('/connexion')}
                >
                  Connexion
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => navigate('/inscription')}
                >
                  Inscription
                </Button>
              </div>
            )}
          </div>

          {/* Menu mobile */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              className="text-primary-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Menu mobile ouvert */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-primary border-t border-primary/20">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActivePath(item.path)
                        ? 'bg-secondary text-secondary-foreground'
                        : 'text-primary-foreground hover:bg-primary/80'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              {/* Actions utilisateur mobile */}
              <div className="border-t border-primary/20 pt-4">
                {isAuthenticated ? (
                  <div className="space-y-1">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-primary-foreground">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-primary-foreground/70">{user?.email}</p>
                    </div>
                    <Link
                      to="/profil"
                      className="flex items-center space-x-2 px-3 py-2 text-primary-foreground hover:bg-primary/80 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="h-5 w-5" />
                      <span>Profil</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 px-3 py-2 text-primary-foreground hover:bg-primary/80 rounded-md w-full text-left"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Link
                      to="/connexion"
                      className="block px-3 py-2 text-primary-foreground hover:bg-primary/80 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Connexion
                    </Link>
                    <Link
                      to="/inscription"
                      className="block px-3 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Inscription
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

