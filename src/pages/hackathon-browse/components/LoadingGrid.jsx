import React from 'react';

const LoadingGrid = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count })?.map((_, index) => (
        <div key={index} className="bg-card border border-border rounded-lg shadow-elevation-1 overflow-hidden animate-pulse h-full flex flex-col">
          {/* Header Image Skeleton */}
          <div className="h-44 sm:h-48 md:h-52 bg-muted" />
          
          {/* Content Skeleton */}
          <div className="p-4 space-y-4">
            {/* Title and Organization */}
            <div className="space-y-2">
              <div className="h-6 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </div>

            {/* Theme and Description */}
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 })?.map((_, statIndex) => (
                <div key={statIndex} className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-muted rounded" />
                  <div className="space-y-1 flex-1">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 })?.map((_, tagIndex) => (
                <div key={tagIndex} className="h-6 bg-muted rounded-full w-16" />
              ))}
            </div>

            {/* Compatibility Score */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-20" />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-muted rounded-full" />
                <div className="h-4 bg-muted rounded w-8" />
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2 mt-auto">
              <div className="h-10 bg-muted rounded w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingGrid;