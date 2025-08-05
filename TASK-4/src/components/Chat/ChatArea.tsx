import React from 'react';
import { useChat } from '../../contexts/ChatContext';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { MessageSquare } from 'lucide-react';

interface ChatAreaProps {
  onOpenUserPanel: () => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({ onOpenUserPanel }) => {
  const { activeRoom } = useChat();

  if (!activeRoom) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">
            Welcome to ChatHub
          </h3>
          <p className="text-gray-500">
            Select a room or start a conversation to begin chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      <ChatHeader room={activeRoom} onOpenUserPanel={onOpenUserPanel} />
      <MessageList messages={activeRoom.messages} />
      <MessageInput />
    </div>
  );
};

export default ChatArea;