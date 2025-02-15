import { connectDB } from '../config/database';
import Property from '../models/Property';
import Booking from '../models/Booking';
import Review from '../models/Review';
import { getTokenFromRequest, verifyToken } from '../config/auth';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const token = getTokenFromRequest(req);
      if (!token) return res.status(401).json({ error: 'Unauthorized' });

      const decoded = verifyToken(token);
      if (!decoded) return res.status(401).json({ error: 'Invalid token' });

      const properties = await Property.find({ landlordId: decoded.userId });
      const propertyIds = properties.map((p) => p._id);

      const bookings = await Booking.find({ propertyId: { $in: propertyIds } });
      const reviews = await Review.find({ propertyId: { $in: propertyIds } });

      const totalBookings = bookings.length;
      const confirmedBookings = bookings.filter((b) => b.status === 'confirmed').length;
      const completedBookings = bookings.filter((b) => b.status === 'completed').length;
      const totalRevenue = bookings
        .filter((b) => b.paymentStatus === 'completed')
        .reduce((sum, b) => sum + b.totalPrice, 0);

      const averageRating =
        reviews.length > 0
          ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
          : 0;

      const totalViews = properties.reduce((sum, p) => sum + (p.views || 0), 0);

      const bookingsByStatus = {
        pending: bookings.filter((b) => b.status === 'pending').length,
        confirmed: confirmedBookings,
        active: bookings.filter((b) => b.status === 'active').length,
        completed: completedBookings,
        cancelled: bookings.filter((b) => b.status === 'cancelled').length,
      };

      res.json({
        summary: {
          totalProperties: properties.length,
          totalBookings,
          confirmedBookings,
          completedBookings,
          totalRevenue,
          averageRating,
          totalViews,
          totalReviews: reviews.length,
        },
        bookingsByStatus,
        topProperties: properties
          .map((p) => ({
            id: p._id,
            title: p.title,
            views: p.views,
            rating: p.rating,
            bookings: bookings.filter((b) => b.propertyId.toString() === p._id.toString()).length,
          }))
          .sort((a, b) => b.views - a.views)
          .slice(0, 5),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
