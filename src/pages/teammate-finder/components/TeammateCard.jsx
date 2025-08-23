import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import InvitationModal from './InvitationModal';

const TeammateCard = ({ teammate, onInvite, onFavorite, onViewProfile }) => {
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(teammate?.isFavorited || false);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    onFavorite(teammate?.id, !isFavorited);
  };

  const handleSendInvitation = (invitationData) => {
    onInvite(teammate?.id, invitationData);
    setShowInvitationModal(false);
  };

  const getCompatibilityColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getCompatibilityBgColor = (score) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-error/10';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'away': return 'bg-warning';
      case 'busy': return 'bg-error';
      default: return 'bg-muted-foreground';
    }
  };

  const getResponseRateColor = (rate) => {
    if (rate >= 80) return 'text-success';
    if (rate >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <>
      <div className="bg-card border border-border rounded-xl p-3 md:p-4 hover:shadow-elevation-3 transition-all duration-300 hover:scale-105 group">
        {/* Header with Avatar and Status */}
        <div className="flex items-start justify-between mb-3 md:mb-4">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="relative">
              <Image
                src={teammate?.avatar}
                alt={teammate?.name}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover ring-2 ring-border group-hover:ring-primary/20 transition-all duration-300"
              />
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-card ${getStatusColor(teammate?.status)}`} />
            </div>
            <div>
              <h3 className="font-bold text-sm md:text-base text-foreground mb-1">{teammate?.name}</h3>
              <p className="text-xs text-muted-foreground flex items-center space-x-1 md:space-x-2">
                <Icon name="MapPin" size={10} className="md:w-3 md:h-3" />
                <span>{teammate?.location}</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1.5 md:space-x-2">
            {/* Compatibility Score */}
            <div className={`px-2 py-1 md:px-3 md:py-1.5 rounded-full ${getCompatibilityBgColor(teammate?.compatibilityScore)} border border-current/20`}>
              <span className={`text-xs font-bold ${getCompatibilityColor(teammate?.compatibilityScore)}`}>
                {teammate?.compatibilityScore}%
              </span>
            </div>
            
            {/* Favorite Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavorite}
              className={`transition-all duration-200 ${isFavorited ? 'text-error scale-110' : 'text-muted-foreground hover:text-error hover:scale-110'}`}
            >
              <Icon name={isFavorited ? 'Heart' : 'Heart'} size={14} className="md:w-4 md:h-4" />
            </Button>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-muted-foreground mb-3 md:mb-4 line-clamp-2 leading-relaxed">
          {teammate?.bio}
        </p>

        {/* Skills */}
        <div className="mb-3 md:mb-4">
          <div className="flex flex-wrap gap-1 md:gap-1.5">
            {teammate?.skills?.slice(0, 3)?.map((skill, index) => (
              <span
                key={index}
                className="px-1.5 py-0.5 md:px-2 md:py-1 bg-primary/10 text-primary text-xs font-medium rounded-md border border-primary/20"
              >
                {skill}
              </span>
            ))}
            {teammate?.skills?.length > 3 && (
              <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-muted text-muted-foreground text-xs font-medium rounded-md">
                +{teammate?.skills?.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 md:gap-3 mb-3 md:mb-4 text-xs">
          <div className="flex items-center space-x-1 md:space-x-1.5">
            <Icon name="Star" size={10} className="md:w-3 md:h-3 text-warning" />
            <span className="text-muted-foreground">Exp:</span>
            <span className="font-semibold text-foreground">{teammate?.experienceLevel}</span>
          </div>
          <div className="flex items-center space-x-1 md:space-x-1.5">
            <Icon name="Trophy" size={10} className="md:w-3 md:h-3 text-primary" />
            <span className="text-muted-foreground">Hacks:</span>
            <span className="font-semibold text-foreground">{teammate?.hackathonCount}</span>
          </div>
          <div className="flex items-center space-x-1 md:space-x-1.5">
            <Icon name="MessageCircle" size={10} className="md:w-3 md:h-3 text-success" />
            <span className="text-muted-foreground">Response:</span>
            <span className={`font-semibold ${getResponseRateColor(teammate?.responseRate)}`}>
              {teammate?.responseRate}%
            </span>
          </div>
          <div className="flex items-center space-x-1 md:space-x-1.5">
            <Icon name="Clock" size={10} className="md:w-3 md:h-3 text-accent" />
            <span className="text-muted-foreground">TZ:</span>
            <span className="font-semibold text-foreground">{teammate?.timeZone}</span>
          </div>
        </div>

        {/* Availability Badge */}
        {teammate?.isAvailable && (
          <div className="flex items-center space-x-1.5 md:space-x-2 mb-3 md:mb-4 p-1.5 md:p-2 bg-success/10 border border-success/20 rounded-lg">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-success font-semibold">Available for new teams</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-1.5 md:space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewProfile(teammate?.id)}
            className="flex-1 hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
          >
            <Icon name="User" size={12} className="md:w-3.5 md:h-3.5 mr-1 md:mr-1.5" />
            View Profile
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => setShowInvitationModal(true)}
            className="flex-1 hover:scale-105 transition-transform text-xs"
          >
            <Icon name="UserPlus" size={12} className="md:w-3.5 md:h-3.5 mr-1 md:mr-1.5" />
            Invite
          </Button>
        </div>

        {/* GitHub Integration Badge */}
        {teammate?.githubConnected && (
          <div className="flex items-center justify-center mt-2 md:mt-3 pt-2 md:pt-3 border-t border-border">
            <div className="flex items-center space-x-1.5 md:space-x-2 text-xs text-muted-foreground bg-muted/50 px-1.5 py-1 md:px-2 md:py-1.5 rounded-md">
              <Icon name="Github" size={10} className="md:w-3 md:h-3" />
              <span className="font-medium">GitHub Verified</span>
            </div>
          </div>
        )}
      </div>
      {/* Invitation Modal */}
      <InvitationModal
        isOpen={showInvitationModal}
        onClose={() => setShowInvitationModal(false)}
        teammate={teammate}
        onSend={handleSendInvitation}
      />
    </>
  );
};

export default TeammateCard;