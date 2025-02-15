import { connectDB } from '../config/database';
import Notification from '../models/Notification';
import { getTokenFromRequest, verifyToken } from '../config/auth';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid notification ID' });
  }

  if (req.method === 'PUT') {
    try {
      const token = getTokenFromRequest(req);
      if (!token) return res.status(401).json({ error: 'Unauthorized' });

      const decoded = verifyToken(token);
      if (!decoded) return res.status(401).json({ error: 'Invalid token' });

      const notification = await Notification.findById(id);
      if (!notification) return res.status(404).json({ error: 'Notification not found' });

      if (notification.userId.toString() !== decoded.userId) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      const updated = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
      res.json({ message: 'Notification marked as read', notification: updated });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const token = getTokenFromRequest(req);
      if (!token) return res.status(401).json({ error: 'Unauthorized' });

      const decoded = verifyToken(token);
      if (!decoded) return res.status(401).json({ error: 'Invalid token' });

      const notification = await Notification.findById(id);
      if (!notification) return res.status(404).json({ error: 'Notification not found' });

      if (notification.userId.toString() !== decoded.userId) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      await Notification.findByIdAndDelete(id);
      res.json({ message: 'Notification deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
