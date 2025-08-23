import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ConditionalFields = ({ role, formData, onChange, errors }) => {
  const skillLevelOptions = [
    { value: 'beginner', label: 'Beginner (0-1 years)' },
    { value: 'intermediate', label: 'Intermediate (1-3 years)' },
    { value: 'advanced', label: 'Advanced (3-5 years)' },
    { value: 'expert', label: 'Expert (5+ years)' }
  ];

  const experienceOptions = [
    { value: '0', label: 'No hackathon experience' },
    { value: '1-3', label: '1-3 hackathons' },
    { value: '4-10', label: '4-10 hackathons' },
    { value: '10+', label: '10+ hackathons' }
  ];

  const organizationSizeOptions = [
    { value: 'startup', label: 'Startup (1-50 employees)' },
    { value: 'medium', label: 'Medium Company (51-500 employees)' },
    { value: 'large', label: 'Large Company (500+ employees)' },
    { value: 'educational', label: 'Educational Institution' },
    { value: 'nonprofit', label: 'Non-profit Organization' },
    { value: 'individual', label: 'Individual Organizer' }
  ];

  const eventExperienceOptions = [
    { value: 'none', label: 'No event planning experience' },
    { value: 'some', label: 'Some experience (1-5 events)' },
    { value: 'experienced', label: 'Experienced (6-20 events)' },
    { value: 'expert', label: 'Expert (20+ events)' }
  ];

  if (role === 'participant') {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Skill Level"
            description="Your overall coding experience"
            options={skillLevelOptions}
            value={formData?.skillLevel}
            onChange={(value) => onChange('skillLevel', value)}
            error={errors?.skillLevel}
            required
            placeholder="Select your skill level"
          />
          
          <Select
            label="Hackathon Experience"
            description="Previous hackathon participation"
            options={experienceOptions}
            value={formData?.hackathonExperience}
            onChange={(value) => onChange('hackathonExperience', value)}
            error={errors?.hackathonExperience}
            required
            placeholder="Select your experience"
          />
        </div>
        <Input
          label="Primary Programming Languages"
          type="text"
          placeholder="e.g., JavaScript, Python, Java"
          description="Comma-separated list of your main languages"
          value={formData?.primaryLanguages}
          onChange={(e) => onChange('primaryLanguages', e?.target?.value)}
          error={errors?.primaryLanguages}
        />
        <Input
          label="Areas of Interest"
          type="text"
          placeholder="e.g., Web Development, AI/ML, Mobile Apps"
          description="What types of projects excite you?"
          value={formData?.interests}
          onChange={(e) => onChange('interests', e?.target?.value)}
          error={errors?.interests}
        />
      </div>
    );
  }

  if (role === 'organizer') {
    return (
      <div className="space-y-4">
        <Input
          label="Organization Name"
          type="text"
          placeholder="Enter your organization name"
          description="Company, university, or organization you represent"
          value={formData?.organizationName}
          onChange={(e) => onChange('organizationName', e?.target?.value)}
          error={errors?.organizationName}
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Organization Type"
            description="Type and size of your organization"
            options={organizationSizeOptions}
            value={formData?.organizationType}
            onChange={(value) => onChange('organizationType', value)}
            error={errors?.organizationType}
            required
            placeholder="Select organization type"
          />
          
          <Select
            label="Event Planning Experience"
            description="Your experience organizing events"
            options={eventExperienceOptions}
            value={formData?.eventExperience}
            onChange={(value) => onChange('eventExperience', value)}
            error={errors?.eventExperience}
            required
            placeholder="Select your experience"
          />
        </div>
        <Input
          label="Website/LinkedIn"
          type="url"
          placeholder="https://example.com or LinkedIn profile"
          description="Optional: Your organization's website or your LinkedIn"
          value={formData?.website}
          onChange={(e) => onChange('website', e?.target?.value)}
          error={errors?.website}
        />
      </div>
    );
  }

  return null;
};

export default ConditionalFields;