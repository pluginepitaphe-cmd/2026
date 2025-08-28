import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Composants SIPORTS existants
import AdminDashboardPage from '../pages/AdminDashboardPage';
import VisitorPackagesPage from '../pages/VisitorPackagesPage';
import PartnershipPackagesPage from '../pages/PartnershipPackagesPage';
import AdvancedMatchingSystem from '../pages/AdvancedMatchingSystem';
import AnalyticsDashboard from '../pages/AnalyticsDashboard';

const WordPressApp = ({ container, component, config }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiConfig, setApiConfig] = useState(config || {});

  useEffect(() => {
    // Initialiser la configuration WordPress
    if (window.siportsConfig) {
      setApiConfig(window.siportsConfig);
      
      // Vérifier l'utilisateur WordPress connecté
      if (window.siportsConfig.currentUser && window.siportsConfig.currentUser.ID > 0) {
        setUser({
          id: window.siportsConfig.currentUser.ID,
          email: window.siportsConfig.currentUser.login || window.siportsConfig.currentUser.email,
          user_type: 'admin', // Par défaut admin pour WordPress
          first_name: window.siportsConfig.currentUser.display_name?.split(' ')[0] || '',
          last_name: window.siportsConfig.currentUser.display_name?.split(' ')[1] || '',
          visitor_package: 'premium',
          partnership_package: null
        });
      } else {
        // Utilisateur non connecté, utiliser un utilisateur démo
        setUser({
          id: 0,
          email: 'demo@siportevent.com',
          user_type: 'visitor',
          first_name: 'Demo',
          last_name: 'User',
          visitor_package: 'free',
          partnership_package: null
        });
      }
    }
    setLoading(false);
  }, []);

  const renderComponent = () => {
    const commonProps = {
      user,
      apiConfig: {
        ...apiConfig,
        apiUrl: apiConfig.apiUrl || 'https://siports-maritime.preview.emergentagent.com/api'
      }
    };

    switch (component) {
      case 'admin':
        return <AdminDashboardPage {...commonProps} />;
      
      case 'packages':
      case 'visitor-packages':
        return <VisitorPackagesPage {...commonProps} />;
      
      case 'partner-packages':
      case 'partnership-packages':
        return <PartnershipPackagesPage {...commonProps} />;
      
      case 'matching':
        return <AdvancedMatchingSystem {...commonProps} />;
      
      case 'analytics':
        return <AnalyticsDashboard {...commonProps} />;
      
      case 'profile':
        return (
          <div className="siports-wordpress-profile">
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '32px',
              borderRadius: '12px',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              <h2 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <span>👤</span>
                Profil Utilisateur SIPORTS
              </h2>
              <p style={{ margin: 0, opacity: 0.9 }}>
                Gérez votre profil et vos paramètres
              </p>
            </div>
            
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <h3>Informations utilisateur</h3>
              <div style={{ display: 'grid', gap: '16px', marginTop: '20px' }}>
                <div>
                  <strong>Nom :</strong> {user?.first_name} {user?.last_name}
                </div>
                <div>
                  <strong>Email :</strong> {user?.email}
                </div>
                <div>
                  <strong>Type :</strong> {user?.user_type}
                </div>
                <div>
                  <strong>Package Visiteur :</strong> {user?.visitor_package || 'Aucun'}
                </div>
                {user?.partnership_package && (
                  <div>
                    <strong>Package Partenaire :</strong> {user.partnership_package}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="siports-main-wordpress-app">
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '40px',
              borderRadius: '16px',
              textAlign: 'center',
              marginBottom: '32px'
            }}>
              <h1 style={{
                margin: '0 0 16px 0',
                fontSize: '3em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px'
              }}>
                <span>⚓</span>
                SIPORTS
              </h1>
              <p style={{
                margin: 0,
                fontSize: '1.3em',
                opacity: 0.9
              }}>
                Plateforme Maritime Professionnelle intégrée à WordPress
              </p>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              <FeatureCard
                icon="👥"
                title="Administration"
                description="Tableau de bord admin avec gestion des utilisateurs"
                onClick={() => window.location.href = '#admin'}
              />
              
              <FeatureCard
                icon="📦"
                title="Packages Visiteur"
                description="Forfaits Free, Basic, Premium et VIP Pass"
                onClick={() => window.location.href = '#packages'}
              />
              
              <FeatureCard
                icon="🤝"
                title="Packages Partenaires"
                description="Offres Platinum, Gold, Silver et Startup"
                onClick={() => window.location.href = '#partnership'}
              />
              
              <FeatureCard
                icon="🔗"
                title="Matching Avancé"
                description="IA de mise en relation d'affaires"
                onClick={() => window.location.href = '#matching'}
              />
              
              <FeatureCard
                icon="📊"
                title="Analytics"
                description="Tableaux de bord et statistiques temps réel"
                onClick={() => window.location.href = '#analytics'}
              />
              
              <FeatureCard
                icon="👤"
                title="Mon Profil"
                description="Gérer mes informations et paramètres"
                onClick={() => window.location.href = '#profile'}
              />
            </div>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          fontSize: '3em',
          marginBottom: '16px',
          opacity: 0.7
        }}>⚓</div>
        <div style={{
          fontSize: '18px',
          color: '#666'
        }}>
          Initialisation de SIPORTS...
        </div>
      </div>
    );
  }

  return (
    <div className="siports-wordpress-app">
      {renderComponent()}
    </div>
  );
};

// Composant carte de fonctionnalité
const FeatureCard = ({ icon, title, description, onClick }) => (
  <div
    onClick={onClick}
    style={{
      background: 'white',
      borderRadius: '16px',
      padding: '32px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '2px solid #e5e7eb',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '200px'
    }}
    onMouseEnter={(e) => {
      e.target.style.transform = 'translateY(-8px)';
      e.target.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
      e.target.style.borderColor = '#3b82f6';
    }}
    onMouseLeave={(e) => {
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
      e.target.style.borderColor = '#e5e7eb';
    }}
  >
    <div style={{ fontSize: '4em', marginBottom: '16px' }}>
      {icon}
    </div>
    <h3 style={{
      margin: '0 0 12px 0',
      color: '#1f2937',
      fontSize: '1.5rem'
    }}>
      {title}
    </h3>
    <p style={{
      margin: 0,
      color: '#6b7280',
      lineHeight: 1.5
    }}>
      {description}
    </p>
  </div>
);

export default WordPressApp;