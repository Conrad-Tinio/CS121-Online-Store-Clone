import axios from 'axios';

// Set the base URL for all axios requests
const isProduction = process.env.NODE_ENV === 'production';

// Use the Render backend URL in production, localhost in development
axios.defaults.baseURL = isProduction
  ? 'https://cs121-online-store-clone.onrender.com'
  : 'http://localhost:8000';

// Export configured axios for use throughout the app
export default axios; 