import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InvitationCard = ({ invitation, onAccept, onDecline }) => {
  const getTimeAgo = (date) => {
    const now = new Date();
    const inviteDate = new Date(date);
    const diff = now - inviteDate;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const getCompatibilityColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:shadow-elevation-1 transition-state">
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={invitation?.sender?.avatar}
            alt={invitation?.sender?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <h4 className="font-semibold text-foreground truncate text-base">
                {invitation?.sender?.name}
              </h4>
              <Link to="/teammate-finder" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Eye" size={16} />
              </Link>
            </div>
            <span className="text-sm text-muted-foreground flex-shrink-0">
              {getTimeAgo(invitation?.createdAt)}
            </span>
          </div>
          <p className="text-base text-muted-foreground mb-3">
            Invited you to join team for <span className="font-medium">{invitation?.hackathon}</span>
          </p>
          <div className="flex items-center space-x-4 text-sm">
            <span className={`flex items-center space-x-2 ${getCompatibilityColor(invitation?.compatibility)}`}>
              <Icon name="Target" size={14} />
              <span className="font-medium">{invitation?.compatibility}% match</span>
            </span>
            <span className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Users" size={14} />
              <span className="font-medium">{invitation?.teamSize}/4 members</span>
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2 mb-4">
        {invitation?.sender?.skills?.slice(0, 3)?.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1.5 bg-muted text-muted-foreground text-sm rounded-lg font-medium"
          >
            {skill}
          </span>
        ))}
        {invitation?.sender?.skills?.length > 3 && (
          <span className="text-sm text-muted-foreground">
            +{invitation?.sender?.skills?.length - 3} more
          </span>
        )}
      </div>
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="default"
          iconName="Check"
          iconPosition="left"
          onClick={() => onAccept(invitation?.id)}
          className="flex-1 hover:bg-success hover:text-success-foreground hover:border-success transition-colors"
        >
          Accept
        </Button>
        <Button
          variant="outline"
          size="default"
          iconName="X"
          iconPosition="left"
          onClick={() => onDecline(invitation?.id)}
          className="flex-1 hover:bg-error hover:text-error-foreground hover:border-error transition-colors"
        >
          Decline
        </Button>
      </div>
    </div>
  );
};

export default InvitationCard;