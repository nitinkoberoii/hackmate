import React from 'react';
import Icon from '../../../components/AppIcon';


const AchievementSection = ({ user }) => {
  const achievements = [
    {
      id: 1,
      title: "First Hackathon",
      description: "Completed your first hackathon",
      icon: "Trophy",
      earned: true,
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Team Player",
      description: "Successfully formed 5 teams",
      icon: "Users",
      earned: true,
      date: "2024-03-22"
    },
    {
      id: 3,
      title: "Skill Master",
      description: "Achieved 90%+ skill compatibility",
      icon: "Target",
      earned: false,
      progress: 75
    },
    {
      id: 4,
      title: "Winner",
      description: "Won a hackathon competition",
      icon: "Award",
      earned: false,
      progress: 0
    }
  ];

  const stats = [
    { label: "Hackathons Joined", value: user?.hackathonsJoined, icon: "Calendar" },
    { label: "Teams Formed", value: user?.teamsFormed, icon: "Users" },
    { label: "Skills Endorsed", value: user?.skillsEndorsed, icon: "ThumbsUp" },
    { label: "Win Rate", value: `${user?.winRate}%`, icon: "TrendingUp" }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="font-semibold text-foreground mb-6 flex items-center space-x-3 text-lg">
        <Icon name="Award" size={20} />
        <span>Achievements & Stats</span>
      </h3>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats?.map((stat, index) => (
          <div key={index} className="bg-muted/50 rounded-xl p-4 text-center">
            <Icon name={stat?.icon} size={18} className="text-primary mx-auto mb-2" />
            <div className="text-xl font-bold text-foreground mb-1">{stat?.value}</div>
            <div className="text-sm text-muted-foreground">{stat?.label}</div>
          </div>
        ))}
      </div>
      {/* Achievements */}
      <div className="space-y-4">
        <h4 className="text-base font-semibold text-foreground">Recent Achievements</h4>
        {achievements?.slice(0, 3)?.map((achievement) => (
          <div key={achievement?.id} className="flex items-center space-x-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              achievement?.earned 
                ? 'bg-success text-success-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}>
              <Icon name={achievement?.icon} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-base font-semibold text-foreground mb-1">
                {achievement?.title}
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                {achievement?.description}
              </div>
              {!achievement?.earned && achievement?.progress > 0 && (
                <div className="mt-2">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${achievement?.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {achievement?.progress}% complete
                  </div>
                </div>
              )}
            </div>
            {achievement?.earned && (
              <div className="text-sm text-muted-foreground">
                {new Date(achievement.date)?.toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementSection;