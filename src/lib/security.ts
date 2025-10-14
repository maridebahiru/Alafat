/**
 * Security utilities for data masking and protection
 */

/**
 * Mask email address for display
 * Example: john.doe@example.com -> j***@example.com
 */
export const maskEmail = (email: string): string => {
  if (!email || !email.includes('@')) return email;
  
  const [local, domain] = email.split('@');
  if (local.length <= 2) {
    return `${local[0]}***@${domain}`;
  }
  
  return `${local[0]}${'*'.repeat(local.length - 1)}@${domain}`;
};

/**
 * Mask phone number for display
 * Example: +251911234567 -> +251****4567
 */
export const maskPhoneNumber = (phone: string): string => {
  if (!phone || phone.length < 8) return phone;
  
  const visibleStart = phone.slice(0, 4);
  const visibleEnd = phone.slice(-4);
  const maskedLength = phone.length - 8;
  
  return `${visibleStart}${'*'.repeat(maskedLength)}${visibleEnd}`;
};

/**
 * Sanitize user input to prevent injection attacks
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 1000); // Limit length
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const isStrongPassword = (password: string): { valid: boolean; message: string } => {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  
  return { valid: true, message: 'Password is strong' };
};
