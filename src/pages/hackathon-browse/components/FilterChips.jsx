import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ activeFilters, onFilterChange, onClearAll }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});
  const chipRefs = useRef({});

  const filterOptions = [
    {
      key: 'date',
      label: 'Date',
      icon: 'Calendar',
      options: ['This Week', 'This Month', 'Next Month', 'Custom Range']
    },
    {
      key: 'location',
      label: 'Location',
      icon: 'MapPin',
      options: ['Virtual', 'In-Person', 'Hybrid']
    },
    {
      key: 'difficulty',
      label: 'Difficulty',
      icon: 'BarChart3',
      options: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
    },
    {
      key: 'duration',
      label: 'Duration',
      icon: 'Clock',
      options: ['24 Hours', '24-48 Hours', '48-72 Hours', '1 Week+']
    },
    {
      key: 'prize',
      label: 'Prize',
      icon: 'Trophy',
      options: ['$500+', '$1K+', '$5K+', '$10K+']
    },
    {
      key: 'technology',
      label: 'Technology',
      icon: 'Code2',
      options: ['Web Dev', 'Mobile', 'AI/ML', 'Blockchain', 'IoT', 'Game Dev']
    }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && !dropdownRefs.current[openDropdown]?.contains(event.target) && !chipRefs.current[openDropdown]?.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    const handleScroll = () => {
      if (openDropdown) {
        setOpenDropdown(null);
      }
    };

    const handleResize = () => {
      if (openDropdown) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [openDropdown]);

  const handleChipClick = (filterKey) => {
    if (openDropdown === filterKey) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(filterKey);
    }
  };

  const getDropdownPosition = (filterKey) => {
    if (!chipRefs.current[filterKey]) return {};
    
    const chipRect = chipRefs.current[filterKey].getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const dropdownWidth = Math.min(320, viewportWidth - 32);
    const estimatedDropdownHeight = 300; // Approximate height of dropdown
    
    // Calculate available space in different directions
    const spaceBelow = viewportHeight - chipRect.bottom;
    const spaceAbove = chipRect.top;
    
    // Determine optimal position
    let top, left, transform;
    
    // Vertical positioning - prefer below, but use above if not enough space
    if (spaceBelow >= estimatedDropdownHeight || spaceBelow > spaceAbove) {
      // Position below the chip
      top = chipRect.bottom + 2;
    } else {
      // Position above the chip
      top = chipRect.top - estimatedDropdownHeight - 2;
      transform = 'translate(-50%, -100%)';
    }
    
    // Ensure top position is within viewport bounds
    top = Math.max(8, Math.min(viewportHeight - estimatedDropdownHeight - 8, top));
    
    // Horizontal positioning - center on chip, but ensure it's fully visible
    const preferredLeft = chipRect.left + (chipRect.width / 2) - (dropdownWidth / 2);
    left = Math.max(8, Math.min(viewportWidth - dropdownWidth - 8, preferredLeft));
    
    // If the dropdown would be cut off on the right, adjust left position
    if (left + dropdownWidth > viewportWidth - 8) {
      left = viewportWidth - dropdownWidth - 8;
    }
    
    // If the dropdown would be cut off on the left, adjust left position
    if (left < 8) {
      left = 8;
    }
    
    return {
      top: `${top}px`,
      left: `${left}px`,
      width: `${dropdownWidth}px`,
      transform: transform || 'translateX(-50%)',
    };
  };

  const handleOptionSelect = (filterKey, option) => {
    const currentValues = activeFilters[filterKey] || [];
    let newValues;

    if (currentValues.includes(option)) {
      // Remove option if already selected
      newValues = currentValues.filter(value => value !== option);
    } else {
      // Add option if not selected
      newValues = [...currentValues, option];
    }

    // If no options selected, remove the filter entirely
    if (newValues.length === 0) {
      const { [filterKey]: removed, ...rest } = activeFilters;
      onFilterChange(rest);
    } else {
      onFilterChange({ ...activeFilters, [filterKey]: newValues });
    }
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).flat().length;
  };

  const getDisplayValue = (filter) => {
    const values = activeFilters[filter.key];
    if (!values || values.length === 0) {
      return filter.label;
    }
    if (values.length === 1) {
      const value = values[0];
      // Handle custom range display
      if (value.startsWith('Custom Range:')) {
        const dateRange = value.replace('Custom Range:', '').trim();
        return dateRange || 'Custom Range';
      }
      return value;
    }
    
    // For multiple values, check if custom range is included
    const customRangeValue = values.find(val => val.startsWith('Custom Range:'));
    if (customRangeValue) {
      const dateRange = customRangeValue.replace('Custom Range:', '').trim();
      const otherValues = values.filter(val => !val.startsWith('Custom Range'));
      if (otherValues.length === 0) {
        return dateRange || 'Custom Range';
      }
      return `${dateRange || 'Custom Range'} +${otherValues.length}`;
    }
    
    return `${values[0]} +${values.length - 1}`;
  };

  const isFilterActive = (filter) => {
    const values = activeFilters[filter.key];
    return values && values.length > 0;
  };

  const getSelectedCount = (filter) => {
    const values = activeFilters[filter.key];
    return values ? values.length : 0;
  };

  return (
    <div className="flex items-center space-x-3 overflow-x-auto scrollbar-hide pb-2">
      {/* Clear All Button */}
      {getActiveFilterCount() > 0 && (
        <button
          onClick={onClearAll}
          className="flex items-center space-x-2 px-3 py-2 bg-error/10 text-error rounded-full text-sm font-medium whitespace-nowrap hover:bg-error/20 transition-colors"
        >
          <Icon name="X" size={14} />
          <span>Clear All</span>
        </button>
      )}
      
      {/* Filter Chips */}
      {filterOptions.map((filter) => {
        const isActive = isFilterActive(filter);
        const selectedCount = getSelectedCount(filter);
        const displayValue = getDisplayValue(filter);
        
        return (
          <div key={filter.key} className="relative" ref={el => dropdownRefs.current[filter.key] = el}>
            <button
              ref={el => chipRefs.current[filter.key] = el}
              onClick={() => handleChipClick(filter.key)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all hover:scale-105 ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-elevation-1'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
              title={isActive ? `Active filters: ${activeFilters[filter.key].join(', ')}` : `Click to select ${filter.label} filters`}
            >
              <Icon name={filter.icon} size={14} />
              <span>{displayValue}</span>
              {selectedCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-primary-foreground/20 rounded-full text-xs font-medium">
                  {selectedCount}
                </span>
              )}
              <Icon 
                name={openDropdown === filter.key ? "ChevronUp" : "ChevronDown"} 
                size={12} 
                className="opacity-60 transition-transform" 
              />
            </button>

            {/* Dropdown Menu */}
            {openDropdown === filter.key && (
              <>
                {/* Backdrop Overlay */}
                <div 
                  className="fixed inset-0 bg-black/20 filter-dropdown-backdrop z-[9998]"
                  onClick={() => setOpenDropdown(null)}
                />
                <div 
                  className="fixed top-auto left-1/2 w-80 bg-card border border-border rounded-lg filter-dropdown z-[9999] animate-in fade-in-0 slide-in-from-top-2 duration-200"
                  style={getDropdownPosition(filter.key)}
                >
                  <div className="p-3 border-b border-border">
                    <h3 className="text-sm font-medium text-card-foreground">{filter.label}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Select one or more options</p>
                    {selectedCount > 0 && (
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-primary font-medium">
                          {selectedCount} of {filter.options.length} selected
                        </span>
                        <button
                          onClick={() => {
                            const allSelected = filter.options.every(option => 
                              activeFilters[filter.key]?.includes(option)
                            );
                            if (allSelected) {
                              // Clear all
                              const { [filter.key]: removed, ...rest } = activeFilters;
                              onFilterChange(rest);
                            } else {
                              // Select all
                              onFilterChange({ ...activeFilters, [filter.key]: filter.options });
                            }
                          }}
                          className="text-xs text-primary hover:text-primary/80 transition-colors underline"
                        >
                          {filter.options.every(option => activeFilters[filter.key]?.includes(option)) 
                            ? 'Clear All' 
                            : 'Select All'
                          }
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    {filter.options.map((option) => {
                      const isSelected = activeFilters[filter.key]?.includes(option);
                      return (
                        <label
                          key={option}
                          className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleOptionSelect(filter.key, option)}
                            className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2 focus:ring-offset-0"
                          />
                          <span className={`text-sm ${isSelected ? 'text-card-foreground font-medium' : 'text-muted-foreground'}`}>
                            {option}
                          </span>
                          {isSelected && (
                            <Icon name="Check" size={14} className="text-primary ml-auto" />
                          )}
                        </label>
                      );
                    })}
                    
                    {/* Custom Range Date Inputs for Date Filter */}
                    {filter.key === 'date' && activeFilters[filter.key]?.includes('Custom Range') && (
                      <div className="mt-3 p-3 bg-muted/30 rounded-md border border-border">
                        <div className="mb-2">
                          <p className="text-xs text-muted-foreground">
                            Select a custom date range for your hackathon search
                          </p>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-card-foreground mb-1">
                              From Date
                            </label>
                            <input
                              type="date"
                              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-card text-card-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                              placeholder="Select start date"
                              onChange={(e) => {
                                const currentValues = activeFilters[filter.key] || [];
                                const customRangeIndex = currentValues.findIndex(val => val.startsWith('Custom Range'));
                                
                                if (customRangeIndex !== -1) {
                                  const newValues = [...currentValues];
                                  if (e.target.value) {
                                    newValues[customRangeIndex] = `Custom Range: ${e.target.value} to ${newValues[customRangeIndex]?.split(' to ')[1] || ''}`.trim();
                                  } else {
                                    newValues[customRangeIndex] = 'Custom Range';
                                  }
                                  onFilterChange({ ...activeFilters, [filter.key]: newValues });
                                }
                              }}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-card-foreground mb-1">
                              To Date
                            </label>
                            <input
                              type="date"
                              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-card text-card-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                              placeholder="Select end date"
                              onChange={(e) => {
                                const currentValues = activeFilters[filter.key] || [];
                                const customRangeIndex = currentValues.findIndex(val => val.startsWith('Custom Range'));
                                
                                if (customRangeIndex !== -1) {
                                  const newValues = [...currentValues];
                                  if (e.target.value) {
                                    newValues[customRangeIndex] = `Custom Range: ${newValues[customRangeIndex]?.split(' to ')[0]?.split(': ')[1] || ''} to ${e.target.value}`.trim();
                                  } else {
                                    newValues[customRangeIndex] = 'Custom Range';
                                  }
                                  onFilterChange({ ...activeFilters, [filter.key]: newValues });
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {selectedCount > 0 && (
                    <div className="p-3 border-t border-border bg-muted/30">
                      <button
                        onClick={() => {
                          const { [filter.key]: removed, ...rest } = activeFilters;
                          onFilterChange(rest);
                          setOpenDropdown(null);
                        }}
                        className="text-xs text-error hover:text-error/80 transition-colors"
                      >
                        Clear {filter.label} filters
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        );
      })}
      
      {/* Active Filter Count */}
      {getActiveFilterCount() > 0 && (
        <div className="flex items-center space-x-2 px-3 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium whitespace-nowrap">
          <Icon name="Filter" size={14} />
          <span>{getActiveFilterCount()} active</span>
        </div>
      )}
    </div>
  );
};

export default FilterChips;