import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useChat } from '../../contexts/ChatContext';
import { Hash, MessageCircle, Plus, Settings, LogOut, Crown } from 'lucide-react';

interface SidebarProps {
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { user, logout } = useAuth();
  const { rooms, activeRoom, joinRoom } = useChat();

  const publicRooms = rooms.filter(room => room.type === 'public');
  const privateRooms = rooms.filter(room => room.type === 'private');

  const handleRoomClick = (roomId: string) => {
    joinRoom(roomId);
    onClose();
  };

  return (
    <div className="w-full h-full bg-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">ChatHub</h1>
            <p className="text-sm text-gray-400">Real-time messaging</p>
          </div>
        </div>
      </div>

      {/* User info */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <img
            src={user?.avatar}
            alt={user?.username}
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.username}</p>
            <p className="text-xs text-green-400">Online</p>
          </div>
          <button
            onClick={logout}
            className="p-1 text-gray-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        {/* Public Rooms */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
              Public Rooms
            </h3>
            <button className="p-1 text-gray-400 hover:text-white transition-colors">
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-1">
            {publicRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => handleRoomClick(room.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  activeRoom?.id === room.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Hash size={16} />
                <span className="flex-1 text-left truncate">{room.name}</span>
                {room.unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {room.unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Private Messages */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
              Direct Messages
            </h3>
            <button className="p-1 text-gray-400 hover:text-white transition-colors">
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-1">
            {privateRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => handleRoomClick(room.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  activeRoom?.id === room.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <MessageCircle size={16} />
                <span className="flex-1 text-left truncate">{room.name}</span>
                {room.unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {room.unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="p-4 border-t border-gray-700">
        <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
          <Settings size={16} />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;