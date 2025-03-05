import React, { useState } from 'react';

const Alert = ({
  variant = 'info',
  title,
  message,
  dismissible = false,
  icon = null
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const variantConfig = {
    success: {
      bg: 'bg-green-100',
      border: 'border-green-400',
      text: 'text-green-800',
      iconColor: 'text-green-500',
      defaultIcon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
    },
    error: {
      bg: 'bg-red-100',
      border: 'border-red-400',
      text: 'text-red-800',
      iconColor: 'text-red-500',
      defaultIcon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      ),
    },
    warning: {
      bg: 'bg-yellow-100',
      border: 'border-yellow-400',
      text: 'text-yellow-800',
      iconColor: 'text-yellow-500',
      defaultIcon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18.101 12.93l-.9-1.465A1.313 1.313 0 0016 11.28h-.438a.563.563 0 00-.488.287l-.54.878a.562.562 0 01-.488.287h-.876a.562.562 0 01-.488-.287l-.54-.878a.562.562 0 00-.488-.287H4a2 2 0 00-2 2v2a2 2 0 002 2h12a2 2 0 002-2v-.322a1.882 1.882 0 00-.899-1.611zM5 16a1 1 0 100-2 1 1 0 000 2zM14 16a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      ),
    },
    info: {
      bg: 'bg-blue-100',
      border: 'border-blue-400',
      text: 'text-blue-800',
      iconColor: 'text-blue-500',
      defaultIcon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      ),
    },
  };

  const config = variantConfig[variant] || variantConfig.info;

  return (
    <div className={`${config.bg} ${config.border} ${config.text} border rounded-lg p-4`}>
      <div className="flex items-start">
        {/* Icon */}
        <div className={`flex-shrink-0 ${config.iconColor}`}>
          {icon || config.defaultIcon}
        </div>

        {/* Content */}
        <div className="ml-3 flex-1">
          {title && <h3 className="font-semibold">{title}</h3>}
          <div className={title ? 'mt-1 text-sm' : 'text-sm'}>
            {message}
          </div>
        </div>

        {/* Close Button */}
        {dismissible && (
          <button
            onClick={() => setIsVisible(false)}
            className="ml-3 flex-shrink-0 hover:opacity-70 transition-opacity"
            aria-label="Dismiss"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
