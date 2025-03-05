import React from 'react';

const Badge = ({
  label,
  variant = 'default',
  size = 'md',
  icon = null,
  dismissible = false,
  onDismiss = null
}) => {
  const baseClass = 'inline-flex items-center font-semibold rounded-full transition-colors';

  const variantClass = {
    default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    primary: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    success: 'bg-green-100 text-green-800 hover:bg-green-200',
    warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    danger: 'bg-red-100 text-red-800 hover:bg-red-200',
    purple: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    pink: 'bg-pink-100 text-pink-800 hover:bg-pink-200',
  }[variant] || 'bg-gray-100 text-gray-800 hover:bg-gray-200';

  const sizeClass = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-2',
    lg: 'px-4 py-2 text-base gap-2',
  }[size] || 'px-3 py-1.5 text-sm gap-2';

  return (
    <span className={`${baseClass} ${variantClass} ${sizeClass}`}>
      {icon && <span className="text-lg leading-none">{icon}</span>}
      <span>{label}</span>
      {dismissible && (
        <button
          onClick={onDismiss}
          className="ml-1 hover:opacity-70 transition-opacity"
          aria-label="Dismiss"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </span>
  );
};

export default Badge;
