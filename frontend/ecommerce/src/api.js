import axios from 'axios';

// Set the base URL for all axios requests
const isProduction = process.env.NODE_ENV === 'production';
// Check if we're running on GitHub Pages
const isGitHubPages = window.location.hostname.includes('github.io');

// Always use the Render backend URL when in production or on GitHub Pages
axios.defaults.baseURL = isProduction || isGitHubPages
  ? 'https://cs121-online-store-clone.onrender.com'
  : 'http://localhost:8000';

// Add CORS headers for GitHub Pages requests
if (isGitHubPages) {
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
}

// Export configured axios for use throughout the app
export default axios; 