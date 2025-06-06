import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PropertyCard from '../components/PropertyCard';
import { useAuth } from '../hooks/useAuth';

const WishlistPage = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/wishlist', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch wishlist');

        const data = await response.json();
        setProperties(data.data || data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching wishlist:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user]);

  const handleRemoveFromWishlist = async (propertyId) => {
    try {
      const response = await fetch(`/api/wishlist/${propertyId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setProperties(properties.filter((p) => p._id !== propertyId));
      }
    } catch (err) {
      console.error('Error removing from wishlist:', err);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h1>
          <p className="text-gray-600 mb-6">Please sign in to access your wishlist.</p>
          <Link href="/auth/login">
            <a className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Sign In
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>My Wishlist - Real Estate</title>
        <meta name="description" content="View and manage your saved favorite properties" />
      </Head>

      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
            <p className="text-gray-600">
              {properties.length > 0
                ? `You have ${properties.length} saved properties`
                : 'No properties saved yet'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p className="font-semibold mb-1">Error loading wishlist</p>
              <p>{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center min-h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : properties.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-6">Save properties you love to view them later</p>
              <Link href="/properties">
                <a className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Browse Properties
                </a>
              </Link>
            </div>
          ) : (
            <>
              {/* Wishlist Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {properties.map((property) => (
                  <div key={property._id} className="relative">
                    <PropertyCard
                      property={property}
                      onWishlistToggle={() => handleRemoveFromWishlist(property._id)}
                    />
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-3">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Compare Selected
                  </button>
                  <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                    Share Wishlist
                  </button>
                  <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                    Save as PDF
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistPage;
