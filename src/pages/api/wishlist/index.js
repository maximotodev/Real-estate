import { connectDB } from '../config/database';
import Wishlist from '../models/Wishlist';
import Property from '../models/Property';
import { getTokenFromRequest, verifyToken } from '../config/auth';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const token = getTokenFromRequest(req);
      if (!token) return res.status(401).json({ error: 'Unauthorized' });

      const decoded = verifyToken(token);
      if (!decoded) return res.status(401).json({ error: 'Invalid token' });

      const wishlist = await Wishlist.find({ userId: decoded.userId }).sort({ createdAt: -1 });
      res.json(wishlist);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const token = getTokenFromRequest(req);
      if (!token) return res.status(401).json({ error: 'Unauthorized' });

      const decoded = verifyToken(token);
      if (!decoded) return res.status(401).json({ error: 'Invalid token' });

      const { propertyId } = req.body;

      const property = await Property.findById(propertyId);
      if (!property) return res.status(404).json({ error: 'Property not found' });

      const existingWishlist = await Wishlist.findOne({ userId: decoded.userId, propertyId });
      if (existingWishlist) {
        return res.status(400).json({ error: 'Property already in wishlist' });
      }

      const wishlist = new Wishlist({
        userId: decoded.userId,
        propertyId,
        propertyTitle: property.title,
        propertyImage: property.images?.[0],
        propertyPrice: property.price,
      });

      await wishlist.save();
      res.status(201).json({ message: 'Added to wishlist', wishlist });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
