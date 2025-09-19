import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 12547,
    totalProperties: 8934,
    totalBookings: 45230,
    totalRevenue: 2345600,
    pendingReviews: 23,
    flaggedContent: 7,
    activeUsers: 4532,
    newUsers: 234,
  });

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      <Head>
        <title>Admin Dashboard - Real Estate</title>
      </Head>

      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Platform management and analytics</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Users', value: stats.totalUsers.toLocaleString(), color: 'blue', trend: '+12.5%' },
              { label: 'Properties', value: stats.totalProperties.toLocaleString(), color: 'green', trend: '+8.2%' },
              { label: 'Bookings', value: stats.totalBookings.toLocaleString(), color: 'purple', trend: '+23.1%' },
              { label: 'Revenue', value: `$${(stats.totalRevenue / 1000000).toFixed(2)}M`, color: 'orange', trend: '+15.3%' },
            ].map((metric, idx) => (
              <div key={idx} className={`bg-white rounded-lg shadow p-6 border-l-4 border-${metric.color}-500`}>
                <p className="text-gray-600 text-sm font-semibold mb-2">{metric.label}</p>
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-green-600 text-sm mt-2 font-semibold">{metric.trend}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Pending Reviews', value: stats.pendingReviews, color: 'yellow', icon: '⭐' },
              { label: 'Flagged Content', value: stats.flaggedContent, color: 'red', icon: '⚠️' },
              { label: 'Active Users', value: stats.activeUsers.toLocaleString(), color: 'green', icon: '👥' },
              { label: 'New Users', value: stats.newUsers, color: 'blue', icon: '📝' },
            ].map((item, idx) => (
              <div key={idx} className={`bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold">{item.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{item.value}</p>
                  </div>
                  <span className="text-4xl">{item.icon}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Admin Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">User Management</h3>
              <div className="space-y-2">
                <Link href="/admin/users">
                  <a className="block px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors font-semibold">
                    Manage Users
                  </a>
                </Link>
                <Link href="/admin/users/banned">
                  <a className="block px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors font-semibold">
                    Banned Accounts
                  </a>
                </Link>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors font-semibold">
                  User Reports
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Content Moderation</h3>
              <div className="space-y-2">
                <Link href="/admin/reviews">
                  <a className="block px-4 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors font-semibold">
                    Pending Reviews
                  </a>
                </Link>
                <Link href="/admin/properties">
                  <a className="block px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors font-semibold">
                    Properties
                  </a>
                </Link>
                <Link href="/admin/flagged">
                  <a className="block px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors font-semibold">
                    Flagged Content
                  </a>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">System Settings</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors font-semibold">
                  Site Settings
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors font-semibold">
                  Email Configuration
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors font-semibold">
                  Payment Settings
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {[
                { time: '5 minutes ago', action: 'New user registered', user: 'john.doe@example.com', icon: '📝' },
                { time: '15 minutes ago', action: 'Property listing created', user: 'Downtown Apartment', icon: '🏠' },
                { time: '1 hour ago', action: 'Booking confirmed', user: 'Booking #12345', icon: '✅' },
                { time: '2 hours ago', action: 'Review flagged', user: 'Review ID: 67890', icon: '⚠️' },
                { time: '3 hours ago', action: 'Payment processed', user: 'Transaction #54321', icon: '💰' },
              ].map((item, idx) => (
                <div key={idx} className="p-6 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{item.action}</p>
                      <p className="text-sm text-gray-600">{item.user}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
