import { connectDB } from '../config/database';
import User from '../models/User';
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

      const user = await User.findById(decoded.userId);
      if (user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
      }

      const totalUsers = await User.countDocuments();
      const totalRenters = await User.countDocuments({ role: 'renter' });
      const totalLandlords = await User.countDocuments({ role: 'landlord' });
      const totalProperties = await Property.countDocuments();
      const totalBookings = await Booking.countDocuments();
      const totalReviews = await Review.countDocuments();

      const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);
      const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5);
      const recentReviews = await Review.find().sort({ createdAt: -1 }).limit(5);

      const bookingStats = {
        pending: await Booking.countDocuments({ status: 'pending' }),
        confirmed: await Booking.countDocuments({ status: 'confirmed' }),
        completed: await Booking.countDocuments({ status: 'completed' }),
        cancelled: await Booking.countDocuments({ status: 'cancelled' }),
      };

      res.json({
        summary: {
          totalUsers,
          totalRenters,
          totalLandlords,
          totalProperties,
          totalBookings,
          totalReviews,
        },
        bookingStats,
        recentUsers,
        recentBookings,
        recentReviews,
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
