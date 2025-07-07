import React from 'react';
import { useDevices } from '../contexts/DeviceContext';
import { ChevronUp, ChevronDown } from 'lucide-react';

const DeviceCard = ({ room, deviceKey, deviceData, icon: Icon, name }) => {
  const { toggleDevice, updateDevice } = useDevices();

  const handleToggle = () => {
    toggleDevice(room, deviceKey);
  };

  const handleSliderChange = (property, value) => {
    updateDevice(room, deviceKey, { [property]: value });
  };

  const renderControls = () => {
    const controls = [];

    if (deviceData.hasOwnProperty('brightness')) {
      controls.push(
        <div key="brightness" className="mt-4">
          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
            Brightness: {deviceData.brightness}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={deviceData.brightness}
            onChange={(e) => handleSliderChange('brightness', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            disabled={!deviceData.status}
          />
        </div>
      );
    }

    if (deviceData.hasOwnProperty('speed')) {
      controls.push(
        <div key="speed" className="mt-4">
          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
            Speed: {deviceData.speed}
          </label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleSliderChange('speed', Math.max(1, deviceData.speed - 1))}
              disabled={!deviceData.status || deviceData.speed <= 1}
              className="p-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
            <span className="text-sm font-medium text-gray-900 dark:text-white flex-1 text-center">
              {deviceData.speed}
            </span>
            <button
              onClick={() => handleSliderChange('speed', Math.min(5, deviceData.speed + 1))}
              disabled={!deviceData.status || deviceData.speed >= 5}
              className="p-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      );
    }

    if (deviceData.hasOwnProperty('temperature')) {
      controls.push(
        <div key="temperature" className="mt-4">
          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
            Temperature: {deviceData.temperature}°C
          </label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleSliderChange('temperature', Math.max(16, deviceData.temperature - 1))}
              disabled={!deviceData.status || deviceData.temperature <= 16}
              className="p-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
            <span className="text-sm font-medium text-gray-900 dark:text-white flex-1 text-center">
              {deviceData.temperature}°C
            </span>
            <button
              onClick={() => handleSliderChange('temperature', Math.min(30, deviceData.temperature + 1))}
              disabled={!deviceData.status || deviceData.temperature >= 30}
              className="p-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      );
    }

    return controls;
  };

  return (
    <div className={`p-4 rounded-lg border transition-all duration-300 ${
      deviceData.status 
        ? 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700' 
        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            deviceData.status 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
              : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
          }`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {deviceData.status ? 'On' : 'Off'}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            deviceData.status 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
              : 'bg-gray-200 dark:bg-gray-600'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              deviceData.status ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
      
      {renderControls()}
    </div>
  );
};

export default DeviceCard;