import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  X, 
  RefreshCw,
  Settings,
  Minimize2,
  Maximize2
} from 'lucide-react';

const SiportsChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [contextType, setContextType] = useState('general');
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  // Configuration des contextes
  const contextOptions = [
    { value: 'general', label: '💬 Général', icon: '🌊' },
    { value: 'exhibitor', label: '🏢 Exposants', icon: '🏢' },
    { value: 'package', label: '💳 Forfaits', icon: '💳' },
    { value: 'event', label: '📅 Événements', icon: '📅' }
  ];

  // Messages de bienvenue selon le contexte
  const welcomeMessages = {
    general: "👋 Bonjour ! Je suis votre assistant SIPORTS v2.0. Comment puis-je vous aider aujourd'hui ?",
    exhibitor: "🏢 Parfait ! Je peux vous recommander les meilleurs exposants selon vos besoins. Que recherchez-vous ?",
    package: "💳 Excellent ! Je vais vous aider à choisir le forfait idéal. Quels sont vos objectifs pour l'événement ?",
    event: "📅 Super ! Je peux vous renseigner sur le programme et les événements. Que souhaitez-vous savoir ?"
  };

  // Initialisation du chatbot
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        text: welcomeMessages[contextType],
        sender: 'bot',
        timestamp: new Date(),
        context: contextType
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, contextType]);

  // Scroll automatique vers le bas
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateSessionId = () => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date(),
      context: contextType
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const currentSessionId = sessionId || generateSessionId();
      if (!sessionId) setSessionId(currentSessionId);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage.trim(),
          context_type: contextType,
          session_id: currentSessionId
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'bot',
        timestamp: new Date(),
        context: data.response_type,
        confidence: data.confidence,
        suggestedActions: data.suggested_actions || [],
        sessionId: data.session_id
      };

      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error('Erreur envoi message:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        text: "Désolé, je rencontre une difficulté technique. Pouvez-vous réessayer ?",
        sender: 'bot',
        timestamp: new Date(),
        context: contextType,
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearConversation = () => {
    setMessages([]);
    setSessionId(null);
    const welcomeMessage = {
      id: Date.now(),
      text: welcomeMessages[contextType],
      sender: 'bot',
      timestamp: new Date(),
      context: contextType
    };
    setMessages([welcomeMessage]);
  };

  const handleContextChange = (newContext) => {
    setContextType(newContext);
    clearConversation();
  };

  const handleSuggestedAction = (action) => {
    setInputMessage(action);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Interface du bouton flottant
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label="Ouvrir le chatbot SIPORTS"
        >
          <MessageCircle size={24} />
        </button>
      </div>
    );
  }

  // Interface principale du chatbot
  return (
    <div className={`fixed bottom-6 right-6 z-50 bg-white rounded-lg shadow-2xl transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Assistant SIPORTS v2.0</h3>
            <p className="text-xs text-blue-100">
              {contextOptions.find(opt => opt.value === contextType)?.label || 'Général'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            aria-label={isMinimized ? 'Maximiser' : 'Minimiser'}
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            aria-label="Fermer"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Contenu principal (masqué si minimisé) */}
      {!isMinimized && (
        <>
          {/* Sélecteur de contexte */}
          <div className="p-3 border-b bg-gray-50">
            <div className="flex space-x-2">
              {contextOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleContextChange(option.value)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    contextType === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {option.icon} {option.label.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          {/* Zone des messages */}
          <div className="flex-1 overflow-y-auto p-4 h-[400px]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div className={`flex max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  {/* Avatar */}
                  <div className={`flex-shrink-0 ${
                    message.sender === 'user' ? 'ml-3' : 'mr-3'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : message.isError
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {message.sender === 'user' ? (
                        <User size={16} />
                      ) : (
                        <Bot size={16} />
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className={`rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : message.isError
                      ? 'bg-red-50 text-red-800 border border-red-200'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    
                    {/* Actions suggérées */}
                    {message.suggestedActions && message.suggestedActions.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.suggestedActions.slice(0, 3).map((action, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestedAction(action)}
                            className="px-2 py-1 text-xs bg-white/20 hover:bg-white/30 rounded border border-white/30 transition-colors"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {/* Timestamp et confiance */}
                    <div className={`mt-2 text-xs flex items-center justify-between ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      <span>{formatTimestamp(message.timestamp)}</span>
                      {message.confidence && (
                        <span className="ml-2">
                          🎯 {Math.round(message.confidence * 100)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Indicateur de frappe */}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="flex mr-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Bot size={16} className="text-gray-600" />
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Zone de saisie */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex items-center space-x-2 mb-2">
              <button
                onClick={clearConversation}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
                aria-label="Nouvelle conversation"
              >
                <RefreshCw size={16} />
              </button>
              
              <div className="text-xs text-gray-500">
                Session: {sessionId ? `...${sessionId.slice(-8)}` : 'Non initialisée'}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Posez votre question sur ${contextOptions.find(opt => opt.value === contextType)?.label.toLowerCase()}...`}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="2"
                disabled={isLoading}
              />
              
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors flex-shrink-0"
                aria-label="Envoyer message"
              >
                {isLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SiportsChatbot;