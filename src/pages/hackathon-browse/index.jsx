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

  // Mock featured hackathons data
  const mockFeaturedHackathons = [
    {
      id: 1,
      title: "Global Climate Tech Challenge 2025",
      organizer: "TechForGood Foundation",
      description: "Build innovative solutions to combat climate change and create a sustainable future for our planet.",
      image: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=800&h=400&fit=crop",
      startDate: "2025-01-15",
      endDate: "2025-01-17",
      prizePool: "$50,000",
      teamSize: { min: 2, max: 5 },
      status: "Open",
      featured: true
    },
    {
      id: 2,
      title: "AI Healthcare Innovation Hackathon",
      organizer: "MedTech Innovations",
      description: "Revolutionize healthcare with AI-powered solutions that improve patient outcomes and accessibility.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
      startDate: "2025-01-22",
      endDate: "2025-01-24",
      prizePool: "$75,000",
      teamSize: { min: 3, max: 6 },
      status: "Open",
      featured: true
    }
  ];

  // Mock hackathons data
  const mockHackathons = [
    {
      id: 3,
      title: "FinTech Revolution 2025",
      organizer: "Digital Banking Corp",
      description: "Create the next generation of financial technology solutions that democratize access to financial services.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
      startDate: "2025-01-20",
      endDate: "2025-01-22",
      duration: "48 hours",
      theme: "Financial Technology",
      prizePool: "$25,000",
      teamSize: { min: 2, max: 4 },
      location: "Virtual",
      status: "Open",
      registrations: 156,
      maxParticipants: 200,
      requiredSkills: ["JavaScript", "React", "Node.js", "Blockchain", "UI/UX"],
      compatibilityScore: 85,
      isBookmarked: false
    },
    {
      id: 4,
      title: "EdTech Innovation Challenge",
      organizer: "Learning Future Institute",
      description: "Transform education through technology and create engaging learning experiences for students worldwide.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
      startDate: "2025-01-25",
      endDate: "2025-01-27",
      duration: "48 hours",
      theme: "Education Technology",
      prizePool: "$30,000",
      teamSize: { min: 3, max: 5 },
      location: "Hybrid",
      status: "Open",
      registrations: 89,
      maxParticipants: 150,
      requiredSkills: ["Python", "AI/ML", "React", "Mobile Dev", "Data Science"],
      compatibilityScore: 72,
      isBookmarked: true
    },
    {
      id: 5,
      title: "Smart City Solutions Hackathon",
      organizer: "Urban Tech Alliance",
      description: "Design intelligent solutions for modern cities that improve quality of life and sustainability.",
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=400&h=300&fit=crop",
      startDate: "2025-02-01",
      endDate: "2025-02-03",
      duration: "48 hours",
      theme: "Smart Cities",
      prizePool: "$40,000",
      teamSize: { min: 2, max: 6 },
      location: "In-Person",
      status: "Open",
      registrations: 234,
      maxParticipants: 300,
      requiredSkills: ["IoT", "Python", "React", "DevOps", "Data Analytics"],
      compatibilityScore: 68,
      isBookmarked: false
    },
    {
      id: 6,
      title: "Gaming Innovation Weekend",
      organizer: "GameDev Studios",
      description: "Create the next breakthrough in gaming technology and interactive entertainment experiences.",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
      startDate: "2025-02-08",
      endDate: "2025-02-09",
      duration: "24 hours",
      theme: "Gaming & Entertainment",
      prizePool: "$15,000",
      teamSize: { min: 2, max: 4 },
      location: "Virtual",
      status: "Closing Soon",
      registrations: 178,
      maxParticipants: 180,
      requiredSkills: ["Unity", "C#", "JavaScript", "3D Modeling", "Game Design"],
      compatibilityScore: 45,
      isBookmarked: false
    },
    {
      id: 7,
      title: "Blockchain for Social Good",
      organizer: "Crypto Impact Foundation",
      description: "Leverage blockchain technology to solve real-world social problems and create positive impact.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
      startDate: "2025-02-12",
      endDate: "2025-02-14",
      duration: "48 hours",
      theme: "Social Impact",
      prizePool: "$35,000",
      teamSize: { min: 3, max: 5 },
      location: "Virtual",
      status: "Open",
      registrations: 67,
      maxParticipants: 120,
      requiredSkills: ["Solidity", "Web3", "React", "Node.js", "Smart Contracts"],
      compatibilityScore: 91,
      isBookmarked: true
    },
    {
      id: 8,
      title: "Mobile App Innovation Challenge",
      organizer: "AppDev Collective",
      description: "Build innovative mobile applications that solve everyday problems and enhance user experiences.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      startDate: "2025-02-18",
      endDate: "2025-02-20",
      duration: "48 hours",
      theme: "Mobile Technology",
      prizePool: "$20,000",
      teamSize: { min: 2, max: 4 },
      location: "Hybrid",
      status: "Open",
      registrations: 145,
      maxParticipants: 200,
      requiredSkills: ["React Native", "Flutter", "Swift", "Kotlin", "UI/UX"],
      compatibilityScore: 78,
      isBookmarked: false
    }
  ];

  // Mock search suggestions
  const mockSearchSuggestions = [
    { text: "AI Healthcare", type: "theme", description: "Healthcare technology hackathons", count: 12 },
    { text: "React", type: "skill", description: "JavaScript library", count: 45 },
    { text: "TechForGood Foundation", type: "organizer", description: "Non-profit tech organization", count: 8 },
    { text: "Climate Tech Challenge", type: "hackathon", description: "Environmental technology", count: 3 },
    { text: "Blockchain", type: "skill", description: "Distributed ledger technology", count: 23 }
  ];

  // Initialize data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setFeaturedHackathons(mockFeaturedHackathons);
      setHackathons(mockHackathons);
      setIsLoading(false);
    }, 1000);
  }, []);

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

          {/* Featured Hackathons */}
          {!isLoading && featuredHackathons?.length > 0 && (
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
              {!isLoading && hackathons?.length > 0 && (
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
              {!isLoading && hasMore && hackathons?.length > 0 && (
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
              {!isLoading && hackathons?.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="SearchX" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No hackathons found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search criteria or filters to find more results.
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleClearAllFilters}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Clear All Filters
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