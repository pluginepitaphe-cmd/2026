import React, { useState } from 'react';
import { Toaster } from "sonner";
import Dashboard from "../components/Dashboard";
import UserManagement from "../components/UserManagement";
import Reports from "../components/Reports";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function AdminDashboardPage() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {renderContent()}
        </main>
      </div>
      <Toaster />
    </div>
  );
}

