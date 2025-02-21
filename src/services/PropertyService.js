export class PropertyService {
  static buildSearchQuery(filters) {
    const query = {};

    // Text search across multiple fields
    if (filters.search) {
      const searchTerm = filters.search.trim();
      query.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { address: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    // Location filtering
    if (filters.city) {
      query.city = { $regex: `^${filters.city.trim()}$`, $options: 'i' };
    }

    if (filters.state) {
      query.state = { $regex: `^${filters.state.trim()}$`, $options: 'i' };
    }

    // Price range filtering
    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) {
        query.price.$gte = Math.max(0, Number(filters.minPrice));
      }
      if (filters.maxPrice) {
        query.price.$lte = Number(filters.maxPrice);
      }
    }

    // Bedroom filtering (minimum)
    if (filters.bedrooms) {
      query.bedrooms = { $gte: Math.max(0, Number(filters.bedrooms)) };
    }

    // Property type filtering
    if (filters.propertyType) {
      const validTypes = ['apartment', 'house', 'condo', 'studio', 'townhouse', 'villa', 'cottage'];
      if (validTypes.includes(filters.propertyType.toLowerCase())) {
        query.propertyType = filters.propertyType.toLowerCase();
      }
    }

    // Only show listed properties (not archived)
    query.isListed = { $ne: false };

    return query;
  }

  static calculatePropertyStats(property) {
    const rating = property.averageRating ? parseFloat(property.averageRating.toFixed(1)) : 0;
    return {
      views: property.viewCount || 0,
      rating,
      reviewCount: property.totalReviews || 0,
      bookings: property.bookingCount || 0,
      occupancyRate: property.occupancyRate || 0,
      lastViewed: property.lastViewedAt || null,
    };
  }

  static formatPropertyResponse(property, includePrivate = false) {
    const response = {
      id: property._id.toString(),
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
      squareFeet: property.squareFeet,
      propertyType: property.propertyType,
      amenities: property.amenities || [],
      images: property.images || [],
      rating: parseFloat((property.averageRating || 0).toFixed(1)),
      reviewCount: property.totalReviews || 0,
      createdAt: property.createdAt,
      updatedAt: property.updatedAt,
    };

    // Only include landlord info if requested
    if (includePrivate) {
      response.landlordId = property.landlordId.toString();
      response.views = property.viewCount || 0;
      response.bookings = property.bookingCount || 0;
      response.verified = property.isVerified || false;
      response.featured = property.isFeatured || false;
    }

    return response;
  }

  static validatePropertyData(data) {
    const errors = {};

    // Title validation
    if (!data.title || typeof data.title !== 'string') {
      errors.title = 'Title is required';
    } else {
      const title = data.title.trim();
      if (title.length < 3) {
        errors.title = 'Title must be at least 3 characters';
      } else if (title.length > 200) {
        errors.title = 'Title cannot exceed 200 characters';
      }
    }

    // Price validation
    const price = Number(data.price);
    if (isNaN(price) || price <= 0) {
      errors.price = 'Price must be greater than 0';
    } else if (price > 1000000) {
      errors.price = 'Price seems unreasonably high';
    }

    // Address validation
    if (!data.address || typeof data.address !== 'string') {
      errors.address = 'Address is required';
    } else if (data.address.trim().length < 5) {
      errors.address = 'Address must be at least 5 characters';
    }

    // City validation
    if (!data.city || typeof data.city !== 'string') {
      errors.city = 'City is required';
    } else if (data.city.trim().length < 2) {
      errors.city = 'City must be at least 2 characters';
    }

    // Bedrooms validation
    const bedrooms = Number(data.bedrooms);
    if (isNaN(bedrooms) || bedrooms < 0) {
      errors.bedrooms = 'Invalid number of bedrooms';
    } else if (bedrooms > 20) {
      errors.bedrooms = 'Number of bedrooms seems unreasonable';
    }

    // Description validation (optional but has minimum if provided)
    if (data.description) {
      const desc = String(data.description).trim();
      if (desc.length > 0 && desc.length < 10) {
        errors.description = 'Description must be at least 10 characters if provided';
      }
    }

    // Property type validation
    if (data.propertyType) {
      const validTypes = ['apartment', 'house', 'condo', 'studio', 'townhouse', 'villa', 'cottage'];
      if (!validTypes.includes(String(data.propertyType).toLowerCase())) {
        errors.propertyType = 'Invalid property type';
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  static calculateOccupancyRate(bookings, daysToConsider = 30) {
    // Calculate occupancy rate for last N days
    const now = new Date();
    const startDate = new Date(now.getTime() - daysToConsider * 24 * 60 * 60 * 1000);

    const occupiedDays = bookings
      .filter((b) => b.status === 'completed' || b.status === 'active')
      .reduce((total, booking) => {
        const checkIn = new Date(booking.checkInDate);
        const checkOut = new Date(booking.checkOutDate);

        if (checkOut <= startDate || checkIn >= now) return total;

        const start = Math.max(checkIn.getTime(), startDate.getTime());
        const end = Math.min(checkOut.getTime(), now.getTime());
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

        return total + days;
      }, 0);

    return Math.round((occupiedDays / daysToConsider) * 100);
  }
}
