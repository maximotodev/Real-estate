import { connectDB } from '../config/database';
import Message from '../models/Message';
import { getTokenFromRequest, verifyToken } from '../config/auth';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const token = getTokenFromRequest(req);
      if (!token) return res.status(401).json({ error: 'Unauthorized' });

      const decoded = verifyToken(token);
      if (!decoded) return res.status(401).json({ error: 'Invalid token' });

      const { conversationId, userId } = req.query;

      let filters = {};
      if (conversationId) {
        filters.conversationId = conversationId;
      } else {
        filters.$or = [{ senderId: decoded.userId }, { receiverId: decoded.userId }];
      }

      const messages = await Message.find(filters).sort({ createdAt: -1 }).limit(50);

      res.json(messages.reverse());
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const token = getTokenFromRequest(req);
      if (!token) return res.status(401).json({ error: 'Unauthorized' });

      const decoded = verifyToken(token);
      if (!decoded) return res.status(401).json({ error: 'Invalid token' });

      const { receiverId, message, propertyId } = req.body;

      if (!receiverId || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const conversationId = [decoded.userId, receiverId].sort().join('-');

      const newMessage = new Message({
        conversationId,
        senderId: decoded.userId,
        receiverId,
        message,
        propertyId,
      });

      await newMessage.save();
      res.status(201).json({ message: 'Message sent', data: newMessage });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
