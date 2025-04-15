import React from 'react';

const TestimonialCard = ({ testimonial, variant = 'default' }) => {
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

  if (variant === 'compact') {
    return (
      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <div className="mb-3">{renderStars(testimonial.rating)}</div>
        <p className="text-gray-700 text-sm mb-3 leading-relaxed">"{testimonial.comment}"</p>
        <p className="font-semibold text-gray-900 text-sm">{testimonial.authorName}</p>
        <p className="text-xs text-gray-600">{testimonial.location}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {/* Quote Icon */}
      <svg className="w-8 h-8 text-blue-600 mb-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M3 21c3-1 7-4 7-8.5C10 5.5 8.5.5 5 .5c-1.6 0-3 .5-4.5 1.5C.5 3.5 0 5 0 6.5c0 2.6 1.5 4.6 3 5.5V21c0 .5.5 1 1 1z" />
        <path d="M15 21c3-1 7-4 7-8.5C22 5.5 20.5.5 17 .5c-1.6 0-3 .5-4.5 1.5C12.5 3.5 12 5 12 6.5c0 2.6 1.5 4.6 3 5.5V21c0 .5.5 1 1 1z" />
      </svg>

      {/* Rating */}
      <div className="mb-4">{renderStars(testimonial.rating)}</div>

      {/* Comment */}
      <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.comment}</p>

      {/* Author Info */}
      <div className="flex items-center gap-4">
        {testimonial.authorImage && (
          <img
            src={testimonial.authorImage}
            alt={testimonial.authorName}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div>
          <p className="font-semibold text-gray-900">{testimonial.authorName}</p>
          <p className="text-sm text-gray-600">{testimonial.location}</p>
        </div>
      </div>

      {/* Verified Badge */}
      {testimonial.verified && (
        <div className="mt-4 flex items-center gap-2 text-green-600 text-sm">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Verified Guest
        </div>
      )}
    </div>
  );
};

export default TestimonialCard;
