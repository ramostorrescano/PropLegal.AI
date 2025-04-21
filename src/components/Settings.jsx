import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real app, this would update the theme context or CSS variables
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <div className="settings-section">
        <h2>Appearance</h2>
        <div className="theme-toggle">
          <span>Dark Mode</span>
          <button onClick={toggleDarkMode}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
      <div className="settings-section">
        <h2>Account</h2>
        <p>User: John Doe</p>
        <p>Role: Admin</p>
        <button className="btn-primary">Manage Subscription</button>
      </div>
    </div>
  );
};

export default Settings;
