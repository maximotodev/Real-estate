import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageReviews = () => {
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifiedFilter, setVerifiedFilter] = useState('');
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });

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

    fetchReviews();
  }, [verifiedFilter]);

  const fetchReviews = async (page = 1) => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      if (verifiedFilter !== '') params.append('verified', verifiedFilter);
      params.append('page', page);
      params.append('limit', 10);

      const response = await axios.get(`/api/admin/reviews?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReviews(response.data.reviews);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const verifyReview = async (reviewId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        '/api/admin/reviews',
        { reviewId, verified: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Review verified');
      fetchReviews();
    } catch (error) {
      toast.error('Failed to verify review');
    }
  };

  const deleteReview = async (reviewId) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete('/api/admin/reviews', {
        headers: { Authorization: `Bearer ${token}` },
        data: { reviewId },
      });

      toast.success('Review deleted');
      fetchReviews();
    } catch (error) {
      toast.error('Failed to delete review');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Manage Reviews - Real Estate</title>
      </Head>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Manage Reviews</h1>
            <a href="/admin/dashboard" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg">
              Back to Dashboard
            </a>
          </div>

          {/* Filter */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
                <select
                  value={verifiedFilter}
                  onChange={(e) => setVerifiedFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600"
                >
                  <option value="">All Reviews</option>
                  <option value="true">Verified Only</option>
                  <option value="false">Pending Verification</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xl font-bold text-gray-800">{review.title}</p>
                    <p className="text-yellow-600 font-bold">{'⭐'.repeat(review.rating)}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-white text-sm font-bold ${
                    review.verified ? 'bg-green-600' : 'bg-yellow-600'
                  }`}>
                    {review.verified ? 'Verified' : 'Pending'}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{review.comment}</p>

                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>Posted: {new Date(review.createdAt).toLocaleDateString()}</span>
                  <span>Property ID: {review.propertyId}</span>
                </div>

                <div className="flex gap-2">
                  {!review.verified && (
                    <button
                      onClick={() => verifyReview(review._id)}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Verify
                    </button>
                  )}
                  <button
                    onClick={() => deleteReview(review._id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {reviews.length === 0 && (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <p className="text-gray-600 text-lg">No reviews to show</p>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => fetchReviews(page)}
                className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                  pagination.page === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-800 border border-gray-300 hover:border-blue-600'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
        <ToastContainer position="bottom-center" autoClose={3000} />
      </div>
    </>
  );
};

export default ManageReviews;
