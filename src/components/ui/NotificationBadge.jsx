import React from 'react';

const NotificationBadge = ({ count, variant = 'default', size = 'default' }) => {
  if (!count || count <= 0) return null;

  const displayCount = count > 99 ? '99+' : count?.toString();

  const sizeClasses = {
    sm: 'h-4 min-w-4 text-xs px-1',
    default: 'h-5 min-w-5 text-xs px-1.5',
    lg: 'h-6 min-w-6 text-sm px-2'
  };

  const variantClasses = {
    default: 'bg-primary text-primary-foreground',
    success: 'bg-success text-success-foreground',
    warning: 'bg-warning text-warning-foreground',
    error: 'bg-error text-error-foreground',
    accent: 'bg-accent text-accent-foreground'
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center
        rounded-full font-medium font-mono
        transition-micro hover-scale
        ${sizeClasses?.[size]}
        ${variantClasses?.[variant]}
      `}
      aria-label={`${count} notifications`}
    >
      {displayCount}
    </span>
  );
};

export default NotificationBadge;