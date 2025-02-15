import { connectDB } from '../config/database';
import Property from '../models/Property';
import { getTokenFromRequest, verifyToken } from '../config/auth';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid property ID' });
  }

  if (req.method === 'GET') {
    try {
      const property = await Property.findById(id);
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }

      await Property.updateOne({ _id: id }, { $inc: { views: 1 } });
      res.json(property);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const token = getTokenFromRequest(req);
      if (!token) return res.status(401).json({ error: 'Unauthorized' });

      const decoded = verifyToken(token);
      if (!decoded) return res.status(401).json({ error: 'Invalid token' });

      const property = await Property.findById(id);
      if (!property) return res.status(404).json({ error: 'Property not found' });

      if (property.landlordId.toString() !== decoded.userId) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      const updatedProperty = await Property.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.json({ message: 'Property updated', property: updatedProperty });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const token = getTokenFromRequest(req);
      if (!token) return res.status(401).json({ error: 'Unauthorized' });

      const decoded = verifyToken(token);
      if (!decoded) return res.status(401).json({ error: 'Invalid token' });

      const property = await Property.findById(id);
      if (!property) return res.status(404).json({ error: 'Property not found' });

      if (property.landlordId.toString() !== decoded.userId) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      await Property.findByIdAndDelete(id);
      res.json({ message: 'Property deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
