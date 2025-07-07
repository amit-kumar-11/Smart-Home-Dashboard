import React, { useState, useEffect } from 'react';
import { 
  Thermometer, 
  Zap, 
  Droplets, 
  Wind, 
  Sun, 
  Moon,
  Clock,
  Battery,
  Wifi,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react';
import { useDevices } from '../contexts/DeviceContext';

const Dashboard = () => {
  const { devices } = useDevices();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather] = useState({
    temperature: 24,
    humidity: 65,
    condition: 'Partly Cloudy',
    windSpeed: 12
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getActiveDevicesCount = () => {
    let count = 0;
    Object.values(devices).forEach(room => {
      Object.values(room).forEach(device => {
        if (device.status) count++;
      });
    });
    return count;
  };

  const getEnergyUsage = () => {
    // Simulate energy usage based on active devices
    const activeDevices = getActiveDevicesCount();
    return Math.round((activeDevices * 1.2 + Math.random() * 0.5) * 100) / 100;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const energyUsage = getEnergyUsage();
  const activeDevices = getActiveDevicesCount();

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Home
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {formatDate(currentTime)}
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg">
              <Clock className="h-5 w-5" />
              <span className="font-mono text-lg">{formatTime(currentTime)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Devices</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeDevices}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Energy Usage</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{energyUsage} kW</p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Temperature</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{weather.temperature}°C</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Thermometer className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Connection</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">Online</p>
            </div>
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <Wifi className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Weather & Energy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weather Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Weather</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{weather.temperature}°C</p>
              <p className="text-gray-600 dark:text-gray-300">{weather.condition}</p>
            </div>
            <div className="h-16 w-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center">
              <Sun className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Droplets className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">Humidity: {weather.humidity}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <Wind className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">Wind: {weather.windSpeed} km/h</span>
            </div>
          </div>
        </div>

        {/* Energy Usage Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Energy Usage</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Current Usage</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{energyUsage} kW</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((energyUsage / 10) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Daily Average: 6.2 kW</span>
              <div className="flex items-center space-x-1">
                {energyUsage > 6.2 ? (
                  <TrendingUp className="h-4 w-4 text-red-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-green-500" />
                )}
                <span className={energyUsage > 6.2 ? 'text-red-500' : 'text-green-500'}>
                  {energyUsage > 6.2 ? '+' : '-'}{Math.abs(energyUsage - 6.2).toFixed(1)} kW
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Room Status */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Room Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(devices).map(([roomName, roomDevices]) => {
            const activeCount = Object.values(roomDevices).filter(device => device.status).length;
            const totalDevices = Object.keys(roomDevices).length;
            
            return (
              <div key={roomName} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white capitalize mb-2">
                  {roomName.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {activeCount}/{totalDevices} active
                  </span>
                  <div className="flex space-x-1">
                    {Array.from({ length: totalDevices }, (_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < activeCount 
                            ? 'bg-green-500' 
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;