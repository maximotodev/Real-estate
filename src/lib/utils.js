import { PAGINATION } from './constants';

export const formatters = {
  currency: (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  },

  date: (date, format = 'short') => {
    const dateObj = new Date(date);
    if (format === 'short') {
      return dateObj.toLocaleDateString();
    }
    if (format === 'long') {
      return dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    if (format === 'time') {
      return dateObj.toLocaleTimeString();
    }
    return dateObj.toISOString();
  },

  dateTime: (date) => {
    return new Date(date).toLocaleString();
  },

  time: (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  },

  phone: (phone) => {
    const cleaned = String(phone).replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  },

  address: (address, city, state, zipCode) => {
    return [address, city, state, zipCode].filter(Boolean).join(', ');
  },

  truncate: (text, length = 100) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
  },

  capitalize: (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  },

  slugify: (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  rating: (rating) => {
    const rounded = Math.round(rating * 2) / 2;
    return rounded.toFixed(1);
  },

  percentage: (value, total) => {
    if (total === 0) return 0;
    return ((value / total) * 100).toFixed(1);
  },
};

export const validators = {
  isEmpty: (value) => {
    return value === null || value === undefined || value === '';
  },

  isValidEmail: (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  isValidUrl: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  isValidMongoId: (id) => {
    return /^[0-9a-fA-F]{24}$/.test(String(id));
  },
};

export const calculations = {
  getDaysBetween: (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffMs = end - start;
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  },

  calculateNights: (checkIn, checkOut) => {
    return calculations.getDaysBetween(checkIn, checkOut);
  },

  calculateTotalPrice: (pricePerNight, nights) => {
    return pricePerNight * nights;
  },

  calculateAverageRating: (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, r) => acc + r, 0);
    return (sum / ratings.length).toFixed(1);
  },

  calculatePaginationOffset: (page, limit) => {
    return (page - 1) * limit;
  },

  getTotalPages: (total, limit) => {
    return Math.ceil(total / limit);
  },
};

export const helpers = {
  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),

  getInitials: (name) => {
    return name
      .split(' ')
      .map((word) => word[0].toUpperCase())
      .join('')
      .slice(0, 2);
  },

  generateUniqueId: () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  generateRandomString: (length = 10) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  debounce: (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  },

  throttle: (func, limit) => {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  chunk: (array, size) => {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, (i + 1) * size)
    );
  },

  flatten: (array) => {
    return array.reduce((flat, toFlatten) => {
      return flat.concat(Array.isArray(toFlatten) ? helpers.flatten(toFlatten) : toFlatten);
    }, []);
  },

  unique: (array, key) => {
    if (!key) return [...new Set(array)];
    return array.reduce((unique, item) => {
      const value = item[key];
      if (!unique.find((u) => u[key] === value)) {
        unique.push(item);
      }
      return unique;
    }, []);
  },

  groupBy: (array, key) => {
    return array.reduce((grouped, item) => {
      const value = item[key];
      if (!grouped[value]) grouped[value] = [];
      grouped[value].push(item);
      return grouped;
    }, {});
  },

  sortBy: (array, key, order = 'asc') => {
    return [...array].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
      return 0;
    });
  },

  paginate: (array, page = 1, limit = PAGINATION.DEFAULT_LIMIT) => {
    const offset = (page - 1) * limit;
    return {
      data: array.slice(offset, offset + limit),
      pagination: {
        page,
        limit,
        total: array.length,
        pages: Math.ceil(array.length / limit),
      },
    };
  },

  isTimeInRange: (time, startTime, endTime) => {
    const t = new Date(`2000/01/01 ${time}`).getTime();
    const start = new Date(`2000/01/01 ${startTime}`).getTime();
    const end = new Date(`2000/01/01 ${endTime}`).getTime();
    return t >= start && t <= end;
  },

  getClientIP: (req) => {
    return (
      req.headers['x-forwarded-for']?.split(',')[0] ||
      req.headers['x-real-ip'] ||
      req.socket?.remoteAddress ||
      req.connection?.remoteAddress
    );
  },

  isProduction: () => process.env.NODE_ENV === 'production',

  isDevelopment: () => process.env.NODE_ENV === 'development',
};
