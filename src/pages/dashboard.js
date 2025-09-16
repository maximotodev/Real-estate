import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const QUICK_ACTIONS = [
  { label: 'Browse Properties', href: '/properties', icon: '🏠', color: 'bg-blue-50 text-blue-600' },
  { label: 'My Bookings', href: '/bookings', icon: '📅', color: 'bg-green-50 text-green-600' },
  { label: 'Wishlist', href: '/wishlist', icon: '❤️', color: 'bg-red-50 text-red-600' },
  { label: 'Messages', href: '/messages', icon: '💬', color: 'bg-purple-50 text-purple-600' },
  { label: 'Notifications', href: '/notifications', icon: '🔔', color: 'bg-yellow-50 text-yellow-600' },
  { label: 'Profile Settings', href: '/profile', icon: '⚙️', color: 'bg-gray-50 text-gray-600' },
];

const STATUS_COLORS = {
  confirmed: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-blue-100 text-blue-800',
};

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }
    fetchData(token);
  }, []);

  const fetchData = async (token) => {
    try {
      const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

      const [userRes, bookingsRes, wishlistRes] = await Promise.allSettled([
        fetch('/api/users/profile', { headers }),
        fetch('/api/bookings?role=renter', { headers }),
        fetch('/api/wishlist', { headers }),
      ]);

      if (userRes.status === 'fulfilled' && userRes.value.ok) {
        setUser(await userRes.value.json());
      }
      if (bookingsRes.status === 'fulfilled' && bookingsRes.value.ok) {
        setBookings(await bookingsRes.value.json());
      }
      if (wishlistRes.status === 'fulfilled' && wishlistRes.value.ok) {
        setWishlist(await wishlistRes.value.json());
      }
    } catch (err) {
      setError('Failed to load dashboard data. Please refresh.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const removeFromWishlist = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/wishlist/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setWishlist((prev) => prev.filter((item) => item._id !== id));
    } catch {
      // silently fail — UI stays consistent, user can retry
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const activeBookings = bookings.filter((b) => b.status === 'confirmed').length;
  const totalSpent = bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'bookings', label: `Bookings (${bookings.length})` },
    { id: 'wishlist', label: `Wishlist (${wishlist.length})` },
    { id: 'profile', label: 'Profile' },
  ];

  return (
    <>
      <Head>
        <title>Dashboard - Constructor Real Estate</title>
        <meta name="description" content="Manage your bookings, wishlist, and profile" />
      </Head>

      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!
              </h1>
              <p className="text-gray-500 mt-1 text-sm">Here's what's happening with your account.</p>
            </div>
            <button
              onClick={handleLogout}
              className="self-start sm:self-auto px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-sm transition-colors"
            >
              Sign Out
            </button>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Bookings', value: bookings.length, color: 'text-blue-600' },
              { label: 'Active Stays', value: activeBookings, color: 'text-green-600' },
              { label: 'Saved Properties', value: wishlist.length, color: 'text-red-500' },
              { label: 'Total Spent', value: `$${totalSpent.toLocaleString()}`, color: 'text-purple-600' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                <p className="text-gray-500 text-xs mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex border-b border-gray-100 overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">

              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  <h2 className="font-semibold text-gray-900 mb-5">Quick Actions</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                    {QUICK_ACTIONS.map((action) => (
                      <Link
                        key={action.href}
                        href={action.href}
                        className={`flex items-center gap-3 p-4 rounded-xl ${action.color} bg-opacity-60 hover:scale-105 transition-transform`}
                      >
                        <span className="text-2xl">{action.icon}</span>
                        <span className="font-semibold text-sm">{action.label}</span>
                      </Link>
                    ))}
                  </div>

                  {bookings.length > 0 && (
                    <div>
                      <h2 className="font-semibold text-gray-900 mb-4">Recent Bookings</h2>
                      <div className="space-y-3">
                        {bookings.slice(0, 3).map((booking) => (
                          <div key={booking._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                              <p className="text-sm font-semibold text-gray-900">Booking #{booking._id?.slice(-6)}</p>
                              <p className="text-xs text-gray-400 mt-0.5">
                                {new Date(booking.checkInDate).toLocaleDateString()} — {new Date(booking.checkOutDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[booking.status] || 'bg-gray-100 text-gray-600'}`}>
                                {booking.status}
                              </span>
                              <p className="text-sm font-bold text-gray-900 mt-1">${booking.totalPrice}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Bookings Tab */}
              {activeTab === 'bookings' && (
                <div>
                  {bookings.length === 0 ? (
                    <div className="text-center py-16">
                      <p className="text-4xl mb-4">📅</p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
                      <p className="text-gray-500 text-sm mb-6">Start exploring properties and make your first booking.</p>
                      <Link href="/properties" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg text-sm hover:bg-blue-700 transition-colors">
                        Browse Properties
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <div key={booking._id} className="border border-gray-200 rounded-xl p-5">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-xs text-gray-400">Booking #{booking._id?.slice(-8)}</p>
                              <p className="font-semibold text-gray-900 mt-1">
                                {new Date(booking.checkInDate).toLocaleDateString()} &rarr; {new Date(booking.checkOutDate).toLocaleDateString()}
                              </p>
                              <p className="text-gray-500 text-sm mt-0.5">{booking.numberOfNights} nights</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-green-600">${booking.totalPrice}</p>
                              <span className={`mt-1 inline-block px-3 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[booking.status] || 'bg-gray-100 text-gray-600'}`}>
                                {booking.status}
                              </span>
                            </div>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Link
                              href={`/booking-details/${booking._id}`}
                              className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              View Details
                            </Link>
                            {booking.status === 'pending' && (
                              <button className="px-4 py-2 bg-red-50 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors">
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div>
                  {wishlist.length === 0 ? (
                    <div className="text-center py-16">
                      <p className="text-4xl mb-4">❤️</p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved properties</h3>
                      <p className="text-gray-500 text-sm mb-6">Save properties you love to revisit them later.</p>
                      <Link href="/properties" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg text-sm hover:bg-blue-700 transition-colors">
                        Explore Properties
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {wishlist.map((item) => (
                        <div key={item._id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                          {item.propertyImage && (
                            <img src={item.propertyImage} alt={item.propertyTitle} className="w-full h-40 object-cover"/>
                          )}
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-900 text-sm">{item.propertyTitle}</h3>
                            <p className="text-lg font-bold text-blue-600 mt-1">${item.propertyPrice}<span className="text-xs text-gray-400 font-normal">/night</span></p>
                            <div className="flex gap-2 mt-3">
                              <Link
                                href={`/properties/${item.propertyId}`}
                                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg text-center transition-colors"
                              >
                                View
                              </Link>
                              <button
                                onClick={() => removeFromWishlist(item._id)}
                                className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-lg transition-colors"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && user && (
                <div>
                  <h2 className="font-semibold text-gray-900 mb-5">Profile Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                    {[
                      { label: 'Full Name', value: user.name },
                      { label: 'Email', value: user.email },
                      { label: 'Phone', value: user.phone || 'Not provided' },
                      { label: 'Role', value: user.role },
                      { label: 'City', value: user.city || 'Not provided' },
                      { label: 'Member Since', value: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A' },
                    ].map((field) => (
                      <div key={field.label} className="bg-gray-50 rounded-xl p-4">
                        <p className="text-xs text-gray-400 mb-1">{field.label}</p>
                        <p className="font-semibold text-gray-900 capitalize">{field.value}</p>
                      </div>
                    ))}
                  </div>
                  {user.bio && (
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                      <p className="text-xs text-gray-400 mb-1">Bio</p>
                      <p className="text-gray-700 text-sm">{user.bio}</p>
                    </div>
                  )}
                  <Link
                    href="/profile"
                    className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-colors"
                  >
                    Edit Full Profile
                  </Link>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
