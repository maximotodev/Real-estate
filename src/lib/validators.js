import { VALIDATION, ERROR_MESSAGES } from './constants';

export const validators = {
  email: (email) => {
    if (!email || typeof email !== 'string') return false;
    // RFC 5322 simplified - covers 99% of real emails
    const emailRegex = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;
    return emailRegex.test(email.toLowerCase());
  },

  password: (password) => {
    if (!password || typeof password !== 'string') return false;
    const len = password.length;
    // At least one uppercase, one lowercase, one number
    const hasComplexity = /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);
    return len >= VALIDATION.MIN_PASSWORD_LENGTH && len <= VALIDATION.MAX_PASSWORD_LENGTH;
  },

  phone: (phone) => {
    if (!phone) return false;
    // Remove common formatting, check for at least 10 digits
    const cleaned = String(phone).replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 15;
  },

  url: (url) => {
    if (!url || typeof url !== 'string') return false;
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  },

  price: (price) => {
    const num = Number(price);
    if (isNaN(num) || num < VALIDATION.MIN_PRICE) return false;
    // Reasonable max for rental property
    return num <= VALIDATION.MAX_PRICE && num === Math.round(num * 100) / 100;
  },

  bedrooms: (bedrooms) => {
    const num = Number(bedrooms);
    return Number.isInteger(num) && num >= VALIDATION.MIN_BEDROOMS && num <= VALIDATION.MAX_BEDROOMS;
  },

  bathrooms: (bathrooms) => {
    const num = Number(bathrooms);
    return !isNaN(num) && num >= VALIDATION.MIN_BATHROOMS && num <= VALIDATION.MAX_BATHROOMS;
  },

  propertyTitle: (title) => {
    if (!title || typeof title !== 'string') return false;
    const trimmed = title.trim();
    return trimmed.length >= 3 && trimmed.length <= 200 && trimmed.split(' ').length >= 2;
  },

  description: (desc) => {
    if (!desc || typeof desc !== 'string') return false;
    const trimmed = desc.trim();
    return trimmed.length >= 10 && trimmed.length <= 5000;
  },

  zipCode: (zip) => {
    if (!zip) return false;
    // US zip code (5 digits) or ZIP+4 format
    return /^\d{5}(-\d{4})?$/.test(String(zip).trim());
  },

  address: (address) => {
    if (!address || typeof address !== 'string') return false;
    const trimmed = address.trim();
    return trimmed.length >= 5 && trimmed.length <= 500;
  },

  city: (city) => {
    if (!city || typeof city !== 'string') return false;
    const trimmed = city.trim();
    return trimmed.length >= 2 && trimmed.length <= 100 && /^[a-zA-Z\s\-']+$/.test(trimmed);
  },

  state: (state) => {
    if (!state || typeof state !== 'string') return false;
    return state.trim().length >= 2 && state.trim().length <= 100;
  },

  dateRange: (checkIn, checkOut) => {
    try {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      // Check-in must be today or later, check-out after check-in
      return inDate >= now && outDate > inDate;
    } catch {
      return false;
    }
  },

  rating: (rating) => {
    const num = Number(rating);
    return Number.isInteger(num) && num >= 1 && num <= 5;
  },

  mongooseId: (id) => {
    if (!id) return false;
    return /^[0-9a-f]{24}$/.test(String(id).toLowerCase());
  },
};

export const validateUserInput = {
  register: (data) => {
    const errors = {};

    if (!data.name || !validators.notEmpty(data.name)) {
      errors.name = 'Name is required';
    }

    if (!validators.email(data.email)) {
      errors.email = ERROR_MESSAGES.INVALID_EMAIL;
    }

    if (!validators.password(data.password)) {
      errors.password = ERROR_MESSAGES.INVALID_PASSWORD;
    }

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!validators.phone(data.phone)) {
      errors.phone = 'Invalid phone number';
    }

    return { isValid: Object.keys(errors).length === 0, errors };
  },

  login: (data) => {
    const errors = {};

    if (!validators.email(data.email)) {
      errors.email = ERROR_MESSAGES.INVALID_EMAIL;
    }

    if (!data.password) {
      errors.password = 'Password is required';
    }

    return { isValid: Object.keys(errors).length === 0, errors };
  },

  property: (data) => {
    const errors = {};

    if (!validators.propertyTitle(data.title)) {
      errors.title = 'Title must be between 3 and 200 characters';
    }

    if (!validators.price(data.price)) {
      errors.price = 'Invalid price';
    }

    if (!validators.address(data.address)) {
      errors.address = 'Invalid address';
    }

    if (!validators.city(data.city)) {
      errors.city = 'Invalid city';
    }

    if (data.bedrooms && !validators.bedrooms(data.bedrooms)) {
      errors.bedrooms = 'Invalid number of bedrooms';
    }

    if (data.bathrooms && !validators.bathrooms(data.bathrooms)) {
      errors.bathrooms = 'Invalid number of bathrooms';
    }

    return { isValid: Object.keys(errors).length === 0, errors };
  },

  booking: (data) => {
    const errors = {};

    if (!data.checkInDate) {
      errors.checkInDate = 'Check-in date is required';
    }

    if (!data.checkOutDate) {
      errors.checkOutDate = 'Check-out date is required';
    }

    if (data.checkInDate && data.checkOutDate && !validators.dateRange(data.checkInDate, data.checkOutDate)) {
      errors.dateRange = 'Check-out date must be after check-in date';
    }

    if (!validators.notEmpty(data.renterName)) {
      errors.renterName = 'Name is required';
    }

    if (!validators.email(data.renterEmail)) {
      errors.renterEmail = ERROR_MESSAGES.INVALID_EMAIL;
    }

    if (!validators.phone(data.renterPhone)) {
      errors.renterPhone = 'Invalid phone number';
    }

    return { isValid: Object.keys(errors).length === 0, errors };
  },

  review: (data) => {
    const errors = {};

    if (!validators.rating(data.rating)) {
      errors.rating = 'Rating must be between 1 and 5';
    }

    if (!validators.notEmpty(data.title)) {
      errors.title = 'Title is required';
    }

    if (!validators.notEmpty(data.comment) || data.comment.length < 10) {
      errors.comment = 'Comment must be at least 10 characters';
    }

    return { isValid: Object.keys(errors).length === 0, errors };
  },
};
