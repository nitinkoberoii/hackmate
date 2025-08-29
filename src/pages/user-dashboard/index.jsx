import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import { AuthContext } from '../../context/AuthContext.jsx';
import TabNavigation from '../../components/ui/TabNavigation';
import Icon from '../../components/AppIcon';
import ActiveHackathonCard from './components/ActiveHackathonCard';
import InvitationCard from './components/InvitationCard';
import QuickActionCard from './components/QuickActionCard';
import UpcomingDeadlineCard from './components/UpcomingDeadlineCard';
import AchievementSection from './components/AchievementSection';
import NotificationCenter from './components/NotificationCenter';
import RecommendationCard from './components/RecommendationCard';

const UserDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const { user } = useContext(AuthContext);

  // Mock active hackathons
  const activeHackathons = [
    {
      id: 1,
      title: "AI Innovation Challenge 2024",
      organizer: "TechCorp",
      logo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop",
      endDate: "2024-08-15T23:59:59",
      participants: 1250,
      prize: "50,000",
      teamStatus: "team_formed"
    },
    {
      id: 2,
      title: "Sustainable Tech Hackathon",
      organizer: "GreenTech Foundation",
      logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
      endDate: "2024-08-20T18:00:00",
      participants: 890,
      prize: "25,000",
      teamStatus: "looking_for_team"
    },
    {
      id: 3,
      title: "FinTech Revolution",
      organizer: "Banking Innovations",
      logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop",
      endDate: "2024-08-25T20:00:00",
      participants: 2100,
      prize: "75,000",
      teamStatus: "pending_invites"
    }
  ];

  // Mock invitations
  const [invitations, setInvitations] = useState([
    {
      id: 1,
      sender: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        skills: ["Python", "Data Science", "TensorFlow", "React"]
      },
      hackathon: "AI Innovation Challenge 2024",
      compatibility: 87,
      teamSize: 2,
      createdAt: "2024-08-07T14:30:00"
    },
    {
      id: 2,
      sender: {
        name: "Michael Rodriguez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        skills: ["JavaScript", "Node.js", "MongoDB", "AWS"]
      },
      hackathon: "FinTech Revolution",
      compatibility: 72,
      teamSize: 3,
      createdAt: "2024-08-07T10:15:00"
    }
  ]);

  // Mock upcoming deadlines
  const upcomingDeadlines = [
    {
      id: 1,
      title: "Project Submission",
      description: "Submit your final project for AI Innovation Challenge",
      date: "2024-08-15T23:59:59",
      hackathon: "AI Innovation Challenge 2024",
      priority: "high"
    },
    {
      id: 2,
      title: "Team Formation Deadline",
      description: "Complete team formation for Sustainable Tech Hackathon",
      date: "2024-08-12T18:00:00",
      hackathon: "Sustainable Tech Hackathon",
      priority: "medium"
    },
    {
      id: 3,
      title: "Pitch Presentation",
      description: "Prepare and submit your pitch deck",
      date: "2024-08-14T15:00:00",
      hackathon: "AI Innovation Challenge 2024",
      priority: "medium"
    }
  ];

  // Mock notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "invitation",
      title: "New Team Invitation",
      message: "Sarah Chen invited you to join their team for AI Innovation Challenge 2024",
      createdAt: "2024-08-07T14:30:00",
      read: false,
      actionUrl: "/team-management"
    },
    {
      id: 2,
      type: "team_update",
      title: "Team Member Joined",
      message: "David Kim has joined your team for AI Innovation Challenge 2024",
      createdAt: "2024-08-07T12:45:00",
      read: false,
      actionUrl: "/team-management"
    },
    {
      id: 3,
      type: "hackathon",
      title: "Registration Reminder",
      message: "Don\'t forget to register for Blockchain Summit Hackathon - 2 days left!",
      createdAt: "2024-08-07T09:20:00",
      read: true,
      actionUrl: "/hackathon-browse"
    },
    {
      id: 4,
      type: "achievement",
      title: "Achievement Unlocked!",
      message: "You\'ve earned the \'Team Player\' badge for forming 5 successful teams",
      createdAt: "2024-08-06T16:30:00",
      read: true,
      actionUrl: "/user-dashboard"
    }
  ]);

  // Mock recommendations
  const recommendations = [
    {
      id: 1,
      title: "Blockchain Summit Hackathon",
      organizer: "CryptoTech Alliance",
      logo: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop",
      matchScore: 92,
      prize: "100,000",
      registrationEnd: "2024-08-12T23:59:59",
      matchingSkills: ["JavaScript", "Node.js", "React", "Blockchain", "Solidity"],
      reason: "JavaScript and blockchain interests"
    },
    {
      id: 2,
      title: "Healthcare Innovation Challenge",
      organizer: "MedTech Solutions",
      logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop",
      matchScore: 78,
      prize: "40,000",
      registrationEnd: "2024-08-18T18:00:00",
      matchingSkills: ["Python", "Machine Learning", "Data Science"],
      reason: "ML and healthcare project history"
    }
  ];

  const quickActions = [
    {
      title: "Browse Hackathons",
      description: "Discover new hackathons matching your skills",
      icon: "Search",
      path: "/hackathon-browse",
      color: "primary"
    },
    {
      title: "Find Teammates",
      description: "Connect with developers for your next project",
      icon: "Users",
      path: "/teammate-finder",
      color: "success"
    },
    {
      title: "Update Profile",
      description: "Keep your skills and preferences current",
      icon: "User",
      path: "/user-registration",
      color: "accent"
    },
    {
      title: "Skill Assessment",
      description: "Take a quiz to improve your skill matching",
      icon: "Target",
      path: "/skill-assessment-quiz",
      color: "warning"
    }
  ];

  const handleAcceptInvitation = (invitationId) => {
    setInvitations(prev => prev.filter(inv => inv.id !== invitationId));
    // Add success notification
    const newNotification = {
      id: Date.now(),
      type: "team_update",
      title: "Invitation Accepted",
      message: "You\'ve successfully joined the team!",
      createdAt: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleDeclineInvitation = (invitationId) => {
    setInvitations(prev => prev.filter(inv => inv.id !== invitationId));
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const notificationCounts = {
    dashboard: notifications.filter(n => !n.read).length,
    browse: 0,
    find: invitations.length,
    teams: 2
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} notifications={notificationCounts} />
      
      <main className="pt-16 md:pt-18 pb-16 md:pb-6">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Welcome back, {user.name.split(' ')[0]}! 👋
              </h1>
              <div className="text-base text-muted-foreground">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
            <p className="text-lg text-muted-foreground">
              Here's what's happening with your hackathon journey today.
            </p>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Main Content - 8 columns */}
            <div className="lg:col-span-8 space-y-8">
              {/* Quick Actions */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center space-x-3">
                  <Icon name="Zap" size={24} />
                  <span>Quick Actions</span>
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  {quickActions.map((action, index) => (
                    <QuickActionCard key={index} {...action} />
                  ))}
                </div>
              </section>

              {/* Active Hackathons */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-foreground flex items-center space-x-3">
                    <Icon name="Calendar" size={24} />
                    <span>Active Hackathons</span>
                    <span className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full">
                      {activeHackathons.length}
                    </span>
                  </h2>
                  <Link to="/hackathon-browse" className="text-base text-primary hover:underline font-medium">
                    View All
                  </Link>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {activeHackathons.map((hackathon) => (
                    <ActiveHackathonCard key={hackathon.id} hackathon={hackathon} />
                  ))}
                </div>
              </section>

              {/* Recommendations */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center space-x-3">
                  <Icon name="Lightbulb" size={24} />
                  <span>Recommended for You</span>
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {recommendations.map((recommendation) => (
                    <RecommendationCard key={recommendation.id} recommendation={recommendation} />
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar - 4 columns */}
            <div className="lg:col-span-4 space-y-8">
              {/* Recent Invitations */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center space-x-3">
                  <Icon name="UserPlus" size={20} />
                  <span>Recent Invitations</span>
                  {invitations.length > 0 && (
                    <span className="bg-accent text-accent-foreground text-sm px-3 py-1 rounded-full">
                      {invitations.length}
                    </span>
                  )}
                </h2>
                <div className="space-y-4">
                  {invitations.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Icon name="UserPlus" size={32} className="mx-auto mb-3 opacity-50" />
                      <p className="text-base">No pending invitations</p>
                    </div>
                  ) : (
                    invitations.map((invitation) => (
                      <InvitationCard
                        key={invitation.id}
                        invitation={invitation}
                        onAccept={handleAcceptInvitation}
                        onDecline={handleDeclineInvitation}
                      />
                    ))
                  )}
                </div>
              </section>

              {/* Upcoming Deadlines */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center space-x-3">
                  <Icon name="Clock" size={20} />
                  <span>Upcoming Deadlines</span>
                </h2>
                <div className="space-y-4">
                  {upcomingDeadlines.slice(0, 4).map((deadline) => (
                    <UpcomingDeadlineCard key={deadline.id} deadline={deadline} />
                  ))}
                </div>
              </section>

              {/* Achievements */}
              <AchievementSection user={user} />
            </div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden space-y-8">
            {/* Quick Actions */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center space-x-3">
                <Icon name="Zap" size={24} />
                <span>Quick Actions</span>
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {quickActions.map((action, index) => (
                  <QuickActionCard key={index} {...action} />
                ))}
              </div>
            </section>

            {/* Active Hackathons */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-foreground flex items-center space-x-3">
                  <Icon name="Calendar" size={24} />
                  <span>Active Hackathons</span>
                  <span className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full">
                    {activeHackathons.length}
                  </span>
                </h2>
                <Link to="/hackathon-browse" className="text-base text-primary hover:underline font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-6">
                {activeHackathons.map((hackathon) => (
                  <ActiveHackathonCard key={hackathon.id} hackathon={hackathon} />
                ))}
              </div>
            </section>

            {/* Recent Invitations */}
            {invitations.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center space-x-3">
                  <Icon name="UserPlus" size={24} />
                  <span>Recent Invitations</span>
                  <span className="bg-accent text-accent-foreground text-sm px-3 py-1 rounded-full">
                    {invitations.length}
                  </span>
                </h2>
                <div className="space-y-4">
                  {invitations.map((invitation) => (
                    <InvitationCard
                      key={invitation.id}
                      invitation={invitation}
                      onAccept={handleAcceptInvitation}
                      onDecline={handleDeclineInvitation}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Upcoming Deadlines */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center space-x-3">
                <Icon name="Clock" size={24} />
                <span>Upcoming Deadlines</span>
              </h2>
              <div className="space-y-4">
                {upcomingDeadlines.slice(0, 3).map((deadline) => (
                  <UpcomingDeadlineCard key={deadline.id} deadline={deadline} />
                ))}
              </div>
            </section>

            {/* Notifications */}
            <NotificationCenter
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
            />

            {/* Achievements */}
            <AchievementSection user={user} />

            {/* Recommendations */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center space-x-3">
                <Icon name="Lightbulb" size={24} />
                <span>Recommended for You</span>
              </h2>
              <div className="space-y-6">
                {recommendations.map((recommendation) => (
                  <RecommendationCard key={recommendation.id} recommendation={recommendation} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <TabNavigation notifications={notificationCounts} />
    </div>
  );
};

export default UserDashboard;