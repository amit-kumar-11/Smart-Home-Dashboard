import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Moon, 
  Sun, 
  Palette, 
  User, 
  Bell, 
  Shield, 
  Wifi,
  Volume2,
  VolumeX,
  Smartphone,
  Mail,
  Save,
  Camera
} from 'lucide-react';

const SettingsPage = () => {
  const { isDark, toggleTheme, primaryColor, setPrimaryColor } = useTheme();
  const [notifications, setNotifications] = useState({
    security: true,
    energy: true,
    maintenance: false,
    weather: true
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567'
  });

  const colorOptions = [
    { name: 'Blue', value: 'blue', class: 'bg-blue-500' },
    { name: 'Purple', value: 'purple', class: 'bg-purple-500' },
    { name: 'Green', value: 'green', class: 'bg-green-500' },
    { name: 'Red', value: 'red', class: 'bg-red-500' },
    { name: 'Orange', value: 'orange', class: 'bg-orange-500' },
    { name: 'Pink', value: 'pink', class: 'bg-pink-500' }
  ];

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to a backend
    alert('Settings saved successfully!');
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Customize your smart home experience
        </p>
      </div>

      {/* Theme Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Appearance</h2>
        
        <div className="space-y-6">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                {isDark ? (
                  <Moon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Sun className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Dark Mode</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isDark ? 'Dark theme enabled' : 'Light theme enabled'}
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isDark 
                  ? 'bg-blue-500' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isDark ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Color Theme */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <Palette className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Theme Color</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose your primary color
                </p>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setPrimaryColor(color.value)}
                  className={`h-12 w-12 rounded-lg ${color.class} transition-all duration-200 ${
                    primaryColor === color.value 
                      ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-500 scale-110' 
                      : 'hover:scale-105'
                  }`}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">User Profile</h2>
        
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Camera className="h-4 w-4" />
                <span className="text-sm font-medium">Change Photo</span>
              </button>
            </div>
          </div>

          {/* Profile Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={userProfile.name}
                onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={userProfile.email}
                onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={userProfile.phone}
                onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Notifications</h2>
        
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, enabled]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-600 rounded-lg">
                  {key === 'security' && <Shield className="h-5 w-5 text-gray-600 dark:text-gray-300" />}
                  {key === 'energy' && <Wifi className="h-5 w-5 text-gray-600 dark:text-gray-300" />}
                  {key === 'maintenance' && <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />}
                  {key === 'weather' && <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white capitalize">
                    {key} Notifications
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {enabled ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleNotificationToggle(key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  enabled 
                    ? 'bg-blue-500' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* System Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">System</h2>
        
        <div className="space-y-4">
          {/* Sound Settings */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-600 rounded-lg">
                {soundEnabled ? (
                  <Volume2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <VolumeX className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Sound Effects</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {soundEnabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                soundEnabled 
                  ? 'bg-blue-500' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  soundEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Network Status */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Wifi className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Network Status</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Connected to WiFi</p>
              </div>
            </div>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              Connected
            </span>
          </div>

          {/* Mobile App */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Smartphone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Mobile App</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Download for iOS & Android</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          <Save className="h-5 w-5" />
          <span className="font-medium">Save Settings</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;