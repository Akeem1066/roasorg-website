import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Redirect to the correct API endpoint
  const apiUrl = `${req.headers.host}/api/create-checkout-session`;
  
  // For POST requests, proxy the request to the API endpoint
  if (req.method === 'POST') {
    // Import and call the actual API handler
    const apiHandler = require('./api/create-checkout-session').default;
    return apiHandler(req, res);
  }

  // For other methods, return a redirect response
  res.status(200).json({
    message: 'Redirecting to correct endpoint',
    correctEndpoint: '/api/create-checkout-session',
    currentEndpoint: '/create-checkout-session'
  });
} 