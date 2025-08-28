import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Crown, Star, Gift, Users } from 'lucide-react';

const VisitorPackageBadge = ({ packageId, showIcon = true, showName = true, size = 'default' }) => {
  const packageInfo = {
    free: {
      name: 'Free',
      color: 'bg-gray-100 text-gray-700 border-gray-200',
      icon: Users,
      shortName: 'F'
    },
    basic: {
      name: 'Basic',
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      icon: Star,
      shortName: 'B'
    },
    premium: {
      name: 'Premium',
      color: 'bg-purple-100 text-purple-700 border-purple-200',
      icon: Gift,
      shortName: 'P'
    },
    vip: {
      name: 'VIP',
      color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      icon: Crown,
      shortName: 'V'
    }
  };

  const info = packageInfo[packageId] || packageInfo.free;
  const Icon = info.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    default: 'text-sm px-2 py-1',
    lg: 'text-base px-3 py-2'
  };

  return (
    <Badge className={`${info.color} ${sizeClasses[size]} flex items-center gap-1`}>
      {showIcon && <Icon className="h-3 w-3" />}
      {showName ? info.name : info.shortName}
    </Badge>
  );
};

// Hook pour obtenir les informations du forfait
export const useVisitorPackage = (packageId) => {
  const packageDetails = {
    free: {
      id: 'free',
      name: 'Free Pass',
      price: 'Gratuit',
      b2bMeetings: 0,
      duration: 1,
      features: ['Accès exposition', 'Conférences publiques'],
      canBookMeetings: false,
      hasVipAccess: false
    },
    basic: {
      id: 'basic',
      name: 'Basic Pass',
      price: '150€',
      b2bMeetings: 2,
      duration: 1,
      features: ['Accès expositions', 'Conférences', '2 RDV B2B'],
      canBookMeetings: true,
      hasVipAccess: false
    },
    premium: {
      id: 'premium',
      name: 'Premium Pass',
      price: '350€',
      b2bMeetings: 5,
      duration: 2,
      features: ['Ateliers', 'Salon VIP', '5 RDV B2B'],
      canBookMeetings: true,
      hasVipAccess: true
    },
    vip: {
      id: 'vip',
      name: 'VIP Pass',
      price: '750€',
      b2bMeetings: -1, // illimité
      duration: 3,
      features: ['Tout inclus', 'RDV illimités', 'Conciergerie'],
      canBookMeetings: true,
      hasVipAccess: true
    }
  };

  return packageDetails[packageId] || packageDetails.free;
};

// Composant d'upgrade de forfait
export const PackageUpgradePrompt = ({ currentPackage, onUpgrade }) => {
  const current = useVisitorPackage(currentPackage);
  
  if (currentPackage === 'vip') return null;

  const nextPackage = currentPackage === 'free' ? 'basic' : 
                     currentPackage === 'basic' ? 'premium' : 'vip';
  const next = useVisitorPackage(nextPackage);

  return (
    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-blue-900">Passez au niveau supérieur !</p>
          <p className="text-sm text-blue-700">
            Upgrade vers {next.name} pour débloquer plus de fonctionnalités
          </p>
        </div>
        <button
          onClick={() => onUpgrade(nextPackage)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Upgrade → {next.price}
        </button>
      </div>
    </div>
  );
};

export default VisitorPackageBadge;