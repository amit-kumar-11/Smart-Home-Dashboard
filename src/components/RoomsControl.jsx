import React from 'react';
import { useDevices } from '../contexts/DeviceContext';
import DeviceCard from './DeviceCard';
import { Lightbulb, Fan, Snowflake, Mountain as Curtains, Tv, Refrigerator, Flame } from 'lucide-react';

const RoomsControl = () => {
  const { devices } = useDevices();

  const deviceIcons = {
    lights: Lightbulb,
    fan: Fan,
    ac: Snowflake,
    curtains: Curtains,
    tv: Tv,
    refrigerator: Refrigerator,
    heater: Flame
  };

  const roomNames = {
    bedroom: 'Bedroom',
    livingRoom: 'Living Room',
    kitchen: 'Kitchen',
    bathroom: 'Bathroom'
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Rooms Control
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage all your smart devices by room
        </p>
      </div>

      {/* Rooms Grid */}
      <div className="space-y-8">
        {Object.entries(devices).map(([roomKey, roomDevices]) => (
          <div key={roomKey} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {roomNames[roomKey]}
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {Object.values(roomDevices).filter(device => device.status).length} of {Object.keys(roomDevices).length} devices active
                </span>
                <div className="flex space-x-1">
                  {Object.values(roomDevices).map((device, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        device.status 
                          ? 'bg-green-500' 
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Object.entries(roomDevices).map(([deviceKey, deviceData]) => {
                const IconComponent = deviceIcons[deviceKey] || Lightbulb;
                return (
                  <DeviceCard
                    key={deviceKey}
                    room={roomKey}
                    deviceKey={deviceKey}
                    deviceData={deviceData}
                    icon={IconComponent}
                    name={deviceKey.charAt(0).toUpperCase() + deviceKey.slice(1)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsControl;