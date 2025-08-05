import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';
import { AlertContainer } from './components/Alert';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <div className="min-h-screen bg-gray-50">
          <AlertContainer />
          <ProtectedRoute>
            <Header />
            <Dashboard />
          </ProtectedRoute>
        </div>
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;