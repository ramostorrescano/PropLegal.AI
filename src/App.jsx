// src/App.jsx
import React, { useState } from 'react';
import './styles/App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Templates from './components/Templates';
import Upload from './components/Upload';
import Assistant from './components/Assistant';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'templates':
        return <Templates />;
      case 'documents':
        return <div>My Documents Page</div>; // Placeholder
      case 'upload':
        return <Upload />;
      case 'assistant':
        return <Assistant />;
      case 'share':
        return <div>Share & Sign Page</div>; // Placeholder
      case 'history':
        return <div>History Page</div>; // Placeholder
      case 'settings':
        return <div>Settings Page</div>; // Placeholder
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="main-content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
