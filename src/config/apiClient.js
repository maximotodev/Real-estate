import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors and token refresh
apiClient.interceptors.response.use(
  (response) => {
    // Reset queue on successful response
    if (isRefreshing) {
      processQueue(null, response.config.headers.Authorization);
    }
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Don't retry login endpoint itself
      if (originalRequest.url?.includes('/auth/login')) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/auth/login';
        }
        return Promise.reject(error);
      }

      // Queue requests and logout
      if (typeof window !== 'undefined') {
        if (!isRefreshing) {
          isRefreshing = true;
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/auth/login';
          processQueue(error, null);
        }

        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => apiClient(originalRequest));
      }
    }

    // Log errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', {
        url: originalRequest.url,
        method: originalRequest.method,
        status: error.response?.status,
        message: error.response?.data?.error || error.message,
      });
    }

    return Promise.reject(error);
  }
);

export default apiClient;

// API endpoints - organized by resource
export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
  },
  properties: {
    list: '/properties',
    detail: (id) => `/properties/${id}`,
    create: '/properties',
    update: (id) => `/properties/${id}`,
    delete: (id) => `/properties/${id}`,
    search: '/search',
  },
  bookings: {
    list: '/bookings',
    detail: (id) => `/bookings/${id}`,
    create: '/bookings',
    update: (id) => `/bookings/${id}`,
    cancel: (id) => `/bookings/${id}`,
  },
  reviews: {
    list: '/reviews',
    create: '/reviews',
    detail: (id) => `/reviews/${id}`,
  },
  wishlist: {
    list: '/wishlist',
    add: '/wishlist',
    remove: (id) => `/wishlist/${id}`,
  },
  messages: {
    list: '/messages',
    send: '/messages',
    byConversation: (id) => `/messages?conversationId=${id}`,
  },
  notifications: {
    list: '/notifications',
    markAsRead: (id) => `/notifications/${id}`,
    delete: (id) => `/notifications/${id}`,
  },
  stats: '/stats',
  profile: '/users/profile',
};

// API request helper with better error handling
export const apiRequest = async (method, url, data = null, config = {}) => {
  try {
    const response = await apiClient({
      method,
      url,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
    throw new Error(errorMessage);
  }
};
