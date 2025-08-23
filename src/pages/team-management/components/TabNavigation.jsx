import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ activeTab, onTabChange, notifications = {} }) => {
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'LayoutDashboard',
      badge: notifications?.overview || 0
    },
    {
      id: 'members',
      label: 'Members',
      icon: 'Users',
      badge: notifications?.members || 0
    },
    {
      id: 'communication',
      label: 'Chat',
      icon: 'MessageSquare',
      badge: notifications?.communication || 0
    },
    {
      id: 'project',
      label: 'Project',
      icon: 'FolderOpen',
      badge: notifications?.project || 0
    }
  ];

  return (
    <>
      {/* Mobile Tab Navigation */}
      <div className="lg:hidden bg-card border-b border-border sticky top-0 z-10">
        <div className="flex overflow-x-auto scrollbar-hide px-2">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`relative flex items-center space-x-2 px-3 md:px-4 py-3 text-sm font-medium whitespace-nowrap transition-micro flex-shrink-0 ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} className="md:w-[18px] md:h-[18px]" />
              <span className="hidden sm:inline">{tab?.label}</span>
              {tab?.badge > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                  {tab?.badge > 9 ? '9+' : tab?.badge}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Desktop Sidebar Navigation */}
      <div className="hidden lg:block w-64 bg-card border-r border-border">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Team Management</h2>
          <nav className="space-y-1">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => onTabChange(tab?.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-micro ${
                  activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.label}</span>
                </div>
                {tab?.badge > 0 && (
                  <div className="w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                    {tab?.badge > 9 ? '9+' : tab?.badge}
                  </div>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default TabNavigation;