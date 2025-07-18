import React, { useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../../hooks/useAuth';

const LandlordReviewsPage = () => {
  const { user, isLoading } = useAuth();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const reviews = [
    {
      id: 1,
      author: 'Sarah Johnson',
      property: 'Downtown Apartment',
      rating: 5,
      date: '2024-05-15',
      text: 'Excellent property! Clean, well-maintained, and the host was very responsive. Would definitely book again!',
      helpful: 12,
    },
    {
      id: 2,
      author: 'Mike Chen',
      property: 'Beach House',
      rating: 4,
      date: '2024-05-10',
      text: 'Great location and amenities. The only minor issue was the WiFi was a bit slow, but overall a great stay.',
      helpful: 8,
    },
    {
      id: 3,
      author: 'Emma Davis',
      property: 'Downtown Apartment',
      rating: 5,
      date: '2024-04-28',
      text: 'Perfect for a city getaway. Loved the modern decor and all the conveniences nearby. Highly recommended!',
      helpful: 15,
    },
    {
      id: 4,
      author: 'James Wilson',
      property: 'Mountain Villa',
      rating: 3,
      date: '2024-04-20',
      text: 'Nice property but a bit smaller than expected. Good value for the price.',
      helpful: 5,
    },
  ];

  const stats = {
    average: 4.25,
    total: reviews.length,
    5star: reviews.filter((r) => r.rating === 5).length,
    4star: reviews.filter((r) => r.rating === 4).length,
    3star: reviews.filter((r) => r.rating === 3).length,
  };

  const filteredReviews = reviews.filter((r) => {
    if (filter === 'all') return true;
    return r.rating === parseInt(filter);
  });

  if (isLoading) {
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
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Reviews - Landlord Dashboard</title>
        <meta name="description" content="Manage and view guest reviews" />
      </Head>

      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Guest Reviews</h1>

          {/* Rating Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm mb-2">Average Rating</p>
              <div className="flex items-baseline gap-2">
                <p className="text-5xl font-bold text-yellow-400">{stats.average}</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(stats.average) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-2">{stats.total} total reviews</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm mb-4">Rating Distribution</p>
              <div className="space-y-2">
                {[5, 4, 3].map((star) => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-sm font-semibold w-8">{star}★</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400"
                        style={{
                          width: `${((stats[`${star}star`] || 0) / stats.total) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{stats[`${star}star`] || 0}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm mb-4">Filters</p>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="all">All Reviews</option>
                <option value="5">5 Stars Only</option>
                <option value="4">4 Stars Only</option>
                <option value="3">3 Stars Only</option>
              </select>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-gray-900">{review.author}</p>
                    <p className="text-sm text-gray-600">{review.property}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{review.text}</p>

                <div className="flex items-center justify-between text-sm">
                  <p className="text-gray-600">
                    {new Date(review.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <button className="text-blue-600 hover:text-blue-700 font-semibold">
                    Reply to Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandlordReviewsPage;
