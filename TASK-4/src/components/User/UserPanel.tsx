import React from 'react';
import { useChat } from '../../contexts/ChatContext';
import { X, MessageCircle } from 'lucide-react';

interface UserPanelProps {
  onClose: () => void;
}

const UserPanel: React.FC<UserPanelProps> = ({ onClose }) => {
  const { onlineUsers, createPrivateRoom } = useChat();

  const handleStartChat = (userId: string) => {
    createPrivateRoom(userId);
    onClose();
  };

  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="w-full h-full bg-gray-800 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Online Users</h2>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-white transition-colors lg:hidden"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {onlineUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-10 h-10 rounded-full"
                />
                <div
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${
                    user.isOnline ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.username}
                </p>
                <p className="text-xs text-gray-400">
                  {user.isOnline ? 'Online' : formatLastSeen(user.lastSeen)}
                </p>
              </div>
              <button
                onClick={() => handleStartChat(user.id)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-lg transition-colors"
              >
                <MessageCircle size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPanel;