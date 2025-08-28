import React from 'react';
import SiportsChatbot from '../components/ai/SiportsChatbot';

const ChatbotTestPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            🤖 Test du Chatbot IA SIPORTS v2.0
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">✅ Fonctionnalités</h2>
              <ul className="space-y-2 text-blue-700">
                <li>• 💬 Assistant général SIPORTS</li>
                <li>• 🏢 Recommandations exposants</li>
                <li>• 💳 Suggestions forfaits</li>
                <li>• 📅 Informations événements</li>
                <li>• 🎯 Réponses contextuelles</li>
                <li>• 📈 Mode simulation gratuit</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-green-800 mb-4">🧪 Tests à effectuer</h2>
              <ul className="space-y-2 text-green-700">
                <li>• Cliquer sur le bouton chatbot (en bas à droite)</li>
                <li>• Tester différents contextes</li>
                <li>• Poser des questions sur les forfaits</li>
                <li>• Demander des recommandations d'exposants</li>
                <li>• S'informer sur le programme</li>
                <li>• Vérifier les actions suggérées</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-yellow-800 mb-4">💡 Questions de test suggérées</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-yellow-800 mb-2">Général :</h3>
                <p className="text-sm text-yellow-700">"Bonjour, pouvez-vous m'aider ?"</p>
                <p className="text-sm text-yellow-700">"Qu'est-ce que SIPORTS ?"</p>
              </div>
              <div>
                <h3 className="font-medium text-yellow-800 mb-2">Forfaits :</h3>
                <p className="text-sm text-yellow-700">"Quels forfaits proposez-vous ?"</p>
                <p className="text-sm text-yellow-700">"Quelle est la différence entre Premium et VIP ?"</p>
              </div>
              <div>
                <h3 className="font-medium text-yellow-800 mb-2">Exposants :</h3>
                <p className="text-sm text-yellow-700">"Recommandez-moi des exposants en technologie"</p>
                <p className="text-sm text-yellow-700">"Qui expose sur le shipping ?"</p>
              </div>
              <div>
                <h3 className="font-medium text-yellow-800 mb-2">Événements :</h3>
                <p className="text-sm text-yellow-700">"Quel est le programme ?"</p>
                <p className="text-sm text-yellow-700">"À quelle heure sont les conférences ?"</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🔧 Informations techniques</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Backend :</span>
                <span className="text-green-600 ml-2">✅ 9/9 endpoints fonctionnels</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">IA Service :</span>
                <span className="text-blue-600 ml-2">🤖 Mode simulation actif</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Sessions :</span>
                <span className="text-purple-600 ml-2">💾 Historique supporté</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Le chatbot sera affiché en tant que composant flottant */}
      <SiportsChatbot />
    </div>
  );
};

export default ChatbotTestPage;