import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    company: '',
    phone: '',
    user_type: 'visitor'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await register(formData);
    
    if (result.success) {
      navigate('/login');
    }
    
    setLoading(false);
  };

  const userTypes = [
    { value: 'visitor', label: 'Visiteur', description: 'Professionnel visitant le salon' },
    { value: 'exhibitor', label: 'Exposant', description: 'Entreprise exposante' },
    { value: 'partner', label: 'Partenaire', description: 'Partenaire officiel' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-600 flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-2xl">
            <span className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-cyan-600 bg-clip-text text-transparent">S</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">SIPORTS IA</h1>
          <p className="text-cyan-100">Rejoignez la communauté maritime</p>
        </div>

        {/* Formulaire d'inscription */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Inscription</h2>
            <p className="text-slate-600 text-center">Créez votre compte professionnel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type d'utilisateur */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Type de profil
              </label>
              <div className="grid grid-cols-1 gap-3">
                {userTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`relative flex cursor-pointer rounded-lg border p-4 ${
                      formData.user_type === type.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-300 bg-white hover:bg-slate-50'
                    } transition-colors`}
                  >
                    <input
                      type="radio"
                      name="user_type"
                      value={type.value}
                      checked={formData.user_type === type.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{type.label}</div>
                      <div className="text-sm text-slate-600">{type.description}</div>
                    </div>
                    {formData.user_type === type.value && (
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Informations personnelles */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-slate-700 mb-2">
                  Prénom *
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  required
                  className="input-field"
                  placeholder="John"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-slate-700 mb-2">
                  Nom *
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  required
                  className="input-field"
                  placeholder="Doe"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Adresse email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input-field"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Mot de passe *
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  className="input-field pr-12"
                  placeholder="Minimum 6 caractères"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-4"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5 text-slate-400" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-slate-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                Entreprise
              </label>
              <input
                id="company"
                name="company"
                type="text"
                className="input-field"
                placeholder="Nom de votre entreprise"
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                Téléphone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="input-field"
                placeholder="+33 1 23 45 67 89"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary h-12 flex items-center justify-center"
            >
              {loading ? (
                <LoadingSpinner size="sm" />
              ) : (
                'Créer mon compte'
              )}
            </button>
          </form>

          {/* Note validation */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <span className="font-medium">Note :</span> Votre compte sera soumis à validation par nos équipes. 
              Vous recevrez un email de confirmation une fois votre compte validé.
            </p>
          </div>

          {/* Lien connexion */}
          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Déjà un compte ?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Se connecter
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-cyan-100 text-sm">
          <p>© 2025 SIPORTS IA - Plateforme Maritime Intelligente</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;