import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TeamOverview = ({ team, hackathon }) => {
  const skillCategories = [
    { name: 'Frontend', count: 3, color: 'bg-blue-500' },
    { name: 'Backend', count: 2, color: 'bg-green-500' },
    { name: 'Design', count: 1, color: 'bg-purple-500' },
    { name: 'DevOps', count: 1, color: 'bg-orange-500' }
  ];

  const milestones = [
    { id: 1, title: 'Project Planning', completed: true, dueDate: '2025-01-08' },
    { id: 2, title: 'MVP Development', completed: true, dueDate: '2025-01-10' },
    { id: 3, title: 'Feature Implementation', completed: false, dueDate: '2025-01-12' },
    { id: 4, title: 'Testing & Deployment', completed: false, dueDate: '2025-01-14' }
  ];

  const recentActivity = [
    {
      id: 1,
      user: 'Sarah Chen',
      action: 'pushed code to main branch',
      timestamp: '2 hours ago',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
    },
    {
      id: 2,
      user: 'Mike Johnson',
      action: 'completed milestone: MVP Development',
      timestamp: '4 hours ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    {
      id: 3,
      user: 'Alex Rivera',
      action: 'uploaded design mockups',
      timestamp: '6 hours ago',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150'
    }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-card border border-border rounded-lg p-3 md:p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="md:w-5 md:h-5 text-primary" />
            <span className="text-xs md:text-sm font-medium text-muted-foreground">Members</span>
          </div>
          <p className="text-lg md:text-2xl font-bold text-foreground mt-1">
            {team?.members?.length}
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-3 md:p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={16} className="md:w-5 md:h-5 text-success" />
            <span className="text-xs md:text-sm font-medium text-muted-foreground">Progress</span>
          </div>
          <p className="text-lg md:text-2xl font-bold text-foreground mt-1">
            {team?.progress}%
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-3 md:p-4">
          <div className="flex items-center space-x-2">
            <Icon name="GitBranch" size={16} className="md:w-5 md:h-5 text-warning" />
            <span className="text-xs md:text-sm font-medium text-muted-foreground">Commits</span>
          </div>
          <p className="text-lg md:text-2xl font-bold text-foreground mt-1">
            {team?.commits || 47}
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-3 md:p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="md:w-5 md:h-5 text-error" />
            <span className="text-xs md:text-sm font-medium text-muted-foreground">Days Left</span>
          </div>
          <p className="text-lg md:text-2xl font-bold text-foreground mt-1">
            {Math.ceil((new Date(hackathon.endDate) - new Date()) / (1000 * 60 * 60 * 24))}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Team Composition */}
        <div className="bg-card border border-border rounded-lg p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">Team Composition</h3>
          <div className="space-y-3 md:space-y-4">
            {skillCategories?.map((skill) => (
              <div key={skill?.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${skill?.color}`} />
                  <span className="text-xs md:text-sm font-medium text-foreground">{skill?.name}</span>
                </div>
                <span className="text-xs md:text-sm text-muted-foreground">{skill?.count} members</span>
              </div>
            ))}
          </div>
        </div>

        {/* Project Milestones */}
        <div className="bg-card border border-border rounded-lg p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">Project Milestones</h3>
          <div className="space-y-2.5 md:space-y-3">
            {milestones?.map((milestone) => (
              <div key={milestone?.id} className="flex items-center space-x-2.5 md:space-x-3">
                <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center ${
                  milestone?.completed ? 'bg-success' : 'bg-muted border-2 border-muted-foreground'
                }`}>
                  {milestone?.completed && (
                    <Icon name="Check" size={10} className="md:w-3 md:h-3" color="white" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-xs md:text-sm font-medium ${
                    milestone?.completed ? 'text-muted-foreground line-through' : 'text-foreground'
                  }`}>
                    {milestone?.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Due: {new Date(milestone.dueDate)?.toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">Recent Activity</h3>
        <div className="space-y-3 md:space-y-4">
          {recentActivity?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-2.5 md:space-x-3">
              <Image
                src={activity?.avatar}
                alt={activity?.user}
                className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm text-foreground leading-relaxed">
                  <span className="font-medium">{activity?.user}</span> {activity?.action}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{activity?.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamOverview;