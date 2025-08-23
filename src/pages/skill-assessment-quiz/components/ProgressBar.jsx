import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressBar = ({ 
  currentQuestion, 
  totalQuestions, 
  completedQuestions,
  estimatedTimeRemaining 
}) => {
  const progressPercentage = (completedQuestions / totalQuestions) * 100;
  const questionProgressPercentage = (currentQuestion / totalQuestions) * 100;

  const formatTime = (minutes) => {
    if (minutes < 1) return '< 1 min';
    if (minutes < 60) return `${Math.round(minutes)} min`;
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Target" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Assessment Progress</h3>
        </div>
        
        <div className="text-right">
          <div className="text-sm font-medium text-foreground">
            {completedQuestions} of {totalQuestions} completed
          </div>
          <div className="text-xs text-muted-foreground">
            {formatTime(estimatedTimeRemaining)} remaining
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        
        <div className="relative">
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="bg-primary h-3 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
            </div>
          </div>
          
          {/* Current Question Indicator */}
          <div 
            className="absolute top-0 w-1 h-3 bg-accent rounded-full transition-all duration-300"
            style={{ left: `${questionProgressPercentage}%`, transform: 'translateX(-50%)' }}
          ></div>
        </div>
      </div>

      {/* Milestones */}
      <div className="flex justify-between mt-3 text-xs text-muted-foreground">
        <span className={progressPercentage >= 25 ? 'text-success font-medium' : ''}>
          25%
        </span>
        <span className={progressPercentage >= 50 ? 'text-success font-medium' : ''}>
          50%
        </span>
        <span className={progressPercentage >= 75 ? 'text-success font-medium' : ''}>
          75%
        </span>
        <span className={progressPercentage >= 100 ? 'text-success font-medium' : ''}>
          100%
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;