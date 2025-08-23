import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import UserAvatarDropdown from './UserAvatarDropdown';

const Header = ({ user, notifications = {} }) => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/user-dashboard',
      icon: 'LayoutDashboard'
    },
    {
      label: 'Browse',
      path: '/hackathon-browse',
      icon: 'Search'
    },
    {
      label: 'Find',
      path: '/teammate-finder',
      icon: 'Users'
    },
    {
      label: 'Teams',
      path: '/team-management',
      icon: 'UserCheck'
    }
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-elevation-1">
      <div className="flex items-center justify-between h-16 md:h-18 px-4 md:px-6">
        {/* Logo */}
        <Link to="/hackathon-browse" className="flex items-center space-x-2 hover:opacity-80 transition-micro">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Code2" size={20} color="white" />
          </div>
          <span className="text-xl font-semibold text-foreground font-mono">HackMate</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-micro hover-scale ${
                isActiveRoute(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* User Avatar */}
          <UserAvatarDropdown user={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;