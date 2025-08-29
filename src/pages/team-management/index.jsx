import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import { AuthContext } from '../../context/AuthContext.jsx';
import TabNavigation from '../../components/ui/TabNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TeamsOverview = () => {
  const { user: currentUser } = useContext(AuthContext);

  // Mock notifications
  const notifications = {
    dashboard: 3,
    browse: 0,
    find: 5,
    teams: 2
  };

  // Mock teams data
  const mockTeams = [
    {
      id: 'team-1',
      name: 'Code Crusaders',
      challenge: 'EcoTech Innovation Challenge 2025',
      avatar: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop',
      memberCount: 5,
      maxMembers: 6,
      progress: 75,
      status: 'active',
      eventStatus: 'ended',
      eventEndDate: '2025-01-15',
      hackathon: 'EcoTech Innovation Challenge 2025',
      location: 'Remote',
      roles: [
        { name: 'Frontend', count: 3, color: 'bg-blue-500' },
        { name: 'Backend', count: 2, color: 'bg-green-500' },
        { name: 'Design', count: 1, color: 'bg-purple-500' },
        { name: 'DevOps', count: 1, color: 'bg-orange-500' }
      ],
      recentActivity: [
        'Sarah Chen completed frontend component',
        'Marcus Rodriguez pushed backend API updates',
        'Emily Watson updated design mockups'
      ]
    },
    {
      id: 'team-2',
      name: 'AI Pioneers',
      challenge: 'Machine Learning Hackathon 2024',
      avatar: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
      memberCount: 4,
      maxMembers: 5,
      progress: 45,
      status: 'active',
      eventStatus: 'ongoing',
      eventEndDate: '2024-12-20',
      hackathon: 'Machine Learning Hackathon 2024',
      location: 'Hybrid',
      roles: [
        { name: 'ML Engineer', count: 2, color: 'bg-green-500' },
        { name: 'Data Scientist', count: 1, color: 'bg-blue-500' },
        { name: 'Frontend', count: 1, color: 'bg-purple-500' }
      ],
      recentActivity: [
        'David Kim trained new ML model',
        'Jessica Park updated data pipeline',
        'Ahmed Hassan deployed frontend updates'
      ]
    },
    {
      id: 'team-3',
      name: 'Blockchain Builders',
      challenge: 'DeFi Development Challenge',
      avatar: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop',
      memberCount: 3,
      maxMembers: 4,
      progress: 20,
      status: 'forming',
      eventStatus: 'upcoming',
      eventEndDate: '2025-02-15',
      hackathon: 'DeFi Development Challenge',
      location: 'Remote',
      roles: [
        { name: 'Blockchain Dev', count: 2, color: 'bg-orange-500' },
        { name: 'Smart Contracts', count: 1, color: 'bg-red-500' }
      ],
      recentActivity: [
        'Team formation in progress',
        'Looking for additional members'
      ]
    }
  ];

  const [teams, setTeams] = useState(mockTeams);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'forming': return 'text-warning';
      case 'completed': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success/10';
      case 'forming': return 'bg-warning/10';
      case 'completed': return 'bg-muted/50';
      default: return 'bg-muted/50';
    }
  };

  const getEventStatusColor = (status) => {
    switch (status) {
      case 'ongoing': return 'text-success';
      case 'ended': return 'text-warning';
      case 'upcoming': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getEventStatusIcon = (status) => {
    switch (status) {
      case 'ongoing': return 'Play';
      case 'ended': return 'Clock';
      case 'upcoming': return 'Calendar';
      default: return 'Clock';
    }
  };

  const getDaysLeft = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days < 0) return `${Math.abs(days)} days overdue`;
    if (days === 0) return 'Due today';
    if (days === 1) return '1 day left';
    return `${days} days left`;
  };

  const getDaysLeftColor = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days < 0) return 'text-error';
    if (days <= 3) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header user={currentUser} notifications={notifications} />
      
      {/* Main Content */}
      <main className="pt-16 md:pt-18 pb-20 md:pb-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center space-x-3">
                <Icon name="UserCheck" size={32} className="text-primary" />
                <span>My Teams</span>
              </h1>
              <Button variant="default" iconName="Plus" iconPosition="left">
                Create New Team
              </Button>
            </div>
            <p className="text-lg text-muted-foreground">
              Manage your hackathon teams and track their progress
            </p>
          </div>

          {/* Teams Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <Link
                key={team.id}
                to={`/team-management/${team.id}`}
                className="block group"
              >
                <div className="bg-card border border-border rounded-xl p-6 hover:shadow-elevation-3 transition-all duration-300 hover:scale-105">
                  {/* Team Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-primary/10 flex items-center justify-center">
                        <Icon name="Users" size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                          {team.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {team.challenge}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBgColor(team.status)} ${getStatusColor(team.status)}`}>
                        {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                      </div>
                      <div className={`flex items-center space-x-1 text-xs ${getEventStatusColor(team.eventStatus)}`}>
                        <Icon name={getEventStatusIcon(team.eventStatus)} size={12} />
                        <span>{team.eventStatus.charAt(0).toUpperCase() + team.eventStatus.slice(1)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Team Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold text-foreground">{team.memberCount}/{team.maxMembers}</div>
                      <div className="text-xs text-muted-foreground">Members</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold text-foreground">{team.progress}%</div>
                      <div className="text-xs text-muted-foreground">Progress</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Project Progress</span>
                      <span>{team.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${team.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Team Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium">{team.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Deadline:</span>
                      <span className={`font-medium ${getDaysLeftColor(team.eventEndDate)}`}>
                        {getDaysLeft(team.eventEndDate)}
                      </span>
                    </div>
                  </div>

                  {/* Team Roles */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-foreground mb-2">Team Roles</h4>
                    <div className="flex flex-wrap gap-2">
                      {team.roles.map((role, index) => (
                        <div key={index} className="flex items-center space-x-1 text-xs">
                          <div className={`w-2 h-2 rounded-full ${role.color}`}></div>
                          <span className="text-muted-foreground">{role.name}:</span>
                          <span className="font-medium">{role.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="border-t border-border pt-3">
                    <h4 className="text-sm font-medium text-foreground mb-2">Recent Activity</h4>
                    <div className="space-y-1">
                      {team.recentActivity.slice(0, 2).map((activity, index) => (
                        <div key={index} className="flex items-start space-x-2 text-xs text-muted-foreground">
                          <Icon name="Clock" size={10} className="mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {teams.length === 0 && (
            <div className="text-center py-16">
              <Icon name="Users" size={64} className="mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No teams yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                You haven't joined or created any teams yet. Start by creating a new team or joining an existing one.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button variant="default" iconName="Plus" iconPosition="left">
                  Create New Team
                </Button>
                <Button variant="outline" iconName="Search" iconPosition="left">
                  Find Teams
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Tab Navigation */}
      <TabNavigation notifications={notifications} />
    </div>
  );
};

export default TeamsOverview;