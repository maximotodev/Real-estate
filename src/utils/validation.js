/**
 * Validate email format (RFC 5322 simplified)
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim().toLowerCase());
};

/**
 * Validate password complexity
 * @param {string} password - Password to validate
 * @returns {boolean} True if meets security requirements
 */
export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') return false;
  const len = password.length;
  if (len < 8 || len > 128) return false;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  return hasUpperCase && hasLowerCase && hasNumber;
};

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone format
 */
export const validatePhoneNumber = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
};

export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateZipCode = (zipCode) => {
  const regex = /^\d{5}(-\d{4})?$/;
  return regex.test(zipCode);
};

export const validateCreditCard = (cardNumber) => {
  const cleaned = cardNumber.replace(/\D/g, '');
  if (cleaned.length < 13 || cleaned.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

export const validateDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start < end && start > new Date();
};

export const validatePropertyDetails = (property) => {
  const errors = {};

  if (!property.title || property.title.trim().length === 0) {
    errors.title = 'Title is required';
  }

  if (!property.description || property.description.trim().length < 20) {
    errors.description = 'Description must be at least 20 characters';
  }

  if (!property.pricePerNight || property.pricePerNight <= 0) {
    errors.pricePerNight = 'Price must be greater than 0';
  }

  if (!property.bedrooms || property.bedrooms < 0) {
    errors.bedrooms = 'Invalid number of bedrooms';
  }

  if (!property.bathrooms || property.bathrooms < 0) {
    errors.bathrooms = 'Invalid number of bathrooms';
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

export const validateBookingDates = (checkIn, checkOut) => {
  const errors = {};
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const now = new Date();

  if (checkInDate <= now) {
    errors.checkIn = 'Check-in date must be in the future';
  }

  if (checkOutDate <= checkInDate) {
    errors.checkOut = 'Check-out date must be after check-in date';
  }

  const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
  if (nights < 1) {
    errors.dates = 'Minimum stay is 1 night';
  }

  if (nights > 365) {
    errors.dates = 'Maximum stay is 365 nights';
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

export const validateReview = (review) => {
  const errors = {};

  if (!review.rating || review.rating < 1 || review.rating > 5) {
    errors.rating = 'Rating must be between 1 and 5';
  }

  if (!review.comment || review.comment.trim().length < 10) {
    errors.comment = 'Review must be at least 10 characters';
  }

  if (review.comment.trim().length > 5000) {
    errors.comment = 'Review cannot exceed 5000 characters';
  }

  return Object.keys(errors).length === 0 ? null : errors;
};
