import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfilePreview = ({ teammate, onClose, onInvite, onViewFull }) => {
  if (!teammate) {
    return (
      <div className="hidden xl:block w-96 bg-card border border-border rounded-xl p-8">
        <div className="flex items-center justify-center h-80 text-muted-foreground">
          <div className="text-center">
            <Icon name="User" size={64} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Profile Preview</h3>
            <p className="text-sm">Select a teammate to preview their detailed profile</p>
          </div>
        </div>
      </div>
    );
  }

  const getCompatibilityColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'away': return 'bg-warning';
      case 'busy': return 'bg-error';
      default: return 'bg-muted-foreground';
    }
  };

  return (
    <div className="hidden xl:block w-96 bg-card border border-border rounded-xl overflow-hidden shadow-elevation-2">
      {/* Header */}
      <div className="relative">
        <div className="h-24 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10"></div>
        <div className="absolute -bottom-6 left-8">
          <div className="relative">
            <Image
              src={teammate?.avatar}
              alt={teammate?.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-card shadow-lg"
            />
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-3 border-card ${getStatusColor(teammate?.status)}`} />
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:bg-white/20 rounded-full"
        >
          <Icon name="X" size={20} />
        </Button>
      </div>
      {/* Content */}
      <div className="pt-8 p-8">
        {/* Basic Info */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-foreground">{teammate?.name}</h3>
            <div className="px-4 py-2 bg-success/10 rounded-full border border-success/20">
              <span className={`text-sm font-bold ${getCompatibilityColor(teammate?.compatibilityScore)}`}>
                {teammate?.compatibilityScore}% Match
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} />
              <span>{teammate?.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} />
              <span>{teammate?.timeZone}</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <h4 className="text-base font-semibold text-foreground mb-3 flex items-center space-x-2">
            <Icon name="User" size={16} className="text-primary" />
            <span>About</span>
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {teammate?.bio}
          </p>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h4 className="text-base font-semibold text-foreground mb-3 flex items-center space-x-2">
            <Icon name="Code" size={16} className="text-primary" />
            <span>Skills</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {teammate?.skills?.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-lg border border-primary/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
            <div className="text-2xl font-bold text-primary mb-1">{teammate?.hackathonCount}</div>
            <div className="text-sm text-muted-foreground">Hackathons</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-success/10 to-success/5 rounded-xl border border-success/20">
            <div className="text-2xl font-bold text-success mb-1">{teammate?.responseRate}%</div>
            <div className="text-sm text-muted-foreground">Response Rate</div>
          </div>
        </div>

        {/* Experience Level */}
        <div className="mb-6">
          <h4 className="text-base font-semibold text-foreground mb-3 flex items-center space-x-2">
            <Icon name="Award" size={16} className="text-primary" />
            <span>Experience</span>
          </h4>
          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
            <Icon name="Star" size={18} className="text-warning" />
            <span className="text-sm font-semibold text-foreground">{teammate?.experienceLevel}</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h4 className="text-base font-semibold text-foreground mb-3 flex items-center space-x-2">
            <Icon name="Activity" size={16} className="text-primary" />
            <span>Recent Activity</span>
          </h4>
          <div className="space-y-3">
            {teammate?.recentActivity?.slice(0, 3)?.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                <Icon name="Clock" size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground leading-relaxed">{activity}</span>
              </div>
            )) || (
              <div className="p-4 text-center text-muted-foreground bg-muted/30 rounded-lg">
                <Icon name="Clock" size={20} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No recent activity</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="default"
            size="default"
            fullWidth
            onClick={() => onInvite(teammate)}
            iconName="UserPlus"
            iconPosition="left"
            className="hover:scale-105 transition-transform"
          >
            Send Invitation
          </Button>
          <Button
            variant="outline"
            size="default"
            fullWidth
            onClick={() => onViewFull(teammate?.id)}
            iconName="ExternalLink"
            iconPosition="left"
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            View Full Profile
          </Button>
        </div>

        {/* GitHub Badge */}
        {teammate?.githubConnected && (
          <div className="flex items-center justify-center mt-6 pt-6 border-t border-border">
            <div className="flex items-center space-x-3 text-sm text-muted-foreground bg-muted/50 px-4 py-3 rounded-lg">
              <Icon name="Github" size={16} />
              <span className="font-medium">GitHub Profile Verified</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePreview;