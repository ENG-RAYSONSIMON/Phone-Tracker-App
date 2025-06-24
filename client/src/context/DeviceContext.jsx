import React, { createContext, useContext, useState, useEffect } from "react";

import {
  registerDevice,
  getUserDevices,
  deleteDeviceById,
} from "../services/dev-services";

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDevices = async () => {
    try {
      const data = await getUserDevices();
      setDevices(data);
    } catch (error) {
      console.error("Failed to fetch devices:", error);
    }
  };

  const addDevice = async (deviceId, name) => {
    setLoading(true);
    try {
      await registerDevice({ deviceId, name });
      await fetchDevices(); // Refresh after adding
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeDevice = async (id) => {
    try {
      await deleteDeviceById(id);
      setDevices((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    // Clear the devices list when logging out
    setDevices([]);
  
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <DeviceContext.Provider
      value={{
        devices,
        loading,
        addDevice,
        removeDevice,
        fetchDevices,
        logout, 
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceContext = () => useContext(DeviceContext);
