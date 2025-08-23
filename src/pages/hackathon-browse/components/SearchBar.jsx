import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, suggestions = [], isLoading = false }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Handle search input change
  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setQuery(value);
    setSelectedIndex(-1);
    setShowSuggestions(value?.length > 0);
    onSearch(value);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions?.length === 0) return;

    switch (e?.key) {
      case 'ArrowDown':
        e?.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions?.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e?.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e?.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions?.[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef?.current?.blur();
        break;
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion?.text);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    onSearch(suggestion?.text);
    inputRef?.current?.blur();
  };

  // Handle clear search
  const handleClear = () => {
    setQuery('');
    setShowSuggestions(false);
    setSelectedIndex(-1);
    onSearch('');
    inputRef?.current?.focus();
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef?.current &&
        !inputRef?.current?.contains(event.target) &&
        suggestionsRef?.current &&
        !suggestionsRef?.current?.contains(event.target)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'hackathon': return 'Trophy';
      case 'skill': return 'Code2';
      case 'organizer': return 'Building';
      case 'theme': return 'Target';
      default: return 'Search';
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {isLoading ? (
            <div className="animate-spin">
              <Icon name="Loader2" size={20} />
            </div>
          ) : (
            <Icon name="Search" size={20} />
          )}
        </div>
        
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search hackathons, skills, themes, or organizers..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query?.length > 0 && setShowSuggestions(true)}
          className="pl-10 pr-10 h-12 text-base bg-card border-border focus:border-primary"
        />

        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <Icon name="X" size={20} />
          </button>
        )}
      </div>
      {/* Search Suggestions */}
      {showSuggestions && suggestions?.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-elevation-3 z-50 max-h-80 overflow-y-auto"
        >
          {suggestions?.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted transition-colors ${
                index === selectedIndex ? 'bg-muted' : ''
              }`}
            >
              <div className="flex-shrink-0">
                <Icon
                  name={getSuggestionIcon(suggestion?.type)}
                  size={16}
                  className="text-muted-foreground"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-popover-foreground truncate">
                  {suggestion?.text}
                </p>
                {suggestion?.description && (
                  <p className="text-xs text-muted-foreground truncate">
                    {suggestion?.description}
                  </p>
                )}
              </div>
              {suggestion?.count && (
                <div className="flex-shrink-0">
                  <span className="text-xs text-muted-foreground">
                    {suggestion?.count} results
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
      {/* No Results */}
      {showSuggestions && suggestions?.length === 0 && query?.length > 0 && !isLoading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-elevation-3 z-50">
          <div className="flex items-center space-x-3 px-4 py-6 text-center">
            <div className="flex-1">
              <Icon name="SearchX" size={24} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                No suggestions found for "{query}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;