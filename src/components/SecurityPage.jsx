import React, { useState } from 'react';
import { useDevices } from '../contexts/DeviceContext';
import { 
  Shield, 
  Lock, 
  Unlock, 
  Camera, 
  AlertTriangle, 
  Bell, 
  Eye,
  EyeOff,
  Siren,
  Phone,
  Mail
} from 'lucide-react';

const SecurityPage = () => {
  const { security, updateSecurity } = useDevices();
  const [activeCamera, setActiveCamera] = useState('frontDoor');
  const [showAlert, setShowAlert] = useState(false);

  const handleSecurityToggle = (key) => {
    updateSecurity({ [key]: !security[key] });
  };

  const handleCameraToggle = (camera) => {
    updateSecurity({
      cameras: {
        ...security.cameras,
        [camera]: !security.cameras[camera]
      }
    });
  };

  const handleEmergencyAlert = (type) => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
    // In a real app, this would trigger actual emergency protocols
  };

  const cameraFeeds = {
    frontDoor: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400',
    backyard: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
    livingRoom: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400'
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Security Center
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Monitor and control your home security systems
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className={`h-8 w-8 ${
              security.alarm ? 'text-red-500' : 'text-green-500'
            }`} />
            <span className={`text-sm font-medium ${
              security.alarm ? 'text-red-500' : 'text-green-500'
            }`}>
              {security.alarm ? 'ALARM ACTIVE' : 'SECURE'}
            </span>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      {showAlert && (
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">Emergency Alert Triggered</span>
            </div>
            <button
              onClick={() => setShowAlert(false)}
              className="text-white hover:text-red-200"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Security Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Door Lock */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                security.doorLock ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'
              }`}>
                {security.doorLock ? (
                  <Lock className="h-6 w-6 text-green-600 dark:text-green-400" />
                ) : (
                  <Unlock className="h-6 w-6 text-red-600 dark:text-red-400" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Main Door</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {security.doorLock ? 'Locked' : 'Unlocked'}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleSecurityToggle('doorLock')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                security.doorLock 
                  ? 'bg-green-500' 
                  : 'bg-red-500'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  security.doorLock ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Window Locks */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                security.windowLocks ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'
              }`}>
                {security.windowLocks ? (
                  <Lock className="h-6 w-6 text-green-600 dark:text-green-400" />
                ) : (
                  <Unlock className="h-6 w-6 text-red-600 dark:text-red-400" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Windows</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {security.windowLocks ? 'Locked' : 'Unlocked'}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleSecurityToggle('windowLocks')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                security.windowLocks 
                  ? 'bg-green-500' 
                  : 'bg-red-500'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  security.windowLocks ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Alarm System */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                security.alarm ? 'bg-red-100 dark:bg-red-900/20' : 'bg-gray-100 dark:bg-gray-700'
              }`}>
                <Bell className={`h-6 w-6 ${
                  security.alarm ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
                }`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Alarm System</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {security.alarm ? 'Active' : 'Inactive'}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleSecurityToggle('alarm')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                security.alarm 
                  ? 'bg-red-500' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  security.alarm ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Camera System */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Camera System</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Camera Feed */}
          <div className="lg:col-span-2">
            <div className="bg-black rounded-lg overflow-hidden">
              <img 
                src={cameraFeeds[activeCamera]} 
                alt="Camera feed"
                className="w-full h-64 lg:h-80 object-cover"
              />
              <div className="p-4 bg-gray-900 text-white">
                <div className="flex items-center justify-between">
                  <span className="font-medium capitalize">
                    {activeCamera.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">LIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Camera Controls */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Camera Controls</h3>
            {Object.entries(security.cameras).map(([cameraKey, isActive]) => (
              <div key={cameraKey} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setActiveCamera(cameraKey)}
                    className={`p-2 rounded-lg transition-colors ${
                      activeCamera === cameraKey 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white capitalize">
                      {cameraKey.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {isActive ? 'Recording' : 'Offline'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleCameraToggle(cameraKey)}
                  className={`p-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Emergency Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleEmergencyAlert('fire')}
            className="p-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <AlertTriangle className="h-5 w-5" />
            <span className="font-medium">Fire Alert</span>
          </button>
          <button
            onClick={() => handleEmergencyAlert('intrusion')}
            className="p-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <Siren className="h-5 w-5" />
            <span className="font-medium">Intrusion Alert</span>
          </button>
          <button
            onClick={() => handleEmergencyAlert('medical')}
            className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <Phone className="h-5 w-5" />
            <span className="font-medium">Medical Emergency</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;