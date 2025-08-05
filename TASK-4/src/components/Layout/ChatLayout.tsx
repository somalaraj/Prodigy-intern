import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatArea from '../Chat/ChatArea';
import UserPanel from '../User/UserPanel';
import { Menu, X } from 'lucide-react';

const ChatLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-900 flex overflow-hidden">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg shadow-lg"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div className={`${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 fixed md:relative z-40 transition-transform duration-300 w-80 h-full`}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatArea onOpenUserPanel={() => setIsUserPanelOpen(true)} />
      </div>

      {/* User panel */}
      <div className={`${
        isUserPanelOpen ? 'translate-x-0' : 'translate-x-full'
      } lg:translate-x-0 fixed lg:relative z-30 transition-transform duration-300 w-80 h-full bg-gray-800`}>
        <UserPanel onClose={() => setIsUserPanelOpen(false)} />
      </div>

      {/* Overlay for mobile */}
      {(isSidebarOpen || isUserPanelOpen) && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => {
            setIsSidebarOpen(false);
            setIsUserPanelOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ChatLayout;