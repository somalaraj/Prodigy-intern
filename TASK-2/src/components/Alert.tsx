import React from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { AlertType } from '../types';
import { useAlert } from '../context/AlertContext';

const Alert: React.FC<{ alert: AlertType }> = ({ alert }) => {
  const { removeAlert } = useAlert();

  const getAlertStyles = (type: AlertType['type']) => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-green-50 border-green-200 text-green-800',
          icon: <CheckCircle className="h-5 w-5 text-green-400" />,
        };
      case 'error':
        return {
          container: 'bg-red-50 border-red-200 text-red-800',
          icon: <XCircle className="h-5 w-5 text-red-400" />,
        };
      case 'warning':
        return {
          container: 'bg-amber-50 border-amber-200 text-amber-800',
          icon: <AlertTriangle className="h-5 w-5 text-amber-400" />,
        };
      case 'info':
        return {
          container: 'bg-blue-50 border-blue-200 text-blue-800',
          icon: <Info className="h-5 w-5 text-blue-400" />,
        };
      default:
        return {
          container: 'bg-gray-50 border-gray-200 text-gray-800',
          icon: <Info className="h-5 w-5 text-gray-400" />,
        };
    }
  };

  const styles = getAlertStyles(alert.type);

  return (
    <div className={`border rounded-lg p-4 ${styles.container} shadow-sm animate-in slide-in-from-top-2 duration-300`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {styles.icon}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{alert.message}</p>
        </div>
        <div className="ml-auto pl-3">
          <button
            onClick={() => removeAlert(alert.id)}
            className="inline-flex rounded-md p-1.5 hover:bg-black hover:bg-opacity-10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const AlertContainer: React.FC = () => {
  const { alerts } = useAlert();

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {alerts.map((alert) => (
        <Alert key={alert.id} alert={alert} />
      ))}
    </div>
  );
};