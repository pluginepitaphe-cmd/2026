import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, Building, Target, Briefcase, Globe, Languages, 
  Award, Zap, Save, Plus, X, CheckCircle, AlertCircle,
  Settings, Brain, Sparkles
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AIMatchingService } from '@/services/aiMatchingAPI';

const UserProfileDetailed = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
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

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const [activeSection, setActiveSection] = useState('basic');

  // Options prédéfinies selon les spécifications du PDF
  const predefinedOptions = {
    sectors: [
      'Gestion Portuaire',
      'Équipements Portuaires', 
      'Technologies Marines',
      'Solutions Digitales',
      'Développement Durable',
      'Transport Maritime',
      'Logistique Maritime',
      'Services Portuaires',
      'Énergies Renouvelables Offshore',
      'Défense Navale',
      'Sécurité Maritime'
    ],
    participationObjectives: [
      'Recherche de distributeurs',
      'Recherche de clients',
      'Partenaires technologiques',
      'Recrutement de talents',
      'Développement commercial',
      'Innovation collaborative',
      'Expansion internationale',
      'Veille technologique'
    ],
    interestThemes: [
      'Technologies maritimes',
      'Énergies renouvelables', 
      'Défense navale',
      'Logistique portuaire',
      'Intelligence artificielle',
      'IoT et automatisation',
      'Développement durable',
      'Digitalisation',
      'Blockchain maritime',
      'Big Data portuaire'
    ],
    visitObjectives: [
      'Recherche de fournisseurs',
      'Collecte d\'informations',
      'Opportunités de partenariats',
      'Opportunités d\'emploi',
      'Benchmarking concurrentiel',
      'Formation et conférences',
      'Networking professionnel'
    ],
    companySizes: [
      'Startup (1-10 employés)',
      'PME (11-50 employés)', 
      'Moyenne entreprise (51-250 employés)',
      'Grande entreprise (250+ employés)',
      'Organisme public',
      'Association/ONG'
    ],
    budgetRanges: [
      'Moins de 50K€',
      '50K€ - 200K€',
      '200K€ - 500K€',
      '500K€ - 1M€',
      '1M€ - 5M€',
      'Plus de 5M€'
    ],
    locations: [
      'Maroc', 'France', 'Espagne', 'Italie', 'Pays-Bas', 'Allemagne',
      'Royaume-Uni', 'Norvège', 'Danemark', 'Suède', 'Singapour',
      'Émirats Arabes Unis', 'Chine', 'Japon', 'Corée du Sud', 'Australie'
    ],
    languages: [
      'Français', 'Anglais', 'Espagnol', 'Italien', 'Allemand', 
      'Néerlandais', 'Arabe', 'Mandarin', 'Japonais', 'Coréen'
    ]
  };

  // Chargement du profil existant
  useEffect(() => {
    if (user?.id) {
      loadProfile();
    }
  }, [user?.id]);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const result = await AIMatchingService.getDetailedProfile(user.id);
      if (result.success) {
        setProfile(result.data);
      }
    } catch (error) {
      setMessage({ type: 'error', content: 'Erreur lors du chargement du profil' });
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    setMessage({ type: '', content: '' });

    try {
      const result = await AIMatchingService.updateDetailedProfile(profile);
      if (result.success) {
        setMessage({ type: 'success', content: 'Profil sauvegardé avec succès ! L\'IA utilisera ces informations pour améliorer vos matches.' });
      } else {
        setMessage({ type: 'error', content: result.error || 'Erreur lors de la sauvegarde' });
      }
    } catch (error) {
      setMessage({ type: 'error', content: 'Erreur lors de la sauvegarde' });
    } finally {
      setSaving(false);
    }
  };

  // Gestion des listes
  const addToList = (field, value) => {
    if (value && !profile[field].includes(value)) {
      setProfile(prev => ({
        ...prev,
        [field]: [...prev[field], value]
      }));
    }
  };

  const removeFromList = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: prev[field].filter(item => item !== value)
    }));
  };

  // Composant pour les listes avec suggestions
  const TagList = ({ field, options, placeholder, icon: Icon }) => {
    const [inputValue, setInputValue] = useState('');

    const handleAdd = () => {
      if (inputValue.trim()) {
        addToList(field, inputValue.trim());
        setInputValue('');
      }
    };

    return (
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholder}
              onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
              className="pr-10"
            />
            <Icon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
          <Button onClick={handleAdd} size="sm" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Tags actuels */}
        <div className="flex flex-wrap gap-2">
          {profile[field].map((item, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {item}
              <button
                onClick={() => removeFromList(field, item)}
                className="ml-1 hover:bg-slate-300 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>

        {/* Suggestions prédéfinies */}
        {options && (
          <div className="space-y-2">
            <p className="text-sm text-slate-600">Suggestions:</p>
            <div className="flex flex-wrap gap-1">
              {options
                .filter(option => !profile[field].includes(option))
                .slice(0, 8)
                .map((option, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => addToList(field, option)}
                    className="text-xs h-7 px-2 text-slate-600 hover:bg-purple-100"
                  >
                    + {option}
                  </Button>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const sections = [
    { id: 'basic', label: 'Informations de base', icon: User },
    { id: 'business', label: 'Activité business', icon: Briefcase },
    { id: 'objectives', label: 'Objectifs', icon: Target },
    { id: 'preferences', label: 'Préférences', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
            <Brain className="h-8 w-8 text-purple-600" />
            Profil Détaillé pour l'IA
            <Badge variant="outline" className="bg-purple-100 text-purple-800">
              <Sparkles className="h-3 w-3 mr-1" />
              Optimisé IA
            </Badge>
          </h1>
          <p className="text-lg text-slate-600">
            Complétez votre profil pour améliorer la précision du matching IA selon vos besoins spécifiques
          </p>
        </div>

        {/* Messages */}
        {message.content && (
          <Card className={`border-2 ${
            message.type === 'success' 
              ? 'border-green-200 bg-green-50' 
              : 'border-red-200 bg-red-50'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                {message.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600" />
                )}
                <span className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                  {message.content}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation des sections */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-lg shadow-lg p-1">
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    activeSection === section.id 
                      ? 'bg-purple-600 text-white shadow-md' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-slate-600">Chargement du profil...</p>
          </div>
        ) : (
          <>
            {/* Section Informations de base */}
            {activeSection === 'basic' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      Secteurs d'activité
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TagList 
                      field="sectors_activity"
                      options={predefinedOptions.sectors}
                      placeholder="Ajoutez un secteur d'activité..."
                      icon={Building}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Thématiques d'intérêt
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TagList 
                      field="interest_themes"
                      options={predefinedOptions.interestThemes}
                      placeholder="Ajoutez une thématique..."
                      icon={Zap}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Languages className="h-5 w-5" />
                      Langues parlées
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TagList 
                      field="languages"
                      options={predefinedOptions.languages}
                      placeholder="Ajoutez une langue..."
                      icon={Languages}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TagList 
                      field="certifications"
                      options={[]}
                      placeholder="Ajoutez une certification..."
                      icon={Award}
                    />
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Section Activité business */}
            {activeSection === 'business' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Produits/Services proposés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TagList 
                      field="products_services"
                      options={[]}
                      placeholder="Décrivez vos produits/services..."
                      icon={Briefcase}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Compétences et expertises</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TagList 
                      field="skills_expertise"
                      options={[]}
                      placeholder="Ajoutez une compétence..."
                      icon={Zap}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Taille de l'entreprise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <select
                      value={profile.company_size}
                      onChange={(e) => setProfile(prev => ({...prev, company_size: e.target.value}))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Sélectionnez la taille</option>
                      {predefinedOptions.companySizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Fourchette budgétaire</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <select
                      value={profile.budget_range}
                      onChange={(e) => setProfile(prev => ({...prev, budget_range: e.target.value}))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Sélectionnez une fourchette</option>
                      {predefinedOptions.budgetRanges.map(range => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Section Objectifs */}
            {activeSection === 'objectives' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Objectifs de participation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TagList 
                      field="participation_objectives"
                      options={predefinedOptions.participationObjectives}
                      placeholder="Ajoutez un objectif..."
                      icon={Target}
                    />
                  </CardContent>
                </Card>

                {user?.user_type === 'visitor' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Objectifs de visite</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <TagList 
                        field="visit_objectives"
                        options={predefinedOptions.visitObjectives}
                        placeholder="Ajoutez un objectif de visite..."
                        icon={Target}
                      />
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>Vous recherchez</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TagList 
                      field="looking_for"
                      options={[]}
                      placeholder="Décrivez ce que vous recherchez..."
                      icon={Search}
                    />
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Section Préférences */}
            {activeSection === 'preferences' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Zones géographiques d'intérêt
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TagList 
                      field="geographic_location"
                      options={predefinedOptions.locations}
                      placeholder="Ajoutez une zone géographique..."
                      icon={Globe}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Disponibilité pour les rendez-vous</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <select
                      value={profile.meeting_availability}
                      onChange={(e) => setProfile(prev => ({...prev, meeting_availability: e.target.value}))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Sélectionnez votre disponibilité</option>
                      <option value="Immédiate">Immédiate</option>
                      <option value="Dans 24h">Dans 24h</option>
                      <option value="Dans 48h">Dans 48h</option>
                      <option value="Dans la semaine">Dans la semaine</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Bouton de sauvegarde */}
            <div className="flex justify-center">
              <Button 
                onClick={saveProfile}
                disabled={saving}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
              >
                {saving ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Sauvegarder le profil IA
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfileDetailed;