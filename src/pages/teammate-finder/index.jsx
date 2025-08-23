import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import SearchHeader from './components/SearchHeader';
import FilterPanel from './components/FilterPanel';
import TeammateCard from './components/TeammateCard';
import ProfilePreview from './components/ProfilePreview';
import InvitationModal from './components/InvitationModal';
import Icon from '../../components/AppIcon';

const TeammateFinder = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('compatibility');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTeammate, setSelectedTeammate] = useState(null);
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [filters, setFilters] = useState({
    skills: [],
    experienceLevel: '',
    timeZone: '',
    availability: '',
    minCompatibility: 0,
    hasHackathonExperience: false,
    isAvailableNow: false
  });

  // Mock user data
  const currentUser = {
    id: 'user-1',
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    isOnline: true,
    githubConnected: true
  };

  // Mock notifications
  const notifications = {
    dashboard: 3,
    browse: 0,
    find: 5,
    teams: 2
  };

  // Mock teammates data
  const mockTeammates = [
    {
      id: 'tm-1',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      location: 'San Francisco, CA',
      timeZone: 'PST',
      bio: `Full-stack developer with 4 years of experience building scalable web applications. Passionate about clean code, user experience, and collaborative problem-solving. Love working on innovative projects that make a real impact.`,
      skills: ['React', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker'],
      experienceLevel: 'Intermediate',
      hackathonCount: 12,
      responseRate: 95,
      compatibilityScore: 92,
      status: 'online',
      isAvailable: true,
      isFavorited: false,
      githubConnected: true,
      recentActivity: [
        'Won 1st place at AI Innovation Hackathon',
        'Completed React certification course'
      ]
    },
    {
      id: 'tm-2',
      name: 'Marcus Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      location: 'Austin, TX',
      timeZone: 'CST',
      bio: `Data scientist and ML engineer with expertise in computer vision and NLP. Currently pursuing PhD in AI. Always excited to work on cutting-edge projects that push the boundaries of what's possible with machine learning.`,
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Computer Vision', 'NLP', 'Data Analysis'],
      experienceLevel: 'Advanced',hackathonCount: 8,responseRate: 88,compatibilityScore: 87,status: 'away',
      isAvailable: true,
      isFavorited: true,
      githubConnected: true,
      recentActivity: [
        'Published research paper on neural networks','Mentored junior developers at Code for Good'
      ]
    },
    {
      id: 'tm-3',name: 'Emily Watson',avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',location: 'London, UK',timeZone: 'GMT',
      bio: `UI/UX designer with a strong background in frontend development. I believe great design should be both beautiful and functional. Experienced in design systems, user research, and rapid prototyping for hackathon environments.`,
      skills: ['UI/UX Design', 'Figma', 'React', 'TypeScript', 'Design Systems', 'Prototyping'],
      experienceLevel: 'Intermediate',hackathonCount: 15,responseRate: 92,compatibilityScore: 84,status: 'online',
      isAvailable: true,
      isFavorited: false,
      githubConnected: true,
      recentActivity: [
        'Led design for winning fintech app','Spoke at UX Design Conference'
      ]
    },
    {
      id: 'tm-4',name: 'David Kim',avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',location: 'Seoul, South Korea',timeZone: 'KST',
      bio: `Blockchain developer and smart contract specialist. Passionate about decentralized technologies and their potential to revolutionize industries. Strong background in cryptography and distributed systems.`,
      skills: ['Solidity', 'Web3', 'Ethereum', 'JavaScript', 'Cryptography', 'DeFi'],
      experienceLevel: 'Advanced',hackathonCount: 6,responseRate: 78,compatibilityScore: 76,status: 'busy',
      isAvailable: false,
      isFavorited: false,
      githubConnected: true,
      recentActivity: [
        'Deployed smart contract on mainnet','Contributed to open source DeFi protocol'
      ]
    },
    {
      id: 'tm-5',name: 'Jessica Park',avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',location: 'Toronto, Canada',timeZone: 'EST',
      bio: `Mobile app developer specializing in cross-platform solutions. Love creating intuitive user experiences on mobile devices. Experienced with both native and hybrid app development approaches.`,
      skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase', 'Mobile UI'],
      experienceLevel: 'Intermediate',hackathonCount: 10,responseRate: 85,compatibilityScore: 81,status: 'online',
      isAvailable: true,
      isFavorited: false,
      githubConnected: false,
      recentActivity: [
        'Published app with 10k+ downloads','Completed mobile security course'
      ]
    },
    {
      id: 'tm-6',name: 'Ahmed Hassan',avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',location: 'Dubai, UAE',timeZone: 'GST',
      bio: `DevOps engineer with expertise in cloud infrastructure and automation. Passionate about building scalable, reliable systems that enable teams to ship code faster and more confidently.`,
      skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Monitoring'],
      experienceLevel: 'Advanced',hackathonCount: 4,responseRate: 90,compatibilityScore: 73,status: 'online',
      isAvailable: true,
      isFavorited: false,
      githubConnected: true,
      recentActivity: [
        'Optimized deployment pipeline','Earned AWS Solutions Architect certification'
      ]
    }
  ];

  const [teammates, setTeammates] = useState(mockTeammates);
  const [filteredTeammates, setFilteredTeammates] = useState(mockTeammates);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...teammates];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(teammate =>
        teammate?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        teammate?.skills?.some(skill => 
          skill?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        ) ||
        teammate?.bio?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply filters
    if (filters?.skills?.length > 0) {
      filtered = filtered?.filter(teammate =>
        filters?.skills?.some(skill =>
          teammate?.skills?.some(teammateSkill =>
            teammateSkill?.toLowerCase()?.includes(skill?.toLowerCase())
          )
        )
      );
    }

    if (filters?.experienceLevel) {
      filtered = filtered?.filter(teammate =>
        teammate?.experienceLevel?.toLowerCase() === filters?.experienceLevel?.toLowerCase()
      );
    }

    if (filters?.timeZone) {
      filtered = filtered?.filter(teammate =>
        teammate?.timeZone?.toLowerCase()?.includes(filters?.timeZone?.toLowerCase())
      );
    }

    if (filters?.minCompatibility > 0) {
      filtered = filtered?.filter(teammate =>
        teammate?.compatibilityScore >= filters?.minCompatibility
      );
    }

    if (filters?.hasHackathonExperience) {
      filtered = filtered?.filter(teammate => teammate?.hackathonCount > 0);
    }

    if (filters?.isAvailableNow) {
      filtered = filtered?.filter(teammate => teammate?.isAvailable);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'compatibility':
          return b?.compatibilityScore - a?.compatibilityScore;
        case 'experience':
          const expOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
          return expOrder?.[b?.experienceLevel] - expOrder?.[a?.experienceLevel];
        case 'response-rate':
          return b?.responseRate - a?.responseRate;
        case 'hackathons':
          return b?.hackathonCount - a?.hackathonCount;
        case 'recent':
        default:
          return 0; // Would sort by last activity timestamp in real app
      }
    });

    setFilteredTeammates(filtered);
  }, [teammates, searchQuery, filters, sortBy]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (sortOption) => {
    setSortBy(sortOption);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleInvite = (teammateId, invitationData) => {
    console.log('Sending invitation to:', teammateId, invitationData);
    // In real app, would send API request
  };

  const handleFavorite = (teammateId, isFavorited) => {
    setTeammates(prev =>
      prev?.map(teammate =>
        teammate?.id === teammateId
          ? { ...teammate, isFavorited }
          : teammate
      )
    );
  };

  const handleViewProfile = (teammateId) => {
    console.log('Viewing profile:', teammateId);
    // In real app, would navigate to full profile page
  };

  const handleTeammateSelect = (teammate) => {
    setSelectedTeammate(teammate);
  };

  const handleInviteFromPreview = (teammate) => {
    setSelectedTeammate(teammate);
    setShowInvitationModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header user={currentUser} notifications={notifications} />
      {/* Search Header */}
      <SearchHeader
        onSearch={handleSearch}
        onSort={handleSort}
        onFilterToggle={() => setIsFilterOpen(true)}
        searchQuery={searchQuery}
        sortBy={sortBy}
        resultsCount={filteredTeammates?.length}
      />
      {/* Main Content */}
      <div className="flex pt-12 pb-20 md:pb-6">
        {/* Desktop Filter Sidebar */}
        <div className="hidden md:block w-80 px-6">
          <FilterPanel
            isOpen={true}
            onClose={() => {}}
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </div>

        {/* Teammates Grid */}
        <div className="flex-1 px-4 md:px-6 md:ml-8">
          <div className="flex gap-8">
            {/* Results Grid */}
            <div className="flex-1 max-w-4xl">
              {filteredTeammates?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  {filteredTeammates?.map((teammate) => (
                    <div
                      key={teammate?.id}
                      onClick={() => handleTeammateSelect(teammate)}
                      className="cursor-pointer"
                    >
                      <TeammateCard
                        teammate={teammate}
                        onInvite={handleInvite}
                        onFavorite={handleFavorite}
                        onViewProfile={handleViewProfile}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Icon name="Users" size={64} className="text-muted-foreground mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No teammates found</h3>
                  <p className="text-muted-foreground mb-4 max-w-md">
                    Try adjusting your search criteria or filters to find more potential teammates.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setFilters({
                        skills: [],
                        experienceLevel: '',
                        timeZone: '',
                        availability: '',
                        minCompatibility: 0,
                        hasHackathonExperience: false,
                        isAvailableNow: false
                      });
                    }}
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>

            {/* Desktop Profile Preview */}
            <div className="hidden xl:block w-96">
              <ProfilePreview
                teammate={selectedTeammate}
                onClose={() => setSelectedTeammate(null)}
                onInvite={handleInviteFromPreview}
                onViewFull={handleViewProfile}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Filter Panel - Only show when needed */}
      {isFilterOpen && (
        <FilterPanel
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />
      )}
      {/* Invitation Modal */}
      {showInvitationModal && selectedTeammate && (
        <InvitationModal
          isOpen={showInvitationModal}
          onClose={() => setShowInvitationModal(false)}
          teammate={selectedTeammate}
          onSend={(invitationData) => {
            handleInvite(selectedTeammate?.id, invitationData);
            setShowInvitationModal(false);
          }}
        />
      )}
      {/* Mobile Tab Navigation */}
      <TabNavigation notifications={notifications} />
    </div>
  );
};

export default TeammateFinder;