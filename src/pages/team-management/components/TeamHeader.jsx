import React from 'react';
import Icon from '../../../components/AppIcon';


const TeamHeader = ({ team, hackathon }) => {
  const getTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    
    if (diff <= 0) return 'Event ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h remaining`;
    return `${hours}h remaining`;
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="px-3 md:px-6 py-4 md:py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Team Info */}
          <div className="flex items-start space-x-3 md:space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-primary rounded-lg md:rounded-xl flex items-center justify-center">
                <Icon name="Users" size={20} className="md:w-6 md:h-6" color="white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg md:text-2xl font-bold text-foreground truncate">
                {team?.name}
              </h1>
              <p className="text-xs md:text-base text-muted-foreground mt-1 line-clamp-2">
                {hackathon?.name}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={14} className="md:w-4 md:h-4 text-muted-foreground" />
                  <span className="text-xs md:text-sm text-muted-foreground">
                    {team?.members?.length}/{team?.maxMembers} members
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} className="md:w-4 md:h-4 text-muted-foreground" />
                  <span className="text-xs md:text-sm text-muted-foreground">
                    {hackathon?.mode}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Countdown & Status */}
          <div className="flex flex-col md:items-end space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} className="md:w-4 md:h-4 text-warning" />
              <span className="text-xs md:text-base font-medium text-warning">
                {getTimeRemaining(hackathon?.endDate)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                team?.status === 'active' ? 'bg-success' : 
                team?.status === 'recruiting' ? 'bg-warning' : 'bg-muted-foreground'
              }`} />
              <span className="text-xs md:text-sm text-muted-foreground capitalize">
                {team?.status}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs md:text-sm font-medium text-foreground">Project Progress</span>
            <span className="text-xs md:text-sm text-muted-foreground">{team?.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5 md:h-2">
            <div 
              className="bg-primary h-1.5 md:h-2 rounded-full transition-all duration-300"
              style={{ width: `${team?.progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamHeader;