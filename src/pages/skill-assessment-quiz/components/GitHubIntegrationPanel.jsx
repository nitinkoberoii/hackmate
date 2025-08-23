import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const GitHubIntegrationPanel = ({ 
  isConnected, 
  onConnect, 
  suggestedSkills = [],
  onConfirmSkill,
  onAdjustSkill,
  className = "" 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mockGitHubData = {
    username: "johndoe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    repositories: 24,
    languages: ["JavaScript", "Python", "TypeScript", "Java"],
    lastActivity: "2 days ago"
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 md:p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Github" size={20} className="text-foreground" />
          <h3 className="font-semibold text-foreground">GitHub Integration</h3>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
      </div>
      {!isConnected ? (
        <div className="text-center py-6">
          <Icon name="Github" size={48} className="text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">
            Connect your GitHub account to automatically suggest skills based on your repositories
          </p>
          <Button
            variant="outline"
            onClick={onConnect}
            iconName="Github"
            iconPosition="left"
          >
            Connect GitHub
          </Button>
        </div>
      ) : (
        <>
          {/* GitHub Profile Summary */}
          <div className="flex items-center space-x-3 mb-4 p-3 bg-muted/30 rounded-lg">
            <Image
              src={mockGitHubData?.avatar}
              alt="GitHub Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-foreground">@{mockGitHubData?.username}</span>
                <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
              </div>
              <div className="text-sm text-muted-foreground">
                {mockGitHubData?.repositories} repositories • Last active {mockGitHubData?.lastActivity}
              </div>
            </div>
          </div>

          {isExpanded && (
            <>
              {/* Detected Languages */}
              <div className="mb-6">
                <h4 className="font-medium text-foreground mb-3">Detected Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {mockGitHubData?.languages?.map((language) => (
                    <span
                      key={language}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              {/* Suggested Skills */}
              {suggestedSkills?.length > 0 && (
                <div>
                  <h4 className="font-medium text-foreground mb-3">Suggested Skills</h4>
                  <div className="space-y-3">
                    {suggestedSkills?.map((skill) => (
                      <div
                        key={skill?.id}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-foreground">{skill?.name}</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              skill?.suggestedLevel === 'expert' ? 'bg-purple-100 text-purple-800' :
                              skill?.suggestedLevel === 'advanced' ? 'bg-orange-100 text-orange-800' :
                              skill?.suggestedLevel === 'intermediate'? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {skill?.suggestedLevel}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Based on {skill?.repositoryCount} repositories
                          </p>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onAdjustSkill(skill?.id)}
                          >
                            Adjust
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => onConfirmSkill(skill?.id)}
                            iconName="Check"
                          >
                            Confirm
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default GitHubIntegrationPanel;