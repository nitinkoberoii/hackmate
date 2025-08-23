import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecommendationCard = ({ recommendation }) => {
  const getMatchScore = (score) => {
    if (score >= 90) return { color: 'text-success', label: 'Excellent Match' };
    if (score >= 75) return { color: 'text-accent', label: 'Good Match' };
    if (score >= 60) return { color: 'text-warning', label: 'Fair Match' };
    return { color: 'text-muted-foreground', label: 'Low Match' };
  };

  const getTimeRemaining = (date) => {
    const now = new Date();
    const eventDate = new Date(date);
    const diff = eventDate - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days <= 0) return 'Registration closed';
    if (days === 1) return 'Ends tomorrow';
    return `${days} days left`;
  };

  const matchInfo = getMatchScore(recommendation?.matchScore);

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-elevation-2 transition-state">
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={recommendation?.logo}
            alt={recommendation?.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground mb-2 line-clamp-2 text-lg">
            {recommendation?.title}
          </h4>
          <p className="text-base text-muted-foreground mb-3">
            {recommendation?.organizer}
          </p>
          <div className="flex items-center space-x-3 text-sm">
            <span className={`flex items-center space-x-2 ${matchInfo?.color} font-medium`}>
              <Icon name="Target" size={14} />
              <span>{recommendation?.matchScore}% • {matchInfo?.label}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
        <span className="flex items-center space-x-2">
          <Icon name="Calendar" size={14} />
          <span className="font-medium">{getTimeRemaining(recommendation?.registrationEnd)}</span>
        </span>
        <span className="flex items-center space-x-2">
          <Icon name="Trophy" size={14} />
          <span className="font-medium">${recommendation?.prize}</span>
        </span>
      </div>
      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-3 font-medium">Matching skills:</p>
        <div className="flex flex-wrap gap-2">
          {recommendation?.matchingSkills?.slice(0, 3)?.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-lg font-medium"
            >
              {skill}
            </span>
          ))}
          {recommendation?.matchingSkills?.length > 3 && (
            <span className="text-sm text-muted-foreground self-center">
              +{recommendation?.matchingSkills?.length - 3} more
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-3 mb-4">
        <Link to="/hackathon-browse" className="flex-1">
          <Button variant="outline" size="default" fullWidth>
            View Details
          </Button>
        </Link>
        <Button
          variant="default"
          size="default"
          iconName="UserPlus"
          iconPosition="left"
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default RecommendationCard;