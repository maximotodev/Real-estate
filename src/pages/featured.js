import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import PropertyCard from '../components/PropertyCard';

const FeaturedPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/properties?isFeatured=true', {
          method: 'GET',
        });

        if (!response.ok) throw new Error('Failed to fetch featured properties');

        const data = await response.json();
        setProperties(data.data || []);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching featured properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const filteredProperties = properties.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'premium') return p.isPremium;
    if (filter === 'newListing') return p.isNew;
    return true;
  });

  return (
    <>
      <Head>
        <title>Featured Properties - Real Estate</title>
        <meta name="description" content="Browse our featured and premium property listings" />
      </Head>

      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our hand-picked selection of premium properties with exceptional locations,
              amenities, and value
            </p>
          </div>

          {/* Feature Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Premium Listings', value: properties.filter((p) => p.isPremium).length },
              { label: 'New Listings', value: properties.filter((p) => p.isNew).length },
              { label: 'Avg. Rating', value: '4.8' },
              { label: 'Quick Approval', value: '24h' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</p>
                <p className="text-gray-600 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-3">
            {[
              { value: 'all', label: 'All Featured' },
              { value: 'premium', label: 'Premium Only' },
              { value: 'newListing', label: 'New Listings' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  filter === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p className="font-semibold mb-1">Error loading properties</p>
              <p>{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center min-h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600">Try different filters to find featured properties</p>
            </div>
          ) : (
            <>
              {/* Properties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>

              {/* Info Section */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Featured Properties?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Verified Hosts',
                      description: 'All hosts are thoroughly vetted and verified',
                    },
                    {
                      title: 'Quality Guarantee',
                      description: 'Properties meet our high quality standards',
                    },
                    {
                      title: 'Priority Support',
                      description: 'Get dedicated support throughout your stay',
                    },
                  ].map((feature) => (
                    <div key={feature.title} className="text-center">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FeaturedPage;
