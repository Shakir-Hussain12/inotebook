export const validUsername = (name) => (name && name.length > 5 ? '' : 'Username must be at least 6 characters');

export const validEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? '' : 'Enter a valid email';
};

export const validPassword = (password) => (password.length > 5 ? '' : 'Password must be at least 6 characters');
