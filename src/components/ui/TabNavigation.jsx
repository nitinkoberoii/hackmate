import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import NotificationBadge from './NotificationBadge';

const TabNavigation = ({ notifications = {} }) => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/user-dashboard',
      icon: 'LayoutDashboard',
      badge: notifications?.dashboard || 0
    },
    {
      label: 'Browse',
      path: '/hackathon-browse',
      icon: 'Search',
      badge: notifications?.browse || 0
    },
    {
      label: 'Find',
      path: '/teammate-finder',
      icon: 'Users',
      badge: notifications?.find || 0
    },
    {
      label: 'Teams',
      path: '/team-management',
      icon: 'UserCheck',
      badge: notifications?.teams || 0
    }
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-elevation-2 md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navigationItems?.map((item) => (
          <Link
            key={item?.path}
            to={item?.path}
            className={`relative flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-2 rounded-lg transition-micro ${
              isActiveRoute(item?.path)
                ? 'text-primary' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="relative">
              <Icon name={item?.icon} size={20} />
              {item?.badge > 0 && (
                <div className="absolute -top-2 -right-2">
                  <NotificationBadge count={item?.badge} size="sm" />
                </div>
              )}
            </div>
            <span className="text-xs font-medium mt-1 truncate">
              {item?.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default TabNavigation;