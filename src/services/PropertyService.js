const VALID_PROPERTY_TYPES = ['apartment', 'house', 'condo', 'studio', 'townhouse', 'villa', 'cottage', 'office', 'warehouse'];

export class PropertyService {
  static buildSearchQuery(filters) {
    const query = {};

    if (filters.search) {
      const searchTerm = filters.search.trim();
      query.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { address: { $regex: searchTerm, $options: 'i' } },
        { city: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    if (filters.city) {
      query.city = { $regex: `^${filters.city.trim()}$`, $options: 'i' };
    }

    if (filters.state) {
      query.state = { $regex: `^${filters.state.trim()}$`, $options: 'i' };
    }

    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) query.price.$gte = Math.max(0, Number(filters.minPrice));
      if (filters.maxPrice) query.price.$lte = Number(filters.maxPrice);
    }

    if (filters.bedrooms) {
      query.bedrooms = { $gte: Math.max(0, Number(filters.bedrooms)) };
    }

    if (filters.bathrooms) {
      query.bathrooms = { $gte: Math.max(0, Number(filters.bathrooms)) };
    }

    if (filters.propertyType) {
      const type = filters.propertyType.toLowerCase();
      if (VALID_PROPERTY_TYPES.includes(type)) query.propertyType = type;
    }

    if (filters.amenities && Array.isArray(filters.amenities) && filters.amenities.length > 0) {
      query.amenities = { $all: filters.amenities };
    }

    if (filters.featured === true) query.isFeatured = true;
    if (filters.verified === true) query.isVerified = true;

    // Never return unlisted/archived properties in search results
    query.isListed = { $ne: false };
    query.isArchived = { $ne: true };

    return query;
  }

  static buildSortOptions(sortBy) {
    const options = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      rating: { averageRating: -1 },
      popular: { viewCount: -1 },
    };
    return options[sortBy] || options.newest;
  }

  static validatePropertyData(data) {
    const errors = {};

    if (!data.title || typeof data.title !== 'string') {
      errors.title = 'Title is required';
    } else {
      const title = data.title.trim();
      if (title.length < 3) errors.title = 'Title must be at least 3 characters';
      else if (title.length > 200) errors.title = 'Title cannot exceed 200 characters';
    }

    const price = Number(data.price);
    if (isNaN(price) || price <= 0) errors.price = 'Price must be greater than 0';
    else if (price > 1_000_000) errors.price = 'Price seems unreasonably high';

    if (!data.address || typeof data.address !== 'string') {
      errors.address = 'Address is required';
    } else if (data.address.trim().length < 5) {
      errors.address = 'Address must be at least 5 characters';
    }

    if (!data.city || typeof data.city !== 'string') {
      errors.city = 'City is required';
    } else if (data.city.trim().length < 2) {
      errors.city = 'City must be at least 2 characters';
    }

    const bedrooms = Number(data.bedrooms);
    if (isNaN(bedrooms) || bedrooms < 0) errors.bedrooms = 'Invalid number of bedrooms';
    else if (bedrooms > 20) errors.bedrooms = 'Number of bedrooms seems unreasonable';

    const bathrooms = Number(data.bathrooms);
    if (!isNaN(bathrooms) && (bathrooms < 0 || bathrooms > 20)) {
      errors.bathrooms = 'Invalid number of bathrooms';
    }

    if (data.description) {
      const desc = String(data.description).trim();
      if (desc.length > 0 && desc.length < 10) errors.description = 'Description must be at least 10 characters';
      if (desc.length > 5000) errors.description = 'Description cannot exceed 5000 characters';
    }

    if (data.propertyType && !VALID_PROPERTY_TYPES.includes(String(data.propertyType).toLowerCase())) {
      errors.propertyType = 'Invalid property type';
    }

    return { isValid: Object.keys(errors).length === 0, errors };
  }

  static formatPropertyResponse(property, includePrivate = false) {
    const response = {
      id: property._id?.toString(),
      title: property.title,
      description: property.description,
      address: property.address,
      city: property.city,
      state: property.state,
      zipCode: property.zipCode,
      price: property.price,
      pricePerMonth: property.pricePerMonth || false,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      squareFeet: property.squareFeet || null,
      maxGuests: property.maxGuests || 2,
      propertyType: property.propertyType,
      amenities: property.amenities || [],
      images: property.images || [],
      rating: parseFloat((property.averageRating || 0).toFixed(1)),
      reviewCount: property.totalReviews || 0,
      isVerified: property.isVerified || false,
      isFeatured: property.isFeatured || false,
      createdAt: property.createdAt,
      updatedAt: property.updatedAt,
    };

    if (includePrivate) {
      response.landlordId = property.landlordId?.toString();
      response.views = property.viewCount || 0;
      response.bookings = property.bookingCount || 0;
    }

    return response;
  }

  static calculatePropertyStats(property) {
    return {
      views: property.viewCount || 0,
      rating: parseFloat((property.averageRating || 0).toFixed(1)),
      reviewCount: property.totalReviews || 0,
      bookings: property.bookingCount || 0,
      occupancyRate: property.occupancyRate || 0,
      lastViewed: property.lastViewedAt || null,
    };
  }

  static calculateOccupancyRate(bookings, daysToConsider = 30) {
    const now = new Date();
    const windowStart = new Date(now.getTime() - daysToConsider * 24 * 60 * 60 * 1000);

    const occupiedDays = bookings
      .filter((b) => ['completed', 'active', 'confirmed'].includes(b.status))
      .reduce((total, booking) => {
        const checkIn = new Date(booking.checkInDate);
        const checkOut = new Date(booking.checkOutDate);
        if (checkOut <= windowStart || checkIn >= now) return total;
        const start = Math.max(checkIn.getTime(), windowStart.getTime());
        const end = Math.min(checkOut.getTime(), now.getTime());
        return total + Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      }, 0);

    return Math.min(100, Math.round((occupiedDays / daysToConsider) * 100));
  }

  static getPriceRange(properties) {
    if (!properties.length) return { min: 0, max: 0, avg: 0 };
    const prices = properties.map((p) => p.price).filter((p) => typeof p === 'number');
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    return { min, max, avg };
  }
}
