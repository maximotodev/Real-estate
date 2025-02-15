import { connectDB } from '../config/database';
import Property from '../models/Property';
import { getTokenFromRequest, verifyToken } from '../config/auth';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const { city, minPrice, maxPrice, bedrooms, propertyType, search, page = 1, limit = 10 } = req.query;

      let filters = { available: true };

      if (city) filters.city = { $regex: city, $options: 'i' };
      if (minPrice) filters.price = { ...filters.price, $gte: Number(minPrice) };
      if (maxPrice) filters.price = { ...filters.price, $lte: Number(maxPrice) };
      if (bedrooms) filters.bedrooms = { $gte: Number(bedrooms) };
      if (propertyType) filters.propertyType = propertyType;
      if (search) {
        filters.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { address: { $regex: search, $options: 'i' } },
        ];
      }

      const skip = (Number(page) - 1) * Number(limit);
      const properties = await Property.find(filters)
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 });

      const total = await Property.countDocuments(filters);

      res.json({
        properties,
        pagination: {
          total,
          page: Number(page),
          pages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const token = getTokenFromRequest(req);
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const decoded = verifyToken(token);
      if (!decoded) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      const {
        title,
        description,
        address,
        city,
        state,
        zipCode,
        price,
        bedrooms,
        bathrooms,
        squareFeet,
        propertyType,
        amenities,
        images,
      } = req.body;

      if (!title || !address || !city || !price || !bedrooms || !propertyType) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const property = new Property({
        title,
        description,
        landlordId: decoded.userId,
        address,
        city,
        state,
        zipCode,
        price,
        bedrooms,
        bathrooms,
        squareFeet,
        propertyType,
        amenities: amenities || [],
        images: images || [],
      });

      await property.save();
      res.status(201).json({ message: 'Property created', property });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
