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
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import SignIn from "./pages/auth/SignIn.jsx";
import SignUp from "./pages/auth/SignUp.jsx";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<HackathonBrowse />} />
        <Route path="/teammate-finder" element={<TeammateFinder />} />
        <Route path="/skill-assessment-quiz" element={<ProtectedRoute><SkillAssessmentQuiz /></ProtectedRoute>} />
        <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="/hackathon-browse" element={<HackathonBrowse />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/team-management" element={<TeamsOverview />} />
        <Route path="/team-management/:teamId" element={<ProtectedRoute><TeamDetail /></ProtectedRoute>} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
