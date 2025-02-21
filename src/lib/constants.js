// Property types
export const PROPERTY_TYPES = ['apartment', 'house', 'condo', 'studio', 'townhouse', 'villa', 'cottage'];

// User roles
export const USER_ROLES = {
  RENTER: 'renter',
  LANDLORD: 'landlord',
  ADMIN: 'admin',
};

// Booking statuses
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  REJECTED: 'rejected',
};

// Review ratings
export const REVIEW_RATINGS = {
  EXCELLENT: 5,
  GOOD: 4,
  AVERAGE: 3,
  POOR: 2,
  VERY_POOR: 1,
};

// Notification types
export const NOTIFICATION_TYPES = {
  BOOKING: 'booking',
  MESSAGE: 'message',
  REVIEW: 'review',
  PAYMENT: 'payment',
  PROPERTY: 'property',
  SYSTEM: 'system',
};

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 100,
};

// Validation rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_PRICE: 0,
  MAX_PRICE: 10000000,
  MIN_BEDROOMS: 0,
  MAX_BEDROOMS: 20,
  MIN_BATHROOMS: 0,
  MAX_BATHROOMS: 20,
};

// API response codes
export const API_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

// Error messages
export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Invalid email address',
  INVALID_PASSWORD: 'Password must be at least 8 characters',
  EMAIL_EXISTS: 'Email already registered',
  USER_NOT_FOUND: 'User not found',
  PROPERTY_NOT_FOUND: 'Property not found',
  BOOKING_NOT_FOUND: 'Booking not found',
  UNAUTHORIZED: 'Unauthorized access',
  INVALID_TOKEN: 'Invalid or expired token',
  SERVER_ERROR: 'Internal server error',
  INVALID_CREDENTIALS: 'Invalid email or password',
  INSUFFICIENT_PERMISSIONS: 'Insufficient permissions',
  RESOURCE_NOT_FOUND: 'Resource not found',
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  REGISTER_SUCCESS: 'Registration successful',
  PROPERTY_CREATED: 'Property created successfully',
  PROPERTY_UPDATED: 'Property updated successfully',
  PROPERTY_DELETED: 'Property deleted successfully',
  BOOKING_CREATED: 'Booking created successfully',
  BOOKING_CANCELLED: 'Booking cancelled successfully',
  REVIEW_POSTED: 'Review posted successfully',
  MESSAGE_SENT: 'Message sent successfully',
  NOTIFICATION_READ: 'Notification marked as read',
};

// Email templates
export const EMAIL_TEMPLATES = {
  WELCOME: 'welcome',
  BOOKING_CONFIRMATION: 'booking-confirmation',
  BOOKING_CANCELLED: 'booking-cancelled',
  REVIEW_POSTED: 'review-posted',
  MESSAGE_RECEIVED: 'message-received',
  PROPERTY_LISTED: 'property-listed',
};

// Request timeout in ms
export const REQUEST_TIMEOUT = 30000;

// Token expiry times
export const TOKEN_EXPIRY = {
  ACCESS_TOKEN: '7d',
  REFRESH_TOKEN: '30d',
};
