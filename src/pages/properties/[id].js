import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PropertyDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
    specialRequests: '',
    renterName: '',
    renterEmail: '',
    renterPhone: '',
  });
  const [reviewData, setReviewData] = useState({
    rating: 5,
    title: '',
    comment: '',
  });

  useEffect(() => {
    if (id) {
      fetchProperty();
      fetchReviews();
    }
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await axios.get(`/api/properties/${id}`);
      setProperty(response.data);
    } catch (error) {
      toast.error('Failed to load property');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/reviews?propertyId=${id}`);
      setReviews(response.data.reviews);
    } catch (error) {
      console.error('Failed to load reviews');
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to make a booking');
        return;
      }

      await axios.post(
        '/api/bookings',
        { propertyId: id, ...bookingData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Booking created successfully!');
      setShowBookingForm(false);
      setBookingData({
        checkInDate: '',
        checkOutDate: '',
        guests: 1,
        specialRequests: '',
        renterName: '',
        renterEmail: '',
        renterPhone: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.error || 'Booking failed');
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to leave a review');
        return;
      }

      await axios.post(
        '/api/reviews',
        { propertyId: id, ...reviewData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Review posted successfully!');
      setShowReviewForm(false);
      fetchReviews();
      fetchProperty();
      setReviewData({ rating: 5, title: '', comment: '' });
    } catch (error) {
      toast.error('Failed to post review');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!property) {
    return <div className="flex justify-center items-center min-h-screen">Property not found</div>;
  }

  return (
    <>
      <Head>
        <title>{property.title} - Real Estate</title>
      </Head>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Images */}
          {property.images?.length > 0 && (
            <div className="mb-8">
              <img src={property.images[0]} alt={property.title} className="w-full h-96 object-cover rounded-lg" />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{property.title}</h1>
              <p className="text-gray-600 text-lg mb-4">{property.address}</p>

              {/* Tabs */}
              <div className="flex gap-4 mb-8 border-b border-gray-300">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 px-4 font-medium ${
                    activeTab === 'details'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600'
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 px-4 font-medium ${
                    activeTab === 'reviews'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600'
                  }`}
                >
                  Reviews ({reviews.length})
                </button>
              </div>

              {/* Details Tab */}
              {activeTab === 'details' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <p className="text-gray-600 text-sm">Bedrooms</p>
                      <p className="text-2xl font-bold text-blue-600">{property.bedrooms}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <p className="text-gray-600 text-sm">Bathrooms</p>
                      <p className="text-2xl font-bold text-blue-600">{property.bathrooms || 'N/A'}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <p className="text-gray-600 text-sm">Square Feet</p>
                      <p className="text-2xl font-bold text-blue-600">{property.squareFeet || 'N/A'}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <p className="text-gray-600 text-sm">Type</p>
                      <p className="text-2xl font-bold text-blue-600 capitalize">{property.propertyType}</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Description</h3>
                    <p className="text-gray-600 leading-relaxed">{property.description || 'No description provided'}</p>
                  </div>

                  {property.amenities?.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Amenities</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {property.amenities.map((amenity, idx) => (
                          <p key={idx} className="text-gray-600">✓ {amenity}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div>
                  {!showReviewForm ? (
                    <button
                      onClick={() => setShowReviewForm(true)}
                      className="mb-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
                    >
                      Write a Review
                    </button>
                  ) : (
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Write a Review</h3>
                      <form onSubmit={handleReview} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                          <select
                            value={reviewData.rating}
                            onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600"
                          >
                            <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                            <option value="4">⭐⭐⭐⭐ Good</option>
                            <option value="3">⭐⭐⭐ Average</option>
                            <option value="2">⭐⭐ Poor</option>
                            <option value="1">⭐ Very Poor</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={reviewData.title}
                            onChange={(e) => setReviewData({ ...reviewData, title: e.target.value })}
                            placeholder="Summary of your experience"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
                          <textarea
                            value={reviewData.comment}
                            onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                            required
                            rows="4"
                            placeholder="Share your experience..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600"
                          />
                        </div>

                        <div className="flex gap-2">
                          <button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                          >
                            Submit Review
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowReviewForm(false)}
                            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {reviews.length === 0 ? (
                    <p className="text-gray-600">No reviews yet. Be the first to review!</p>
                  ) : (
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review._id} className="bg-white p-6 rounded-lg shadow">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-semibold text-gray-800">{review.title}</p>
                              <p className="text-sm text-yellow-500">{'⭐'.repeat(review.rating)}</p>
                            </div>
                            <p className="text-sm text-gray-600">{new Date(review.createdAt).toLocaleDateString()}</p>
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar - Booking */}
            <div>
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
                <p className="text-3xl font-bold text-blue-600 mb-2">${property.price}</p>
                {property.pricePerMonth && <p className="text-sm text-gray-600 mb-4">per month</p>}

                {!showBookingForm ? (
                  <button
                    onClick={() => setShowBookingForm(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg mb-4"
                  >
                    Book Now
                  </button>
                ) : (
                  <form onSubmit={handleBooking} className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                      <input
                        type="date"
                        value={bookingData.checkInDate}
                        onChange={(e) => setBookingData({ ...bookingData, checkInDate: e.target.value })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                      <input
                        type="date"
                        value={bookingData.checkOutDate}
                        onChange={(e) => setBookingData({ ...bookingData, checkOutDate: e.target.value })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                      <input
                        type="number"
                        min="1"
                        value={bookingData.guests}
                        onChange={(e) => setBookingData({ ...bookingData, guests: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={bookingData.renterName}
                        onChange={(e) => setBookingData({ ...bookingData, renterName: e.target.value })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={bookingData.renterEmail}
                        onChange={(e) => setBookingData({ ...bookingData, renterEmail: e.target.value })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={bookingData.renterPhone}
                        onChange={(e) => setBookingData({ ...bookingData, renterPhone: e.target.value })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                      Confirm Booking
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg"
                    >
                      Cancel
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position="bottom-center" autoClose={3000} />
      </div>
    </>
  );
};

export default PropertyDetail;
