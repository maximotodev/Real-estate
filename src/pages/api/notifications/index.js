import { connectDB } from '../config/database';
import Notification from '../models/Notification';
import { getTokenFromRequest, verifyToken } from '../config/auth';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const token = getTokenFromRequest(req);
      if (!token) return res.status(401).json({ error: 'Unauthorized' });

      const decoded = verifyToken(token);
      if (!decoded) return res.status(401).json({ error: 'Invalid token' });

      const { unreadOnly = false } = req.query;

      let filters = { userId: decoded.userId };
      if (unreadOnly === 'true') {
        filters.read = false;
      }

      const notifications = await Notification.find(filters).sort({ createdAt: -1 }).limit(50);

      const unreadCount = await Notification.countDocuments({
        userId: decoded.userId,
        read: false,
      });

      res.json({ notifications, unreadCount });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const token = getTokenFromRequest(req);
      if (!token) return res.status(401).json({ error: 'Unauthorized' });

      const decoded = verifyToken(token);
      if (!decoded) return res.status(401).json({ error: 'Invalid token' });

      const { userId, type, title, message, relatedId, relatedModel, actionUrl } = req.body;

      const notification = new Notification({
        userId,
        type,
        title,
        message,
        relatedId,
        relatedModel,
        actionUrl,
      });

      await notification.save();
      res.status(201).json({ notification });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
