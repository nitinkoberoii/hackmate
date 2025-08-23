import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const GitHubIntegration = ({ onGitHubConnect, isConnected, githubData }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleGitHubConnect = async () => {
    setIsConnecting(true);
    
    // Simulate GitHub OAuth flow
    setTimeout(() => {
      const mockGitHubData = {
        username: 'johndoe',
        name: 'John Doe',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        bio: 'Full-stack developer passionate about open source',
        publicRepos: 42,
        followers: 156,
        following: 89,
        languages: ['JavaScript', 'Python', 'TypeScript', 'React', 'Node.js'],
        topRepositories: [
          { name: 'awesome-react-app', stars: 234, language: 'JavaScript' },
          { name: 'python-ml-toolkit', stars: 89, language: 'Python' },
          { name: 'typescript-utils', stars: 67, language: 'TypeScript' }
        ]
      };
      
      onGitHubConnect(mockGitHubData);
      setIsConnecting(false);
    }, 2000);
  };

  if (isConnected && githubData) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Github" size={24} className="text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">GitHub Connected</h3>
              <p className="text-sm text-muted-foreground">Profile data imported successfully</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onGitHubConnect(null)}
            iconName="X"
            iconSize={16}
          >
            Disconnect
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <img
                src={githubData?.avatar}
                alt={githubData?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-foreground">{githubData?.name}</p>
                <p className="text-sm text-muted-foreground font-mono">@{githubData?.username}</p>
              </div>
            </div>
            
            {githubData?.bio && (
              <p className="text-sm text-muted-foreground">{githubData?.bio}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Repositories:</span>
              <span className="font-medium text-foreground">{githubData?.publicRepos}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Followers:</span>
              <span className="font-medium text-foreground">{githubData?.followers}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Following:</span>
              <span className="font-medium text-foreground">{githubData?.following}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-2">Detected Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {githubData?.languages?.slice(0, 6)?.map((language, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
              >
                {language}
              </span>
            ))}
            {githubData?.languages?.length > 6 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                +{githubData?.languages?.length - 6} more
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto">
          <Icon name="Github" size={32} className="text-muted-foreground" />
        </div>
        
        <div>
          <h3 className="font-semibold text-foreground mb-2">Connect Your GitHub</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Import your profile, repositories, and skills automatically to create a comprehensive developer profile.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <Icon name="User" size={20} className="text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Profile Info</p>
          </div>
          <div>
            <Icon name="Code2" size={20} className="text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Repositories</p>
          </div>
          <div>
            <Icon name="Star" size={20} className="text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Skills Detection</p>
          </div>
          <div>
            <Icon name="TrendingUp" size={20} className="text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Activity Stats</p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleGitHubConnect}
          loading={isConnecting}
          iconName="Github"
          iconPosition="left"
          fullWidth
          className="mt-4"
        >
          {isConnecting ? 'Connecting to GitHub...' : 'Connect GitHub Account'}
        </Button>

        <p className="text-xs text-muted-foreground">
          We'll only access your public profile and repository information. No private data will be accessed.
        </p>
      </div>
    </div>
  );
};

export default GitHubIntegration;