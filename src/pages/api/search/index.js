import dbConnect from '../config/database';
import Property from '../models/Property';
import { PAGINATION } from '../../../lib/constants';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const {
      q = '',
      city = '',
      minPrice,
      maxPrice,
      bedrooms,
      propertyType,
      page = 1,
      limit = PAGINATION.DEFAULT_LIMIT,
    } = req.query;

    const query = {};

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { address: { $regex: q, $options: 'i' } },
      ];
    }

    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    if (minPrice) {
      query.price = { ...query.price, $gte: Number(minPrice) };
    }

    if (maxPrice) {
      query.price = { ...query.price, $lte: Number(maxPrice) };
    }

    if (bedrooms) {
      query.bedrooms = { $gte: Number(bedrooms) };
    }

    if (propertyType) {
      query.propertyType = propertyType;
    }

    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.min(Number(limit) || PAGINATION.DEFAULT_LIMIT, PAGINATION.MAX_LIMIT);
    const skip = (pageNum - 1) * limitNum;

    const [properties, total] = await Promise.all([
      Property.find(query).skip(skip).limit(limitNum).lean(),
      Property.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      properties,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search properties' });
  }
}
