import React from 'react';
import { useChat } from '../../contexts/ChatContext';

const TypingIndicator: React.FC = () => {
  const { typingUsers } = useChat();

  if (typingUsers.length === 0) return null;

  return (
    <div className="flex items-center space-x-2 text-gray-400">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
      <span className="text-sm">
        {typingUsers.length === 1 
          ? 'Someone is typing...' 
          : `${typingUsers.length} people are typing...`
        }
      </span>
    </div>
  );
};

export default TypingIndicator;