import React, { useCallback } from 'react';


export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    let errorMessage = target.validationMessage;

    if (name === 'email') {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
      if (!emailPattern.test(value)) {
        errorMessage = 'Введите корректный email';
      }
    }

    if (name === 'name') {
      const namePattern = /^[a-zA-Zа-яА-Я\s-]*$/;
      if (!namePattern.test(value)) {
        errorMessage = 'Имя может содержать только латиницу, кириллицу, пробел или дефис';
      }
    }

    setValues({...values, [name]: value});
    setErrors({ ...errors, [name]: errorMessage});
    setIsValid(target.closest('form').checkValidity());
  };

  
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}