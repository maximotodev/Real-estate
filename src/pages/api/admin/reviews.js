import { connectDB } from '../config/database';
import Review from '../models/Review';
import { getTokenFromRequest, verifyToken } from '../config/auth';
import User from '../models/User';

export default async function handler(req, res) {
  await connectDB();

  const token = getTokenFromRequest(req);
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  const decoded = verifyToken(token);
  if (!decoded) return res.status(401).json({ error: 'Invalid token' });

  const user = await User.findById(decoded.userId);
  if (user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  if (req.method === 'GET') {
    try {
      const { verified, page = 1, limit = 10 } = req.query;

      let filters = {};
      if (verified !== undefined) {
        filters.verified = verified === 'true';
      }

      const skip = (Number(page) - 1) * Number(limit);
      const reviews = await Review.find(filters)
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 });

      const total = await Review.countDocuments(filters);

      res.json({
        reviews,
        pagination: {
          total,
          page: Number(page),
          pages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { reviewId, verified } = req.body;

      const updatedReview = await Review.findByIdAndUpdate(reviewId, { verified }, { new: true });

      res.json({ message: 'Review updated', review: updatedReview });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { reviewId } = req.body;

      await Review.findByIdAndDelete(reviewId);
      res.json({ message: 'Review deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
