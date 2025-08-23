import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TeamCommunication = ({ team, currentUser }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      content: 'Hey team! I just pushed the latest changes to the main branch. The authentication system is now working perfectly.',
      timestamp: new Date(Date.now() - 3600000),
      type: 'message'
    },
    {
      id: 2,
      sender: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      content: 'Great work Sarah! I\'ll start working on the dashboard integration now.',
      timestamp: new Date(Date.now() - 3000000),
      type: 'message'
    },
    {
      id: 3,
      sender: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      content: '',
      timestamp: new Date(Date.now() - 2400000),
      type: 'file',
      attachment: {
        name: 'UI_Mockups_v2.figma',
        size: '2.4 MB',
        type: 'design'
      }
    },
    {
      id: 4,
      sender: 'System',
      content: 'Mike Johnson completed milestone: MVP Development',
      timestamp: new Date(Date.now() - 1800000),
      type: 'system'
    },
    {
      id: 5,
      sender: 'You',
      content: 'Thanks everyone! The progress looks amazing. Let\'s focus on the final features for tomorrow\'s demo.',
      timestamp: new Date(Date.now() - 900000),
      type: 'message'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage?.trim()) {
      const message = {
        id: messages?.length + 1,
        sender: 'You',
        avatar: currentUser?.avatar,
        content: newMessage,
        timestamp: new Date(),
        type: 'message'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const message = {
        id: messages?.length + 1,
        sender: 'You',
        avatar: currentUser?.avatar,
        content: '',
        timestamp: new Date(),
        type: 'file',
        attachment: {
          name: file?.name,
          size: `${(file?.size / 1024 / 1024)?.toFixed(1)} MB`,
          type: file?.type?.includes('image') ? 'image' : 'file'
        }
      };
      setMessages([...messages, message]);
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (hours > 24) {
      return timestamp?.toLocaleDateString();
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  const getFileIcon = (type) => {
    if (type === 'image') return 'Image';
    if (type === 'design') return 'Palette';
    return 'File';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-card border-b border-border p-3 md:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-3">
            <Icon name="MessageSquare" size={16} className="md:w-5 md:h-5 text-primary" />
            <div>
              <h3 className="text-sm md:text-base font-semibold text-foreground">Team Chat</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                {team?.members?.filter(m => m?.isOnline)?.length} members online
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1 md:space-x-2">
            <Button variant="ghost" size="sm" iconName="Phone" className="text-xs">
              Call
            </Button>
            <Button variant="ghost" size="sm" iconName="Video" className="text-xs">
              Video
            </Button>
          </div>
        </div>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
        {messages?.map((message) => (
          <div key={message?.id} className={`flex ${message?.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
            {message?.type === 'system' ? (
              <div className="flex items-center justify-center w-full">
                <div className="bg-muted text-muted-foreground text-xs px-2 md:px-3 py-1 rounded-full">
                  {message?.content}
                </div>
              </div>
            ) : (
              <div className={`flex space-x-2 md:space-x-3 max-w-[280px] md:max-w-md ${message?.sender === 'You' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {message?.sender !== 'You' && (
                  <Image
                    src={message?.avatar}
                    alt={message?.sender}
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover flex-shrink-0"
                  />
                )}
                
                <div className={`flex flex-col ${message?.sender === 'You' ? 'items-end' : 'items-start'}`}>
                  {message?.sender !== 'You' && (
                    <span className="text-xs font-medium text-muted-foreground mb-1">
                      {message?.sender}
                    </span>
                  )}
                  
                  <div className={`rounded-lg px-2.5 md:px-3 py-1.5 md:py-2 ${
                    message?.sender === 'You' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground'
                  }`}>
                    {message?.type === 'file' ? (
                      <div className="flex items-center space-x-1.5 md:space-x-2">
                        <Icon name={getFileIcon(message?.attachment?.type)} size={14} className="md:w-4 md:h-4" />
                        <div>
                          <p className="text-xs md:text-sm font-medium">{message?.attachment?.name}</p>
                          <p className="text-xs opacity-75">{message?.attachment?.size}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs md:text-sm leading-relaxed">{message?.content}</p>
                    )}
                  </div>
                  
                  <span className="text-xs text-muted-foreground mt-1">
                    {formatTime(message?.timestamp)}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message Input */}
      <div className="bg-card border-t border-border p-3 md:p-4">
        <div className="flex items-end space-x-1.5 md:space-x-2">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e?.target?.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-2.5 md:px-3 py-1.5 md:py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
          </div>
          
          <div className="flex items-center space-x-1">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              multiple
            />
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Paperclip"
              onClick={() => fileInputRef?.current?.click()}
              className="text-xs"
            />
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Smile"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-xs"
            />
            
            <Button
              variant="default"
              size="sm"
              iconName="Send"
              onClick={handleSendMessage}
              disabled={!newMessage?.trim()}
              className="text-xs"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mt-2 md:mt-3">
          <Button variant="ghost" size="sm" iconName="Calendar" className="text-xs">
            Schedule Meeting
          </Button>
          <Button variant="ghost" size="sm" iconName="FileText" className="text-xs">
            Share Document
          </Button>
          <Button variant="ghost" size="sm" iconName="GitBranch" className="text-xs">
            Share Code
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamCommunication;