import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActiveHackathonCard = ({ hackathon }) => {
  const getTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'team_formed': return 'text-success';
      case 'looking_for_team': return 'text-warning';
      case 'pending_invites': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'team_formed': return 'UserCheck';
      case 'looking_for_team': return 'Users';
      case 'pending_invites': return 'Clock';
      default: return 'User';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-elevation-2 transition-state">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2 text-lg">
            {hackathon?.title}
          </h3>
          <p className="text-base text-muted-foreground mb-3">
            {hackathon?.organizer}
          </p>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span className="flex items-center space-x-2">
              <Icon name="Calendar" size={14} />
              <span>{getTimeRemaining(hackathon?.endDate)}</span>
            </span>
            <span className="flex items-center space-x-2">
              <Icon name="Users" size={14} />
              <span>{hackathon?.participants} participants</span>
            </span>
          </div>
        </div>
        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 ml-4">
          <Image
            src={hackathon?.logo}
            alt={hackathon?.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center space-x-2 text-base ${getStatusColor(hackathon?.teamStatus)}`}>
          <Icon name={getStatusIcon(hackathon?.teamStatus)} size={16} />
          <span className="capitalize font-medium">{hackathon?.teamStatus?.replace('_', ' ')}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Trophy" size={14} />
          <span className="font-medium">${hackathon?.prize}</span>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Link to={`/hackathon-browse`} className="flex-1">
          <Button variant="outline" size="default" fullWidth>
            View Details
          </Button>
        </Link>
        {hackathon?.teamStatus === 'looking_for_team' && (
          <Link to="/teammate-finder">
            <Button variant="default" size="default" iconName="Users" iconPosition="left">
              Find Team
            </Button>
          </Link>
        )}
        {hackathon?.teamStatus === 'team_formed' && (
          <Link to="/team-management">
            <Button variant="success" size="default" iconName="MessageSquare" iconPosition="left">
              Team Chat
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ActiveHackathonCard;