import { connectDB } from '../config/database';
import Booking from '../models/Booking';
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

      const { role = 'renter' } = req.query;

      let filters = {};
      if (role === 'renter') {
        filters.renterId = decoded.userId;
      } else if (role === 'landlord') {
        filters.landlordId = decoded.userId;
      }

      const bookings = await Booking.find(filters).sort({ createdAt: -1 });
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const token = getTokenFromRequest(req);
      if (!token) return res.status(401).json({ error: 'Unauthorized' });

      const decoded = verifyToken(token);
      if (!decoded) return res.status(401).json({ error: 'Invalid token' });

      const {
        propertyId,
        checkInDate,
        checkOutDate,
        guests,
        specialRequests,
        renterName,
        renterEmail,
        renterPhone,
      } = req.body;

      const property = await Property.findById(propertyId);
      if (!property) return res.status(404).json({ error: 'Property not found' });

      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      const totalPrice = property.price * nights;

      const booking = new Booking({
        propertyId,
        renterId: decoded.userId,
        landlordId: property.landlordId,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        numberOfNights: nights,
        totalPrice,
        guests,
        specialRequests,
        renterName,
        renterEmail,
        renterPhone,
      });

      await booking.save();
      res.status(201).json({ message: 'Booking created', booking });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
