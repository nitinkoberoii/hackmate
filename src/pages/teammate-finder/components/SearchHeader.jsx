import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchHeader = ({ onSearch, onSort, onFilterToggle, searchQuery, sortBy, resultsCount }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const sortOptions = [
    { value: 'compatibility', label: 'Compatibility Score' },
    { value: 'recent', label: 'Recently Active' },
    { value: 'experience', label: 'Experience Level' },
    { value: 'response-rate', label: 'Response Rate' },
    { value: 'hackathons', label: 'Hackathon Count' }
  ];

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    onSearch(localSearchQuery);
  };

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setLocalSearchQuery(value);
    
    // Debounced search
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      onSearch(value);
    }, 300);
  };

  return (
    <div className="bg-card border-b border-border sticky top-16 z-30">
      <div className="px-4 md:px-6 py-4">
        {/* Search, Sort, and Results Row */}
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="flex-1">
            <div className="relative">
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                value={localSearchQuery}
                onChange={handleSearchChange}
                placeholder="Search by skills, name, or username..."
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </form>

          {/* Sort Dropdown and Results Count */}
          <div className="flex items-center justify-between md:justify-end space-x-3">
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-4">
              <Select
                options={sortOptions}
                value={sortBy}
                onChange={onSort}
                placeholder="Sort by..."
                className="w-40 md:w-48"
              />
            </div>

            {/* Results Count */}
            <div className="text-sm text-muted-foreground whitespace-nowrap">
              {resultsCount > 0 ? (
                <span>
                  {resultsCount} teammate{resultsCount !== 1 ? 's' : ''} found
                </span>
              ) : (
                <span>No teammates found</span>
              )}
            </div>

            {/* Filter Toggle Button */}
            <Button
              variant="outline"
              onClick={onFilterToggle}
              iconName="Filter"
              iconPosition="left"
              className="md:hidden"
            >
              Filters
            </Button>
          </div>
        </div>

        {/* Active Search Query */}
        {searchQuery && (
          <div className="mt-3 flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Searching for:</span>
            <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md">
              <span className="text-sm font-medium">"{searchQuery}"</span>
              <button
                onClick={() => {
                  setLocalSearchQuery('');
                  onSearch('');
                }}
                className="text-primary hover:text-primary/80"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHeader;