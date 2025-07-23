export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Ensure we're sending JSON response
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method === 'GET') {
    res.status(200).json({ 
      message: 'Payment API is working',
      timestamp: new Date().toISOString(),
      method: req.method,
      headers: req.headers
    });
  } else if (req.method === 'POST') {
    try {
      const body = req.body;
      res.status(200).json({ 
        message: 'Payment request received',
        body: body,
        timestamp: new Date().toISOString(),
        method: req.method
      });
    } catch (error) {
      res.status(500).json({ 
        error: 'Error processing request',
        message: error.message 
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
} 