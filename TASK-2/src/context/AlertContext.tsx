import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AlertType } from '../types';

interface AlertContextType {
  alerts: AlertType[];
  addAlert: (type: AlertType['type'], message: string) => void;
  removeAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertType[]>([]);

  const addAlert = (type: AlertType['type'], message: string) => {
    const id = Date.now().toString();
    const newAlert: AlertType = { id, type, message };
    setAlerts(prev => [...prev, newAlert]);

    // Auto remove alert after 5 seconds
    setTimeout(() => {
      removeAlert(id);
    }, 5000);
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};