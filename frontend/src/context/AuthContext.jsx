import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get('/auth/me');
      if (response.data) {
        setUser(response.data);
        setError(null);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      setError(error.message || 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);

      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const response = await api.post('/auth/login', { 
        email: email.trim(),
        password: password
      });

      console.log('Login response:', response.data); // Debug log for entire response
      console.log('User role:', response.data.role); // Debug log specifically for role

      const { token, _id, name, email: userEmail, role } = response.data;
      
      if (!token) {
        throw new Error('No authentication token received');
      }

      const userData = {
        _id,
        name,
        email: userEmail,
        role
      };

      console.log('User data being set:', userData); // Debug log for final user data

      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage;
      
      if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (error.message === 'No authentication token received') {
        errorMessage = error.message;
      } else {
        errorMessage = 'Failed to login. Please try again.';
      }
      
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);

      // Validate required fields
      const requiredFields = ['name', 'email', 'password'];
      for (const field of requiredFields) {
        if (!userData[field]) {
          throw new Error(`${field} is required`);
        }
      }

      const response = await api.post('/auth/register', {
        ...userData,
        email: userData.email.trim()
      });

      const { token, user: newUser } = response.data;
      
      if (!token || !newUser) {
        throw new Error('Invalid response from server');
      }

      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(newUser);
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.message === 'User already exists' 
        ? 'This email is already registered. Please try logging in instead.'
        : error.message || 'Failed to register';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 