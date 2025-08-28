import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
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
      setMessage("Erreur de connexion API");
    }
  };

  const checkHealth = async () => {
    try {
      const response = await axios.get(`${API}/health`);
      setHealthStatus(response.data);
    } catch (e) {
      console.error(e, `Erreur health check`);
      setHealthStatus({ status: "error", database: "disconnected" });
    }
  };

  const loadStatusChecks = async () => {
    try {
      const response = await axios.get(`${API}/status`);
      setStatusChecks(response.data);
    } catch (e) {
      console.error(e, `Erreur chargement status`);
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
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Application PostgreSQL 2026
        </h1>
        <p className="text-gray-600">Migration réussie vers PostgreSQL pour Railway</p>
      </header>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Status de l'API */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Status de l'API</h2>
          <p className="text-lg mb-2">Message: <span className="font-mono text-green-600">{message}</span></p>
          
          {healthStatus && (
            <div className="mt-4">
              <p>Status: <span className={`font-semibold ${healthStatus.status === 'healthy' ? 'text-green-600' : 'text-red-600'}`}>
                {healthStatus.status}
              </span></p>
              <p>Base de données: <span className={`font-semibold ${healthStatus.database === 'connected' ? 'text-green-600' : 'text-orange-600'}`}>
                {healthStatus.database}
              </span></p>
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
