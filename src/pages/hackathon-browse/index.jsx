import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import FeaturedCarousel from './components/FeaturedCarousel';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import SortDropdown from './components/SortDropdown';
import HackathonCard from './components/HackathonCard';
import LoadingGrid from './components/LoadingGrid';

const HackathonBrowse = () => {
  const location = useLocation();
  
  // API Configuration
  const BASE_URL = 'http://localhost:5000';
  const API_ENDPOINT = `${BASE_URL}/api/hackathons`;
  
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [currentSort, setCurrentSort] = useState('relevance');
  const [hackathons, setHackathons] = useState([]);
  const [featuredHackathons, setFeaturedHackathons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [error, setError] = useState(null);

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    isOnline: true,
    githubConnected: true
  };

  // Mock notifications
  const mockNotifications = {
    dashboard: 3,
    browse: 0,
    find: 5,
    teams: 2
  };

  // Mock search suggestions
  const mockSearchSuggestions = [
    { text: "AI Healthcare", type: "theme", description: "Healthcare technology hackathons", count: 12 },
    { text: "React", type: "skill", description: "JavaScript library", count: 45 },
    { text: "TechForGood Foundation", type: "organizer", description: "Non-profit tech organization", count: 8 },
    { text: "Climate Tech Challenge", type: "hackathon", description: "Environmental technology", count: 3 },
    { text: "Blockchain", type: "skill", description: "Distributed ledger technology", count: 23 }
  ];

  // Fetch hackathons from API
  const fetchHackathons = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(API_ENDPOINT);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Separate featured and regular hackathons
      const featured = data.filter(hackathon => hackathon.featured === true);
      const regular = data.filter(hackathon => hackathon.featured !== true);
      
      setFeaturedHackathons(featured);
      setHackathons(regular);
      
    } catch (error) {
      console.error('Error fetching hackathons:', error);
      setError('Failed to load hackathons. Please try again later.');
      
      // Fallback to empty arrays
      setFeaturedHackathons([]);
      setHackathons([]);
    } finally {
      setIsLoading(false);
    }
  }, [API_ENDPOINT]);

  // Initialize data
  useEffect(() => {
    fetchHackathons();
  }, [fetchHackathons]);

  // Handle search
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setIsSearchLoading(true);
    
    // Simulate search API call
    setTimeout(() => {
      if (query?.length > 0) {
        const filtered = mockSearchSuggestions?.filter(suggestion =>
          suggestion?.text?.toLowerCase()?.includes(query?.toLowerCase())
        );
        setSearchSuggestions(filtered);
      } else {
        setSearchSuggestions([]);
      }
      setIsSearchLoading(false);
    }, 300);
  }, []);

  // Handle filter changes
  const handleFilterChange = (keyOrFilters, value) => {
    // Handle new filter structure where entire filters object is passed
    if (typeof keyOrFilters === 'object' && keyOrFilters !== null) {
      setActiveFilters(keyOrFilters);
    } else {
      // Handle old structure for backward compatibility
      setActiveFilters(prev => ({
        ...prev,
        [keyOrFilters]: value
      }));
    }
  };

  const handleClearAllFilters = () => {
    setActiveFilters({});
  };

  // Handle sort change
  const handleSortChange = (sortValue) => {
    setCurrentSort(sortValue);
    // Implement sorting logic here
  };

  // Handle bookmark
  const handleBookmark = (hackathonId, isBookmarked) => {
    setHackathons(prev =>
      prev?.map(hackathon =>
        hackathon?.id === hackathonId
          ? { ...hackathon, isBookmarked }
          : hackathon
      )
    );
  };

  // Handle load more
  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading more data
    setTimeout(() => {
      // In real app, this would fetch more data
      setPage(prev => prev + 1);
      setIsLoading(false);
      if (page >= 3) {
        setHasMore(false);
      }
    }, 1000);
  };

  // Handle view mode toggle
  const handleViewModeToggle = () => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  };

  // Handle retry on error
  const handleRetry = () => {
    fetchHackathons();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header user={mockUser} notifications={mockNotifications} />
      {/* Main Content */}
      <main className="pt-16 md:pt-18 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Discover Hackathons
                </h1>
                <p className="text-muted-foreground mt-1">
                  Find the perfect hackathon that matches your skills and interests
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="BookmarkPlus"
                  iconPosition="left"
                >
                  Saved Events
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                >
                  Create Event
                </Button>
              </div>
            </div>

            {/* Search Bar */}
            <SearchBar
              onSearch={handleSearch}
              suggestions={searchSuggestions}
              isLoading={isSearchLoading}
            />
          </div>

          {/* Error State */}
          {error && (
            <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name="AlertCircle" size={20} className="text-destructive" />
                  <span className="text-destructive font-medium">{error}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRetry}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Retry
                </Button>
              </div>
            </div>
          )}

          {/* Featured Hackathons */}
          {!isLoading && !error && featuredHackathons?.length > 0 && (
            <FeaturedCarousel featuredHackathons={featuredHackathons} />
          )}

          {/* Filters and Sort */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex-1">
              <FilterChips
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearAllFilters}
              />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="flex gap-8">
            {/* Hackathons Grid */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {searchQuery ? `Results for "${searchQuery}"` : 'All Hackathons'}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {hackathons?.length} hackathons found
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <SortDropdown
                    currentSort={currentSort}
                    onSortChange={handleSortChange}
                  />
                  <button
                    onClick={handleViewModeToggle}
                    className="flex items-center space-x-2 hover:text-foreground transition-colors cursor-pointer px-3 py-2 rounded-lg hover:bg-muted/50 active:bg-muted"
                    title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
                  >
                    <Icon name={viewMode === 'grid' ? "List" : "Grid3X3"} size={16} />
                    <span>{viewMode === 'grid' ? 'List View' : 'Grid View'}</span>
                  </button>
                </div>
              </div>

              {/* Loading State */}
              {isLoading && page === 1 && <LoadingGrid count={9} />}

              {/* Hackathons Display */}
              {!isLoading && !error && hackathons?.length > 0 && (
                <div className="transition-all duration-300 ease-in-out">
                  {/* Grid View */}
                  {viewMode === 'grid' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {hackathons?.map((hackathon) => (
                        <HackathonCard
                          key={hackathon?.id}
                          hackathon={hackathon}
                          onBookmark={handleBookmark}
                          viewMode="grid"
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* List View */}
                  {viewMode === 'list' && (
                    <div className="space-y-4 mb-8">
                      {hackathons?.map((hackathon) => (
                        <HackathonCard
                          key={hackathon?.id}
                          hackathon={hackathon}
                          onBookmark={handleBookmark}
                          viewMode="list"
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Load More */}
              {!isLoading && !error && hasMore && hackathons?.length > 0 && (
                <div className="text-center">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleLoadMore}
                    iconName="ChevronDown"
                    iconPosition="right"
                  >
                    Load More Hackathons
                  </Button>
                </div>
              )}

              {/* Loading More */}
              {isLoading && page > 1 && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center space-x-2 text-muted-foreground">
                    <div className="animate-spin">
                      <Icon name="Loader2" size={20} />
                    </div>
                    <span>Loading more hackathons...</span>
                  </div>
                </div>
              )}

              {/* No Results */}
              {!isLoading && !error && hackathons?.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="SearchX" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No hackathons found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {featuredHackathons?.length > 0 
                      ? "There are no regular hackathons available at the moment, but check out our featured events above!"
                      : "No hackathons are currently available. Please check back later."
                    }
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleRetry}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Refresh
                  </Button>
                </div>
              )}

              {/* End of Results */}
              {!hasMore && hackathons?.length > 0 && (
                <div className="text-center py-8 border-t border-border">
                  <p className="text-muted-foreground">
                    You've reached the end of the results
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Bottom Tab Navigation */}
      <TabNavigation notifications={mockNotifications} />
    </div>
  );
};

export default HackathonBrowse;