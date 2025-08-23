import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SortDropdown = ({ currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    {
      value: 'relevance',
      label: 'Most Relevant',
      icon: 'Target',
      description: 'Based on your skills and interests'
    },
    {
      value: 'date-asc',
      label: 'Starting Soon',
      icon: 'Calendar',
      description: 'Earliest start date first'
    },
    {
      value: 'date-desc',
      label: 'Latest Added',
      icon: 'CalendarPlus',
      description: 'Recently posted hackathons'
    },
    {
      value: 'prize-desc',
      label: 'Highest Prize',
      icon: 'Trophy',
      description: 'Largest prize pool first'
    },
    {
      value: 'prize-asc',
      label: 'Lowest Prize',
      icon: 'DollarSign',
      description: 'Smallest prize pool first'
    },
    {
      value: 'compatibility-desc',
      label: 'Best Match',
      icon: 'Heart',
      description: 'Highest compatibility score'
    },
    {
      value: 'participants-desc',
      label: 'Most Popular',
      icon: 'Users',
      description: 'Most registered participants'
    },
    {
      value: 'participants-asc',
      label: 'Least Popular',
      icon: 'UserMinus',
      description: 'Fewest registered participants'
    }
  ];

  const currentOption = sortOptions?.find(option => option?.value === currentSort) || sortOptions?.[0];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onSortChange(option?.value);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Sort Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium text-card-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Sort options"
      >
        <Icon name="ArrowUpDown" size={16} />
        <span className="hidden sm:inline">Sort by:</span>
        <span>{currentOption?.label}</span>
        <Icon
          name="ChevronDown"
          size={16}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-popover border border-border rounded-lg shadow-elevation-3 z-50 py-2">
          <div className="px-3 py-2 border-b border-border">
            <h3 className="text-sm font-medium text-popover-foreground">Sort Options</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Choose how to order hackathons
            </p>
          </div>
          
          <div className="py-1">
            {sortOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => handleOptionClick(option)}
                className={`w-full flex items-start space-x-3 px-3 py-3 text-left hover:bg-muted transition-colors ${
                  currentSort === option?.value ? 'bg-muted' : ''
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <Icon
                    name={option?.icon}
                    size={16}
                    className={currentSort === option?.value ? 'text-primary' : 'text-muted-foreground'}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${
                    currentSort === option?.value ? 'text-primary' : 'text-popover-foreground'
                  }`}>
                    {option?.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {option?.description}
                  </p>
                </div>
                {currentSort === option?.value && (
                  <div className="flex-shrink-0 mt-0.5">
                    <Icon name="Check" size={16} className="text-primary" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;