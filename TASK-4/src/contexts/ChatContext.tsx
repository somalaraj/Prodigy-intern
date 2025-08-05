import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
  fileUrl?: string;
  fileName?: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'public' | 'private';
  description?: string;
  participants: string[];
  messages: Message[];
  unreadCount: number;
  lastMessage?: Message;
}

export interface OnlineUser {
  id: string;
  username: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen: Date;
}

interface ChatContextType {
  rooms: ChatRoom[];
  activeRoom: ChatRoom | null;
  onlineUsers: OnlineUser[];
  typingUsers: string[];
  sendMessage: (content: string, type?: 'text' | 'image' | 'file', fileUrl?: string, fileName?: string) => void;
  joinRoom: (roomId: string) => void;
  createPrivateRoom: (userId: string) => void;
  setActiveRoom: (room: ChatRoom | null) => void;
  markAsRead: (roomId: string) => void;
  startTyping: () => void;
  stopTyping: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  // Initialize with default rooms
  useEffect(() => {
    if (user) {
      const defaultRooms: ChatRoom[] = [
        {
          id: 'general',
          name: 'General',
          type: 'public',
          description: 'General discussion for everyone',
          participants: ['1', '2', '3', user.id],
          messages: [
            {
              id: '1',
              content: 'Welcome to the General chat!',
              senderId: 'system',
              senderName: 'System',
              timestamp: new Date(Date.now() - 3600000),
              type: 'text'
            }
          ],
          unreadCount: 0
        },
        {
          id: 'random',
          name: 'Random',
          type: 'public',
          description: 'Random discussions and off-topic conversations',
          participants: ['1', '2', user.id],
          messages: [],
          unreadCount: 0
        }
      ];

      const mockUsers: OnlineUser[] = [
        {
          id: '1',
          username: 'alice_dev',
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=alice',
          isOnline: true,
          lastSeen: new Date()
        },
        {
          id: '2',
          username: 'bob_designer',
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=bob',
          isOnline: Math.random() > 0.5,
          lastSeen: new Date(Date.now() - Math.random() * 3600000)
        },
        {
          id: '3',
          username: 'charlie_pm',
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=charlie',
          isOnline: Math.random() > 0.3,
          lastSeen: new Date(Date.now() - Math.random() * 7200000)
        }
      ];

      setRooms(defaultRooms);
      setOnlineUsers(mockUsers);
      setActiveRoom(defaultRooms[0]);
    }
  }, [user]);

  // Simulate WebSocket connection and real-time features
  useEffect(() => {
    if (!user) return;

    // Simulate receiving messages
    const interval = setInterval(() => {
      if (Math.random() > 0.8 && rooms.length > 0) {
        const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
        const mockMessage: Message = {
          id: Date.now().toString(),
          content: getRandomMessage(),
          senderId: onlineUsers[Math.floor(Math.random() * onlineUsers.length)]?.id || '1',
          senderName: onlineUsers[Math.floor(Math.random() * onlineUsers.length)]?.username || 'Unknown',
          timestamp: new Date(),
          type: 'text'
        };

        setRooms(prev => prev.map(room => 
          room.id === randomRoom.id 
            ? { 
                ...room, 
                messages: [...room.messages, mockMessage],
                lastMessage: mockMessage,
                unreadCount: room.id === activeRoom?.id ? 0 : room.unreadCount + 1
              }
            : room
        ));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [user, rooms, onlineUsers, activeRoom]);

  const getRandomMessage = () => {
    const messages = [
      "Hey everyone! How's it going?",
      "Just finished a great project!",
      "Anyone up for a coffee break?",
      "Working on something interesting today",
      "Hope everyone is having a great day!",
      "Just pushed some new code to the repo",
      "Anyone else excited about the weekend?",
      "Love this new feature we're building!"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const sendMessage = (content: string, type: 'text' | 'image' | 'file' = 'text', fileUrl?: string, fileName?: string) => {
    if (!user || !activeRoom || !content.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      senderId: user.id,
      senderName: user.username,
      timestamp: new Date(),
      type,
      fileUrl,
      fileName
    };

    setRooms(prev => prev.map(room => 
      room.id === activeRoom.id 
        ? { 
            ...room, 
            messages: [...room.messages, newMessage],
            lastMessage: newMessage
          }
        : room
    ));
  };

  const joinRoom = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    if (room) {
      setActiveRoom(room);
      markAsRead(roomId);
    }
  };

  const createPrivateRoom = (userId: string) => {
    const targetUser = onlineUsers.find(u => u.id === userId);
    if (!targetUser || !user) return;

    const existingRoom = rooms.find(room => 
      room.type === 'private' && 
      room.participants.includes(userId) && 
      room.participants.includes(user.id)
    );

    if (existingRoom) {
      setActiveRoom(existingRoom);
      return;
    }

    const newRoom: ChatRoom = {
      id: `private-${user.id}-${userId}`,
      name: targetUser.username,
      type: 'private',
      participants: [user.id, userId],
      messages: [],
      unreadCount: 0
    };

    setRooms(prev => [...prev, newRoom]);
    setActiveRoom(newRoom);
  };

  const markAsRead = (roomId: string) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId ? { ...room, unreadCount: 0 } : room
    ));
  };

  const startTyping = () => {
    if (!user) return;
    setTypingUsers(prev => [...prev.filter(id => id !== user.id), user.id]);
  };

  const stopTyping = () => {
    if (!user) return;
    setTypingUsers(prev => prev.filter(id => id !== user.id));
  };

  return (
    <ChatContext.Provider value={{
      rooms,
      activeRoom,
      onlineUsers,
      typingUsers,
      sendMessage,
      joinRoom,
      createPrivateRoom,
      setActiveRoom,
      markAsRead,
      startTyping,
      stopTyping
    }}>
      {children}
    </ChatContext.Provider>
  );
};