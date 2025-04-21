import React from 'react';
import { Home, FileText, Upload, MessageSquare, Share2, Clock, Settings, FileUp, Folder, AlertTriangle } from 'lucide-react';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { id: 'templates', icon: <FileText size={20} />, label: 'Templates' },
    { id: 'documents', icon: <FileUp size={20} />, label: 'My Documents' },
    { id: 'vault', icon: <Folder size={20} />, label: 'Document Vault' }, // New: Document Vault
    { id: 'upload', icon: <Upload size={20} />, label: 'Upload' },
    { id: 'assistant', icon: <MessageSquare size={20} />, label: 'AI Assistant' },
    { id: 'share', icon: <Share2 size={20} />, label: 'Share & Sign' },
    { id: 'history', icon: <Clock size={20} />, label: 'History' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="sidebar" style={{ backgroundColor: '#1E3855', color: 'white' }}>
      <div className="logo-container">
        <h2 style={{ color: 'white' }}>PropLegal.AI</h2>
      </div>
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`menu-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => setCurrentPage(item.id)}
            style={{ color: currentPage === item.id ? '#3B5998' : 'white' }}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
      <div className="user-profile">
        <div className="avatar">JD</div>
        <div className="user-info">
          <div className="user-name" style={{ color: 'white' }}>John Doe</div>
          <div className="user-role" style={{ color: '#D3D3D3' }}>Admin</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
