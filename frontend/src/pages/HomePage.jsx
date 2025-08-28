import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Users,
  Calendar,
  MessageCircle,
  Building,
  Globe,
  Star,
  Play,
  ExternalLink,
  CheckCircle,
  Crown
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const HomePage = () => {
  const { user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      title: 'SIPORTS 2026',
      subtitle: 'Salon International des Ports et de leur Ecosystème',
      description: 'Du 05 au 07 Février 2026, le Maroc devient la capitale mondiale des ports et de leur écosystème. L’Afrique vous ouvre ses portes. Le Maroc vous accueille.',
      image: '/images/siports-hero.jpg',
      cta: 'Découvrir les exposants',
      ctaLink: '/exposants'
    },
    {
      id: 2,
      title: 'Un carrefour stratégique',
      subtitle: 'Pour le Business & les Partenariats',
      description: 'Structurez de nouvelles routes maritimes et développez des partenariats exclusifs entre les ports et leur écosystème.',
      image: '/images/port-authority.jpg',
      cta: 'Voir les partenaires',
      ctaLink: '/partenaires'
    },
    {
      id: 3,
      title: 'Equipement, Innovation et Technologies',
      subtitle: 'Renforcer la performance des ports',
      description: 'Un focus sur l’équipement, l’innovation, la formation et la durabilité pour accompagner la transition digitale et écologique.',
      image: '/images/smart-port-system.jpg',
      cta: 'Explorer les solutions',
      ctaLink: '/exposants'
    }
  ];

  const features = [
    {
      icon: Users,
      title: 'Réseau Professionnel',
      description: 'Connectez-vous avec plus de 150 exposants et partenaires du secteur maritime',
      color: 'text-blue-600'
    },
    {
      icon: Calendar,
      title: 'Planification Intelligente',
      description: 'Organisez vos rendez-vous et gérez votre agenda salon en temps réel',
      color: 'text-green-600'
    },
    {
      icon: MessageCircle,
      title: 'Messagerie Intégrée',
      description: 'Échangez directement avec vos contacts et partenaires potentiels',
      color: 'text-purple-600'
    },
    {
      icon: Building,
      title: 'Mini-Sites Personnalisés',
      description: 'Créez votre présence en ligne avec des mini-sites automatiquement générés',
      color: 'text-orange-600'
    }
  ];

  const stats = [
    { number: '+6000', label: 'Visiteurs Attendus', icon: Users },
    { number: '+300', label: 'Exposants', icon: Building },
    { number: '+30', label: 'Conférences', icon: MessageCircle },
    { number: '+50', label: 'Pays Représentés', icon: Globe }
  ];

  const testimonials = [
    {
      name: 'Ahmed Benali',
      company: 'Maritime Solutions',
      role: 'Directeur Technique',
      content: 'SIPORTS a révolutionné notre façon de participer aux salons maritimes. La plateforme de réseautage nous a permis de générer 40% de leads supplémentaires.',
      rating: 5,
      avatar: 'AB'
    },
    {
      name: 'Fatima El Mansouri',
      company: 'Port de Rabat',
      role: 'Responsable Commercial',
      content: 'L\'interface intuitive et les fonctionnalités de planification ont considérablement amélioré notre efficacité lors des événements.',
      rating: 5,
      avatar: 'FE'
    },
    {
      name: 'Jean-Pierre Martin',
      company: 'EuroMarine Technologies',
      role: 'Directeur Export',
      content: 'Les mini-sites automatiques nous ont fait gagner des semaines de préparation. Nos prospects peuvent maintenant nous découvrir 24/7.',
      rating: 5,
      avatar: 'JP'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section avec Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-800/90 z-10"></div>
        
        {/* Background Images */}
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-cyan-600/20 text-cyan-300 border-cyan-500/30">
              {heroSlides[currentSlide].subtitle}
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
              {heroSlides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 text-lg"
                onClick={() => window.location.href = heroSlides[currentSlide].ctaLink}
              >
                {heroSlides[currentSlide].cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg"
                onClick={() => window.location.href = '/inscription'}
              >
                <Play className="mr-2 h-5 w-5" />
                Voir la démo
              </Button>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-cyan-500' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full text-white mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.number}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-cyan-100 text-cyan-800">Fonctionnalités</Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Une plateforme complète pour votre succès
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              SIPORTS combine toutes les fonctionnalités essentielles pour maximiser votre impact lors des événements maritimes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 bg-white">
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-6`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visitor Packages Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800">Forfaits Visiteur</Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Choisissez l'expérience qui vous convient
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Du forfait gratuit au pass VIP tout inclus, découvrez nos options pour maximiser votre expérience SIPORTS 2026
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                name: 'Free Pass',
                price: 'Gratuit',
                features: ['Accès exposition', 'Conférences publiques', 'App mobile'],
                color: 'border-gray-200 bg-gray-50',
                popular: false
              },
              {
                name: 'Basic Pass',
                price: '150€',
                features: ['Accès 1 jour', 'Conférences', '2 RDV B2B'],
                color: 'border-blue-200 bg-blue-50',
                popular: false
              },
              {
                name: 'Premium Pass',
                price: '350€',
                features: ['Accès 2 jours', 'Salon VIP', '5 RDV B2B'],
                color: 'border-purple-200 bg-purple-50',
                popular: true
              },
              {
                name: 'VIP Pass',
                price: '750€',
                features: ['Accès 3 jours', 'Tout inclus', 'RDV illimités'],
                color: 'border-yellow-200 bg-yellow-50',
                popular: false
              }
            ].map((pkg, index) => (
              <Card key={index} className={`${pkg.color} relative hover:shadow-xl transition-all duration-300`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-600 text-white">Populaire</Badge>
                  </div>
                )}
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-cyan-600 mb-4">{pkg.price}</div>
                  <div className="space-y-2 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center justify-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/forfaits-visiteur">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg">
                <Crown className="h-5 w-5 mr-2" />
                Découvrir tous les forfaits
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 bg-green-100 text-green-800">Innovation</Badge>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Technologies de pointe pour l'industrie maritime
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Découvrez les dernières innovations en matière d'équipements portuaires, 
                systèmes de gestion intelligents et solutions IoT qui transforment l'industrie maritime.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span className="text-slate-700">Un carrefour stratégique pour le Business & les Partenariats</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span className="text-slate-700">Equipement, Innovation et Technologies pour renforcer la performance des ports</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span className="text-slate-700">Conférences et Ateliers pour anticiper les grandes mutations du secteur</span>
                </div>
              </div>
              <Button className="mt-8 bg-cyan-600 hover:bg-cyan-700" size="lg">
                Explorer les solutions
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <img
                src="/images/port-crane.jpg"
                alt="Technologies maritimes"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-cyan-600/20 text-cyan-300 border-cyan-500/30">Témoignages</Badge>
            <h2 className="text-4xl font-bold mb-6">
              Ce que disent nos utilisateurs
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Découvrez comment SIPORTS transforme l'expérience des professionnels du maritime
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-slate-400">{testimonial.role}</div>
                      <div className="text-sm text-cyan-400">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à transformer votre présence maritime ?
          </h2>
          <p className="text-xl mb-8 text-cyan-100 max-w-2xl mx-auto">
            Rejoignez plus de 150 exposants et partenaires qui font confiance à SIPORTS 
            pour développer leur réseau et leurs opportunités d'affaires.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <Button 
                  size="lg" 
                  className="bg-white text-cyan-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                  onClick={() => window.location.href = '/inscription'}
                >
                  Créer mon compte
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-cyan-600 px-8 py-4 text-lg"
                  onClick={() => window.location.href = '/exposants'}
                >
                  Découvrir les exposants
                </Button>
              </>
            ) : (
              <>
                <Button 
                  size="lg" 
                  className="bg-white text-cyan-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  Accéder à mon tableau de bord
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-cyan-600 px-8 py-4 text-lg"
                  onClick={() => window.location.href = '/reseautage'}
                >
                  Commencer le réseautage
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;


