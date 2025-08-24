import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon'; 

// --- MODIFIED: Simplified Image Picker for file uploads only ---
const ImagePicker = ({ value, onChange, disabled }) => {
    const fileInputRef = useRef(null);
    // Create a preview URL from the file object
    const imagePreview = value ? URL.createObjectURL(value) : null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            onChange(file); // Pass the file object up
        } else {
            onChange(null);
        }
    };

    const handleRemoveImage = () => {
        onChange(null);
        // Reset the file input so the same file can be selected again
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const triggerFileSelect = () => fileInputRef.current?.click();

    return (
        <div>
            <label className="block text-sm font-medium text-foreground mb-2">Hackathon Image</label>
            <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-md bg-input border border-border flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Hackathon preview" className="w-full h-full object-cover" />
                    ) : (
                        <Icon name="Image" size={32} className="text-muted-foreground" />
                    )}
                </div>
                <div className="flex-grow">
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" className="hidden" disabled={disabled} />
                    {imagePreview ? (
                        <div className="flex items-center gap-2">
                            <button type="button" onClick={() => window.open(imagePreview, '_blank')} className="text-sm text-primary hover:underline" disabled={disabled}>View</button>
                            <button type="button" onClick={triggerFileSelect} className="text-sm text-primary hover:underline" disabled={disabled}>Change</button>
                            <button type="button" onClick={handleRemoveImage} className="text-sm text-destructive hover:underline" disabled={disabled}>Remove</button>
                        </div>
                    ) : (
                        <button type="button" onClick={triggerFileSelect} disabled={disabled} className="px-4 py-2 rounded-md text-sm font-semibold bg-background border border-border text-foreground hover:bg-muted transition-colors disabled:opacity-50">
                            Select Image
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};


// Reusable Input component for the form
const FormInput = ({ id, label, type = 'text', value, onChange, required = false, placeholder, error, disabled = false }) => (
  <div>
    {label && <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1">
      {label} {required && <span className="text-destructive">*</span>}
    </label>}
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full px-3 py-2 bg-input border ${error ? 'border-destructive' : 'border-border'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors disabled:opacity-50`}
    />
    {error && <p className="text-xs text-destructive mt-1">{error}</p>}
  </div>
);

// Reusable Select component for dropdowns
const FormSelect = ({ id, label, value, onChange, required = false, children, error, disabled = false }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1">
            {label} {required && <span className="text-destructive">*</span>}
        </label>
        <select
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`w-full px-3 py-2 bg-input border ${error ? 'border-destructive' : 'border-border'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors appearance-none bg-no-repeat bg-right pr-8 disabled:opacity-50`}
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}
        >
            {children}
        </select>
        {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
);

const initialFormData = {
    title: '',
    organizer: '',
    description: '',
    theme: '',
    startDate: '',
    endDate: '',
    prizePool: '',
    teamSize: { min: '', max: '' },
    location: 'Virtual',
    status: 'Upcoming',
    maxParticipants: '',
    requiredSkills: [],
};

const CreateEventModal = ({ isOpen, onClose, onHackathonCreated, apiEndpoint }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [currentSkill, setCurrentSkill] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    const handleEsc = (event) => {
        if (event.keyCode === 27) onClose();
    };

    if (isOpen) {
        setFormData(initialFormData);
        setImageFile(null);
        setCurrentSkill('');
        setErrors({});
        setApiError(null);
        setIsSubmitting(false);
    }

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTeamSizeChange = (e) => {
    const { name, value } = e.target;
    const numValue = value === '' ? '' : Number(value);
    setFormData(prev => ({
      ...prev,
      teamSize: { ...prev.teamSize, [name]: numValue },
    }));
  };
  
  const handleAddSkill = (e) => {
      if (e.key === 'Enter' && currentSkill.trim() !== '') {
          e.preventDefault();
          if (!formData.requiredSkills.includes(currentSkill.trim())) {
              setFormData(prev => ({ ...prev, requiredSkills: [...prev.requiredSkills, currentSkill.trim()] }));
          }
          setCurrentSkill('');
      }
  };

  const handleRemoveSkill = (skillToRemove) => {
      setFormData(prev => ({ ...prev, requiredSkills: prev.requiredSkills.filter(skill => skill !== skillToRemove) }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required.';
    if (!formData.organizer) newErrors.organizer = 'Organizer is required.';
    if (!formData.description) newErrors.description = 'Description is required.';
    if (!formData.startDate) newErrors.startDate = 'Start date is required.';
    if (!formData.endDate) newErrors.endDate = 'End date is required.';
    if (formData.endDate < formData.startDate) newErrors.endDate = 'End date cannot be before start date.';
    if (!formData.teamSize.min) newErrors.teamSizeMin = 'Min team size is required.';
    if (!formData.teamSize.max) newErrors.teamSizeMax = 'Max team size is required.';
    if (Number(formData.teamSize.max) < Number(formData.teamSize.min)) newErrors.teamSizeMax = 'Max size cannot be less than min size.';
    if (!formData.maxParticipants) newErrors.maxParticipants = 'Max participants is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null); 
    if (!validateForm()) return;

    setIsSubmitting(true);

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    let duration = '';
    if (!isNaN(start) && !isNaN(end) && end >= start) {
        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
        if (diffHours < 24) duration = `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
        else duration = `${diffDays} day${diffDays > 1 ? 's' : ''}`;
    }

    const submissionData = new FormData();
    if (imageFile) {
        submissionData.append('image', imageFile);
    }
    
    Object.keys(formData).forEach(key => {
        const value = formData[key];
        if (typeof value === 'object' && value !== null) {
            submissionData.append(key, JSON.stringify(value));
        } else {
            submissionData.append(key, value);
        }
    });
    submissionData.append('duration', duration);

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: submissionData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create hackathon.');
      }

      onHackathonCreated(); 
      onClose(); 

    // --- MODIFIED: Corrected the catch block syntax ---
    } catch (error) {
      console.error('Submission error:', error);
      setApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-background rounded-xl overflow-hidden shadow-2xl w-full max-w-4xl transform animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="max-h-[90vh] overflow-y-auto p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Create New Hackathon</h2>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted" aria-label="Close modal">
                <Icon name="X" size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {apiError && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
                  <strong>Error:</strong> {apiError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput id="title" label="Hackathon Title" value={formData.title} onChange={handleChange} required placeholder="e.g., AI for Good Challenge" error={errors.title} disabled={isSubmitting} />
                <FormInput id="organizer" label="Organizer" value={formData.organizer} onChange={handleChange} required placeholder="e.g., Tech Innovators Inc." error={errors.organizer} disabled={isSubmitting} />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">Description {<span className="text-destructive">*</span>}</label>
                <textarea id="description" name="description" rows="3" value={formData.description} onChange={handleChange} placeholder="Provide a detailed description of the hackathon..." disabled={isSubmitting} className={`w-full px-3 py-2 bg-input border ${errors.description ? 'border-destructive' : 'border-border'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors disabled:opacity-50`}></textarea>
                {errors.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImagePicker value={imageFile} onChange={setImageFile} disabled={isSubmitting} />
                <FormInput id="theme" label="Theme" value={formData.theme} onChange={handleChange} placeholder="e.g., FinTech, Healthcare, AI" disabled={isSubmitting} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormInput id="startDate" label="Start Date" type="date" value={formData.startDate} onChange={handleChange} required error={errors.startDate} disabled={isSubmitting} />
                <FormInput id="endDate" label="End Date" type="date" value={formData.endDate} onChange={handleChange} required error={errors.endDate} disabled={isSubmitting} />
                <FormInput id="prizePool" label="Prize Pool" value={formData.prizePool} onChange={handleChange} placeholder="e.g., $10,000" disabled={isSubmitting} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormInput id="maxParticipants" label="Max Participants" type="number" value={formData.maxParticipants} onChange={handleChange} required placeholder="e.g., 100" error={errors.maxParticipants} disabled={isSubmitting} />
                <FormInput id="min" name="min" label="Min Team Size" type="number" value={formData.teamSize.min} onChange={handleTeamSizeChange} required placeholder="e.g., 2" error={errors.teamSizeMin} disabled={isSubmitting} />
                <FormInput id="max" name="max" label="Max Team Size" type="number" value={formData.teamSize.max} onChange={handleTeamSizeChange} required placeholder="e.g., 5" error={errors.teamSizeMax} disabled={isSubmitting} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormSelect id="location" label="Location" value={formData.location} onChange={handleChange} required disabled={isSubmitting}>
                      <option>Virtual</option><option>Onsite</option><option>Hybrid</option>
                  </FormSelect>
                  <FormSelect id="status" label="Status" value={formData.status} onChange={handleChange} required disabled={isSubmitting}>
                      <option>Upcoming</option><option>Open</option><option>Closed</option>
                  </FormSelect>
              </div>

              <div>
                <label htmlFor="requiredSkills" className="block text-sm font-medium text-foreground mb-1">Required Skills (press Enter to add)</label>
                <div className={`flex flex-wrap gap-2 mb-2 p-2 border border-border rounded-md bg-input min-h-[42px] ${isSubmitting ? 'opacity-50' : ''}`}>
                    {formData.requiredSkills.map(skill => (
                        <div key={skill} className="flex items-center bg-primary/10 text-primary text-sm font-medium px-2 py-1 rounded-full">
                            <span>{skill}</span>
                            <button type="button" onClick={() => handleRemoveSkill(skill)} className="ml-2 text-primary/70 hover:text-primary" disabled={isSubmitting}><Icon name="X" size={14} /></button>
                        </div>
                    ))}
                    <input type="text" id="requiredSkills" value={currentSkill} onChange={(e) => setCurrentSkill(e.target.value)} onKeyDown={handleAddSkill} placeholder={formData.requiredSkills.length === 0 ? "e.g., React, Python, Figma" : ""} className="flex-grow bg-transparent focus:outline-none" disabled={isSubmitting}/>
                </div>
              </div>

              <div className="flex justify-end items-center gap-4 pt-4 border-t border-border">
                <button type="button" onClick={onClose} disabled={isSubmitting} className="px-6 py-2 rounded-md text-sm font-semibold bg-background border border-border text-foreground hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all disabled:opacity-50 disabled:cursor-not-allowed">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-6 py-2 rounded-md text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center justify-center min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? <div className="animate-spin"><Icon name="Loader2" size={20} /></div> : 'Create Event'}
                </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;
