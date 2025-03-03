// Property Types
export const PROPERTY_TYPES = [
  'Apartment',
  'House',
  'Villa',
  'Condo',
  'Townhouse',
  'Studio',
  'Cottage',
  'Penthouse',
];

// User Types
export const USER_TYPES = {
  GUEST: 'guest',
  HOST: 'host',
  ADMIN: 'admin',
};

// Booking Status
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

// Review Status
export const REVIEW_STATUS = {
  PENDING_APPROVAL: 'pending_approval',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  REPORTED: 'reported',
};

// Notification Types
export const NOTIFICATION_TYPES = {
  BOOKING_CONFIRMED: 'booking_confirmed',
  BOOKING_CANCELLED: 'booking_cancelled',
  MESSAGE_RECEIVED: 'message_received',
  REVIEW_POSTED: 'review_posted',
  PAYMENT_RECEIVED: 'payment_received',
  HOST_REVIEW: 'host_review',
  SYSTEM_UPDATE: 'system_update',
};

// Amenities
export const AMENITIES = [
  'WiFi',
  'Parking',
  'Pool',
  'Gym',
  'Kitchen',
  'Laundry',
  'AC',
  'Heating',
  'TV',
  'Washer',
  'Dryer',
  'Dishwasher',
  'Balcony',
  'Garden',
  'CCTV',
  'Pets Allowed',
  'Hot Tub',
  'Sauna',
  'Elevator',
  'Security',
];

// Validation Rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_PROPERTY_TITLE_LENGTH: 5,
  MAX_PROPERTY_TITLE_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 20,
  MAX_DESCRIPTION_LENGTH: 5000,
  MIN_PRICE: 1,
  MAX_PRICE: 10000,
  MIN_GUESTS: 1,
  MAX_GUESTS: 20,
  MIN_BEDROOMS: 0,
  MAX_BEDROOMS: 10,
  MIN_STAY_NIGHTS: 1,
  MAX_STAY_NIGHTS: 365,
  MIN_RATING: 1,
  MAX_RATING: 5,
};

// API Response Codes
export const API_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Error Messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized access. Please sign in.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'An error occurred on the server. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  BOOKING_CONFIRMED: 'Your booking has been confirmed!',
  PAYMENT_SUCCESSFUL: 'Payment successful!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PROPERTY_CREATED: 'Property created successfully!',
  REVIEW_POSTED: 'Review posted successfully!',
  MESSAGE_SENT: 'Message sent successfully!',
};

// Page Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  DASHBOARD: '/dashboard',
  BOOKINGS: '/bookings',
  WISHLIST: '/wishlist',
  PROFILE: '/profile',
  PROPERTIES: '/properties',
  SEARCH: '/search',
  FEATURED: '/featured',
  LANDLORD_LISTINGS: '/landlord/listings',
  LANDLORD_EARNINGS: '/landlord/earnings',
  LANDLORD_REVIEWS: '/landlord/reviews',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
};

// Email Templates
export const EMAIL_TEMPLATES = {
  WELCOME: 'welcome',
  BOOKING_CONFIRMATION: 'booking_confirmation',
  BOOKING_REMINDER: 'booking_reminder',
  CANCELLATION: 'cancellation',
  REVIEW_REQUEST: 'review_request',
  PAYMENT_RECEIPT: 'payment_receipt',
};

// Token Expiry Times
export const TOKEN_EXPIRY = {
  ACCESS: '24h',
  REFRESH: '7d',
  PASSWORD_RESET: '1h',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  DEFAULT_PAGE: 1,
};

// Sorting Options
export const SORT_OPTIONS = {
  NEWEST: 'newest',
  PRICE_LOW: 'price_low',
  PRICE_HIGH: 'price_high',
  RATING: 'rating',
  POPULAR: 'popular',
};

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'MMM DD, YYYY',
  LONG: 'MMMM DD, YYYY',
  TIME: 'hh:mm A',
  FULL: 'MMMM DD, YYYY hh:mm A',
};
