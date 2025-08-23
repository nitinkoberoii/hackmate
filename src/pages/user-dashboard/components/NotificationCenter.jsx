import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications, onMarkAsRead, onMarkAllAsRead }) => {
  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'invitation': return 'UserPlus';
      case 'team_update': return 'Users';
      case 'hackathon': return 'Calendar';
      case 'achievement': return 'Award';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'invitation': return 'text-accent';
      case 'team_update': return 'text-success';
      case 'hackathon': return 'text-primary';
      case 'achievement': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const notifDate = new Date(date);
    const diff = now - notifDate;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const filteredNotifications = notifications?.filter(notif => 
    filter === 'all' || notif?.type === filter || (filter === 'unread' && !notif?.read)
  );

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-foreground flex items-center space-x-3 text-lg">
          <Icon name="Bell" size={20} />
          <span>Notifications</span>
          {unreadCount > 0 && (
            <span className="bg-error text-error-foreground text-sm px-3 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </h3>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="default"
            onClick={onMarkAllAsRead}
            className="text-sm"
          >
            Mark all read
          </Button>
        )}
      </div>
      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6 bg-muted rounded-xl p-2">
        {[
          { key: 'all', label: 'All' },
          { key: 'unread', label: 'Unread' },
          { key: 'invitation', label: 'Invites' },
          { key: 'team_update', label: 'Teams' }
        ]?.map((tab) => (
          <button
            key={tab?.key}
            onClick={() => setFilter(tab?.key)}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-micro ${
              filter === tab?.key
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab?.label}
          </button>
        ))}
      </div>
      {/* Notifications List */}
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {filteredNotifications?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="Bell" size={32} className="mx-auto mb-3 opacity-50" />
            <p className="text-base">No notifications found</p>
          </div>
        ) : (
          filteredNotifications?.map((notification) => (
            <div
              key={notification?.id}
              className={`flex items-start space-x-4 p-4 rounded-xl transition-state hover:bg-muted/50 cursor-pointer ${
                !notification?.read ? 'bg-primary/5 border border-primary/20' : ''
              }`}
              onClick={() => onMarkAsRead(notification?.id)}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-muted ${
                getNotificationColor(notification?.type)
              }`}>
                <Icon name={getNotificationIcon(notification?.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-semibold text-foreground truncate">
                    {notification?.title}
                  </h4>
                  <span className="text-sm text-muted-foreground flex-shrink-0">
                    {getTimeAgo(notification?.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2 leading-relaxed">
                  {notification?.message}
                </p>
                {notification?.actionUrl && (
                  <button className="text-sm text-primary hover:underline font-medium">
                    View Details
                  </button>
                )}
              </div>
              
              {!notification?.read && (
                <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0 mt-2"></div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;