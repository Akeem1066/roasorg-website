import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export default async function handler(req, res) {
  // Set CORS headers for mobile app
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      message: 'Method not allowed',
      error: 'Only POST requests are supported'
    });
  }

  try {
    const { amount, currency = 'usd', description, productType = 'donation' } = req.body;

    if (!amount) {
      return res.status(400).json({ 
        message: 'Amount is required',
        error: 'Missing amount parameter'
      });
    }

    // Determine product name based on product type
    let productName;
    switch (productType) {
      case 'premium_monthly':
        productName = 'Aditask Premium Monthly Subscription';
        break;
      case 'premium_yearly':
        productName = 'Aditask Premium Yearly Subscription';
        break;
      case 'premium_lifetime':
        productName = 'Aditask Premium Lifetime Subscription';
        break;
      case 'donation':
      default:
        productName = 'Support Aditask - Donation';
        break;
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: productName,
              description: description || productName,
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
        productType: productType,
        description: description || productName,
        source: 'mobile_app'
      },
    });

    // Return JSON response for mobile app
    res.status(200).json({ 
      sessionId: session.id, 
      url: session.url,
      success: true,
      message: 'Checkout session created successfully'
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    // More specific error handling for mobile app
    if (error.type === 'StripeCardError') {
      res.status(400).json({ 
        message: 'Card error: ' + error.message,
        error: 'card_error'
      });
    } else if (error.type === 'StripeInvalidRequestError') {
      res.status(400).json({ 
        message: 'Invalid request: ' + error.message,
        error: 'invalid_request'
      });
    } else if (error.type === 'StripeAPIError') {
      res.status(500).json({ 
        message: 'Stripe API error: ' + error.message,
        error: 'api_error'
      });
    } else {
      res.status(500).json({ 
        message: 'Error creating checkout session: ' + error.message,
        error: 'server_error'
      });
    }
  }
} 