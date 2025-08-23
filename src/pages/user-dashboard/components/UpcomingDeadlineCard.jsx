import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const UpcomingDeadlineCard = ({ deadline }) => {
  const getTimeRemaining = (date) => {
    const now = new Date();
    const deadlineDate = new Date(date);
    const diff = deadlineDate - now;
    
    if (diff <= 0) return { text: 'Overdue', color: 'text-error', urgent: true };
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 7) return { text: `${days} days`, color: 'text-muted-foreground', urgent: false };
    if (days > 2) return { text: `${days} days`, color: 'text-warning', urgent: false };
    if (days > 0) return { text: `${days}d ${hours}h`, color: 'text-error', urgent: true };
    return { text: `${hours}h`, color: 'text-error', urgent: true };
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'Clock';
      default: return 'Info';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const timeInfo = getTimeRemaining(deadline?.date);

  return (
    <div className={`bg-card border rounded-xl p-4 transition-state hover:shadow-elevation-1 ${
      timeInfo?.urgent ? 'border-error/30 bg-error/5' : 'border-border'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Icon 
            name={getPriorityIcon(deadline?.priority)} 
            size={16} 
            className={getPriorityColor(deadline?.priority)} 
          />
          <span className="text-base font-semibold text-foreground">
            {deadline?.title}
          </span>
        </div>
        <span className={`text-sm font-semibold ${timeInfo?.color}`}>
          {timeInfo?.text}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
        {deadline?.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">
          {deadline?.hackathon}
        </span>
        <Link to="/team-management" className="text-sm text-primary hover:underline font-medium">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default UpcomingDeadlineCard;