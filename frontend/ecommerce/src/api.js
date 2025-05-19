import axios from 'axios';

// Set the base URL for all axios requests
const isProduction = process.env.NODE_ENV === 'production';
// Check if we're running on GitHub Pages
const isGitHubPages = window.location.hostname.includes('github.io');

// Always use the Render backend URL when in production or on GitHub Pages
axios.defaults.baseURL = isProduction || isGitHubPages
  ? 'https://cs121-online-store-clone.onrender.com'
  : 'http://localhost:8000';

// Configure CORS settings properly
axios.defaults.withCredentials = false;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add request interceptor to handle CORS preflight
axios.interceptors.request.use(
  config => {
    // Add origin header when on GitHub Pages
    if (isGitHubPages) {
      config.headers['Origin'] = 'https://conrad-tinio.github.io';
      config.headers['Access-Control-Request-Method'] = config.method.toUpperCase();
      config.headers['Access-Control-Request-Headers'] = 'Content-Type, Authorization';
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add response interceptor to log errors
axios.interceptors.response.use(
  response => response,
  error => {
    // Log any errors to the console for debugging
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response error:', error.response.status, error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Export configured axios for use throughout the app
export default axios; 