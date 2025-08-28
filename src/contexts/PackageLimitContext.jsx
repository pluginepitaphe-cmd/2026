import React, { createContext, useContext } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Lock, ArrowRight } from 'lucide-react';

// Context pour les limitations de forfait
const PackageLimitContext = createContext();

export const usePackageLimit = () => {
  const context = useContext(PackageLimitContext);
  if (!context) {
    throw new Error('usePackageLimit must be used within a PackageLimitProvider');
  }
  return context;
};

// Provider pour les limitations de forfait
export const PackageLimitProvider = ({ children }) => {
  const { user } = useAuth();

  const getPackageLimit = (feature) => {
    const userPackage = user?.visitor_package || 'free';
    
    const limits = {
      free: {
        b2b_meetings: 0,
        vip_access: false,
        specialized_workshops: false,
        networking_lunches: false,
        gala_evening: false,
        concierge_service: false,
        airport_transfers: false,
        exclusive_conferences: false,
        premium_documentation: false
      },
      basic: {
        b2b_meetings: 2,
        vip_access: false,
        specialized_workshops: false,
        networking_lunches: false,
        gala_evening: false,
        concierge_service: false,
        airport_transfers: false,
        exclusive_conferences: false,
        premium_documentation: true
      },
      premium: {
        b2b_meetings: 5,
        vip_access: true,
        specialized_workshops: true,
        networking_lunches: true,
        gala_evening: false,
        concierge_service: false,
        airport_transfers: false,
        exclusive_conferences: false,
        premium_documentation: true
      },
      vip: {
        b2b_meetings: -1, // illimité
        vip_access: true,
        specialized_workshops: true,
        networking_lunches: true,
        gala_evening: true,
        concierge_service: true,
        airport_transfers: true,
        exclusive_conferences: true,
        premium_documentation: true
      }
    };

    return limits[userPackage]?.[feature] ?? limits.free[feature];
  };

  const canAccess = (feature) => {
    return getPackageLimit(feature);
  };

  const getUpgradeRequired = (feature) => {
    const userPackage = user?.visitor_package || 'free';
    
    const featurePackages = {
      b2b_meetings: 'basic',
      vip_access: 'premium',
      specialized_workshops: 'premium',
      networking_lunches: 'premium',
      gala_evening: 'vip',
      concierge_service: 'vip',
      airport_transfers: 'vip',
      exclusive_conferences: 'vip'
    };

    return featurePackages[feature];
  };

  return (
    <PackageLimitContext.Provider value={{
      getPackageLimit,
      canAccess,
      getUpgradeRequired,
      userPackage: user?.visitor_package || 'free'
    }}>
      {children}
    </PackageLimitContext.Provider>
  );
};

// Composant de protection des fonctionnalités
export const FeatureGate = ({ 
  feature, 
  children, 
  fallback, 
  showUpgrade = true 
}) => {
  const { canAccess, getUpgradeRequired, userPackage } = usePackageLimit();
  
  if (canAccess(feature)) {
    return children;
  }

  if (fallback) {
    return fallback;
  }

  if (!showUpgrade) {
    return null;
  }

  const requiredPackage = getUpgradeRequired(feature);
  
  return (
    <UpgradePrompt 
      feature={feature}
      requiredPackage={requiredPackage}
      currentPackage={userPackage}
    />
  );
};

// Composant d'invitation à l'upgrade
export const UpgradePrompt = ({ 
  feature, 
  requiredPackage, 
  currentPackage,
  title,
  description 
}) => {
  const featureNames = {
    b2b_meetings: 'Réunions B2B',
    vip_access: 'Accès salon VIP',
    specialized_workshops: 'Ateliers spécialisés',
    networking_lunches: 'Déjeuners de réseautage',
    gala_evening: 'Soirée de gala',
    concierge_service: 'Service de conciergerie',
    airport_transfers: 'Transferts aéroport',
    exclusive_conferences: 'Conférences exclusives'
  };

  const packageNames = {
    basic: 'Basic Pass (150€)',
    premium: 'Premium Pass (350€)',
    vip: 'VIP Pass (750€)'
  };

  return (
    <Card className="border-2 border-dashed border-orange-200 bg-orange-50">
      <CardContent className="p-6 text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="h-8 w-8 text-orange-600" />
        </div>
        
        <h3 className="text-lg font-semibold text-orange-900 mb-2">
          {title || `Fonctionnalité ${featureNames[feature]} verrouillée`}
        </h3>
        
        <p className="text-orange-700 mb-4">
          {description || `Pour accéder aux ${featureNames[feature]}, vous devez passer au forfait ${packageNames[requiredPackage]}.`}
        </p>

        <div className="flex items-center justify-center gap-2 mb-4">
          <Badge variant="outline" className="text-orange-600 border-orange-600">
            Forfait actuel : {currentPackage.toUpperCase()}
          </Badge>
          <ArrowRight className="h-4 w-4 text-orange-600" />
          <Badge className="bg-orange-600 text-white">
            Requis : {requiredPackage.toUpperCase()}
          </Badge>
        </div>

        <Button 
          className="bg-orange-600 hover:bg-orange-700 text-white"
          onClick={() => window.location.href = '/forfaits-visiteur'}
        >
          <Crown className="h-4 w-4 mr-2" />
          Upgrader mon forfait
        </Button>
      </CardContent>
    </Card>
  );
};

// Hook pour vérifier les limitations B2B
export const useB2BMeetingLimit = () => {
  const { getPackageLimit } = usePackageLimit();
  const { user } = useAuth();
  
  const maxMeetings = getPackageLimit('b2b_meetings');
  const usedMeetings = user?.b2b_meetings_used || 0;
  
  return {
    maxMeetings,
    usedMeetings,
    remainingMeetings: maxMeetings === -1 ? -1 : Math.max(0, maxMeetings - usedMeetings),
    canBookMore: maxMeetings === -1 || usedMeetings < maxMeetings,
    isUnlimited: maxMeetings === -1
  };
};

// Composant d'indicateur de quota B2B
export const B2BMeetingQuota = () => {
  const { maxMeetings, usedMeetings, remainingMeetings, isUnlimited } = useB2BMeetingLimit();
  
  if (maxMeetings === 0) {
    return (
      <FeatureGate feature="b2b_meetings">
        <div className="text-sm text-orange-600">
          Aucune réunion B2B disponible avec votre forfait
        </div>
      </FeatureGate>
    );
  }

  if (isUnlimited) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600">
        <Crown className="h-4 w-4" />
        <span>Réunions B2B illimitées</span>
      </div>
    );
  }

  const percentage = (usedMeetings / maxMeetings) * 100;
  const colorClass = percentage >= 80 ? 'text-red-600' : percentage >= 60 ? 'text-orange-600' : 'text-green-600';

  return (
    <div className={`text-sm ${colorClass}`}>
      {usedMeetings}/{maxMeetings} réunions B2B utilisées
      {remainingMeetings === 0 && (
        <div className="text-xs text-red-500 mt-1">
          Quota atteint - Upgradez votre forfait pour plus de réunions
        </div>
      )}
    </div>
  );
};

export default PackageLimitProvider;