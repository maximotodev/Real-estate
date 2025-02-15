import { connectDB } from '../config/database';
import User from '../models/User';
import { getTokenFromRequest, verifyToken } from '../config/auth';

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
      const { search, role, page = 1, limit = 10 } = req.query;

      let filters = {};
      if (search) {
        filters.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ];
      }
      if (role) filters.role = role;

      const skip = (Number(page) - 1) * Number(limit);
      const users = await User.find(filters)
        .select('-password')
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 });

      const total = await User.countDocuments(filters);

      res.json({
        users,
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
      const { userId, verified, role } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { verified, role },
        { new: true }
      ).select('-password');

      res.json({ message: 'User updated', user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { userId } = req.body;

      await User.findByIdAndDelete(userId);
      res.json({ message: 'User deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
