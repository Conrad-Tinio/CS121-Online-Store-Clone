import axios from 'axios';

// Set the base URL for all axios requests
const isProduction = process.env.NODE_ENV === 'production';
// Check if we're running on GitHub Pages
const isGitHubPages = window.location.hostname.includes('github.io');

// Always use the Render backend URL when in production or on GitHub Pages
axios.defaults.baseURL = isProduction || isGitHubPages
  ? 'https://cs121-online-store-clone.onrender.com'
  : 'http://localhost:8000';

// Configure CORS settings
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

// Add request interceptor to handle CORS preflight
axios.interceptors.request.use(
  config => {
    // Add headers when on GitHub Pages
    if (isGitHubPages) {
      config.headers['Origin'] = 'https://conrad-tinio.github.io';
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
      console.error('Response error:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      console.error('Request error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Export configured axios for use throughout the app
export default axios; 