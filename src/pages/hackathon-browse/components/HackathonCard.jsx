import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HackathonCard = ({ hackathon, onBookmark, viewMode = 'grid' }) => {
  const [isBookmarked, setIsBookmarked] = useState(hackathon?.isBookmarked || false);

  const handleBookmark = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsBookmarked(!isBookmarked);
    onBookmark(hackathon?.id, !isBookmarked);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'text-success bg-success/10';
      case 'Closing Soon': return 'text-warning bg-warning/10';
      case 'Full': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getCompatibilityColor = (score) => {
    if (score >= 80) return 'text-success bg-success/10';
    if (score >= 60) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Link to={`/hackathon/${hackathon?.id}`} className="block group h-full">
      {viewMode === 'grid' ? (
        // Grid View Layout
        <div className="bg-card border border-border rounded-xl shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200 hover-scale overflow-hidden h-full flex flex-col">
          {/* Header Image */}
          <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden">
            <Image
              src={hackathon?.image}
              alt={hackathon?.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
              <div className="flex flex-wrap gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(hackathon?.status)}`}>
                  {hackathon?.status}
                </span>
                {hackathon?.featured && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                    Featured
                  </span>
                )}
              </div>
              <button
                onClick={handleBookmark}
                className="p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors"
              >
                <Icon
                  name={isBookmarked ? "Bookmark" : "BookmarkPlus"}
                  size={16}
                  className={isBookmarked ? "text-accent" : "text-muted-foreground"}
                />
              </button>
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                  <Icon name="Calendar" size={14} />
                  <span className="text-sm font-medium">
                    {formatDate(hackathon?.startDate)} - {formatDate(hackathon?.endDate)}
                  </span>
                </div>
                <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-sm font-medium">{hackathon?.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4 flex-1 flex flex-col">
            {/* Title and Organization */}
            <div>
              <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                {hackathon?.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                by {hackathon?.organizer}
              </p>
            </div>

            {/* Theme and Description */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Target" size={16} className="text-accent" />
                <span className="text-sm font-medium text-accent">{hackathon?.theme}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {hackathon?.description}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Icon name="Trophy" size={16} className="text-warning" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">{hackathon?.prizePool}</p>
                  <p className="text-xs text-muted-foreground">Prize Pool</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-primary" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">
                    {hackathon?.teamSize?.min}-{hackathon?.teamSize?.max}
                  </p>
                  <p className="text-xs text-muted-foreground">Team Size</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} className="text-secondary" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">{hackathon?.location}</p>
                  <p className="text-xs text-muted-foreground">Location</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="UserCheck" size={16} className="text-success" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">
                    {hackathon?.registrations}/{hackathon?.maxParticipants}
                  </p>
                  <p className="text-xs text-muted-foreground">Registered</p>
                </div>
              </div>
            </div>

            {/* Skills Tags */}
            <div>
              <div className="flex flex-wrap gap-2">
                {hackathon?.requiredSkills?.slice(0, 4)?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
                {hackathon?.requiredSkills?.length > 4 && (
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium">
                    +{hackathon?.requiredSkills?.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* Compatibility Score */}
            {hackathon?.compatibilityScore && (
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="Target" size={16} className="text-primary" />
                  <span className="text-sm text-muted-foreground">Compatibility</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        hackathon?.compatibilityScore >= 80 ? 'bg-success' :
                        hackathon?.compatibilityScore >= 60 ? 'bg-warning' : 'bg-error'
                      }`}
                      style={{ width: `${hackathon?.compatibilityScore}%` }}
                    />
                  </div>
                  <span className={`text-sm font-medium ${getCompatibilityColor(hackathon?.compatibilityScore)}`}>
                    {hackathon?.compatibilityScore}%
                  </span>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="pt-2 mt-auto">
              <Button
                variant="outline"
                fullWidth
                iconName="ExternalLink"
                iconPosition="right"
                className="group-hover:border-primary group-hover:text-primary"
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      ) : (
        // List View Layout
        <div className="bg-card border border-border rounded-xl shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="relative w-full md:w-48 h-48 md:h-auto overflow-hidden flex-shrink-0">
              <Image
                src={hackathon?.image}
                alt={hackathon?.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(hackathon?.status)}`}>
                  {hackathon?.status}
                </span>
                {hackathon?.featured && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                    Featured
                  </span>
                )}
              </div>
              <div className="absolute bottom-3 left-3">
                <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-sm font-medium text-white">{hackathon?.duration}</span>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-4 md:p-6">
              <div className="flex flex-col h-full">
                {/* Header with Bookmark */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors mb-1 line-clamp-2">
                      {hackathon?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      by {hackathon?.organizer}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-muted-foreground space-y-1 sm:space-y-0">
                      <div className="flex items-center space-x-2">
                        <Icon name="Calendar" size={16} />
                        <span>{formatDate(hackathon?.startDate)} - {formatDate(hackathon?.endDate)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="MapPin" size={16} />
                        <span>{hackathon?.location}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleBookmark}
                    className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors ml-4 flex-shrink-0"
                  >
                    <Icon
                      name={isBookmarked ? "Bookmark" : "BookmarkPlus"}
                      size={16}
                      className={isBookmarked ? "text-accent" : "text-muted-foreground"}
                    />
                  </button>
                </div>

                {/* Theme and Description */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Target" size={16} className="text-accent" />
                    <span className="text-sm font-medium text-accent">{hackathon?.theme}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {hackathon?.description}
                  </p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Trophy" size={16} className="text-warning" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-card-foreground truncate">{hackathon?.prizePool}</p>
                      <p className="text-xs text-muted-foreground">Prize Pool</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} className="text-primary" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-card-foreground">
                        {hackathon?.teamSize?.min}-{hackathon?.teamSize?.max}
                      </p>
                      <p className="text-xs text-muted-foreground">Team Size</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="UserCheck" size={16} className="text-success" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-card-foreground">
                        {hackathon?.registrations}/{hackathon?.maxParticipants}
                      </p>
                      <p className="text-xs text-muted-foreground">Registered</p>
                    </div>
                  </div>
                  {hackathon?.compatibilityScore && (
                    <div className="flex items-center space-x-2">
                      <Icon name="Target" size={16} className="text-primary" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-card-foreground">{hackathon?.compatibilityScore}%</p>
                        <p className="text-xs text-muted-foreground">Compatibility</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Skills Tags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {hackathon?.requiredSkills?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                  <Button
                    variant="outline"
                    iconName="ExternalLink"
                    iconPosition="right"
                    className="group-hover:border-primary group-hover:text-primary"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
};

export default HackathonCard;