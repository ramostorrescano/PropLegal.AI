import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Templates from './components/Templates';
import Upload from './components/Upload';
import Assistant from './components/Assistant';
import DocumentEditor from './components/DocumentEditor';
import DocumentVault from './components/DocumentVault';
import ShareAndSign from './components/ShareAndSign';
import History from './components/History';
import Settings from './components/Settings';
import '../styles/App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'templates':
        return <Templates />;
      case 'documents':
        return <DocumentEditor />;
      case 'vault':
        return <DocumentVault />;
      case 'upload':
        return <Upload />;
      case 'assistant':
        return <Assistant />;
      case 'share':
        return <ShareAndSign />;
      case 'history':
        return <History />;
      case 'settings':
        return <Settings />;
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
};

export default App;
