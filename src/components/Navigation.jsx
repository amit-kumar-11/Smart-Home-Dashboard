import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Grid3x3, Shield, Settings, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navigation = ({ onLogout }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/rooms', icon: Grid3x3, label: 'Rooms' },
    { path: '/security', icon: Shield, label: 'Security' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  const NavItem = ({ item, onClick }) => (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
          isActive
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
        }`
      }
    >
      <item.icon className="h-5 w-5 mr-3" />
      <span className="font-medium">{item.label}</span>
    </NavLink>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        ) : (
          <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-8">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Home className="h-6 w-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
              Smart Home
            </span>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 px-6 space-y-2">
            {navItems.map((item) => (
              <NavItem 
                key={item.path} 
                item={item} 
                onClick={() => setIsMobileMenuOpen(false)}
              />
            ))}
          </div>

          {/* Logout Button */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onLogout}
              className="flex items-center w-full px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-all duration-200"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;