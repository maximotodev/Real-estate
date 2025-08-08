import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

const decodeTokenExpiry = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
};

const isTokenExpired = (token) => {
  const expiry = decodeTokenExpiry(token);
  if (!expiry) return false;
  return Date.now() >= expiry - 60_000; // treat as expired 1 minute early
};

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const expiryTimerRef = useRef(null);

  const scheduleAutoLogout = useCallback((token) => {
    if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);
    const expiry = decodeTokenExpiry(token);
    if (!expiry) return;
    const delay = expiry - Date.now() - 60_000;
    if (delay <= 0) return;
    expiryTimerRef.current = setTimeout(() => {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setUser(null);
      setIsAuthenticated(false);
      router.push('/auth/login?reason=session_expired');
    }, delay);
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const userData = localStorage.getItem(USER_KEY);

    if (token && userData) {
      if (isTokenExpired(token)) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      } else {
        try {
          setUser(JSON.parse(userData));
          setIsAuthenticated(true);
          scheduleAutoLogout(token);
        } catch {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
        }
      }
    }

    setLoading(false);

    return () => {
      if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);
    };
  }, [scheduleAutoLogout]);

  const login = useCallback((userData, token) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    scheduleAutoLogout(token);
  }, [scheduleAutoLogout]);

  const logout = useCallback((redirectPath = '/auth/login') => {
    if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setIsAuthenticated(false);
    router.push(redirectPath);
  }, [router]);

  const updateUser = useCallback((updates) => {
    setUser((prev) => {
      if (!prev) return prev;
      const merged = { ...prev, ...updates };
      localStorage.setItem(USER_KEY, JSON.stringify(merged));
      return merged;
    });
  }, []);

  const getToken = useCallback(() => {
    return localStorage.getItem(TOKEN_KEY);
  }, []);

  const hasRole = useCallback((role) => {
    return user?.role === role;
  }, [user]);

  return {
    user,
    loading,
    isAuthenticated,
    isLoading: loading,
    login,
    logout,
    updateUser,
    getToken,
    hasRole,
  };
};

export const useRequireAuth = (redirectPath = '/auth/login') => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(redirectPath);
    }
  }, [isAuthenticated, loading, router, redirectPath]);

  return { ready: !loading && isAuthenticated, loading };
};

export const useRequireRole = (role, redirectPath = '/dashboard') => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user?.role !== role) {
      router.push(redirectPath);
    }
  }, [user, loading, router, role, redirectPath]);

  return { ready: !loading && user?.role === role, loading };
};
