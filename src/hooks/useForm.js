import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Custom hook for form state management with validation
 * @param {object} initialState - Initial form values
 * @param {function} onSubmit - Callback on form submission
 * @param {object} options - Configuration options (validate, validateOnBlur)
 * @returns {object} Form state and helpers
 */
export const useForm = (initialState, onSubmit, options = {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const submitCountRef = useRef(0);
  const initialStateRef = useRef(initialState);

  // Keep initialState ref current without re-triggering effects
  useEffect(() => {
    initialStateRef.current = initialState;
  });

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setValues((prev) => ({ ...prev, [name]: newValue }));
    setIsSuccess(false);

    if (touched[name] && errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }, [touched, errors]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (options.validateOnBlur && options.validate) {
      const fieldErrors = options.validate({ [name]: values[name] });
      if (fieldErrors[name]) {
        setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
      }
    }
  }, [values, options]);

  const handleSubmit = useCallback(async (e) => {
    e?.preventDefault?.();

    // Touch all fields so errors are visible
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (options.validate) {
      const validationErrors = options.validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    submitCountRef.current += 1;
    setIsSubmitting(true);
    setErrors({});

    try {
      await onSubmit(values, { reset, setFieldError, setFieldValue, setErrors });
      setIsSuccess(true);
    } catch (err) {
      if (err?.errors && typeof err.errors === 'object') {
        setErrors(err.errors);
      } else if (err?.message) {
        setErrors({ submit: err.message });
      } else {
        setErrors({ submit: 'Something went wrong. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [values, onSubmit, options]);

  const reset = useCallback(() => {
    setValues(initialStateRef.current);
    setErrors({});
    setTouched({});
    setIsSuccess(false);
    submitCountRef.current = 0;
  }, []);

  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const setFieldError = useCallback((name, error) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const clearFieldError = useCallback((name) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const getFieldProps = useCallback((name) => ({
    name,
    value: values[name] ?? '',
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-invalid': Boolean(errors[name] && touched[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  }), [values, errors, touched, handleChange, handleBlur]);

  const getCheckboxProps = useCallback((name) => ({
    name,
    checked: Boolean(values[name]),
    onChange: handleChange,
    onBlur: handleBlur,
  }), [values, handleChange, handleBlur]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isSuccess,
    isDirty: JSON.stringify(values) !== JSON.stringify(initialStateRef.current),
    submitCount: submitCountRef.current,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setFieldError,
    clearFieldError,
    getFieldProps,
    getCheckboxProps,
  };
};
