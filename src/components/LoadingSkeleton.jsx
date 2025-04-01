import React from 'react';

const LoadingSkeleton = ({ variant = 'card', count = 3 }) => {
  const shimmer = 'animate-pulse';

  if (variant === 'card') {
    return (
      <>
        {[...Array(count)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Image Skeleton */}
            <div className={`h-48 bg-gray-200 ${shimmer}`}></div>

            {/* Content Skeleton */}
            <div className="p-4 space-y-4">
              {/* Title */}
              <div className={`h-4 bg-gray-200 rounded ${shimmer}`} style={{ width: '70%' }}></div>

              {/* Description Lines */}
              <div className={`h-3 bg-gray-200 rounded ${shimmer}`}></div>
              <div className={`h-3 bg-gray-200 rounded ${shimmer}`} style={{ width: '80%' }}></div>

              {/* Price */}
              <div className="pt-4 flex justify-between items-end">
                <div className={`h-6 bg-gray-200 rounded ${shimmer}`} style={{ width: '30%' }}></div>
                <div className={`h-8 bg-gray-300 rounded ${shimmer}`} style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (variant === 'list') {
    return (
      <>
        {[...Array(count)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 mb-4">
            <div className="flex gap-4">
              {/* Avatar */}
              <div className={`w-12 h-12 bg-gray-200 rounded-full ${shimmer}`}></div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                <div className={`h-4 bg-gray-200 rounded ${shimmer}`} style={{ width: '30%' }}></div>
                <div className={`h-3 bg-gray-200 rounded ${shimmer}`}></div>
                <div className={`h-3 bg-gray-200 rounded ${shimmer}`} style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (variant === 'profile') {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className={`w-20 h-20 bg-gray-200 rounded-full ${shimmer}`}></div>
          <div className="flex-1 space-y-2">
            <div className={`h-5 bg-gray-200 rounded ${shimmer}`} style={{ width: '40%' }}></div>
            <div className={`h-3 bg-gray-200 rounded ${shimmer}`} style={{ width: '25%' }}></div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className={`h-3 bg-gray-200 rounded mb-2 ${shimmer}`} style={{ width: '20%' }}></div>
              <div className={`h-10 bg-gray-200 rounded ${shimmer}`}></div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className={`h-10 bg-gray-300 rounded mt-8 w-40 ${shimmer}`}></div>
      </div>
    );
  }

  return (
    <div className={`h-96 bg-gray-200 rounded-lg ${shimmer}`}></div>
  );
};

export default LoadingSkeleton;
