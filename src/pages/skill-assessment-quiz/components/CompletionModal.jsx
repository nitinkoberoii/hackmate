import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CompletionModal = ({ 
  isOpen, 
  onClose, 
  skillsAssessed, 
  totalCategories,
  completionTime 
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleViewProfile = () => {
    navigate('/user-dashboard');
  };

  const handleBrowseHackathons = () => {
    navigate('/hackathon-browse');
  };

  const formatTime = (minutes) => {
    if (minutes < 60) return `${Math.round(minutes)} minutes`;
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-md">
        {/* Header */}
        <div className="p-6 text-center border-b border-border">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Assessment Complete!
          </h2>
          <p className="text-muted-foreground">
            Great job! Your skill profile has been created successfully.
          </p>
        </div>

        {/* Stats */}
        <div className="p-6 border-b border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">
                {skillsAssessed}
              </div>
              <div className="text-sm text-muted-foreground">
                Skills Assessed
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">
                {totalCategories}
              </div>
              <div className="text-sm text-muted-foreground">
                Categories
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">
                {formatTime(completionTime)}
              </div>
              <div className="text-sm text-muted-foreground">
                Time Taken
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold text-foreground mb-3">Achievements Unlocked</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-2 bg-success/10 rounded-lg">
              <Icon name="Award" size={20} className="text-success" />
              <span className="text-sm font-medium text-success">Profile Creator</span>
            </div>
            <div className="flex items-center space-x-3 p-2 bg-primary/10 rounded-lg">
              <Icon name="Target" size={20} className="text-primary" />
              <span className="text-sm font-medium text-primary">Skill Assessor</span>
            </div>
            {skillsAssessed >= 10 && (
              <div className="flex items-center space-x-3 p-2 bg-accent/10 rounded-lg">
                <Icon name="Star" size={20} className="text-accent" />
                <span className="text-sm font-medium text-accent">Comprehensive Profiler</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 space-y-3">
          <Button
            variant="default"
            fullWidth
            onClick={handleBrowseHackathons}
            iconName="Search"
            iconPosition="left"
          >
            Browse Hackathons
          </Button>
          
          <Button
            variant="outline"
            fullWidth
            onClick={handleViewProfile}
            iconName="User"
            iconPosition="left"
          >
            View My Profile
          </Button>
          
          <Button
            variant="ghost"
            fullWidth
            onClick={onClose}
            className="text-muted-foreground"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompletionModal;