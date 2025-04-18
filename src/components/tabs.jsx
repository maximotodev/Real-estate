import React, { useState } from 'react';
import Link from 'next/link';

const FILTER_TABS = [
  { id: 'all', label: 'All Properties' },
  { id: 'apartment', label: 'Apartments' },
  { id: 'house', label: 'Houses' },
  { id: 'villa', label: 'Villas' },
];

const SAMPLE_PROPERTIES = [
  { id: 1, title: 'Modern Downtown Apartment', type: 'apartment', city: 'New York', price: 280, beds: 2, baths: 1, rating: 4.8, reviews: 124, badge: 'Popular' },
  { id: 2, title: 'Beachfront Villa', type: 'villa', city: 'Miami', price: 540, beds: 4, baths: 3, rating: 4.9, reviews: 87, badge: 'Featured' },
  { id: 3, title: 'Cozy Family House', type: 'house', city: 'Austin', price: 195, beds: 3, baths: 2, rating: 4.7, reviews: 56, badge: null },
  { id: 4, title: 'Luxury Penthouse Suite', type: 'apartment', city: 'Chicago', price: 420, beds: 3, baths: 2, rating: 4.9, reviews: 203, badge: 'New' },
  { id: 5, title: 'Countryside Retreat', type: 'house', city: 'Denver', price: 175, beds: 4, baths: 2, rating: 4.6, reviews: 41, badge: null },
  { id: 6, title: 'Ocean View Villa', type: 'villa', city: 'Los Angeles', price: 680, beds: 5, baths: 4, rating: 5.0, reviews: 32, badge: 'Premium' },
];

const BADGE_COLORS = {
  Popular: 'bg-blue-100 text-blue-700',
  Featured: 'bg-orange-100 text-orange-700',
  New: 'bg-green-100 text-green-700',
  Premium: 'bg-purple-100 text-purple-700',
};

const StarIcon = () => (
  <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>
);

const Tabs = ({ tabs, defaultTab = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultTab);
  const [activeFilter, setActiveFilter] = useState('all');

  // If caller passes tabs config, render generic tab switcher
  if (tabs && tabs.length > 0) {
    return (
      <div>
        <div className="flex border-b border-gray-200 gap-1 mb-0 overflow-x-auto">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`px-6 py-4 font-semibold transition-colors whitespace-nowrap ${
                activeIndex === index
                  ? 'text-blue-600 border-b-2 border-blue-600 text-base'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {tab.badge && (
                <span className="ml-2 inline-block px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full font-semibold">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="pt-6">
          {typeof tabs[activeIndex]?.content === 'string' ? (
            <p className="text-gray-700">{tabs[activeIndex].content}</p>
          ) : (
            tabs[activeIndex]?.content
          )}
        </div>
      </div>
    );
  }

  // Default: property browser used by Deals section
  const filtered = activeFilter === 'all'
    ? SAMPLE_PROPERTIES
    : SAMPLE_PROPERTIES.filter((p) => p.type === activeFilter);

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeFilter === tab.id
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-orange-400 hover:text-orange-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((property) => (
          <div
            key={property.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
          >
            {/* Image Area */}
            <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
              <span className="text-5xl">
                {property.type === 'apartment' ? '🏢' : property.type === 'villa' ? '🏖️' : '🏠'}
              </span>
              {property.badge && (
                <span className={`absolute top-3 left-3 text-xs font-bold px-2 py-0.5 rounded-full ${BADGE_COLORS[property.badge]}`}>
                  {property.badge}
                </span>
              )}
              <button
                aria-label="Save to wishlist"
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow transition-colors"
              >
                <svg className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </button>
            </div>

            {/* Card Body */}
            <div className="p-5">
              <h3 className="font-bold text-gray-900 dark:text-white text-base leading-snug mb-1">{property.title}</h3>
              <p className="text-gray-400 text-xs mb-3 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                {property.city}
              </p>

              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4">
                <span>{property.beds} beds</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"/>
                <span>{property.baths} baths</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"/>
                <span className="flex items-center gap-0.5">
                  <StarIcon />
                  {property.rating} ({property.reviews})
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-extrabold text-gray-900 dark:text-white">${property.price}</span>
                  <span className="text-gray-400 text-xs"> / night</span>
                </div>
                <Link
                  href={`/properties/${property.id}`}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All */}
      <div className="text-center mt-10">
        <Link
          href="/properties"
          className="inline-block px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors shadow-md"
        >
          View All Properties
        </Link>
      </div>
    </div>
  );
};

export default Tabs;
