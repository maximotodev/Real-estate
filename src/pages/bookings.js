import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import BookingCard from '../components/BookingCard';
import { useAuth } from '../hooks/useAuth';

const BookingsPage = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/bookings', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch bookings');

        const data = await response.json();
        setBookings(data.data || data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

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
          <p className="text-gray-600 mb-6">Please sign in to view your bookings.</p>
          <Link href="/auth/login">
            <a className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Sign In
            </a>
          </Link>
        </div>
      </div>
    );
  }

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  };

  return (
    <>
      <Head>
        <title>My Bookings - Real Estate</title>
        <meta name="description" content="Manage your property bookings and reservations" />
      </Head>

      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
            <p className="text-gray-600">Manage and track all your property bookings and reservations</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Bookings', value: stats.total, color: 'bg-blue-100 text-blue-800' },
              { label: 'Confirmed', value: stats.confirmed, color: 'bg-green-100 text-green-800' },
              { label: 'Pending', value: stats.pending, color: 'bg-yellow-100 text-yellow-800' },
              { label: 'Cancelled', value: stats.cancelled, color: 'bg-red-100 text-red-800' },
            ].map((stat) => (
              <div key={stat.label} className={`${stat.color} rounded-lg p-4`}>
                <p className="text-sm font-semibold opacity-75 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'All Bookings' },
              { value: 'confirmed', label: 'Confirmed' },
              { value: 'pending', label: 'Pending' },
              { value: 'cancelled', label: 'Cancelled' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
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
              <p className="font-semibold mb-1">Error loading bookings</p>
              <p>{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center min-h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredBookings.length === 0 ? (
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-6">You don't have any bookings with the selected filter.</p>
              <Link href="/properties">
                <a className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Browse Properties
                </a>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredBookings.map((booking) => (
                <BookingCard key={booking._id} booking={booking} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingsPage;
