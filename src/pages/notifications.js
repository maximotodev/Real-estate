import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notifications = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(response.data.notifications);
      setUnreadCount(response.data.unreadCount);
    } catch (error) {
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/notifications/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchNotifications();
    } catch (error) {
      toast.error('Failed to mark notification as read');
    }
  };

  const deleteNotification = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/notifications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotifications();
    } catch (error) {
      toast.error('Failed to delete notification');
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'booking':
        return '📅';
      case 'message':
        return '💬';
      case 'review':
        return '⭐';
      case 'payment':
        return '💰';
      case 'property':
        return '🏠';
      default:
        return '📢';
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'booking':
        return 'bg-blue-50 border-blue-200';
      case 'message':
        return 'bg-purple-50 border-purple-200';
      case 'review':
        return 'bg-yellow-50 border-yellow-200';
      case 'payment':
        return 'bg-green-50 border-green-200';
      case 'property':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Notifications - Real Estate</title>
      </Head>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-600 mt-2">You have {unreadCount} unread notification(s)</p>
              )}
            </div>
            <a href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
              Back to Dashboard
            </a>
          </div>

          {/* Notifications List */}
          {notifications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <p className="text-gray-600 text-lg">No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notif) => (
                <div
                  key={notif._id}
                  className={`border rounded-lg p-6 flex justify-between items-start ${getColor(notif.type)} ${
                    !notif.read ? 'bg-opacity-100 font-semibold' : 'bg-opacity-50'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{getIcon(notif.type)}</span>
                      <div>
                        <h3 className="font-bold text-gray-800">{notif.title || notif.message}</h3>
                        <p className="text-gray-600 mt-1">{notif.message}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(notif.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    {!notif.read && (
                      <button
                        onClick={() => markAsRead(notif._id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm whitespace-nowrap"
                      >
                        Mark Read
                      </button>
                    )}
                    {notif.actionUrl && (
                      <a
                        href={notif.actionUrl}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm whitespace-nowrap"
                      >
                        View
                      </a>
                    )}
                    <button
                      onClick={() => deleteNotification(notif._id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <ToastContainer position="bottom-center" autoClose={3000} />
      </div>
    </>
  );
};

export default Notifications;
