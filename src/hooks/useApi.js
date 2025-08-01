import { useState, useEffect, useCallback } from 'react';

export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      };

      const response = await window.fetch(url, {
        method: options.method || 'GET',
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    if (options.skip) return;
    fetch();
  }, [fetch, options.skip]);

  return { data, loading, error, refetch: fetch };
};

export const useGet = (url, options = {}) => {
  return useApi(url, { ...options, method: 'GET' });
};

export const usePost = (url, options = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(
    async (body) => {
      try {
        setLoading(true);
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const response = await window.fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        return await response.json();
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  return { mutate, loading, error };
};

export const usePut = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(
    async (body) => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        return await response.json();
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  return { mutate, loading, error };
};

export const useDelete = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      return await response.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url]);

  return { mutate, loading, error };
};
