import axios from 'axios';

// Set the base URL for all axios requests
const isProduction = process.env.NODE_ENV === 'production';
// Check if we're running on GitHub Pages
const isGitHubPages = window.location.hostname.includes('github.io');

// For GitHub Pages, we'll need to revert to mock data since CORS is blocking the API
// This is because GitHub Pages can't access your backend directly due to CORS restrictions
if (isGitHubPages) {
  // Set up interceptor to mock API responses
  axios.interceptors.request.use(request => {
    // Let requests for static assets go through normally
    if (request.url.includes('/static/') || request.url.endsWith('.json')) {
      return request;
    }
    
    console.log('Intercepting API request on GitHub Pages:', request.url);
    // Return a rejected promise with a specific format that our app can handle
    return Promise.reject({
      response: {
        status: 200,
        data: getMockDataForUrl(request.url, request.method, request.data)
      }
    });
  });
  
  // Set a placeholder baseURL
  axios.defaults.baseURL = 'https://cs121-online-store-clone.onrender.com';
} else {
  // Regular behavior for local or Render deployments
  axios.defaults.baseURL = isProduction 
    ? 'https://cs121-online-store-clone.onrender.com'
    : 'http://localhost:8000';
}

// Configure axios for cross-origin requests
axios.defaults.withCredentials = false;

// Add response interceptor to log errors
axios.interceptors.response.use(
  response => response,
  error => {
    // If this is our mock data response, just return it
    if (error.response && error.response.status === 200 && error.response.data) {
      return Promise.resolve(error.response);
    }
    
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

// Function to provide mock data based on the requested URL
function getMockDataForUrl(url, method, requestData) {
  console.log('Generating mock data for:', url, method);
  
  // Login endpoint
  if (url.includes('/api/users/login/')) {
    return {
      id: 1,
      username: 'demo@example.com',
      email: 'demo@example.com',
      name: 'Demo User',
      isAdmin: false,
      token: 'demo-token-1234567890'
    };
  }
  
  // Register endpoint
  if (url.includes('/api/users/register/')) {
    return {
      details: "This is a demo mode. In a real app, you would receive an activation email."
    };
  }
  
  // Product list
  if (url.includes('/api/products/')) {
    return [
      {
        _id: '1',
        productName: 'Toy Robot',
        image: 'https://placehold.co/400x400?text=Toy+Robot',
        description: 'A fun robot toy',
        brand: 'ToyBrand',
        category: 'Toys',
        price: 29.99,
        stockCount: 10,
        rating: 4.5,
        numReviews: 12,
      },
      {
        _id: '2', 
        productName: 'Teddy Bear',
        image: 'https://placehold.co/400x400?text=Teddy+Bear',
        description: 'Soft cuddly bear',
        brand: 'ToyBrand',
        category: 'Plush',
        price: 19.99,
        stockCount: 7,
        rating: 4.0,
        numReviews: 8,
      }
    ];
  }
  
  // Categories
  if (url.includes('/api/categories/')) {
    return [
      { id: '1', name: 'Toys' },
      { id: '2', name: 'Plush' },
      { id: '3', name: 'Games' }
    ];
  }
  
  // Tag types for filtering
  if (url.includes('/api/tag-types/')) {
    return [
      { 
        id: '1',
        name: 'Color',
        tags: [
          { id: '1', name: 'Red' },
          { id: '2', name: 'Blue' },
          { id: '3', name: 'Green' }
        ]
      },
      { 
        id: '2',
        name: 'Age',
        tags: [
          { id: '4', name: '0-2 years' },
          { id: '5', name: '3-5 years' },
          { id: '6', name: '6-8 years' }
        ]
      }
    ];
  }
  
  // Single product
  if (url.match(/\/api\/product\/\w+/)) {
    const id = url.split('/').pop();
    return {
      _id: id,
      productName: `Product ${id}`,
      image: `https://placehold.co/400x400?text=Product+${id}`,
      description: 'This is a demo product description for GitHub Pages mode.',
      brand: 'ToyBrand',
      category: 'Toys',
      price: 29.99,
      stockCount: 10,
      rating: 4.5,
      numReviews: 12,
      tags: [
        { type: 'Color', name: 'Red' },
        { type: 'Age', name: '3-5 years' }
      ]
    };
  }
  
  // Orders
  if (url.includes('/api/orders/myorders/')) {
    return [
      {
        _id: '1',
        createdAt: new Date().toISOString(),
        totalPrice: 59.98,
        isPaid: true,
        paidAt: new Date().toISOString(),
        isDelivered: false,
        orderItems: [
          {
            _id: '1',
            productName: 'Toy Robot',
            qty: 2,
            price: 29.99,
            image: 'https://placehold.co/400x400?text=Toy+Robot',
          }
        ]
      }
    ];
  }
  
  // Default response
  return { message: 'Mock data not implemented for this endpoint', status: 'demo_mode' };
}

// Export configured axios for use throughout the app
export default axios; 