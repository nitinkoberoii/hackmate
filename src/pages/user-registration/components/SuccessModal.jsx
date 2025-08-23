import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SuccessModal = ({ isOpen, userData, onClose }) => {
  if (!isOpen) return null;

  const getNextStepInfo = () => {
    if (userData?.role === 'participant') {
      return {
        title: 'Take Skill Assessment',
        description: 'Complete a quick quiz to help us match you with compatible teammates',
        buttonText: 'Start Assessment',
        route: '/skill-assessment-quiz',
        icon: 'Brain'
      };
    } else {
      return {
        title: 'Go to Dashboard',
        description: 'Start creating your first hackathon or explore the platform',
        buttonText: 'Go to Dashboard',
        route: '/user-dashboard',
        icon: 'LayoutDashboard'
      };
    }
  };

  const nextStep = getNextStepInfo();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-lg shadow-elevation-3 max-w-md w-full p-6">
        <div className="text-center space-y-6">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>

          {/* Success Message */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Welcome to HackMate!
            </h2>
            <p className="text-muted-foreground">
              Your account has been created successfully. You're now ready to start your hackathon journey.
            </p>
          </div>

          {/* User Info */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-semibold">
                  {userData?.fullName?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">{userData?.fullName}</p>
                <p className="text-sm text-muted-foreground font-mono">{userData?.email}</p>
                <p className="text-xs text-primary capitalize font-medium">
                  {userData?.role}
                </p>
              </div>
            </div>
          </div>

          {/* Next Step */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name={nextStep?.icon} size={16} className="text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-foreground mb-1">{nextStep?.title}</h3>
                <p className="text-sm text-muted-foreground">{nextStep?.description}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link to={nextStep?.route} className="block">
              <Button
                variant="default"
                size="lg"
                fullWidth
                iconName={nextStep?.icon}
                iconPosition="left"
              >
                {nextStep?.buttonText}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="default"
              fullWidth
              onClick={onClose}
            >
              Explore Platform First
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p>✓ Account verification email sent</p>
            <p>✓ Profile created successfully</p>
            {userData?.githubConnected && <p>✓ GitHub profile imported</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;