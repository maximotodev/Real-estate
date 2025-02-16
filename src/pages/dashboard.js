import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [userRes, bookingsRes, wishlistRes] = await Promise.all([
        axios.get('/api/users/profile', { headers }),
        axios.get('/api/bookings?role=renter', { headers }),
        axios.get('/api/wishlist', { headers }),
      ]);

      setUser(userRes.data);
      setBookings(bookingsRes.data);
      setWishlist(wishlistRes.data);
    } catch (error) {
      toast.error('Failed to load data');
      if (error.response?.status === 401) {
        router.push('/auth/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    router.push('/');
  };

  const removeFromWishlist = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/wishlist/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(wishlist.filter((item) => item._id !== id));
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove from wishlist');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Dashboard - Real Estate</title>
      </Head>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg"
            >
              Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-gray-300">
            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-2 px-4 font-medium ${
                activeTab === 'profile'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`pb-2 px-4 font-medium ${
                activeTab === 'bookings'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              My Bookings ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`pb-2 px-4 font-medium ${
                activeTab === 'wishlist'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Wishlist ({wishlist.length})
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && user && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 text-sm">Full Name</p>
                  <p className="text-lg font-semibold">{user.name}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Email</p>
                  <p className="text-lg font-semibold">{user.email}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Phone</p>
                  <p className="text-lg font-semibold">{user.phone || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Role</p>
                  <p className="text-lg font-semibold capitalize">{user.role}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">City</p>
                  <p className="text-lg font-semibold">{user.city || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Bio</p>
                  <p className="text-lg font-semibold">{user.bio || 'Not provided'}</p>
                </div>
              </div>
              <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
                Edit Profile
              </button>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div>
              {bookings.length === 0 ? (
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                  <p className="text-gray-600 text-lg">No bookings yet</p>
                  <a href="/properties" className="text-blue-600 hover:underline mt-4 inline-block">
                    Browse Properties
                  </a>
                </div>
              ) : (
                <div className="grid gap-4">
                  {bookings.map((booking) => (
                    <div key={booking._id} className="bg-white rounded-lg shadow-lg p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-600">Booking ID: {booking._id}</p>
                          <p className="text-lg font-semibold mt-2">
                            {new Date(booking.checkInDate).toLocaleDateString()} -{' '}
                            {new Date(booking.checkOutDate).toLocaleDateString()}
                          </p>
                          <p className="text-gray-600 mt-2">{booking.numberOfNights} nights</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">${booking.totalPrice}</p>
                          <span className={`inline-block mt-2 px-3 py-1 rounded-full text-white text-sm ${
                            booking.status === 'confirmed'
                              ? 'bg-green-500'
                              : booking.status === 'cancelled'
                              ? 'bg-red-500'
                              : 'bg-yellow-500'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
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
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                  <p className="text-gray-600 text-lg">No saved properties yet</p>
                  <a href="/properties" className="text-blue-600 hover:underline mt-4 inline-block">
                    Explore Properties
                  </a>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map((item) => (
                    <div key={item._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                      {item.propertyImage && (
                        <img src={item.propertyImage} alt={item.propertyTitle} className="w-full h-48 object-cover" />
                      )}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800">{item.propertyTitle}</h3>
                        <p className="text-2xl font-bold text-blue-600 mt-2">${item.propertyPrice}</p>
                        <div className="flex gap-2 mt-4">
                          <a
                            href={`/properties/${item.propertyId}`}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
                          >
                            View
                          </a>
                          <button
                            onClick={() => removeFromWishlist(item._id)}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
        </div>
        <ToastContainer position="bottom-center" autoClose={3000} />
      </div>
    </>
  );
};

export default Dashboard;
