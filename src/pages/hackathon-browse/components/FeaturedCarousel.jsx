import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedCarousel = ({ featuredHackathons }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || featuredHackathons?.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredHackathons?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredHackathons?.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredHackathons?.length) % featuredHackathons?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredHackathons?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!featuredHackathons || featuredHackathons?.length === 0) {
    return null;
  }

  const currentHackathon = featuredHackathons?.[currentSlide];

  return (
    <div className="relative bg-card rounded-xl overflow-hidden shadow-elevation-2 mb-8">
      {/* Main Carousel Content */}
      <div className="relative h-80 md:h-96">
        <Image
          src={currentHackathon?.image}
          alt={currentHackathon?.title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="pl-16 pr-6 md:pl-20 md:pr-8 lg:pl-24 lg:pr-12 max-w-2xl">
            {/* Featured Badge */}
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium">
                Featured
              </span>
              <span className="px-3 py-1 bg-success/20 text-success rounded-full text-sm font-medium">
                {currentHackathon?.status}
              </span>
            </div>

            {/* Title and Organizer */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 line-clamp-2">
              {currentHackathon?.title}
            </h2>
            <p className="text-white/80 text-lg mb-4">
              by {currentHackathon?.organizer}
            </p>

            {/* Description */}
            <p className="text-white/90 text-base md:text-lg mb-6 line-clamp-2">
              {currentHackathon?.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center space-x-2 text-white">
                <Icon name="Calendar" size={18} />
                <span className="font-medium">
                  {formatDate(currentHackathon?.startDate)} - {formatDate(currentHackathon?.endDate)}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Icon name="Trophy" size={18} />
                <span className="font-medium">{currentHackathon?.prizePool}</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Icon name="Users" size={18} />
                <span className="font-medium">
                  {currentHackathon?.teamSize?.min}-{currentHackathon?.teamSize?.max} members
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to={`/hackathon/${currentHackathon?.id}`}>
                <Button
                  variant="default"
                  size="lg"
                  iconName="ExternalLink"
                  iconPosition="right"
                  className="w-full sm:w-auto"
                >
                  View Details
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                iconName="Bookmark"
                iconPosition="left"
                className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Save for Later
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {featuredHackathons?.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Previous slide"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Next slide"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </>
        )}
      </div>
      {/* Slide Indicators */}
      {featuredHackathons?.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {featuredHackathons?.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white w-8' :'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
      {/* Auto-play Indicator */}
      {featuredHackathons?.length > 1 && (
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label={isAutoPlaying ? 'Pause autoplay' : 'Resume autoplay'}
          >
            <Icon name={isAutoPlaying ? 'Pause' : 'Play'} size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FeaturedCarousel;