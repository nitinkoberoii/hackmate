import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const skillOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'machine-learning', label: 'Machine Learning' },
    { value: 'ui-ux', label: 'UI/UX Design' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'mobile-dev', label: 'Mobile Development' },
    { value: 'devops', label: 'DevOps' },
    { value: 'data-science', label: 'Data Science' }
  ];

  const experienceLevels = [
    { value: 'beginner', label: 'Beginner (0-1 years)' },
    { value: 'intermediate', label: 'Intermediate (2-4 years)' },
    { value: 'advanced', label: 'Advanced (5+ years)' }
  ];

  const timeZones = [
    { value: 'pst', label: 'PST (UTC-8)' },
    { value: 'est', label: 'EST (UTC-5)' },
    { value: 'gmt', label: 'GMT (UTC+0)' },
    { value: 'cet', label: 'CET (UTC+1)' },
    { value: 'ist', label: 'IST (UTC+5:30)' },
    { value: 'jst', label: 'JST (UTC+9)' }
  ];

  const availabilityOptions = [
    { value: 'weekends', label: 'Weekends Only' },
    { value: 'evenings', label: 'Evenings' },
    { value: 'flexible', label: 'Flexible Schedule' },
    { value: 'full-time', label: 'Full-time Available' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      skills: [],
      experienceLevel: '',
      timeZone: '',
      availability: '',
      minCompatibility: 0,
      hasHackathonExperience: false,
      isAvailableNow: false
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={onClose} />
      )}
      {/* Filter Panel */}
      <div className={`
        fixed bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-2xl z-50 max-h-[85vh] overflow-y-auto
        md:static md:w-80 md:border md:rounded-xl md:max-h-none md:shadow-elevation-2
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-y-0' : 'translate-y-full md:translate-y-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border md:border-none sticky top-0 bg-card z-10">
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-muted-foreground"
            >
              Clear All
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="md:hidden"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Filter Content */}
        <div className="p-4 space-y-6">
          {/* Skills Filter */}
          <div>
            <Select
              label="Required Skills"
              description="Select skills you're looking for in teammates"
              multiple
              searchable
              clearable
              options={skillOptions}
              value={localFilters?.skills}
              onChange={(value) => handleFilterChange('skills', value)}
              placeholder="Choose skills..."
            />
          </div>

          {/* Experience Level */}
          <div>
            <Select
              label="Experience Level"
              options={experienceLevels}
              value={localFilters?.experienceLevel}
              onChange={(value) => handleFilterChange('experienceLevel', value)}
              placeholder="Any experience level"
            />
          </div>

          {/* Time Zone */}
          <div>
            <Select
              label="Time Zone"
              description="Find teammates in compatible time zones"
              options={timeZones}
              value={localFilters?.timeZone}
              onChange={(value) => handleFilterChange('timeZone', value)}
              placeholder="Any time zone"
            />
          </div>

          {/* Availability */}
          <div>
            <Select
              label="Availability"
              options={availabilityOptions}
              value={localFilters?.availability}
              onChange={(value) => handleFilterChange('availability', value)}
              placeholder="Any availability"
            />
          </div>

          {/* Minimum Compatibility */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Minimum Compatibility Score
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="100"
                value={localFilters?.minCompatibility}
                onChange={(e) => handleFilterChange('minCompatibility', parseInt(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span className="font-medium text-primary">{localFilters?.minCompatibility}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Boolean Filters */}
          <div className="space-y-3">
            <Checkbox
              label="Has Hackathon Experience"
              description="Only show users with previous hackathon participation"
              checked={localFilters?.hasHackathonExperience}
              onChange={(e) => handleFilterChange('hasHackathonExperience', e?.target?.checked)}
            />

            <Checkbox
              label="Available Now"
              description="Show only users currently looking for teams"
              checked={localFilters?.isAvailableNow}
              onChange={(e) => handleFilterChange('isAvailableNow', e?.target?.checked)}
            />
          </div>

          {/* Apply Button - Mobile Only */}
          <div className="md:hidden pt-4 pb-6">
            <Button
              variant="default"
              fullWidth
              onClick={handleApplyFilters}
              size="default"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid var(--color-card);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid var(--color-card);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </>
  );
};

export default FilterPanel;