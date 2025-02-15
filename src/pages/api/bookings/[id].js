import { connectDB } from '../config/database';
import Booking from '../models/Booking';
import { getTokenFromRequest, verifyToken } from '../config/auth';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid booking ID' });
  }

  if (req.method === 'GET') {
    try {
      const booking = await Booking.findById(id);
      if (!booking) return res.status(404).json({ error: 'Booking not found' });
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const token = getTokenFromRequest(req);
      if (!token) return res.status(401).json({ error: 'Unauthorized' });

      const decoded = verifyToken(token);
      if (!decoded) return res.status(401).json({ error: 'Invalid token' });

      const booking = await Booking.findById(id);
      if (!booking) return res.status(404).json({ error: 'Booking not found' });

      if (booking.renterId.toString() !== decoded.userId && booking.landlordId.toString() !== decoded.userId) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, { new: true });
      res.json({ message: 'Booking updated', booking: updatedBooking });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const token = getTokenFromRequest(req);
      if (!token) return res.status(401).json({ error: 'Unauthorized' });

      const decoded = verifyToken(token);
      if (!decoded) return res.status(401).json({ error: 'Invalid token' });

      const booking = await Booking.findById(id);
      if (!booking) return res.status(404).json({ error: 'Booking not found' });

      if (booking.renterId.toString() !== decoded.userId && booking.landlordId.toString() !== decoded.userId) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      await Booking.findByIdAndDelete(id);
      res.json({ message: 'Booking cancelled' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
