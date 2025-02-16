import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const router = useRouter();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      router.push('/auth/login');
      return;
    }

    const parsedUser = JSON.parse(user);
    if (parsedUser.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDashboard(response.data);
    } catch (error) {
      toast.error('Failed to load admin dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!dashboard) {
    return <div className="flex justify-center items-center min-h-screen">Not authorized</div>;
  }

  const { summary, bookingStats, recentUsers, recentBookings, recentReviews } = dashboard;

  return (
    <>
      <Head>
        <title>Admin Dashboard - Real Estate</title>
      </Head>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
            <div className="flex gap-2">
              <a href="/admin/users" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
                Manage Users
              </a>
              <a href="/admin/reviews" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg">
                Manage Reviews
              </a>
              <a href="/dashboard" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg">
                Dashboard
              </a>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 text-sm font-medium">Total Users</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">{summary.totalUsers}</p>
              <p className="text-xs text-gray-500 mt-2">
                Renters: {summary.totalRenters} | Landlords: {summary.totalLandlords}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 text-sm font-medium">Total Properties</p>
              <p className="text-4xl font-bold text-green-600 mt-2">{summary.totalProperties}</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 text-sm font-medium">Total Bookings</p>
              <p className="text-4xl font-bold text-purple-600 mt-2">{summary.totalBookings}</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 text-sm font-medium">Total Reviews</p>
              <p className="text-4xl font-bold text-yellow-600 mt-2">{summary.totalReviews}</p>
            </div>
          </div>

          {/* Booking Status */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Status Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-gray-700 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{bookingStats.pending}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-gray-700 text-sm">Confirmed</p>
                <p className="text-2xl font-bold text-blue-600">{bookingStats.confirmed}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-gray-700 text-sm">Active</p>
                <p className="text-2xl font-bold text-purple-600">{bookingStats.active}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-gray-700 text-sm">Completed</p>
                <p className="text-2xl font-bold text-green-600">{bookingStats.completed}</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-gray-700 text-sm">Cancelled</p>
                <p className="text-2xl font-bold text-red-600">{bookingStats.cancelled}</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Users */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Users</h2>
              <div className="space-y-3">
                {recentUsers.map((user) => (
                  <div key={user._id} className="p-3 bg-gray-50 rounded border border-gray-200">
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                    <span className="inline-block mt-2 text-xs font-bold px-2 py-1 rounded-full bg-blue-100 text-blue-800 capitalize">
                      {user.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Bookings</h2>
              <div className="space-y-3">
                {recentBookings.map((booking) => (
                  <div key={booking._id} className="p-3 bg-gray-50 rounded border border-gray-200">
                    <p className="font-semibold text-gray-800">${booking.totalPrice}</p>
                    <p className="text-xs text-gray-600">
                      {new Date(booking.checkInDate).toLocaleDateString()}
                    </p>
                    <span className={`inline-block mt-2 text-xs font-bold px-2 py-1 rounded-full ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Reviews</h2>
              <div className="space-y-3">
                {recentReviews.map((review) => (
                  <div key={review._id} className="p-3 bg-gray-50 rounded border border-gray-200">
                    <p className="font-semibold text-yellow-600">{'⭐'.repeat(review.rating)}</p>
                    <p className="text-xs text-gray-600 mt-1 truncate">{review.comment}</p>
                    <span className={`inline-block mt-2 text-xs font-bold px-2 py-1 rounded-full ${
                      review.verified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {review.verified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position="bottom-center" autoClose={3000} />
      </div>
    </>
  );
};

export default AdminDashboard;
