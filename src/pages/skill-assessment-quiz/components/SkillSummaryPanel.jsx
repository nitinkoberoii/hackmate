import React from 'react';
import Icon from '../../../components/AppIcon';

const SkillSummaryPanel = ({ skills, className = "" }) => {
  const groupedSkills = skills?.reduce((acc, skill) => {
    if (!acc?.[skill?.category]) {
      acc[skill.category] = [];
    }
    acc?.[skill?.category]?.push(skill);
    return acc;
  }, {});

  const getLevelColor = (level) => {
    switch (level) {
      case 'expert':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'advanced':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'intermediate':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'beginner':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Frontend': 'Monitor',
      'Backend': 'Server',
      'Mobile': 'Smartphone',
      'Data Science': 'BarChart3',
      'DevOps': 'Settings',
      'Design': 'Palette',
      'Database': 'Database',
      'Cloud': 'Cloud'
    };
    return iconMap?.[category] || 'Code2';
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 md:p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="List" size={20} className="text-primary" />
        <h3 className="font-semibold text-foreground">Skill Summary</h3>
      </div>
      {skills?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="BookOpen" size={48} className="text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">
            Your assessed skills will appear here as you progress through the quiz
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSkills)?.map(([category, categorySkills]) => (
            <div key={category}>
              <div className="flex items-center space-x-2 mb-3">
                <Icon 
                  name={getCategoryIcon(category)} 
                  size={16} 
                  className="text-primary" 
                />
                <h4 className="font-medium text-foreground">{category}</h4>
                <span className="text-xs text-muted-foreground">
                  ({categorySkills?.length})
                </span>
              </div>
              
              <div className="space-y-2 ml-6">
                {categorySkills?.map((skill) => (
                  <div
                    key={skill?.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <span className="font-medium text-foreground text-sm">
                      {skill?.name}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full border ${getLevelColor(skill?.level)}`}>
                      {skill?.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {/* Summary Stats */}
          <div className="pt-4 border-t border-border">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {skills?.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Skills Assessed
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">
                  {Object.keys(groupedSkills)?.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Categories
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillSummaryPanel;