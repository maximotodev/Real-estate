import { useState, useCallback, useRef } from 'react';

export const useForm = (initialState, onSubmit, options = {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const submitCountRef = useRef(0);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;

    setValues((prev) => {
      const newValues = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };
      return newValues;
    });

    // Clear error for this field if it was touched
    if (touched[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [touched]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Optional: validate field on blur
    if (options.validateOnBlur && options.validate) {
      const fieldErrors = options.validate({ [name]: values[name] });
      if (fieldErrors[name]) {
        setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
      }
    }
  }, [values, touched, options]);

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault?.();

      // Mark all fields as touched
      setTouched(
        Object.keys(values).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );

      submitCountRef.current += 1;
      setIsSubmitting(true);

      try {
        // Run validation if provided
        if (options.validate) {
          setIsValidating(true);
          const validationErrors = options.validate(values);
          if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsValidating(false);
            setIsSubmitting(false);
            return;
          }
          setIsValidating(false);
        }

        // Call the submit handler
        await onSubmit(values, {
          resetForm: reset,
          setFieldError,
          setFieldValue,
          setErrors,
        });
      } catch (err) {
        console.error('Form submission error:', err);
        if (err.errors && typeof err.errors === 'object') {
          setErrors(err.errors);
        } else if (err.message) {
          setErrors({ submit: err.message });
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, onSubmit, options]
  );

  const reset = useCallback(() => {
    setValues(initialState);
    setErrors({});
    setTouched({});
    submitCountRef.current = 0;
  }, [initialState]);

  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const setFieldError = useCallback((name, error) => {
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  }, []);

  const getFieldProps = useCallback(
    (name) => ({
      name,
      value: values[name] || '',
      onChange: handleChange,
      onBlur: handleBlur,
      'aria-invalid': Boolean(errors[name]),
      'aria-describedby': errors[name] ? `${name}-error` : undefined,
    }),
    [values, errors, handleChange, handleBlur]
  );

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValidating,
    isDirty: JSON.stringify(values) !== JSON.stringify(initialState),
    submitCount: submitCountRef.current,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setFieldError,
    getFieldProps,
  };
};
