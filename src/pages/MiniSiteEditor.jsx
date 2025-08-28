import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  Palette, 
  Layout, 
  Type, 
  Image as ImageIcon, 
  Eye, 
  Save, 
  RotateCcw,
  Settings,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Upload,
  X,
  Plus,
  Edit,
  Move
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const MiniSiteEditor = () => {
  const { user } = useAuth();
  const [siteData, setSiteData] = useState({
    title: user?.company || 'Mon Entreprise',
    subtitle: 'Votre partenaire maritime de confiance',
    description: 'Description de votre entreprise et de vos services...',
    theme: 'maritime',
    primaryColor: '#0891b2',
    secondaryColor: '#0e7490',
    accentColor: '#06b6d4',
    logo: null,
    bannerImage: null,
    sections: {
      about: {
        enabled: true,
        title: 'À propos',
        content: 'Présentation de votre entreprise...'
      },
      products: {
        enabled: true,
        title: 'Nos Produits & Services',
        content: 'Découvrez notre gamme complète...'
      },
      contact: {
        enabled: true,
        title: 'Nous Contacter',
        content: 'Contactez-nous pour plus d\'informations...'
      },
      gallery: {
        enabled: false,
        title: 'Galerie',
        content: 'Nos réalisations en images...'
      }
    },
    customCss: '',
    socialLinks: {
      website: '',
      linkedin: '',
      twitter: '',
      facebook: ''
    }
  });

  const [previewMode, setPreviewMode] = useState('desktop');
  const [activeTab, setActiveTab] = useState('design');
  const [hasChanges, setHasChanges] = useState(false);

  const themes = [
    { id: 'maritime', name: 'Maritime', colors: ['#0891b2', '#0e7490', '#06b6d4'] },
    { id: 'professional', name: 'Professionnel', colors: ['#1f2937', '#374151', '#6b7280'] },
    { id: 'modern', name: 'Moderne', colors: ['#7c3aed', '#8b5cf6', '#a78bfa'] },
    { id: 'industrial', name: 'Industriel', colors: ['#dc2626', '#ef4444', '#f87171'] },
    { id: 'eco', name: 'Écologique', colors: ['#059669', '#10b981', '#34d399'] }
  ];

  const updateSiteData = (key, value) => {
    setSiteData(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const updateSection = (sectionKey, field, value) => {
    setSiteData(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionKey]: {
          ...prev.sections[sectionKey],
          [field]: value
        }
      }
    }));
    setHasChanges(true);
  };

  const selectTheme = (theme) => {
    updateSiteData('theme', theme.id);
    updateSiteData('primaryColor', theme.colors[0]);
    updateSiteData('secondaryColor', theme.colors[1]);
    updateSiteData('accentColor', theme.colors[2]);
  };

  const saveSite = () => {
    // Simulation de sauvegarde
    console.log('Sauvegarde du mini-site:', siteData);
    setHasChanges(false);
    alert('Mini-site sauvegardé avec succès !');
  };

  const resetToDefault = () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?')) {
      setSiteData({
        ...siteData,
        theme: 'maritime',
        primaryColor: '#0891b2',
        secondaryColor: '#0e7490',
        accentColor: '#06b6d4',
        customCss: ''
      });
      setHasChanges(true);
    }
  };

  const getPreviewStyles = () => ({
    '--primary-color': siteData.primaryColor,
    '--secondary-color': siteData.secondaryColor,
    '--accent-color': siteData.accentColor
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Éditeur de Mini-Site
            </h1>
            <p className="text-muted-foreground">
              Personnalisez votre présence en ligne
            </p>
          </div>
          <div className="flex items-center gap-3">
            {hasChanges && (
              <Badge variant="outline" className="text-orange-600 border-orange-600">
                Modifications non sauvegardées
              </Badge>
            )}
            <Button variant="outline" onClick={() => window.open('/mini-site/preview', '_blank')}>
              <Eye className="h-4 w-4 mr-2" />
              Aperçu
            </Button>
            <Button onClick={saveSite} disabled={!hasChanges}>
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Panneau d'édition */}
        <div className="lg:col-span-1 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="design">
                <Palette className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="content">
                <Type className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="layout">
                <Layout className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="advanced">
                <Settings className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="design" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Thème et Couleurs</CardTitle>
                  <CardDescription>
                    Choisissez l'apparence de votre mini-site
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Thèmes prédéfinis</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {themes.map((theme) => (
                        <div
                          key={theme.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            siteData.theme === theme.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                          }`}
                          onClick={() => selectTheme(theme)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{theme.name}</span>
                            <div className="flex gap-1">
                              {theme.colors.map((color, index) => (
                                <div
                                  key={index}
                                  className="w-4 h-4 rounded-full border"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Couleurs personnalisées</Label>
                    
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor" className="text-xs">Couleur principale</Label>
                      <div className="flex gap-2">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={siteData.primaryColor}
                          onChange={(e) => updateSiteData('primaryColor', e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          value={siteData.primaryColor}
                          onChange={(e) => updateSiteData('primaryColor', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="secondaryColor" className="text-xs">Couleur secondaire</Label>
                      <div className="flex gap-2">
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={siteData.secondaryColor}
                          onChange={(e) => updateSiteData('secondaryColor', e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          value={siteData.secondaryColor}
                          onChange={(e) => updateSiteData('secondaryColor', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accentColor" className="text-xs">Couleur d'accent</Label>
                      <div className="flex gap-2">
                        <Input
                          id="accentColor"
                          type="color"
                          value={siteData.accentColor}
                          onChange={(e) => updateSiteData('accentColor', e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          value={siteData.accentColor}
                          onChange={(e) => updateSiteData('accentColor', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contenu Principal</CardTitle>
                  <CardDescription>
                    Modifiez les textes de votre mini-site
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre principal</Label>
                    <Input
                      id="title"
                      value={siteData.title}
                      onChange={(e) => updateSiteData('title', e.target.value)}
                      placeholder="Nom de votre entreprise"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Sous-titre</Label>
                    <Input
                      id="subtitle"
                      value={siteData.subtitle}
                      onChange={(e) => updateSiteData('subtitle', e.target.value)}
                      placeholder="Votre slogan ou description courte"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={siteData.description}
                      onChange={(e) => updateSiteData('description', e.target.value)}
                      placeholder="Description détaillée de votre entreprise"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sections</CardTitle>
                  <CardDescription>
                    Gérez les sections de votre mini-site
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(siteData.sections).map(([key, section]) => (
                    <div key={key} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Label className="font-medium">{section.title}</Label>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateSection(key, 'enabled', !section.enabled)}
                          >
                            {section.enabled ? 'Masquer' : 'Afficher'}
                          </Button>
                        </div>
                      </div>
                      {section.enabled && (
                        <div className="space-y-2">
                          <Input
                            value={section.title}
                            onChange={(e) => updateSection(key, 'title', e.target.value)}
                            placeholder="Titre de la section"
                            className="text-sm"
                          />
                          <Textarea
                            value={section.content}
                            onChange={(e) => updateSection(key, 'content', e.target.value)}
                            placeholder="Contenu de la section"
                            rows={2}
                            className="text-sm"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="layout" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mise en Page</CardTitle>
                  <CardDescription>
                    Organisez la structure de votre mini-site
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Label>Images</Label>
                    
                    <div className="space-y-2">
                      <Label className="text-sm">Logo de l'entreprise</Label>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Télécharger
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          {siteData.logo ? 'Logo téléchargé' : 'Aucun logo'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Image de bannière</Label>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Télécharger
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          {siteData.bannerImage ? 'Bannière téléchargée' : 'Aucune bannière'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Paramètres Avancés</CardTitle>
                  <CardDescription>
                    CSS personnalisé et réseaux sociaux
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customCss">CSS personnalisé</Label>
                    <Textarea
                      id="customCss"
                      value={siteData.customCss}
                      onChange={(e) => updateSiteData('customCss', e.target.value)}
                      placeholder="/* Votre CSS personnalisé */"
                      rows={6}
                      className="font-mono text-sm"
                    />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Label>Réseaux sociaux</Label>
                    
                    <div className="space-y-2">
                      <Input
                        placeholder="Site web"
                        value={siteData.socialLinks.website}
                        onChange={(e) => updateSiteData('socialLinks', {...siteData.socialLinks, website: e.target.value})}
                      />
                      <Input
                        placeholder="LinkedIn"
                        value={siteData.socialLinks.linkedin}
                        onChange={(e) => updateSiteData('socialLinks', {...siteData.socialLinks, linkedin: e.target.value})}
                      />
                      <Input
                        placeholder="Twitter"
                        value={siteData.socialLinks.twitter}
                        onChange={(e) => updateSiteData('socialLinks', {...siteData.socialLinks, twitter: e.target.value})}
                      />
                      <Input
                        placeholder="Facebook"
                        value={siteData.socialLinks.facebook}
                        onChange={(e) => updateSiteData('socialLinks', {...siteData.socialLinks, facebook: e.target.value})}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={resetToDefault} className="flex-1">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Réinitialiser
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Aperçu */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Aperçu en temps réel</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant={previewMode === 'desktop' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPreviewMode('desktop')}
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={previewMode === 'tablet' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPreviewMode('tablet')}
                  >
                    <Tablet className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={previewMode === 'mobile' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPreviewMode('mobile')}
                  >
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`mx-auto transition-all duration-300 ${
                previewMode === 'desktop' ? 'max-w-full' : 
                previewMode === 'tablet' ? 'max-w-2xl' : 'max-w-sm'
              }`}>
                <div 
                  className="border rounded-lg overflow-hidden bg-white"
                  style={getPreviewStyles()}
                >
                  {/* En-tête du mini-site */}
                  <div 
                    className="p-8 text-white text-center"
                    style={{ backgroundColor: siteData.primaryColor }}
                  >
                    <h1 className="text-3xl font-bold mb-2">{siteData.title}</h1>
                    <p className="text-lg opacity-90">{siteData.subtitle}</p>
                  </div>

                  {/* Contenu */}
                  <div className="p-6 space-y-6">
                    <div>
                      <p className="text-gray-700 leading-relaxed">{siteData.description}</p>
                    </div>

                    {/* Sections */}
                    {Object.entries(siteData.sections)
                      .filter(([_, section]) => section.enabled)
                      .map(([key, section]) => (
                        <div key={key} className="border-t pt-6">
                          <h2 
                            className="text-xl font-semibold mb-3"
                            style={{ color: siteData.secondaryColor }}
                          >
                            {section.title}
                          </h2>
                          <p className="text-gray-700">{section.content}</p>
                        </div>
                      ))}

                    {/* Contact */}
                    <div className="border-t pt-6">
                      <div 
                        className="p-4 rounded-lg"
                        style={{ backgroundColor: `${siteData.accentColor}20` }}
                      >
                        <h3 className="font-semibold mb-2">Informations de contact</h3>
                        <p className="text-sm text-gray-600">
                          Email: {user?.email}<br/>
                          Téléphone: {user?.phone}<br/>
                          Entreprise: {user?.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MiniSiteEditor;

