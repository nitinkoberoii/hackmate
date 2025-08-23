import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import TeammateFinder from './pages/teammate-finder';
import SkillAssessmentQuiz from './pages/skill-assessment-quiz';
import UserDashboard from './pages/user-dashboard';
import HackathonBrowse from './pages/hackathon-browse';
import UserRegistration from './pages/user-registration';
import TeamsOverview from './pages/team-management';
import TeamDetail from './pages/team-management/TeamDetail';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<HackathonBrowse />} />
        <Route path="/teammate-finder" element={<TeammateFinder />} />
        <Route path="/skill-assessment-quiz" element={<SkillAssessmentQuiz />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/hackathon-browse" element={<HackathonBrowse />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/team-management" element={<TeamsOverview />} />
        <Route path="/team-management/:teamId" element={<TeamDetail />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
