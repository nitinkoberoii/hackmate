import React, { useState, useRef, useEffect } from 'react';

import Icon from '../AppIcon';
import Image from '../AppImage';

const UserAvatarDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dropdownItems = [
    {
      label: 'Profile',
      icon: 'User',
      action: () => {
        // Navigate to profile
        closeDropdown();
      }
    },
    {
      label: 'Settings',
      icon: 'Settings',
      action: () => {
        // Navigate to settings
        closeDropdown();
      }
    },
    {
      label: 'GitHub Sync',
      icon: 'Github',
      action: () => {
        // Handle GitHub sync
        closeDropdown();
      },
      status: user?.githubConnected ? 'Connected' : 'Not Connected',
      statusColor: user?.githubConnected ? 'text-success' : 'text-warning'
    },
    {
      label: 'Help & Support',
      icon: 'HelpCircle',
      action: () => {
        // Navigate to help
        closeDropdown();
      }
    },
    {
      type: 'divider'
    },
    {
      label: 'Sign Out',
      icon: 'LogOut',
      action: () => {
        // Handle logout
        closeDropdown();
      },
      variant: 'destructive'
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 p-1 rounded-lg hover:bg-muted transition-micro focus:outline-none"
        aria-label="User menu"
      >
        <div className="relative">
          <Image
            src={user?.avatar || '/assets/images/no_image.png'}
            alt={user?.name || 'User avatar'}
            className="w-8 h-8 rounded-full object-cover"
          />
          {user?.isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success border-2 border-card rounded-full"></div>
          )}
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-elevation-3 py-2 z-50">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <Image
                src={user?.avatar || '/assets/images/no_image.png'}
                alt={user?.name || 'User avatar'}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-popover-foreground truncate">
                  {user?.name || 'User Name'}
                </p>
                <p className="text-xs text-muted-foreground truncate font-mono">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {dropdownItems?.map((item, index) => {
              if (item?.type === 'divider') {
                return <div key={index} className="my-1 border-t border-border" />;
              }

              return (
                <button
                  key={index}
                  onClick={item?.action}
                  className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-micro hover:bg-muted ${
                    item?.variant === 'destructive' ?'text-destructive hover:text-destructive' :'text-popover-foreground'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </div>
                  {item?.status && (
                    <span className={`text-xs ${item?.statusColor}`}>
                      {item?.status}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatarDropdown;