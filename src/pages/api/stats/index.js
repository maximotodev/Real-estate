import dbConnect from '../config/database';
import User from '../models/User';
import Property from '../models/Property';
import Booking from '../models/Booking';
import Review from '../models/Review';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const [usersCount, propertiesCount, bookingsCount, reviewsCount] = await Promise.all([
      User.countDocuments(),
      Property.countDocuments(),
      Booking.countDocuments(),
      Review.countDocuments(),
    ]);

    const bookingStatusBreakdown = await Booking.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const topProperties = await Property.find()
      .sort({ averageRating: -1 })
      .limit(5)
      .select('title price averageRating totalReviews landlordId')
      .lean();

    const userRoles = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
        },
      },
    ]);

    const averagePropertyPrice = await Property.aggregate([
      {
        $group: {
          _id: null,
          averagePrice: { $avg: '$price' },
          maxPrice: { $max: '$price' },
          minPrice: { $min: '$price' },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        users: usersCount,
        properties: propertiesCount,
        bookings: bookingsCount,
        reviews: reviewsCount,
        bookingStatusBreakdown: Object.fromEntries(
          bookingStatusBreakdown.map((item) => [item._id, item.count])
        ),
        userRoles: Object.fromEntries(userRoles.map((item) => [item._id, item.count])),
        propertyStats: averagePropertyPrice[0] || {
          averagePrice: 0,
          maxPrice: 0,
          minPrice: 0,
        },
        topProperties,
      },
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
}
