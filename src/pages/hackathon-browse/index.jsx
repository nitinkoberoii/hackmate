import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
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
import CreateEventModal from './components/CreateEventModal';

const HACKATHONS_PER_PAGE = 6;

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
  
  // --- MODIFIED: Renamed to `allHackathons` to represent the master list ---
  const [allHackathons, setAllHackathons] = useState([]); 
  const [featuredHackathons, setFeaturedHackathons] = useState([]);
  const [displayedHackathons, setDisplayedHackathons] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useContext(AuthContext);

  // Mock notifications
  const mockNotifications = {
    dashboard: 3,
    browse: 0,
    find: 5,
    teams: 2
  };

  const fetchHackathons = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_ENDPOINT);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      const featured = data.filter(h => h.featured === true);
      const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setFeaturedHackathons(featured);
      setAllHackathons(sortedData);
    } catch (error) {
      console.error('Error fetching hackathons:', error);
      setError('Failed to load hackathons. Please try again later.');
      setFeaturedHackathons([]);
      setAllHackathons([]);
    } finally {
      setIsLoading(false);
    }
  }, [API_ENDPOINT]);

  useEffect(() => {
    fetchHackathons();
  }, [fetchHackathons]);

  // --- MODIFIED: `handleSearch` now generates real-time suggestions and sets the search query ---
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setPage(1); // Reset pagination on every new search query

    if (!query) {
      setSearchSuggestions([]);
      return;
    }

    const lowercasedQuery = query.toLowerCase();
    const suggestionsSet = new Map();

    allHackathons.forEach(h => {
      // Match Title
      if (h.title?.toLowerCase().includes(lowercasedQuery) && !suggestionsSet.has(h.title)) {
        suggestionsSet.set(h.title, { text: h.title, type: 'hackathon', description: `by ${h.organizer}` });
      }
      // Match Theme
      if (h.theme?.toLowerCase().includes(lowercasedQuery) && !suggestionsSet.has(h.theme)) {
        suggestionsSet.set(h.theme, { text: h.theme, type: 'theme', description: 'Theme' });
      }
      // Match Organizer
      if (h.organizer?.toLowerCase().includes(lowercasedQuery) && !suggestionsSet.has(h.organizer)) {
        suggestionsSet.set(h.organizer, { text: h.organizer, type: 'organizer', description: 'Organizer' });
      }
      // Match Skills
      h.requiredSkills?.forEach(skill => {
        if (skill.toLowerCase().includes(lowercasedQuery) && !suggestionsSet.has(skill)) {
          suggestionsSet.set(skill, { text: skill, type: 'skill', description: 'Skill' });
        }
      });
    });

    setSearchSuggestions(Array.from(suggestionsSet.values()).slice(0, 7));
  }, [allHackathons]);

  // --- NEW: `useMemo` hook to efficiently filter hackathons based on the search query ---
  const filteredHackathons = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    if (!lowercasedQuery) {
      return allHackathons;
    }
    return allHackathons.filter(hackathon => {
      return (
        hackathon.title?.toLowerCase().includes(lowercasedQuery) ||
        hackathon.organizer?.toLowerCase().includes(lowercasedQuery) ||
        hackathon.theme?.toLowerCase().includes(lowercasedQuery) ||
        hackathon.description?.toLowerCase().includes(lowercasedQuery) ||
        hackathon.requiredSkills?.some(skill => skill.toLowerCase().includes(lowercasedQuery))
      );
    });
  }, [searchQuery, allHackathons]);

  // --- NEW: This effect now only handles pagination based on the already filtered list ---
  useEffect(() => {
    setDisplayedHackathons(filteredHackathons.slice(0, page * HACKATHONS_PER_PAGE));
    setHasMore(filteredHackathons.length > page * HACKATHONS_PER_PAGE);
  }, [filteredHackathons, page]);

  const handleFilterChange = (keyOrFilters, value) => {
    if (typeof keyOrFilters === 'object' && keyOrFilters !== null) {
      setActiveFilters(keyOrFilters);
    } else {
      setActiveFilters(prev => ({ ...prev, [keyOrFilters]: value }));
    }
  };

  const handleClearAllFilters = () => {
    setActiveFilters({});
  };

  const handleSortChange = (sortValue) => {
    setCurrentSort(sortValue);
  };

  const handleBookmark = (hackathonId, isBookmarked) => {
    const updater = (hackathonsList) =>
      hackathonsList?.map(h => h?._id === hackathonId ? { ...h, isBookmarked } : h);
    setAllHackathons(updater);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleViewModeToggle = () => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  };

  const handleRetry = () => {
    fetchHackathons();
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <Header user={user} notifications={mockNotifications} />
        <main className="pt-16 md:pt-18 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">Discover Hackathons</h1>
                  <p className="text-muted-foreground mt-1">Find the perfect hackathon that matches your skills and interests</p>
                </div>
                <div className="hidden md:flex items-center space-x-3">
                  <Button variant="outline" iconName="BookmarkPlus" iconPosition="left">Saved Events</Button>
                  <Button variant="default" iconName="Plus" iconPosition="left" onClick={() => setIsModalOpen(true)}>Create Event</Button>
                </div>
              </div>
              
              <SearchBar
                onSearch={handleSearch}
                suggestions={searchSuggestions}
                isLoading={isSearchLoading}
              />
            </div>

            {error && (
              <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name="AlertCircle" size={20} className="text-destructive" />
                    <span className="text-destructive font-medium">{error}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleRetry} iconName="RotateCcw" iconPosition="left">Retry</Button>
                </div>
              </div>
            )}

            {!isLoading && !error && featuredHackathons?.length > 0 && (
              <FeaturedCarousel featuredHackathons={featuredHackathons} />
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex-1">
                <FilterChips activeFilters={activeFilters} onFilterChange={handleFilterChange} onClearAll={handleClearAllFilters} />
              </div>
            </div>

            <div className="flex gap-8">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      {searchQuery ? `Results for "${searchQuery}"` : 'All Hackathons'}
                    </h2>
                    <p className="text-sm text-muted-foreground">{filteredHackathons.length} hackathons found</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <SortDropdown currentSort={currentSort} onSortChange={handleSortChange} />
                    <button onClick={handleViewModeToggle} className="flex items-center space-x-2 hover:text-foreground transition-colors cursor-pointer px-3 py-2 rounded-lg hover:bg-muted/50 active:bg-muted" title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}>
                      <Icon name={viewMode === 'grid' ? "List" : "Grid3X3"} size={16} />
                      <span>{viewMode === 'grid' ? 'List View' : 'Grid View'}</span>
                    </button>
                  </div>
                </div>

                {isLoading && <LoadingGrid count={6} />}

                {!isLoading && !error && displayedHackathons.length > 0 && (
                  <div className="transition-all duration-300 ease-in-out">
                    {viewMode === 'grid' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {displayedHackathons.map((hackathon) => (
                          <HackathonCard key={hackathon._id} hackathon={hackathon} onBookmark={handleBookmark} viewMode="grid" />
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4 mb-8">
                        {displayedHackathons.map((hackathon) => (
                          <HackathonCard key={hackathon._id} hackathon={hackathon} onBookmark={handleBookmark} viewMode="list" />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {!isLoading && !error && hasMore && (
                  <div className="text-center">
                    <Button variant="outline" size="lg" onClick={handleLoadMore} iconName="ChevronDown" iconPosition="right">
                      Load More Hackathons
                    </Button>
                  </div>
                )}

                {!isLoading && !error && filteredHackathons.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="SearchX" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No hackathons found</h3>
                    <p className="text-muted-foreground mb-6">
                      {searchQuery ? "Try adjusting your search query." : "No hackathons are currently available."}
                    </p>
                    <Button variant="outline" onClick={handleRetry} iconName="RotateCcw" iconPosition="left">Refresh</Button>
                  </div>
                )}

                {!hasMore && filteredHackathons.length > 0 && (
                  <div className="text-center py-8 border-t border-border mt-8">
                    <p className="text-muted-foreground">You've reached the end of the results</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <TabNavigation notifications={mockNotifications} />
      </div>

      <CreateEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onHackathonCreated={fetchHackathons} apiEndpoint={API_ENDPOINT} />
    </>
  );
};

export default HackathonBrowse;
