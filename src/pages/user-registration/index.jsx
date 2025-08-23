import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RoleSelector from './components/RoleSelector';
import ConditionalFields from './components/ConditionalFields';
import GitHubIntegration from './components/GitHubIntegration';
import RegistrationForm from './components/RegistrationForm';
import SuccessModal from './components/SuccessModal';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Info
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    agreeToTerms: false,
    emailNotifications: true,
    
    // Participant Fields
    skillLevel: '',
    hackathonExperience: '',
    primaryLanguages: '',
    interests: '',
    
    // Organizer Fields
    organizationName: '',
    organizationType: '',
    eventExperience: '',
    website: '',
    
    // GitHub Integration
    githubConnected: false,
    githubData: null
  });
  
  const [errors, setErrors] = useState({});

  const steps = [
    { id: 1, title: 'Role Selection', description: 'Choose your role' },
    { id: 2, title: 'Basic Information', description: 'Personal details' },
    { id: 3, title: 'Additional Details', description: 'Role-specific info' },
    { id: 4, title: 'GitHub Integration', description: 'Connect your profile' }
  ];

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData?.role) {
        newErrors.role = 'Please select a role';
      }
    }

    if (step === 2) {
      if (!formData?.fullName?.trim()) {
        newErrors.fullName = 'Full name is required';
      }
      
      if (!formData?.email?.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      
      if (!formData?.password) {
        newErrors.password = 'Password is required';
      } else if (formData?.password?.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      
      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      
      if (!formData?.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      }
    }

    if (step === 3) {
      if (formData?.role === 'participant') {
        if (!formData?.skillLevel) {
          newErrors.skillLevel = 'Please select your skill level';
        }
        if (!formData?.hackathonExperience) {
          newErrors.hackathonExperience = 'Please select your hackathon experience';
        }
      } else if (formData?.role === 'organizer') {
        if (!formData?.organizationName?.trim()) {
          newErrors.organizationName = 'Organization name is required';
        }
        if (!formData?.organizationType) {
          newErrors.organizationType = 'Please select organization type';
        }
        if (!formData?.eventExperience) {
          newErrors.eventExperience = 'Please select your event planning experience';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleRoleChange = (role) => {
    setFormData(prev => ({
      ...prev,
      role
    }));
    
    if (errors?.role) {
      setErrors(prev => ({
        ...prev,
        role: ''
      }));
    }
  };

  const handleGitHubConnect = (githubData) => {
    setFormData(prev => ({
      ...prev,
      githubConnected: !!githubData,
      githubData: githubData,
      // Auto-fill some fields if GitHub data is available
      ...(githubData && {
        fullName: githubData?.name || prev?.fullName,
        primaryLanguages: githubData?.languages?.slice(0, 5)?.join(', ') || prev?.primaryLanguages
      })
    }));
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps?.length));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    // Navigate based on role
    if (formData?.role === 'participant') {
      navigate('/skill-assessment-quiz');
    } else {
      navigate('/user-dashboard');
    }
  };

  const isStepValid = (step) => {
    const tempErrors = {};
    
    if (step === 1 && !formData?.role) return false;
    if (step === 2) {
      if (!formData?.fullName?.trim() || !formData?.email?.trim() || 
          !formData?.password || formData?.password !== formData?.confirmPassword || 
          !formData?.agreeToTerms) return false;
    }
    if (step === 3) {
      if (formData?.role === 'participant') {
        if (!formData?.skillLevel || !formData?.hackathonExperience) return false;
      } else if (formData?.role === 'organizer') {
        if (!formData?.organizationName?.trim() || !formData?.organizationType || !formData?.eventExperience) return false;
      }
    }
    
    return true;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="Code2" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground font-mono">HackMate</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Already have an account?</span>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps?.map((step, index) => (
                <div key={step?.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                    currentStep >= step?.id
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'border-border text-muted-foreground'
                  }`}>
                    {currentStep > step?.id ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <span className="text-sm font-medium">{step?.id}</span>
                    )}
                  </div>
                  {index < steps?.length - 1 && (
                    <div className={`w-12 sm:w-20 h-0.5 mx-2 ${
                      currentStep > step?.id ? 'bg-primary' : 'bg-border'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {steps?.[currentStep - 1]?.title}
              </h1>
              <p className="text-muted-foreground">
                {steps?.[currentStep - 1]?.description}
              </p>
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-card border border-border rounded-lg p-6 sm:p-8 shadow-elevation-1">
            {currentStep === 1 && (
              <RoleSelector
                selectedRole={formData?.role}
                onRoleChange={handleRoleChange}
              />
            )}

            {currentStep === 2 && (
              <RegistrationForm
                formData={formData}
                onChange={handleInputChange}
                errors={errors}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                isFormValid={isStepValid(2)}
              />
            )}

            {currentStep === 3 && (
              <ConditionalFields
                role={formData?.role}
                formData={formData}
                onChange={handleInputChange}
                errors={errors}
              />
            )}

            {currentStep === 4 && (
              <GitHubIntegration
                onGitHubConnect={handleGitHubConnect}
                isConnected={formData?.githubConnected}
                githubData={formData?.githubData}
              />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="ghost"
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>

            <div className="flex space-x-3">
              {currentStep < steps?.length ? (
                <Button
                  variant="default"
                  onClick={handleNextStep}
                  disabled={!isStepValid(currentStep)}
                  iconName="ChevronRight"
                  iconPosition="right"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={handleSubmit}
                  loading={isSubmitting}
                  disabled={!isStepValid(currentStep)}
                  iconName="UserPlus"
                  iconPosition="left"
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
              )}
            </div>
          </div>

          {/* Skip GitHub Integration */}
          {currentStep === 4 && !formData?.githubConnected && (
            <div className="text-center mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSubmit()}
                className="text-muted-foreground"
              >
                Skip for now - I'll connect later
              </Button>
            </div>
          )}
        </div>
      </main>
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        userData={formData}
        onClose={handleSuccessModalClose}
      />
    </div>
  );
};

export default UserRegistration;