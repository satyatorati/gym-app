export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
};

export const validatePhone = (phone) => {
  // Basic phone number validation (10 digits)
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};

export const validateRequired = (value) => {
  return value.trim().length > 0;
};

export const validateMinLength = (value, min) => {
  return value.length >= min;
};

export const validateMaxLength = (value, max) => {
  return value.length <= max;
};

export const validateNumber = (value) => {
  return !isNaN(value) && value > 0;
};

export const validateDate = (date) => {
  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj);
};

export const validateTime = (time) => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateFileSize = (file, maxSize) => {
  return file.size <= maxSize;
};

export const validateFileType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};

export const getValidationError = (value, validations) => {
  for (const validation of validations) {
    const { rule, message } = validation;
    if (!rule(value)) {
      return message;
    }
  }
  return '';
};

export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;

  for (const [field, rules] of Object.entries(validationRules)) {
    const error = getValidationError(formData[field], rules);
    if (error) {
      errors[field] = error;
      isValid = false;
    }
  }

  return { isValid, errors };
}; 