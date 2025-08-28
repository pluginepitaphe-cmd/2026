import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, Calendar, Building } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Validation détaillée
    const errors = [];
    if (!formData.name.trim()) errors.push('Le nom est requis');
    if (!formData.email.trim()) errors.push('L\'email est requis');
    if (!formData.subject) errors.push('Le sujet est requis');
    if (!formData.message.trim()) errors.push('Le message est requis');
    
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push('L\'adresse email n\'est pas valide');
    }

    if (errors.length > 0) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      alert('Erreurs de validation:\n' + errors.join('\n'));
      return;
    }

    try {
      // Simulation d'envoi (remplacer par un vrai appel API)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simuler un succès
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* En-tête avec informations officielles */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contactez nous
          </h1>
          
          {/* Informations SIPORTS 2026 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto mb-8">
            <h2 className="text-3xl font-bold text-blue-600 mb-2">SIPORTS 2026</h2>
            <h3 className="text-xl text-gray-700 mb-6">Salon International des Ports et de leur Ecosystème</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center justify-center space-x-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Dates</p>
                  <p className="text-gray-600">05 au 07 février 2026</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Lieu</p>
                  <p className="text-gray-600">Parc d'exposition d'El Jadida – Maroc</p>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nous sommes là pour vous accompagner dans votre participation au plus grand salon maritime du Maghreb. 
            N'hésitez pas à nous contacter pour toute question ou demande d'information.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Informations de contact */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Nos coordonnées
            </h2>
            
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">contact@siportevent.com</p>
                  <p className="text-sm text-gray-500">Réponse sous 48h</p>
                </div>
              </div>

              {/* Téléphone */}
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Téléphone</h3>
                  <p className="text-gray-600">+212 5 23 XX XX XX</p>
                  <p className="text-sm text-gray-500">Lun-Ven 9h-18h</p>
                </div>
              </div>

              {/* Adresse */}
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Adresse</h3>
                  <p className="text-gray-600">
                    Parc d'exposition d'El Jadida<br />
                    El Jadida, Maroc
                  </p>
                </div>
              </div>

              {/* Horaires */}
              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Horaires</h3>
                  <p className="text-gray-600">
                    Lundi - Vendredi: 9h00 - 18h00<br />
                    Samedi: 9h00 - 13h00<br />
                    Dimanche: Fermé
                  </p>
                </div>
              </div>
            </div>

            {/* Informations sur le salon */}
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-3">À propos de SIPORTS</h3>
              <p className="text-blue-800 text-sm">
                SIPORTS est le salon international de référence pour l'industrie portuaire et maritime au Maghreb. 
                Il rassemble les professionnels, les innovations et les opportunités d'affaires du secteur maritime.
              </p>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Formulaire de Contact
            </h2>
            <p className="text-gray-600 mb-6 italic">
              Remplissez le formulaire ci-dessous et notre équipe vous répondra sous 48h
            </p>

            {/* Messages de statut */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-green-800">
                  Votre message a été envoyé avec succès ! Notre équipe vous répondra sous 48h.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-red-800">
                  Une erreur s'est produite. Veuillez vérifier vos informations et réessayer.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nom */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Votre nom complet"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="votre.email@exemple.com"
                />
              </div>

              {/* Sujet */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Sujet *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="participation">Participation en tant qu'exposant</option>
                  <option value="visite">Visite du salon</option>
                  <option value="partenariat">Partenariat</option>
                  <option value="presse">Demande presse</option>
                  <option value="support">Support technique</option>
                  <option value="autre">Autre demande</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Décrivez votre demande en détail..."
                />
              </div>

              {/* Bouton d'envoi */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Envoyer le message</span>
                  </>
                )}
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-4">
              * Champs obligatoires
            </p>
          </div>
        </div>

        {/* Section informations pratiques */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Informations pratiques
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Comment participer en tant qu'exposant ?
              </h3>
              <p className="text-gray-600 text-sm">
                Inscrivez-vous sur notre plateforme et soumettez votre dossier de candidature. 
                Notre équipe validera votre participation sous 48h.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Informations visiteurs
              </h3>
              <p className="text-gray-600 text-sm">
                L'accès au salon est gratuit pour les professionnels sur inscription préalable. 
                Présentez votre badge d'accès à l'entrée du parc d'exposition.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Opportunités de partenariat
              </h3>
              <p className="text-gray-600 text-sm">
                Découvrez nos différentes formules de partenariat pour maximiser votre visibilité 
                lors de SIPORTS 2026. Contactez-nous pour une proposition personnalisée.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Support et assistance
              </h3>
              <p className="text-gray-600 text-sm">
                Notre équipe est disponible pour vous accompagner dans vos démarches. 
                Nous nous engageons à répondre à toutes vos questions sous 48h.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

