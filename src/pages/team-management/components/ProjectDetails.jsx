import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectDetails = ({ team, hackathon, currentUser }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const projectData = {
    name: 'EcoTrack - Sustainable Living App',
    description: `A comprehensive mobile application that helps users track their carbon footprint, discover eco-friendly alternatives, and connect with like-minded individuals in their community. The app features personalized sustainability goals, local green business directory, and gamified challenges to promote environmental awareness.`,
    repository: 'https://github.com/hackmate-team/ecotrack',
    liveDemo: 'https://ecotrack-demo.vercel.app',
    techStack: ['React Native', 'Node.js', 'MongoDB', 'Express.js', 'Firebase'],
    category: 'Environmental Sustainability',
    status: 'In Development'
  };

  const tasks = [
    {
      id: 1,
      title: 'User Authentication System',
      description: 'Implement secure login/signup with social media integration',
      assignee: 'Sarah Chen',
      status: 'completed',
      priority: 'high',
      dueDate: '2025-01-08',
      labels: ['backend', 'security']
    },
    {
      id: 2,
      title: 'Carbon Footprint Calculator',
      description: 'Build algorithm to calculate daily carbon emissions',
      assignee: 'Mike Johnson',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2025-01-10',
      labels: ['algorithm', 'core-feature']
    },
    {
      id: 3,
      title: 'UI/UX Design Implementation',
      description: 'Convert Figma designs to React Native components',
      assignee: 'Alex Rivera',
      status: 'in-progress',
      priority: 'medium',
      dueDate: '2025-01-11',
      labels: ['frontend', 'design']
    },
    {
      id: 4,
      title: 'Local Business Directory API',
      description: 'Integrate with Google Places API for green businesses',
      assignee: 'David Kim',
      status: 'pending',
      priority: 'medium',
      dueDate: '2025-01-12',
      labels: ['api', 'integration']
    },
    {
      id: 5,
      title: 'Testing & Bug Fixes',
      description: 'Comprehensive testing and performance optimization',
      assignee: 'Team',
      status: 'pending',
      priority: 'high',
      dueDate: '2025-01-13',
      labels: ['testing', 'optimization']
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      completed: 'text-success bg-success/10',
      'in-progress': 'text-warning bg-warning/10',
      pending: 'text-muted-foreground bg-muted'
    };
    return colors?.[status] || 'text-muted-foreground bg-muted';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-error bg-error/10',
      medium: 'text-warning bg-warning/10',
      low: 'text-success bg-success/10'
    };
    return colors?.[priority] || 'text-muted-foreground bg-muted';
  };

  const sections = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'tasks', label: 'Tasks', icon: 'CheckSquare' },
    { id: 'repository', label: 'Repository', icon: 'GitBranch' },
    { id: 'resources', label: 'Resources', icon: 'FolderOpen' }
  ];

  const isTeamLeader = currentUser?.role === 'leader';

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Section Navigation */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-border">
        {sections?.map((section) => (
          <button
            key={section?.id}
            onClick={() => setActiveSection(section?.id)}
            className={`flex items-center space-x-1.5 md:space-x-2 px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm font-medium whitespace-nowrap transition-micro flex-shrink-0 ${
              activeSection === section?.id
                ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={section?.icon} size={14} className="md:w-4 md:h-4" />
            <span>{section?.label}</span>
          </button>
        ))}
      </div>
      
      {/* Project Overview */}
      {activeSection === 'overview' && (
        <div className="space-y-4 md:space-y-6">
          <div className="bg-card border border-border rounded-lg p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 md:mb-4 space-y-3 sm:space-y-0">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{projectData?.name}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs md:text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Icon name="Tag" size={12} className="md:w-3.5 md:h-3.5" />
                    <span>{projectData?.category}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Activity" size={12} className="md:w-3.5 md:h-3.5" />
                    <span>{projectData?.status}</span>
                  </span>
                </div>
              </div>
              {isTeamLeader && (
                <Button variant="outline" size="sm" iconName="Edit" className="w-full sm:w-auto">
                  Edit
                </Button>
              )}
            </div>
            
            <p className="text-foreground leading-relaxed mb-4 md:mb-6 text-sm md:text-base">{projectData?.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <h4 className="text-xs md:text-sm font-semibold text-foreground mb-2 md:mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {projectData?.techStack?.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 md:px-3 py-1 bg-primary/10 text-primary text-xs md:text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-xs md:text-sm font-semibold text-foreground mb-2 md:mb-3">Quick Links</h4>
                <div className="space-y-1.5 md:space-y-2">
                  <a
                    href={projectData?.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 md:space-x-2 text-xs md:text-sm text-primary hover:underline"
                  >
                    <Icon name="Github" size={14} className="md:w-4 md:h-4" />
                    <span>GitHub Repository</span>
                  </a>
                  <a
                    href={projectData?.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 md:space-x-2 text-xs md:text-sm text-primary hover:underline"
                  >
                    <Icon name="ExternalLink" size={14} className="md:w-4 md:h-4" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Tasks Section */}
      {activeSection === 'tasks' && (
        <div className="space-y-3 md:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <h3 className="text-base md:text-lg font-semibold text-foreground">Project Tasks</h3>
            {isTeamLeader && (
              <Button variant="default" size="sm" iconName="Plus" className="w-full sm:w-auto">
                Add Task
              </Button>
            )}
          </div>

          <div className="space-y-2.5 md:space-y-3">
            {tasks?.map((task) => (
              <div key={task?.id} className="bg-card border border-border rounded-lg p-3 md:p-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2.5 md:mb-3 space-y-2 sm:space-y-0">
                  <div className="flex-1">
                    <h4 className="text-sm md:text-base font-medium text-foreground mb-1">{task?.title}</h4>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">{task?.description}</p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 text-xs">
                      <span className="flex items-center space-x-1">
                        <Icon name="User" size={10} className="md:w-3 md:h-3" />
                        <span>{task?.assignee}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Calendar" size={10} className="md:w-3 md:h-3" />
                        <span>Due: {new Date(task.dueDate)?.toLocaleDateString()}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1.5 md:space-x-2 sm:ml-4">
                    <span className={`px-1.5 md:px-2 py-0.5 md:py-1 text-xs rounded-full ${getPriorityColor(task?.priority)}`}>
                      {task?.priority}
                    </span>
                    <span className={`px-1.5 md:px-2 py-0.5 md:py-1 text-xs rounded-full ${getStatusColor(task?.status)}`}>
                      {task?.status?.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {task?.labels?.map((label) => (
                    <span
                      key={label}
                      className="px-1.5 md:px-2 py-0.5 md:py-1 bg-muted text-muted-foreground text-xs rounded"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Repository Section */}
      {activeSection === 'repository' && (
        <div className="space-y-4 md:space-y-6">
          <div className="bg-card border border-border rounded-lg p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">Repository Information</h3>
            
            <div className="space-y-3 md:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 md:p-4 bg-muted rounded-lg space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <Icon name="Github" size={20} className="md:w-6 md:h-6" />
                  <div>
                    <p className="text-sm md:text-base font-medium text-foreground">hackmate-team/ecotrack</p>
                    <p className="text-xs md:text-sm text-muted-foreground">Main repository</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" iconName="ExternalLink" className="w-full sm:w-auto">
                  Open
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                <div className="text-center p-3 md:p-4 bg-muted rounded-lg">
                  <p className="text-lg md:text-2xl font-bold text-foreground">47</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Commits</p>
                </div>
                <div className="text-center p-3 md:p-4 bg-muted rounded-lg">
                  <p className="text-lg md:text-2xl font-bold text-foreground">3</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Branches</p>
                </div>
                <div className="text-center p-3 md:p-4 bg-muted rounded-lg">
                  <p className="text-lg md:text-2xl font-bold text-foreground">12</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Pull Requests</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Resources Section */}
      {activeSection === 'resources' && (
        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <h3 className="text-base md:text-lg font-semibold text-foreground">Project Resources</h3>
            <Button variant="default" size="sm" iconName="Upload" className="w-full sm:w-auto">
              Upload File
            </Button>
          </div>

          <div className="grid gap-3 md:gap-4">
            {[
              { name: 'Project Proposal.pdf', size: '2.4 MB', type: 'pdf', uploadedBy: 'Sarah Chen', date: '2025-01-05' },
              { name: 'UI_Mockups_v2.figma', size: '5.1 MB', type: 'design', uploadedBy: 'Alex Rivera', date: '2025-01-06' },
              { name: 'API_Documentation.md', size: '156 KB', type: 'document', uploadedBy: 'Mike Johnson', date: '2025-01-07' },
              { name: 'Demo_Video.mp4', size: '45.2 MB', type: 'video', uploadedBy: 'David Kim', date: '2025-01-07' }
            ]?.map((file, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 md:p-4 bg-card border border-border rounded-lg space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <Icon name="File" size={16} className="md:w-5 md:h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm md:text-base font-medium text-foreground">{file?.name}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {file?.size} • Uploaded by {file?.uploadedBy} • {file?.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5 md:space-x-2">
                  <Button variant="ghost" size="sm" iconName="Download" className="text-xs">
                    Download
                  </Button>
                  <Button variant="ghost" size="sm" iconName="ExternalLink" className="text-xs">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;