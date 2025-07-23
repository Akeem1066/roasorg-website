import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { amount, currency = 'usd', description = 'Donation to RoaS Org' } = req.body;

    if (!amount) {
      return res.status(400).json({ message: 'Amount is required' });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: description,
            },
            unit_amount: amount, // amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin || 'https://roasorg.com'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin || 'https://roasorg.com'}/cancel`,
      metadata: {
        description: description,
      },
    });

    // Ensure we're sending JSON response
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ 
      sessionId: session.id, 
      url: session.url,
      success: true 
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    // More specific error handling
    if (error.type === 'StripeCardError') {
      res.status(400).json({ message: 'Card error: ' + error.message });
    } else if (error.type === 'StripeInvalidRequestError') {
      res.status(400).json({ message: 'Invalid request: ' + error.message });
    } else if (error.type === 'StripeAPIError') {
      res.status(500).json({ message: 'Stripe API error: ' + error.message });
    } else {
      res.status(500).json({ message: 'Error creating checkout session: ' + error.message });
    }
  }
} 