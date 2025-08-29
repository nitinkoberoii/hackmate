import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import { AuthContext } from '../../context/AuthContext.jsx';
import TabNavigation from '../../components/ui/TabNavigation';
import Icon from '../../components/AppIcon';
import TeamHeader from './components/TeamHeader';
import TabNavigationLocal from './components/TabNavigation';
import TeamOverview from './components/TeamOverview';
import MemberManagement from './components/MemberManagement';
import TeamCommunication from './components/TeamCommunication';
import ProjectDetails from './components/ProjectDetails';

const TeamDetail = () => {
  const { teamId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const { user: currentUser } = useContext(AuthContext);

  // Mock team data
  const team = {
    id: 1,
    name: 'Code Crusaders',
    status: 'active',
    progress: 75,
    maxMembers: 6,
    commits: 47,
    members: [
      {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        role: 'leader',
        skills: ['React', 'Node.js', 'MongoDB', 'Leadership'],
        isOnline: true,
        commits: 15,
        joinedAt: '2025-01-05'
      },
      {
        id: 2,
        name: 'Sarah Chen',
        email: 'sarah.chen@example.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        role: 'developer',
        skills: ['Python', 'Django', 'PostgreSQL', 'API Design'],
        isOnline: true,
        commits: 12,
        joinedAt: '2025-01-05'
      },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        role: 'developer',
        skills: ['JavaScript', 'Vue.js', 'Express.js', 'Testing'],
        isOnline: false,
        commits: 8,
        joinedAt: '2025-01-05'
      },
      {
        id: 4,
        name: 'Alex Rivera',
        email: 'alex.rivera@example.com',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
        role: 'designer',
        skills: ['UI/UX Design', 'Figma', 'Prototyping', 'User Research'],
        isOnline: true,
        commits: 5,
        joinedAt: '2025-01-06'
      },
      {
        id: 5,
        name: 'David Kim',
        email: 'david.kim@example.com',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        role: 'developer',
        skills: ['Java', 'Spring Boot', 'Docker', 'AWS'],
        isOnline: false,
        commits: 7,
        joinedAt: '2025-01-06'
      }
    ],
    pendingInvitations: [
      {
        id: 1,
        email: 'emma.wilson@example.com',
        role: 'developer',
        sentAt: '2025-01-07',
        sentBy: 'John Smith'
      }
    ]
  };

  // Mock hackathon data
  const hackathon = {
    id: 1,
    name: 'EcoTech Innovation Challenge 2025',
    description: 'Build sustainable technology solutions for environmental challenges',
    startDate: '2025-01-05',
    endDate: '2025-01-15',
    mode: 'Remote',
    status: 'active',
    organizer: 'GreenTech Foundation',
    prize: '$10,000',
    participants: 150,
    teams: 25
  };

  // Mock notifications
  const notifications = {
    dashboard: 2,
    browse: 0,
    find: 1,
    teams: 3,
    overview: 0,
    members: 1,
    communication: 5,
    project: 2
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleUpdateMember = (memberId, updates) => {
    // Handle member updates
    console.log('Update member:', memberId, updates);
  };

  const handleRemoveMember = (memberId) => {
    // Handle member removal
    console.log('Remove member:', memberId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <TeamOverview team={team} hackathon={hackathon} />;
      case 'members':
        return (
          <MemberManagement
            team={team}
            currentUser={currentUser}
            onUpdateMember={handleUpdateMember}
            onRemoveMember={handleRemoveMember}
          />
        );
      case 'communication':
        return <TeamCommunication team={team} currentUser={currentUser} />;
      case 'project':
        return <ProjectDetails team={team} hackathon={hackathon} currentUser={currentUser} />;
      default:
        return <TeamOverview team={team} hackathon={hackathon} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header user={currentUser} notifications={notifications} />
      
      {/* Main Content */}
      <div className="pt-16 md:pt-18">
        {/* Back to Teams Link */}
        <div className="max-w-7xl mx-auto px-3 md:px-6 py-3 md:py-4">
          <Link 
            to="/team-management" 
            className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors text-sm md:text-base"
          >
            <Icon name="ArrowLeft" size={16} className="md:w-4 md:h-4" />
            <span>Back to Teams</span>
          </Link>
        </div>

        {/* Team Header */}
        <div className="max-w-7xl mx-auto px-3 md:px-6">
          <TeamHeader team={team} hackathon={hackathon} />
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-3 md:px-6">
          <div className="flex flex-col lg:flex-row">
            {/* Tab Navigation */}
            <TabNavigationLocal
              activeTab={activeTab}
              onTabChange={handleTabChange}
              notifications={notifications}
            />

            {/* Main Content */}
            <div className="flex-1 min-h-screen">
              <div className="p-3 md:p-6 pb-20 md:pb-6">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <TabNavigation notifications={notifications} />
    </div>
  );
};

export default TeamDetail;
