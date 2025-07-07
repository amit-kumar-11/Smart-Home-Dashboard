import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import RoomsControl from './components/RoomsControl';
import SecurityPage from './components/SecurityPage';
import SettingsPage from './components/SettingsPage';
import Navigation from './components/Navigation';
import { ThemeProvider } from './contexts/ThemeContext';
import { DeviceProvider } from './contexts/DeviceContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <DeviceProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            {!isAuthenticated ? (
              <LoginPage onLogin={handleLogin} />
            ) : (
              <div className="flex flex-col lg:flex-row">
                <Navigation onLogout={handleLogout} />
                <main className="flex-1 lg:ml-64">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/rooms" element={<RoomsControl />} />
                    <Route path="/security" element={<SecurityPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
              </div>
            )}
          </div>
        </Router>
      </DeviceProvider>
    </ThemeProvider>
  );
}

export default App;