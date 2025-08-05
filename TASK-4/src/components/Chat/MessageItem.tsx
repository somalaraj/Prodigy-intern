import React from 'react';
import { Message } from '../../contexts/ChatContext';
import { FileText, Image, Download } from 'lucide-react';

interface MessageItemProps {
  message: Message;
  isOwn: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isOwn }) => {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <div className="space-y-2">
            {message.content && <p>{message.content}</p>}
            <img
              src={message.fileUrl}
              alt="Shared image"
              className="max-w-xs rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => window.open(message.fileUrl, '_blank')}
            />
          </div>
        );
      case 'file':
        return (
          <div className="space-y-2">
            {message.content && <p>{message.content}</p>}
            <div className="flex items-center space-x-2 p-3 bg-gray-700 rounded-lg max-w-xs">
              <FileText className="w-5 h-5 text-blue-400" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{message.fileName}</p>
              </div>
              <button
                onClick={() => window.open(message.fileUrl, '_blank')}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <Download size={16} />
              </button>
            </div>
          </div>
        );
      default:
        return <p>{message.content}</p>;
    }
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md ${isOwn ? 'order-2' : 'order-1'}`}>
        {!isOwn && (
          <div className="flex items-center space-x-2 mb-1">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${message.senderName}`}
              alt={message.senderName}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm font-medium text-gray-300">
              {message.senderName}
            </span>
          </div>
        )}
        <div
          className={`p-3 rounded-lg ${
            isOwn
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-100'
          }`}
        >
          {renderMessageContent()}
          <p className={`text-xs mt-1 ${
            isOwn ? 'text-blue-100' : 'text-gray-400'
          }`}>
            {formatTime(message.timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;