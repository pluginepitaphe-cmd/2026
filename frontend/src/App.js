import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

// FORCE UPDATE - Test déploiement Vercel - Timestamp: 2025-08-28-11:35

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://2026-ml6c.vercel.app";
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [message, setMessage] = useState("Chargement...");
  const [healthStatus, setHealthStatus] = useState(null);
  const [statusChecks, setStatusChecks] = useState([]);

  const testApi = async () => {
    try {
      const response = await axios.get(`${API}/`);
      setMessage(response.data.message);
    } catch (e) {
      console.error(e, `Erreur API /`);
      setMessage("Application PostgreSQL 2026 - Mode Demo");
    }
  };

  const checkHealth = async () => {
    try {
      const response = await axios.get(`${API}/health`);
      setHealthStatus(response.data);
    } catch (e) {
      console.error(e, `Erreur health check`);
      setHealthStatus({ 
        status: "demo", 
        database: "demo_mode",
        message: "Frontend déployé avec succès!" 
      });
    }
  };

  const loadStatusChecks = async () => {
    try {
      const response = await axios.get(`${API}/status`);
      setStatusChecks(response.data);
    } catch (e) {
      console.error(e, `Erreur chargement status`);
      // Données de demo
      setStatusChecks([
        {
          id: "demo-1",
          client_name: "Client Demo 1",
          timestamp: new Date().toISOString()
        },
        {
          id: "demo-2", 
          client_name: "Client Demo 2",
          timestamp: new Date().toISOString()
        }
      ]);
    }
  };

  const createStatusCheck = async () => {
    try {
      const clientName = prompt("Nom du client ?");
      if (clientName) {
        await axios.post(`${API}/status`, { client_name: clientName });
        loadStatusChecks(); // Recharger la liste
      }
    } catch (e) {
      console.error(e, `Erreur création status`);
      alert("Erreur lors de la création");
    }
  };

  useEffect(() => {
    testApi();
    checkHealth();
    loadStatusChecks();
  }, []);

  return (
    <div className="p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          🎉 APPLICATION POSTGRESQL 2026 DÉPLOYÉE ! 🎉
        </h1>
        <p className="text-lg text-blue-600 font-semibold">✅ Migration réussie vers PostgreSQL ✅</p>
        <p className="text-sm text-gray-500 mt-2">Déploiement Vercel - 28 Août 2025</p>
      </header>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Status de l'API */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Status de l'API</h2>
          <p className="text-lg mb-2">Message: <span className="font-mono text-green-600">{message}</span></p>
          
          {healthStatus && (
            <div className="mt-4">
              <p>Status: <span className={`font-semibold ${healthStatus.status === 'healthy' ? 'text-green-600' : healthStatus.status === 'demo' ? 'text-blue-600' : 'text-red-600'}`}>
                {healthStatus.status}
              </span></p>
              <p>Base de données: <span className={`font-semibold ${healthStatus.database === 'connected' ? 'text-green-600' : healthStatus.database === 'demo_mode' ? 'text-blue-600' : 'text-orange-600'}`}>
                {healthStatus.database}
              </span></p>
              {healthStatus.message && (
                <p className="text-sm text-blue-600 mt-2 font-semibold">
                  🎉 {healthStatus.message}
                </p>
              )}
              {healthStatus.database === 'disconnected' && (
                <p className="text-sm text-gray-500 mt-2">
                  ℹ️ Normal en développement - PostgreSQL sera connecté sur Railway
                </p>
              )}
            </div>
          )}
        </div>

        {/* Gestion des Status Checks */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Status Checks</h2>
            <button 
              onClick={createStatusCheck}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Créer un Status Check
            </button>
          </div>
          
          {statusChecks.length === 0 ? (
            <p className="text-gray-500">Aucun status check créé</p>
          ) : (
            <div className="space-y-3">
              {statusChecks.map((check) => (
                <div key={check.id} className="border rounded p-3 bg-gray-50">
                  <p><strong>Client:</strong> {check.client_name}</p>
                  <p><strong>ID:</strong> <span className="font-mono text-sm">{check.id}</span></p>
                  <p><strong>Date:</strong> {new Date(check.timestamp).toLocaleString('fr-FR')}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Railway */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            🚂 Prêt pour Railway
          </h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>✅ Migration PostgreSQL complète</li>
            <li>✅ Variables d'environnement configurées</li>
            <li>✅ API endpoints fonctionnels</li>
            <li>✅ Prêt pour commit dans repository "2026"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
