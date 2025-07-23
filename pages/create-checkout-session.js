import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CreateCheckoutSession() {
  const router = useRouter();

  useEffect(() => {
    // This page handles API calls to /create-checkout-session
    // It should not be accessed directly in the browser
    router.push('/');
  }, [router]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div>
        <h1>Redirecting...</h1>
        <p>This endpoint is for API calls only.</p>
      </div>
    </div>
  );
}

// Handle API calls to this route
export async function getServerSideProps(context) {
  const { req, res } = context;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return { props: {} };
  }

  // For POST requests, proxy to the API endpoint
  if (req.method === 'POST') {
    try {
      // Import the API handler
      const apiHandler = require('./api/create-checkout-session').default;
      return await apiHandler(req, res);
    } catch (error) {
      console.error('Error in create-checkout-session proxy:', error);
      res.status(500).json({ 
        message: 'Internal server error',
        error: 'proxy_error'
      });
      return { props: {} };
    }
  }

  // For other methods, return redirect info
  res.status(200).json({
    message: 'This endpoint is for API calls only',
    correctEndpoint: '/api/create-checkout-session',
    currentEndpoint: '/create-checkout-session'
  });

  return { props: {} };
} 