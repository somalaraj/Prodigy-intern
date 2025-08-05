import React from 'react';
import { ChatRoom } from '../../contexts/ChatContext';
import { Hash, MessageCircle, Users, MoreVertical } from 'lucide-react';

interface ChatHeaderProps {
  room: ChatRoom;
  onOpenUserPanel: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ room, onOpenUserPanel }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
      <div className="flex items-center space-x-3">
        {room.type === 'public' ? (
          <Hash className="w-5 h-5 text-gray-400" />
        ) : (
          <MessageCircle className="w-5 h-5 text-gray-400" />
        )}
        <div>
          <h2 className="text-lg font-semibold text-white">{room.name}</h2>
          {room.description && (
            <p className="text-sm text-gray-400">{room.description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onOpenUserPanel}
          className="flex items-center space-x-2 px-3 py-1.5 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors lg:hidden"
        >
          <Users size={16} />
          <span className="text-sm">{room.participants.length}</span>
        </button>
        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
          <MoreVertical size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;