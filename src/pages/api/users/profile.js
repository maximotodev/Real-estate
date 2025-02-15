import { connectDB } from '../config/database';
import User from '../models/User';
import { getTokenFromRequest, verifyToken } from '../config/auth';

export default async function handler(req, res) {
  await connectDB();

  const token = getTokenFromRequest(req);
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  const decoded = verifyToken(token);
  if (!decoded) return res.status(401).json({ error: 'Invalid token' });

  if (req.method === 'GET') {
    try {
      const user = await User.findById(decoded.userId).select('-password');
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { name, phone, bio, address, city, state, zipCode, profileImage } = req.body;

      const user = await User.findByIdAndUpdate(
        decoded.userId,
        {
          name,
          phone,
          bio,
          address,
          city,
          state,
          zipCode,
          profileImage,
        },
        { new: true }
      ).select('-password');

      res.json({ message: 'Profile updated', user });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
