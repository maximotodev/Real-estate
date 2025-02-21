import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }

    setLoading(false);
  }, []);

  const login = useCallback((user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    router.push('/auth/login');
  }, [router]);

  const updateUser = useCallback((updatedUser) => {
    const newUser = { ...user, ...updatedUser };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  }, [user]);

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
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

  return !loading;
};

export const useRequireRole = (role, redirectPath = '/dashboard') => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user?.role !== role) {
      router.push(redirectPath);
    }
  }, [user, loading, router, role, redirectPath]);

  return !loading && user?.role === role;
};
