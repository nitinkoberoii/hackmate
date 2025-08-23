import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const InvitationModal = ({ isOpen, onClose, teammate, onSend }) => {
  const [formData, setFormData] = useState({
    message: '',
    role: '',
    hackathon: '',
    teamName: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const roleOptions = [
    { value: 'frontend', label: 'Frontend Developer' },
    { value: 'backend', label: 'Backend Developer' },
    { value: 'fullstack', label: 'Full Stack Developer' },
    { value: 'designer', label: 'UI/UX Designer' },
    { value: 'data-scientist', label: 'Data Scientist' },
    { value: 'ml-engineer', label: 'ML Engineer' },
    { value: 'devops', label: 'DevOps Engineer' },
    { value: 'mobile', label: 'Mobile Developer' },
    { value: 'product-manager', label: 'Product Manager' },
    { value: 'any', label: 'Any Role' }
  ];

  const hackathonOptions = [
    { value: 'tech-innovate-2024', label: 'Tech Innovate 2024' },
    { value: 'ai-challenge-winter', label: 'AI Challenge Winter' },
    { value: 'blockchain-builders', label: 'Blockchain Builders' },
    { value: 'green-tech-hack', label: 'Green Tech Hackathon' },
    { value: 'fintech-revolution', label: 'FinTech Revolution' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSend = async () => {
    if (!formData?.message?.trim() || !formData?.role || !formData?.hackathon) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSend({
      ...formData,
      timestamp: new Date()?.toISOString(),
      recipientId: teammate?.id
    });
    
    setIsLoading(false);
    setFormData({ message: '', role: '', hackathon: '', teamName: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Image
              src={teammate?.avatar}
              alt={teammate?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-foreground">Invite {teammate?.name}</h3>
              <p className="text-sm text-muted-foreground">Send team invitation</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Hackathon Selection */}
          <Select
            label="Hackathon"
            description="Which hackathon are you inviting them to?"
            required
            options={hackathonOptions}
            value={formData?.hackathon}
            onChange={(value) => handleInputChange('hackathon', value)}
            placeholder="Select hackathon..."
          />

          {/* Team Name */}
          <Input
            label="Team Name (Optional)"
            type="text"
            placeholder="Enter your team name"
            value={formData?.teamName}
            onChange={(e) => handleInputChange('teamName', e?.target?.value)}
            description="Leave blank if you don't have a team name yet"
          />

          {/* Role Selection */}
          <Select
            label="Proposed Role"
            description="What role would you like them to fill?"
            required
            options={roleOptions}
            value={formData?.role}
            onChange={(value) => handleInputChange('role', value)}
            placeholder="Select role..."
          />

          {/* Personal Message */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Personal Message *
            </label>
            <textarea
              value={formData?.message}
              onChange={(e) => handleInputChange('message', e?.target?.value)}
              placeholder={`Hi ${teammate?.name}! I'd love to have you on my team for this hackathon. Your skills in ${teammate?.skills?.slice(0, 2)?.join(' and ')} would be a perfect fit for our project idea...`}
              className="w-full h-32 px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formData?.message?.length}/500 characters
            </p>
          </div>

          {/* Compatibility Info */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Compatibility Score</span>
              <span className="text-lg font-bold text-success">{teammate?.compatibilityScore}%</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Based on complementary skills and experience level
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSend}
              className="flex-1"
              loading={isLoading}
              disabled={!formData?.message?.trim() || !formData?.role || !formData?.hackathon}
            >
              <Icon name="Send" size={16} className="mr-2" />
              Send Invitation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationModal;