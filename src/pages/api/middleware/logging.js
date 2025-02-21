export const requestLogger = (req, res, next) => {
  const start = Date.now();
  const originalEnd = res.end;

  res.end = function (...args) {
    const duration = Date.now() - start;
    const log = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.headers['user-agent'],
      ip: req.ip || req.headers['x-forwarded-for'] || 'unknown',
    };

    if (process.env.NODE_ENV === 'development') {
      console.log('[API Request]', log);
    }

    return originalEnd.apply(res, args);
  };

  return next?.() || true;
};

export const logger = {
  info: (message, data = {}) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[INFO] ${new Date().toISOString()} - ${message}`, data);
    }
  },

  error: (message, error = {}) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error);
  },

  warn: (message, data = {}) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, data);
  },

  debug: (message, data = {}) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`, data);
    }
  },
};
