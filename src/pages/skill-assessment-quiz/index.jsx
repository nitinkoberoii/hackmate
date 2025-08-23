import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import QuestionCard from './components/QuestionCard';
import ProgressBar from './components/ProgressBar';
import SkillRadarChart from './components/SkillRadarChart';
import GitHubIntegrationPanel from './components/GitHubIntegrationPanel';
import SkillSummaryPanel from './components/SkillSummaryPanel';
import CompletionModal from './components/CompletionModal';
import Icon from '../../components/AppIcon';

const SkillAssessmentQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [assessedSkills, setAssessedSkills] = useState([]);
  const [isGitHubConnected, setIsGitHubConnected] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [startTime] = useState(Date.now());

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    isOnline: true,
    githubConnected: false
  };

  // Mock notifications
  const mockNotifications = {
    dashboard: 3,
    browse: 5,
    find: 2,
    teams: 1
  };

  // Mock questions data
  const questions = [
    {
      id: 1,
      category: "Frontend",
      title: "React.js Development",
      description: "How comfortable are you with building React applications, managing state, and working with hooks?",
      examples: ["Component lifecycle", "State management", "Custom hooks", "Performance optimization"]
    },
    {
      id: 2,
      category: "Frontend",
      title: "JavaScript (ES6+)",
      description: "Rate your proficiency with modern JavaScript features and asynchronous programming.",
      examples: ["Arrow functions", "Promises/Async-await", "Destructuring", "Modules"]
    },
    {
      id: 3,
      category: "Backend",
      title: "Node.js & Express",
      description: "How experienced are you with server-side JavaScript development?",
      examples: ["RESTful APIs", "Middleware", "Authentication", "Database integration"]
    },
    {
      id: 4,
      category: "Backend",
      title: "Python Development",
      description: "Rate your Python programming skills and framework experience.",
      examples: ["Django/Flask", "Data structures", "OOP concepts", "Package management"]
    },
    {
      id: 5,
      category: "Database",
      title: "SQL & Database Design",
      description: "How comfortable are you with database operations and design?",
      examples: ["Complex queries", "Joins", "Indexing", "Schema design"]
    },
    {
      id: 6,
      category: "Mobile",
      title: "React Native",
      description: "Rate your experience with cross-platform mobile development.",
      examples: ["Navigation", "Native modules", "Platform-specific code", "App deployment"]
    },
    {
      id: 7,
      category: "Data Science",
      title: "Machine Learning",
      description: "How experienced are you with ML algorithms and data analysis?",
      examples: ["Scikit-learn", "TensorFlow/PyTorch", "Data preprocessing", "Model evaluation"]
    },
    {
      id: 8,
      category: "DevOps",
      title: "Docker & Containerization",
      description: "Rate your experience with containerization and deployment.",
      examples: ["Dockerfile creation", "Docker Compose", "Container orchestration", "CI/CD pipelines"]
    },
    {
      id: 9,
      category: "Cloud",
      title: "AWS Services",
      description: "How familiar are you with Amazon Web Services?",
      examples: ["EC2", "S3", "Lambda", "RDS", "CloudFormation"]
    },
    {
      id: 10,
      category: "Design",
      title: "UI/UX Design",
      description: "Rate your design skills and user experience knowledge.",
      examples: ["Figma/Sketch", "Design systems", "User research", "Prototyping"]
    }
  ];

  // Mock GitHub suggested skills
  const mockSuggestedSkills = [
    {
      id: 'gh1',
      name: 'JavaScript',
      suggestedLevel: 'advanced',
      repositoryCount: 12,
      category: 'Frontend'
    },
    {
      id: 'gh2',
      name: 'Python',
      suggestedLevel: 'intermediate',
      repositoryCount: 8,
      category: 'Backend'
    },
    {
      id: 'gh3',
      name: 'TypeScript',
      suggestedLevel: 'intermediate',
      repositoryCount: 6,
      category: 'Frontend'
    }
  ];

  const currentQuestion = questions?.[currentQuestionIndex];
  const totalQuestions = questions?.length;
  const completedQuestions = Object.keys(answers)?.length;
  const estimatedTimeRemaining = Math.max(0, (totalQuestions - currentQuestionIndex) * 2);

  const handleLevelSelect = (level) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion?.id]: level
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleCompleteAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleCompleteAssessment();
    }
  };

  const handleCompleteAssessment = () => {
    const skills = questions?.filter(q => answers?.[q?.id])?.map(q => ({
        id: q?.id,
        name: q?.title,
        category: q?.category,
        level: answers?.[q?.id]
      }));
    
    setAssessedSkills(skills);
    setShowCompletionModal(true);
  };

  const handleGitHubConnect = () => {
    setIsGitHubConnected(true);
  };

  const handleConfirmSkill = (skillId) => {
    const skill = mockSuggestedSkills?.find(s => s?.id === skillId);
    if (skill) {
      setAssessedSkills(prev => [...prev, {
        id: skill?.id,
        name: skill?.name,
        category: skill?.category,
        level: skill?.suggestedLevel
      }]);
    }
  };

  const handleAdjustSkill = (skillId) => {
    // In a real app, this would open a modal to adjust the skill level
    console.log('Adjust skill:', skillId);
  };

  // Update assessed skills when answers change
  useEffect(() => {
    const skills = questions?.filter(q => answers?.[q?.id])?.map(q => ({
        id: q?.id,
        name: q?.title,
        category: q?.category,
        level: answers?.[q?.id]
      }));
    setAssessedSkills(skills);
  }, [answers]);

  const getCompletionTime = () => {
    return (Date.now() - startTime) / (1000 * 60); // in minutes
  };

  const getTotalCategories = () => {
    const categories = new Set(assessedSkills.map(skill => skill.category));
    return categories?.size;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={mockUser} notifications={mockNotifications} />
      <main className="pt-16 md:pt-18 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Target" size={24} className="text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Skill Assessment Quiz
              </h1>
            </div>
            <p className="text-muted-foreground">
              Help us understand your technical skills to find the perfect hackathon teammates
            </p>
          </div>

          {/* Progress Bar */}
          <ProgressBar
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
            completedQuestions={completedQuestions}
            estimatedTimeRemaining={estimatedTimeRemaining}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Question Card */}
              <QuestionCard
                question={currentQuestion}
                selectedLevel={answers?.[currentQuestion?.id]}
                onLevelSelect={handleLevelSelect}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onSkip={handleSkip}
                isFirst={currentQuestionIndex === 0}
                isLast={currentQuestionIndex === totalQuestions - 1}
                currentQuestion={currentQuestionIndex + 1}
                totalQuestions={totalQuestions}
              />

              {/* GitHub Integration Panel - Mobile */}
              <div className="lg:hidden">
                <GitHubIntegrationPanel
                  isConnected={isGitHubConnected}
                  onConnect={handleGitHubConnect}
                  suggestedSkills={isGitHubConnected ? mockSuggestedSkills : []}
                  onConfirmSkill={handleConfirmSkill}
                  onAdjustSkill={handleAdjustSkill}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Skill Radar Chart */}
              <SkillRadarChart skills={assessedSkills} />

              {/* Skill Summary Panel */}
              <SkillSummaryPanel skills={assessedSkills} />

              {/* GitHub Integration Panel - Desktop */}
              <div className="hidden lg:block">
                <GitHubIntegrationPanel
                  isConnected={isGitHubConnected}
                  onConnect={handleGitHubConnect}
                  suggestedSkills={isGitHubConnected ? mockSuggestedSkills : []}
                  onConfirmSkill={handleConfirmSkill}
                  onAdjustSkill={handleAdjustSkill}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Mobile Navigation */}
      <TabNavigation notifications={mockNotifications} />
      {/* Completion Modal */}
      <CompletionModal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        skillsAssessed={assessedSkills?.length}
        totalCategories={getTotalCategories()}
        completionTime={getCompletionTime()}
      />
    </div>
  );
};

export default SkillAssessmentQuiz;