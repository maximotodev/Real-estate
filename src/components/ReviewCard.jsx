import React from 'react';

const ReviewCard = ({ review, compact = false }) => {
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className={`${compact ? 'border-b border-gray-200 py-4 last:border-b-0' : 'bg-white rounded-lg shadow-md p-6'}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-900">{review.reviewerName}</h4>
          <p className="text-xs text-gray-600">{formatDate(review.createdAt)}</p>
        </div>
        {renderStars(review.rating)}
      </div>

      {/* Title */}
      {review.title && (
        <h5 className="font-semibold text-gray-800 mb-2">{review.title}</h5>
      )}

      {/* Review Text */}
      <p className="text-gray-700 text-sm leading-relaxed mb-4">{review.comment}</p>

      {/* Helpful Votes */}
      <div className="flex items-center gap-4 text-sm">
        <button className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.646 7.23a2 2 0 01-1.789 1.106H7a2 2 0 01-2-2v-6.764a2 2 0 01.586-1.414l5.172-5.172a2 2 0 011.414-.586h3.172a2 2 0 012 2v1" />
          </svg>
          Helpful
        </button>
        {review.helpfulCount > 0 && (
          <span className="text-gray-600">({review.helpfulCount})</span>
        )}
      </div>

      {/* Highlighted Tags */}
      {review.tags && review.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {review.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
