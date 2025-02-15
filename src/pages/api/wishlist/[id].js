import { connectDB } from '../config/database';
import Wishlist from '../models/Wishlist';
import { getTokenFromRequest, verifyToken } from '../config/auth';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid wishlist ID' });
  }

  if (req.method === 'DELETE') {
    try {
      const token = getTokenFromRequest(req);
      if (!token) return res.status(401).json({ error: 'Unauthorized' });

      const decoded = verifyToken(token);
      if (!decoded) return res.status(401).json({ error: 'Invalid token' });

      const wishlist = await Wishlist.findById(id);
      if (!wishlist) return res.status(404).json({ error: 'Wishlist item not found' });

      if (wishlist.userId.toString() !== decoded.userId) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      await Wishlist.findByIdAndDelete(id);
      res.json({ message: 'Removed from wishlist' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
