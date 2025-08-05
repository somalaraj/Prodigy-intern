import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AuthScreen from '../Auth/AuthScreen';
import ChatLayout from './ChatLayout';

const MainLayout: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  return <ChatLayout />;
};

export default MainLayout;