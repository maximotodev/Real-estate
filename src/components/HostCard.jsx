import React from 'react';
import Link from 'next/link';

const HostCard = ({ host }) => {
  const responseRate = host?.responseRate || 95;
  const verificationBadges = [
    ...(host?.emailVerified ? ['Email Verified'] : []),
    ...(host?.phoneVerified ? ['Phone Verified'] : []),
    ...(host?.superhost ? ['Superhost'] : []),
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      {/* Host Avatar and Info */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
          {host?.firstName?.charAt(0)}{host?.lastName?.charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg">{host?.firstName} {host?.lastName}</h3>
          <p className="text-sm text-gray-600">Host since {new Date(host?.createdAt).getFullYear()}</p>
        </div>
      </div>

      {/* Rating */}
      {host?.averageRating && (
        <div className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(host.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="font-bold text-gray-900">{host.averageRating.toFixed(1)}</span>
          <span className="text-sm text-gray-600">({host.reviewCount || 0} reviews)</span>
        </div>
      )}

      {/* Verification Badges */}
      {verificationBadges.length > 0 && (
        <div className="mb-6 pb-6 border-b border-gray-200">
          <p className="text-xs font-semibold text-gray-600 uppercase mb-3">Verified</p>
          <div className="flex flex-wrap gap-2">
            {verificationBadges.map((badge) => (
              <div key={badge} className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {badge}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-gray-200">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{host?.propertyCount || 0}</p>
          <p className="text-xs text-gray-600">Properties</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{responseRate}%</p>
          <p className="text-xs text-gray-600">Response Rate</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{host?.yearsHosting || 0}</p>
          <p className="text-xs text-gray-600">Years Hosting</p>
        </div>
      </div>

      {/* Bio */}
      {host?.bio && (
        <div className="mb-6 pb-6 border-b border-gray-200">
          <p className="text-sm text-gray-700">{host.bio}</p>
        </div>
      )}

      {/* Contact Buttons */}
      <div className="space-y-3">
        <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
          Send Message
        </button>
        <button className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
          View All Properties
        </button>
      </div>

      {/* Response Info */}
      {host?.responseTime && (
        <p className="text-xs text-gray-600 text-center mt-4">
          Typically responds within {host.responseTime} hours
        </p>
      )}
    </div>
  );
};

export default HostCard;
