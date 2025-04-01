import React from 'react';

const StatCard = ({
  title,
  value,
  icon = null,
  color = 'blue',
  trend = null,
  description = null,
  variant = 'default'
}) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-100 border-blue-200',
    green: 'text-green-600 bg-green-100 border-green-200',
    purple: 'text-purple-600 bg-purple-100 border-purple-200',
    orange: 'text-orange-600 bg-orange-100 border-orange-200',
    red: 'text-red-600 bg-red-100 border-red-200',
  };

  const textColorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
    red: 'text-red-600',
  };

  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <p className="text-gray-600 text-xs uppercase font-semibold mb-1">{title}</p>
        <p className={`text-2xl font-bold ${textColorClasses[color]}`}>{value}</p>
        {trend && <p className="text-xs text-gray-600 mt-1">{trend}</p>}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderColor: `var(--color-${color})` }}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-semibold mb-2">{title}</p>
          <p className={`text-4xl font-bold ${textColorClasses[color]}`}>{value}</p>
          {description && <p className="text-xs text-gray-600 mt-2">{description}</p>}
        </div>
        {icon && <div className={`p-4 rounded-lg ${colorClasses[color]}`}>{icon}</div>}
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-2">
          <svg
            className={`w-4 h-4 ${trend.includes('↑') || trend.includes('+') ? 'text-green-600' : 'text-red-600'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            {trend.includes('↑') || trend.includes('+') ? (
              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
            )}
          </svg>
          <p className={`text-sm font-semibold ${trend.includes('↑') || trend.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
            {trend}
          </p>
        </div>
      )}
    </div>
  );
};

export default StatCard;
