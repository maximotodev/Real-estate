import { connectDB } from '../config/database';
import Review from '../models/Review';
import Property from '../models/Property';
import { getTokenFromRequest, verifyToken } from '../config/auth';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const { propertyId, page = 1, limit = 10 } = req.query;

      let filters = { verified: true };
      if (propertyId) filters.propertyId = propertyId;

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
  } else if (req.method === 'POST') {
    try {
      const token = getTokenFromRequest(req);
      if (!token) return res.status(401).json({ error: 'Unauthorized' });

      const decoded = verifyToken(token);
      if (!decoded) return res.status(401).json({ error: 'Invalid token' });

      const { propertyId, rating, title, comment, cleanliness, communication, accuracy, location, checkInProcess } = req.body;

      if (!propertyId || !rating || !comment) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const property = await Property.findById(propertyId);
      if (!property) return res.status(404).json({ error: 'Property not found' });

      const review = new Review({
        propertyId,
        userId: decoded.userId,
        rating,
        title,
        comment,
        cleanliness,
        communication,
        accuracy,
        location,
        checkInProcess,
        verified: true,
      });

      await review.save();

      const allReviews = await Review.find({ propertyId });
      const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

      await Property.findByIdAndUpdate(propertyId, {
        rating: avgRating,
        totalReviews: allReviews.length,
      });

      res.status(201).json({ message: 'Review created', review });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
