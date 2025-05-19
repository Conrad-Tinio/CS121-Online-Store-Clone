import axios from 'axios';

// Set the base URL for all axios requests
const isProduction = process.env.NODE_ENV === 'production';
// Check if we're running on GitHub Pages
const isGitHubPages = window.location.hostname.includes('github.io');

// For GitHub Pages we'll use mock data instead of real API calls
if (isGitHubPages) {
  // Create axios mock interceptor for GitHub Pages
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
} else {
  // Use the Render backend URL in production, localhost in development
  axios.defaults.baseURL = isProduction
    ? 'https://cs121-online-store-clone.onrender.com'
    : 'http://localhost:8000';
}

// Function to provide mock data based on the requested URL
function getMockDataForUrl(url, method, requestData) {
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
  if (url === '/api/products/') {
    return {
      products: [
        {
          id: '1',
          name: 'Toy Robot',
          image: '/static/media/logo192.png',
          description: 'A fun robot toy',
          brand: 'ToyBrand',
          category: 'Toys',
          price: 29.99,
          countInStock: 10,
          rating: 4.5,
          numReviews: 12,
        },
        {
          id: '2', 
          name: 'Teddy Bear',
          image: '/static/media/logo192.png',
          description: 'Soft cuddly bear',
          brand: 'ToyBrand',
          category: 'Plush',
          price: 19.99,
          countInStock: 7,
          rating: 4.0,
          numReviews: 8,
        }
      ],
      page: 1,
      pages: 1
    };
  }
  
  // Categories
  if (url.includes('/api/categories/')) {
    return [
      { id: '1', name: 'Toys' },
      { id: '2', name: 'Plush' },
      { id: '3', name: 'Games' }
    ];
  }
  
  // Single product
  if (url.match(/\/api\/product\/\w+/)) {
    return {
      id: url.split('/').pop(),
      name: 'Toy Product',
      image: '/static/media/logo192.png',
      description: 'This is a demo product description for GitHub Pages mode.',
      brand: 'ToyBrand',
      category: 'Toys',
      price: 29.99,
      countInStock: 10,
      rating: 4.5,
      numReviews: 12,
    };
  }
  
  // Orders
  if (url.includes('/api/orders/myorders/')) {
    return [
      {
        id: '1',
        createdAt: new Date().toISOString(),
        totalPrice: 59.98,
        isPaid: true,
        paidAt: new Date().toISOString(),
        isDelivered: false,
        orderItems: [
          {
            id: '1',
            name: 'Toy Robot',
            qty: 2,
            price: 29.99,
            image: '/static/media/logo192.png',
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