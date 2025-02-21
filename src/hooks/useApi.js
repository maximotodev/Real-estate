import { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';

export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const execute = useCallback(
    async (customUrl = url, customOptions = {}) => {
      setLoading(true);
      setError(null);

      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const headers = {
          ...customOptions.headers,
          ...(token && { Authorization: `Bearer ${token}` }),
        };

        const response = await axios({
          url: customUrl,
          method: customOptions.method || options.method || 'GET',
          headers,
          data: customOptions.data || options.data,
          params: customOptions.params || options.params,
          ...customOptions,
        });

        if (isMounted.current) {
          setData(response.data);
        }

        return response.data;
      } catch (err) {
        if (isMounted.current) {
          setError(err.response?.data?.error || err.message);
        }
        throw err;
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    },
    [url, options]
  );

  const refetch = useCallback(() => execute(url), [execute, url]);

  return { data, loading, error, execute, refetch };
};

export const useGet = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(url, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          ...options,
        });

        if (isMounted.current) {
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted.current) {
          setError(err.response?.data?.error || err.message);
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading, error };
};

export const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (url, data = {}, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(url, data, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        ...options,
      });

      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading, error };
};

export const usePut = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (url, data = {}, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(url, data, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        ...options,
      });

      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading, error };
};

export const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        ...options,
      });

      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading, error };
};
