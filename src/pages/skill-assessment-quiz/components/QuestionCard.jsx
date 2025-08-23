import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuestionCard = ({ 
  question, 
  selectedLevel, 
  onLevelSelect, 
  onNext, 
  onPrevious, 
  onSkip,
  isFirst,
  isLast,
  currentQuestion,
  totalQuestions 
}) => {
  const skillLevels = [
    {
      level: 'beginner',
      title: 'Beginner',
      description: 'Basic understanding, limited practical experience',
      color: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    {
      level: 'intermediate',
      title: 'Intermediate', 
      description: 'Solid foundation with some practical projects',
      color: 'bg-green-100 text-green-800 border-green-200'
    },
    {
      level: 'advanced',
      title: 'Advanced',
      description: 'Strong expertise with complex project experience',
      color: 'bg-orange-100 text-orange-800 border-orange-200'
    },
    {
      level: 'expert',
      title: 'Expert',
      description: 'Deep mastery, can mentor others and solve complex problems',
      color: 'bg-purple-100 text-purple-800 border-purple-200'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-2 p-6 md:p-8">
      {/* Question Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentQuestion} of {totalQuestions}
          </span>
          <div className="flex items-center space-x-2">
            <Icon name="Code2" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">{question?.category}</span>
          </div>
        </div>
        
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
          {question?.title}
        </h2>
        
        {question?.description && (
          <p className="text-muted-foreground text-sm md:text-base">
            {question?.description}
          </p>
        )}
      </div>
      {/* Skill Level Options */}
      <div className="space-y-3 mb-8">
        <h3 className="text-lg font-medium text-foreground mb-4">
          Rate your skill level:
        </h3>
        
        {skillLevels?.map((level) => (
          <button
            key={level?.level}
            onClick={() => onLevelSelect(level?.level)}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 hover:shadow-elevation-1 ${
              selectedLevel === level?.level
                ? `${level?.color} border-current shadow-elevation-1`
                : 'bg-muted/30 border-border hover:border-muted-foreground/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedLevel === level?.level 
                      ? 'border-current' :'border-muted-foreground/30'
                  }`}>
                    {selectedLevel === level?.level && (
                      <div className="w-2 h-2 rounded-full bg-current"></div>
                    )}
                  </div>
                  <span className="font-medium">{level?.title}</span>
                </div>
                <p className="text-sm mt-2 ml-7 opacity-80">
                  {level?.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={isFirst}
            iconName="ChevronLeft"
            iconPosition="left"
            className="flex-1 sm:flex-none"
          >
            Previous
          </Button>
          
          <Button
            variant="ghost"
            onClick={onSkip}
            className="flex-1 sm:flex-none"
          >
            Skip
          </Button>
        </div>

        <Button
          variant="default"
          onClick={onNext}
          disabled={!selectedLevel}
          iconName={isLast ? "Check" : "ChevronRight"}
          iconPosition="right"
          className="flex-1 sm:flex-none"
        >
          {isLast ? 'Complete' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;