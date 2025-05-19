import axios from 'axios';

// Set the base URL for all axios requests
const isProduction = process.env.NODE_ENV === 'production';
// Check if we're running on GitHub Pages
const isGitHubPages = window.location.hostname.includes('github.io');

// Always use the Render backend URL when in production or on GitHub Pages
const baseURL = isProduction || isGitHubPages
  ? 'https://cs121-online-store-clone.onrender.com'
  : 'http://localhost:8000';

// Create axios instance with specific config
const api = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add response interceptor to log errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('Response error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.response.config.url
      });
    } else if (error.request) {
      console.error('Request error - No response received');
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Export configured axios for use throughout the app
export default api; 