import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  MagnifyingGlassIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { toast } from 'sonner';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const MessagesPage = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.contact_id);
      loadSuggestions(selectedConversation.contact_id);
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversations = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/messages/conversations`);
      setConversations(response.data.conversations || []);
    } catch (error) {
      console.error('Erreur chargement conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (contactId) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/messages/conversation/${contactId}`);
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error('Erreur chargement messages:', error);
      toast.error('Erreur lors du chargement des messages');
    }
  };

  const loadSuggestions = async (contactId) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/messages/suggestions/${contactId}`);
      setSuggestions(response.data.suggestions || []);
    } catch (error) {
      console.error('Erreur chargement suggestions:', error);
      setSuggestions([]);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    setSending(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/messages/send`, {
        recipient_id: selectedConversation.contact_id,
        content: newMessage.trim(),
        message_type: 'text'
      });

      if (response.data.status === 'sent') {
        // Ajouter le message à la liste local
        const newMsg = {
          id: response.data.message_id,
          sender_id: user.id,
          recipient_id: selectedConversation.contact_id,
          content: newMessage.trim(),
          message_type: 'text',
          is_read: false,
          created_at: new Date().toISOString(),
          sender_name: `${user.first_name} ${user.last_name}`,
          is_own_message: true
        };
        
        setMessages(prev => [...prev, newMsg]);
        setNewMessage('');
        
        // Mettre à jour la conversation
        loadConversations();
      }
    } catch (error) {
      console.error('Erreur envoi message:', error);
      toast.error('Erreur lors de l\'envoi du message');
    } finally {
      setSending(false);
    }
  };

  const useSuggestion = (suggestion) => {
    setNewMessage(suggestion);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Aujourd\'hui';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Hier';
    } else {
      return date.toLocaleDateString('fr-FR');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto container-padding py-6">
        <div className="h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex h-full">
            {/* Liste des conversations */}
            <div className="w-1/3 border-r border-slate-200 flex flex-col">
              {/* En-tête */}
              <div className="p-6 border-b border-slate-200">
                <h1 className="text-2xl font-bold text-slate-900 mb-4">Messages</h1>
                <div className="relative">
                  <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une conversation..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Liste */}
              <div className="flex-1 overflow-y-auto">
                {conversations.length > 0 ? (
                  conversations.map((conversation) => (
                    <div
                      key={conversation.contact_id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`p-4 border-b border-slate-100 cursor-pointer transition-colors hover:bg-slate-50 ${
                        selectedConversation?.contact_id === conversation.contact_id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {conversation.contact_name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-slate-900 truncate">
                              {conversation.contact_name}
                            </h3>
                            {conversation.unread_count > 0 && (
                              <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                                {conversation.unread_count}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500">{conversation.company}</p>
                          <p className="text-sm text-slate-600 truncate mt-1">
                            {conversation.last_message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-500">
                    <ChatBubbleLeftRightIcon className="w-16 h-16 mb-4" />
                    <p>Aucune conversation</p>
                  </div>
                )}
              </div>
            </div>

            {/* Zone de chat */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* En-tête de conversation */}
                  <div className="p-6 border-b border-slate-200 bg-slate-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {selectedConversation.contact_name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                          {selectedConversation.contact_name}
                        </h2>
                        <p className="text-sm text-slate-600">{selectedConversation.company}</p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.is_own_message ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md ${message.is_own_message ? 'message-sent' : 'message-received'}`}>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${message.is_own_message ? 'text-blue-200' : 'text-slate-500'}`}>
                            {formatTime(message.created_at)}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Suggestions IA */}
                  {suggestions.length > 0 && (
                    <div className="px-6 py-3 border-t border-slate-200 bg-slate-50">
                      <div className="flex items-center space-x-2 mb-2">
                        <SparklesIcon className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-slate-700">Suggestions IA</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {suggestions.slice(0, 3).map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => useSuggestion(suggestion)}
                            className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Zone de saisie */}
                  <div className="p-6 border-t border-slate-200">
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Tapez votre message..."
                        className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!newMessage.trim() || sending}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {sending ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          <PaperAirplaneIcon className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center text-slate-500">
                    <ChatBubbleLeftRightIcon className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">Sélectionnez une conversation</h3>
                    <p>Choisissez une conversation pour commencer à échanger</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;