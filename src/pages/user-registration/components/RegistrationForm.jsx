import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegistrationForm = ({ 
  formData, 
  onChange, 
  errors, 
  onSubmit, 
  isSubmitting, 
  isFormValid 
}) => {
  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={(e) => onChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          description="We'll use this for account verification and notifications"
          value={formData?.email}
          onChange={(e) => onChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Password"
            type="password"
            placeholder="Create a strong password"
            description="Minimum 8 characters"
            value={formData?.password}
            onChange={(e) => onChange('password', e?.target?.value)}
            error={errors?.password}
            required
            minLength={8}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={formData?.confirmPassword}
            onChange={(e) => onChange('confirmPassword', e?.target?.value)}
            error={errors?.confirmPassword}
            required
          />
        </div>
      </div>
      <div className="space-y-4">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          description="By creating an account, you agree to our terms and privacy policy"
          checked={formData?.agreeToTerms}
          onChange={(e) => onChange('agreeToTerms', e?.target?.checked)}
          error={errors?.agreeToTerms}
          required
        />

        <Checkbox
          label="Send me updates about hackathons and platform features"
          description="Optional: Receive email notifications about new hackathons and features"
          checked={formData?.emailNotifications}
          onChange={(e) => onChange('emailNotifications', e?.target?.checked)}
        />
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isSubmitting}
        disabled={!isFormValid}
        iconName="UserPlus"
        iconPosition="left"
      >
        {isSubmitting ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegistrationForm;