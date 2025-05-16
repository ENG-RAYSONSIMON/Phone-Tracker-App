import { authApi } from './api-client';

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await authApi.post('/register', userData);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || 'Registration failed.';
    throw new Error(errMsg);
  }
};

// Login user
export const loginUser = async ({email,password}) => {
  try {
    const response = await authApi.post('/login', {email,password});
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || 'Login failed.';
    throw new Error(errMsg);
  }
};
