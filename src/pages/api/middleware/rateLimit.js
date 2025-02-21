const requestCounts = new Map();

export const rateLimit = (options = {}) => {
  const {
    windowMs = 60 * 1000, // 1 minute
    maxRequests = 100,
    keyGenerator = (req) => req.ip || req.headers['x-forwarded-for'] || 'unknown',
  } = options;

  return (req, res, next) => {
    const key = keyGenerator(req);
    const now = Date.now();

    if (!requestCounts.has(key)) {
      requestCounts.set(key, []);
    }

    const requests = requestCounts.get(key);
    const recentRequests = requests.filter((time) => now - time < windowMs);

    if (recentRequests.length >= maxRequests) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests, please try again later',
      });
    }

    recentRequests.push(now);
    requestCounts.set(key, recentRequests);

    return next?.() || true;
  };
};

export const endpointRateLimit = (windowMs = 60000, maxRequests = 100) => {
  return (req, res) => {
    return rateLimit({ windowMs, maxRequests })(req, res, null);
  };
};
