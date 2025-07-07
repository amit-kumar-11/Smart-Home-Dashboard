import React, { createContext, useContext, useState, useEffect } from 'react';

const DeviceContext = createContext();

export const useDevices = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevices must be used within a DeviceProvider');
  }
  return context;
};

export const DeviceProvider = ({ children }) => {
  const [devices, setDevices] = useState({
    bedroom: {
      lights: { status: false, brightness: 80 },
      fan: { status: false, speed: 2 },
      ac: { status: false, temperature: 22 },
      curtains: { status: false }
    },
    livingRoom: {
      lights: { status: true, brightness: 60 },
      fan: { status: false, speed: 1 },
      ac: { status: true, temperature: 24 },
      curtains: { status: true },
      tv: { status: false }
    },
    kitchen: {
      lights: { status: true, brightness: 90 },
      fan: { status: true, speed: 2 },
      refrigerator: { status: true }
    },
    bathroom: {
      lights: { status: false, brightness: 70 },
      fan: { status: false, speed: 1 },
      heater: { status: false }
    }
  });

  const [security, setSecurity] = useState({
    doorLock: true,
    windowLocks: true,
    alarm: false,
    cameras: {
      frontDoor: true,
      backyard: true,
      livingRoom: false
    }
  });

  useEffect(() => {
    const savedDevices = localStorage.getItem('smartHomeDevices');
    const savedSecurity = localStorage.getItem('smartHomeSecurity');
    
    if (savedDevices) {
      setDevices(JSON.parse(savedDevices));
    }
    if (savedSecurity) {
      setSecurity(JSON.parse(savedSecurity));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('smartHomeDevices', JSON.stringify(devices));
  }, [devices]);

  useEffect(() => {
    localStorage.setItem('smartHomeSecurity', JSON.stringify(security));
  }, [security]);

  const toggleDevice = (room, device, property = 'status') => {
    setDevices(prev => ({
      ...prev,
      [room]: {
        ...prev[room],
        [device]: {
          ...prev[room][device],
          [property]: !prev[room][device][property]
        }
      }
    }));
  };

  const updateDevice = (room, device, updates) => {
    setDevices(prev => ({
      ...prev,
      [room]: {
        ...prev[room],
        [device]: {
          ...prev[room][device],
          ...updates
        }
      }
    }));
  };

  const updateSecurity = (updates) => {
    setSecurity(prev => ({
      ...prev,
      ...updates
    }));
  };

  const value = {
    devices,
    security,
    toggleDevice,
    updateDevice,
    updateSecurity
  };

  return (
    <DeviceContext.Provider value={value}>
      {children}
    </DeviceContext.Provider>
  );
};