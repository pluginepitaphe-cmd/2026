import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {
  UserIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  GlobeAltIcon,
  BriefcaseIcon,
  TrophyIcon,
  PlusIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { toast } from 'sonner';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const ProfilePage = () => {
  const { user } = useAuth();
  const [detailedProfile, setDetailedProfile] = useState({
    sectors_activity: [],
    products_services: [],
    participation_objectives: [],
    interest_themes: [],
    visit_objectives: [],
    skills_expertise: [],
    matching_criteria: {},
    looking_for: [],
    budget_range: '',
    company_size: '',
    geographic_location: [],
    meeting_availability: '',
    languages: [],
    certifications: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/ai/profile/detailed/${user.id}`);
      setDetailedProfile(response.data);
    } catch (error) {
      console.error('Erreur chargement profil:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      await axios.post(`${BACKEND_URL}/api/ai/profile/detailed`, detailedProfile);
      toast.success('Profil mis à jour avec succès !');
    } catch (error) {
      console.error('Erreur sauvegarde profil:', error);
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field, value) => {
    setDetailedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addToArray = (field, value) => {
    if (value.trim() && !detailedProfile[field].includes(value.trim())) {
      updateField(field, [...detailedProfile[field], value.trim()]);
    }
  };

  const removeFromArray = (field, index) => {
    const newArray = detailedProfile[field].filter((_, i) => i !== index);
    updateField(field, newArray);
  };

  // Options prédéfinies
  const sectorOptions = [
    'Gestion portuaire', 'Équipements navals', 'Technologies maritimes',
    'Énergies renouvelables', 'Logistique maritime', 'Défense navale',
    'Croisières', 'Pêche', 'Aquaculture', 'Offshore'
  ];

  const objectiveOptions = [
    'Recherche de distributeurs', 'Acquisition de clients', 'Partenariats technologiques',
    'Recrutement de talents', 'Veille technologique', 'Développement international'
  ];

  const themeOptions = [
    'Intelligence artificielle', 'Automatisation', 'IoT maritime',
    'Cybersécurité', 'Blockchain', 'Réalité virtuelle',
    'Énergies vertes', 'Développement durable'
  ];

  const companySizeOptions = [
    'startup', 'sme', 'enterprise', 'multinational'
  ];

  const budgetOptions = [
    '< 10k€', '10k-50k€', '50k-100k€', '100k-500k€', '> 500k€'
  ];

  const availabilityOptions = [
    'Immédiatement', 'Dans la semaine', 'Dans le mois', 'Flexible'
  ];

  const languageOptions = [
    'Français', 'Anglais', 'Espagnol', 'Italien', 'Allemand', 'Chinois'
  ];

  // Composant pour ajouter des éléments
  const ArrayField = ({ label, field, options = null, placeholder }) => {
    const [inputValue, setInputValue] = useState('');

    const handleAdd = () => {
      addToArray(field, inputValue);
      setInputValue('');
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAdd();
      }
    };

    return (
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
        
        {/* Tags existants */}
        <div className="flex flex-wrap gap-2 mb-3">
          {detailedProfile[field].map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
            >
              {item}
              <button
                onClick={() => removeFromArray(field, index)}
                className="ml-2 hover:text-blue-600"
              >
                <XMarkIcon className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        {/* Ajout rapide avec options */}
        {options && (
          <div className="flex flex-wrap gap-2 mb-3">
            {options.filter(option => !detailedProfile[field].includes(option)).map((option) => (
              <button
                key={option}
                onClick={() => addToArray(field, option)}
                className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors"
              >
                + {option}
              </button>
            ))}
          </div>
        )}

        {/* Champ de saisie */}
        <div className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="flex-1 input-field rounded-r-none"
          />
          <button
            onClick={handleAdd}
            disabled={!inputValue.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'basic', label: 'Informations de base', icon: UserIcon },
    { id: 'business', label: 'Activité business', icon: BriefcaseIcon },
    { id: 'preferences', label: 'Préférences', icon: TrophyIcon },
    { id: 'matching', label: 'Critères de matching', icon: GlobeAltIcon }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto container-padding section-spacing">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Profil détaillé IA
            </h1>
            <p className="text-slate-600">
              Optimisez votre profil pour de meilleurs matches IA
            </p>
          </div>
          
          <button
            onClick={saveProfile}
            disabled={saving}
            className="btn-primary flex items-center space-x-2"
          >
            {saving ? (
              <LoadingSpinner size="sm" />
            ) : (
              <CheckIcon className="w-4 h-4" />
            )}
            <span>Enregistrer</span>
          </button>
        </div>

        {/* Informations utilisateur de base */}
        <div className="card p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {user?.first_name} {user?.last_name}
              </h2>
              <p className="text-slate-600">{user?.company}</p>
              <p className="text-sm text-slate-500 capitalize">{user?.user_type}</p>
            </div>
          </div>
        </div>

        {/* Navigation par onglets */}
        <div className="border-b border-slate-200 mb-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Contenu des onglets */}
        <div className="space-y-6">
          {/* Informations de base */}
          {activeTab === 'basic' && (
            <div className="card p-6 space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">Informations générales</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Taille de l'entreprise
                  </label>
                  <select
                    value={detailedProfile.company_size}
                    onChange={(e) => updateField('company_size', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Sélectionner...</option>
                    {companySizeOptions.map(size => (
                      <option key={size} value={size}>
                        {size === 'startup' && 'Startup (< 10 employés)'}
                        {size === 'sme' && 'PME (10-250 employés)'}
                        {size === 'enterprise' && 'Grande entreprise (250+ employés)'}
                        {size === 'multinational' && 'Multinationale'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Disponibilité pour meetings
                  </label>
                  <select
                    value={detailedProfile.meeting_availability}
                    onChange={(e) => updateField('meeting_availability', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Sélectionner...</option>
                    {availabilityOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <ArrayField
                label="Localisation géographique"
                field="geographic_location"
                placeholder="Ville, région ou pays..."
              />

              <ArrayField
                label="Langues parlées"
                field="languages"
                options={languageOptions}
                placeholder="Ajouter une langue..."
              />
            </div>
          )}

          {/* Activité business */}
          {activeTab === 'business' && (
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Secteurs d'activité</h3>
                <ArrayField
                  label="Vos secteurs d'expertise"
                  field="sectors_activity"
                  options={sectorOptions}
                  placeholder="Ajouter un secteur..."
                />
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Produits et services</h3>
                <ArrayField
                  label="Ce que vous proposez"
                  field="products_services"
                  placeholder="Décrivez vos produits/services..."
                />
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Compétences et expertise</h3>
                <ArrayField
                  label="Vos domaines d'expertise"
                  field="skills_expertise"
                  placeholder="Ajouter une compétence..."
                />
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Certifications</h3>
                <ArrayField
                  label="Vos certifications professionnelles"
                  field="certifications"
                  placeholder="Ajouter une certification..."
                />
              </div>
            </div>
          )}

          {/* Préférences */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Objectifs de participation</h3>
                <ArrayField
                  label="Pourquoi participez-vous à l'événement ?"
                  field="participation_objectives"
                  options={objectiveOptions}
                  placeholder="Ajouter un objectif..."
                />
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Thématiques d'intérêt</h3>
                <ArrayField
                  label="Les sujets qui vous intéressent"
                  field="interest_themes"
                  options={themeOptions}
                  placeholder="Ajouter un thème..."
                />
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Ce que vous recherchez</h3>
                <ArrayField
                  label="Vos besoins et recherches"
                  field="looking_for"
                  placeholder="Décrivez ce que vous recherchez..."
                />
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Budget et objectifs</h3>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Fourchette budgétaire
                  </label>
                  <select
                    value={detailedProfile.budget_range}
                    onChange={(e) => updateField('budget_range', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Sélectionner...</option>
                    {budgetOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Critères de matching */}
          {activeTab === 'matching' && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Optimisation IA du matching
              </h3>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-blue-900 mb-2">Comment l'IA utilise ces informations :</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Analyse de compatibilité sectorielle</li>
                  <li>• Détection de complémentarités business</li>
                  <li>• Scoring de potentiel de collaboration</li>
                  <li>• Suggestions de sujets de conversation</li>
                  <li>• Recommandations proactives personnalisées</li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {detailedProfile.sectors_activity.length}
                    </div>
                    <div className="text-sm text-green-800">Secteurs renseignés</div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {detailedProfile.interest_themes.length}
                    </div>
                    <div className="text-sm text-blue-800">Thèmes d'intérêt</div>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {detailedProfile.skills_expertise.length}
                    </div>
                    <div className="text-sm text-purple-800">Compétences listées</div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-lg font-medium text-slate-900 mb-2">
                    Score de complétude du profil
                  </div>
                  <div className="progress-bar mb-2">
                    <div 
                      className="progress-fill" 
                      style={{
                        width: `${Math.min(100, (
                          detailedProfile.sectors_activity.length * 10 +
                          detailedProfile.interest_themes.length * 8 +
                          detailedProfile.skills_expertise.length * 5 +
                          (detailedProfile.company_size ? 15 : 0) +
                          (detailedProfile.budget_range ? 10 : 0)
                        ))}%`
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-slate-600">
                    Un profil complet améliore la qualité des matches IA
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;