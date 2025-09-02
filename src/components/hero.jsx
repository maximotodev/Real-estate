import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import heroBg from '../assets/images/heroBackground.png';

const PROPERTY_TYPES = ['Any Type', 'Apartment', 'House', 'Villa', 'Studio', 'Office'];

const Hero = ({ address, phone, email }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('Any Type');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    if (propertyType !== 'Any Type') params.set('type', propertyType);
    router.push(`/search?${params.toString()}`);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col">
      <Image
        src={heroBg}
        alt="Real estate background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 text-center">

        <span className="inline-block bg-orange-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full mb-6">
          Real Estate Platform
        </span>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight max-w-4xl">
          Find Real Estate <br className="hidden sm:block" />
          <span className="text-orange-400">That Suits You</span>
        </h1>

        <p className="mt-5 text-gray-200 text-base sm:text-lg max-w-xl">
          Browse thousands of verified listings across apartments, houses, villas, and more. Your next home is one search away.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="mt-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col sm:flex-row overflow-hidden"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="City, neighborhood, or address..."
            className="flex-1 px-5 py-4 text-gray-800 placeholder-gray-400 text-sm outline-none"
          />
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="px-4 py-4 text-gray-600 text-sm border-t sm:border-t-0 sm:border-l border-gray-200 outline-none bg-white"
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <button
            type="submit"
            className="px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-colors"
          >
            Search
          </button>
        </form>

        {/* Quick Stats */}
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {[
            { value: '10,000+', label: 'Properties Listed' },
            { value: '50,000+', label: 'Happy Customers' },
            { value: '25,000+', label: 'Bookings Completed' },
            { value: '4.8★', label: 'Average Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-extrabold text-white">{stat.value}</p>
              <p className="text-gray-300 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        {(address || phone || email) && (
          <div className="hidden sm:flex mt-10 gap-8 text-gray-300 text-sm">
            {address && (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                {address}
              </span>
            )}
            {phone && (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                {phone}
              </span>
            )}
            {email && (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                {email}
              </span>
            )}
          </div>
        )}

        {/* Scroll Button */}
        <button
          onClick={() => scrollToSection('about-container')}
          aria-label="Scroll down"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 border border-white/40 flex items-center justify-center transition-colors animate-bounce"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;
