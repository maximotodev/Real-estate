import { connectDB } from '../config/database';
import UserRating from '../models/UserRating';
import User from '../models/User';
import { getTokenFromRequest, verifyToken } from '../config/auth';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const { userId } = req.query;

      if (!userId) {
        return res.status(400).json({ error: 'User ID required' });
      }

      const ratings = await UserRating.find({ ratedUserId: userId });
      const averageRating =
        ratings.length > 0 ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1) : 0;

      res.json({
        ratings,
        averageRating,
        totalRatings: ratings.length,
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const token = getTokenFromRequest(req);
      if (!token) return res.status(401).json({ error: 'Unauthorized' });

      const decoded = verifyToken(token);
      if (!decoded) return res.status(401).json({ error: 'Invalid token' });

      const { ratedUserId, rating, comment, category, bookingId } = req.body;

      if (!ratedUserId || !rating) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const existingRating = await UserRating.findOne({
        raterId: decoded.userId,
        ratedUserId,
        bookingId,
      });

      if (existingRating) {
        return res.status(400).json({ error: 'You already rated this user for this booking' });
      }

      const userRating = new UserRating({
        raterId: decoded.userId,
        ratedUserId,
        rating,
        comment,
        category,
        bookingId,
      });

      await userRating.save();

      const allRatings = await UserRating.find({ ratedUserId });
      const averageRating = (allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length).toFixed(1);

      await User.findByIdAndUpdate(ratedUserId, {
        userRating: averageRating,
        userRatingCount: allRatings.length,
      });

      res.status(201).json({ message: 'Rating submitted', rating: userRating });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
