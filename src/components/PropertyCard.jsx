import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const PropertyCard = ({ property, onWishlistToggle }) => {
  const [isWishlisted, setIsWishlisted] = useState(property?.isWishlisted || false);
  const [imageError, setImageError] = useState(false);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    if (onWishlistToggle) {
      onWishlistToggle(property._id, !isWishlisted);
    }
  };

  const basePrice = property?.pricePerNight || 0;
  const averageRating = property?.averageRating || 0;
  const reviewCount = property?.reviewCount || 0;

  return (
    <Link href={`/properties/${property._id}`}>
      <a className="group block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-gray-200">
          {!imageError ? (
            <Image
              src={property?.image || '/placeholder-property.jpg'}
              alt={property?.title}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
              priority={false}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
              <span className="text-gray-600 font-semibold">No Image</span>
            </div>
          )}

          {/* Badge */}
          {property?.isNew && (
            <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              New Listing
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Add to wishlist"
          >
            <svg
              className={`w-6 h-6 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
              fill={isWishlisted ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Property Type */}
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            {property?.type || 'Apartment'}
          </p>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {property?.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-3">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">{property?.city || 'Location'}</span>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm font-semibold text-gray-900">{averageRating.toFixed(1)}</span>
            <span className="ml-1 text-sm text-gray-600">({reviewCount})</span>
          </div>

          {/* Amenities */}
          {property?.bedrooms && (
            <div className="flex gap-4 mb-4 text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.5 1.5H3a1.5 1.5 0 00-1.5 1.5v12a1.5 1.5 0 001.5 1.5h5v2h2v-2h5a1.5 1.5 0 001.5-1.5V3a1.5 1.5 0 00-1.5-1.5zM4 5h2.5v2H4V5zm0 4h2.5v2H4V9zm4-4h2.5v2H8V5zm0 4h2.5v2H8V9zm4-4h2.5v2H12V5zm0 4h2.5v2H12V9z" />
                </svg>
                <span>{property.bedrooms} Beds</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                <span>{property.bathrooms || 1} Baths</span>
              </div>
            </div>
          )}

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900">${basePrice}</span>
              <span className="text-sm text-gray-600">/night</span>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
              View Details
            </button>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default PropertyCard;
