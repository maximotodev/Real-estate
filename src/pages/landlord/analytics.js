import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Analytics = () => {
  const router = useRouter();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/analytics/landlord', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnalytics(response.data);
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!analytics) {
    return <div className="flex justify-center items-center min-h-screen">No data available</div>;
  }

  const { summary, bookingsByStatus, topProperties } = analytics;

  return (
    <>
      <Head>
        <title>Analytics - Real Estate</title>
      </Head>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Property Analytics</h1>
            <a href="/landlord/properties" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
              Back to Properties
            </a>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 text-sm font-medium">Total Properties</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">{summary.totalProperties}</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 text-sm font-medium">Total Bookings</p>
              <p className="text-4xl font-bold text-green-600 mt-2">{summary.totalBookings}</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
              <p className="text-4xl font-bold text-emerald-600 mt-2">${summary.totalRevenue.toLocaleString()}</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 text-sm font-medium">Avg Rating</p>
              <p className="text-4xl font-bold text-yellow-600 mt-2">⭐ {summary.averageRating}</p>
            </div>
          </div>

          {/* Booking Status & Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Status</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Pending</span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-semibold">
                    {bookingsByStatus.pending}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Confirmed</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                    {bookingsByStatus.confirmed}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Active</span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-semibold">
                    {bookingsByStatus.active}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Completed</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                    {bookingsByStatus.completed}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Cancelled</span>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-semibold">
                    {bookingsByStatus.cancelled}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-700">Confirmed Bookings</span>
                  <span className="font-bold text-blue-600">{summary.confirmedBookings}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-700">Completed Bookings</span>
                  <span className="font-bold text-green-600">{summary.completedBookings}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-700">Total Views</span>
                  <span className="font-bold text-purple-600">{summary.totalViews}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-700">Total Reviews</span>
                  <span className="font-bold text-yellow-600">{summary.totalReviews}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Properties */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Performing Properties</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-300">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-800">Property</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-800">Views</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-800">Bookings</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-800">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {topProperties.map((prop, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-800 font-semibold">{prop.title}</td>
                      <td className="px-6 py-4 text-gray-600">{prop.views}</td>
                      <td className="px-6 py-4 text-gray-600">{prop.bookings}</td>
                      <td className="px-6 py-4">
                        <span className="text-yellow-600 font-bold">⭐ {prop.rating.toFixed(1)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ToastContainer position="bottom-center" autoClose={3000} />
      </div>
    </>
  );
};

export default Analytics;
