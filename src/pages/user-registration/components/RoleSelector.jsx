import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleSelector = ({ selectedRole, onRoleChange }) => {
  const roles = [
    {
      id: 'participant',
      title: 'Participant',
      description: 'Join hackathons and find teammates',
      icon: 'Code2',
      features: ['Find teammates', 'Join hackathons', 'Skill matching', 'Team collaboration']
    },
    {
      id: 'organizer',
      title: 'Organizer',
      description: 'Create and manage hackathons',
      icon: 'Users',
      features: ['Create hackathons', 'Manage events', 'Team oversight', 'Analytics dashboard']
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Choose Your Role</h3>
        <p className="text-sm text-muted-foreground">Select how you want to use HackMate</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles?.map((role) => (
          <button
            key={role?.id}
            type="button"
            onClick={() => onRoleChange(role?.id)}
            className={`relative p-6 rounded-lg border-2 transition-all duration-200 text-left hover-scale ${
              selectedRole === role?.id
                ? 'border-primary bg-primary/5 shadow-elevation-2'
                : 'border-border bg-card hover:border-primary/50 hover:bg-muted/50'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-lg ${
                selectedRole === role?.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={role?.icon} size={24} />
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">{role?.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{role?.description}</p>
                
                <ul className="space-y-1">
                  {role?.features?.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Icon name="Check" size={12} className="text-success" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {selectedRole === role?.id && (
              <div className="absolute top-3 right-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={14} color="white" />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;