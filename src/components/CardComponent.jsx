import React from 'react';

const CardComponent = ({
  children,
  className = '',
  header = null,
  footer = null,
  variant = 'default',
  hover = false,
  shadow = 'md'
}) => {
  const shadowClass = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  }[shadow] || 'shadow-md';

  const variantClass = {
    default: 'bg-white border border-gray-200',
    filled: 'bg-gray-50 border border-gray-200',
    elevated: 'bg-white',
    outlined: 'bg-transparent border border-gray-300',
  }[variant] || 'bg-white border border-gray-200';

  const hoverClass = hover ? 'hover:shadow-lg transition-shadow' : '';

  return (
    <div className={`rounded-lg ${variantClass} ${shadowClass} ${hoverClass} overflow-hidden`}>
      {/* Header */}
      {header && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          {typeof header === 'string' ? <h3 className="font-bold text-gray-900">{header}</h3> : header}
        </div>
      )}

      {/* Body */}
      <div className={`${header || footer ? 'px-6 py-4' : 'p-6'} ${className}`}>
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          {typeof footer === 'string' ? <p className="text-sm text-gray-600">{footer}</p> : footer}
        </div>
      )}
    </div>
  );
};

export default CardComponent;
