import Stripe from 'stripe';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ message: 'Webhook signature verification failed' });
  }

  if (!event) {
    console.error('No event received');
    return res.status(400).json({ message: 'No event received' });
  }

  console.log('Received webhook event:', event.type);

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Payment completed for session:', session.id);
        
        // Handle successful payment
        await handleSuccessfulPayment(session);
        break;

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('Payment intent succeeded:', paymentIntent.id);
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        console.log('Payment failed:', failedPayment.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ message: 'Error processing webhook' });
  }
}

async function handleSuccessfulPayment(session) {
  // Add your business logic here
  // For example: send confirmation email, update database, etc.
  
  console.log('Processing successful payment:', {
    sessionId: session.id,
    customerEmail: session.customer_details?.email,
    amount: session.amount_total,
    currency: session.currency,
  });

  // You can add email notifications, database updates, etc.
  // Example: Send confirmation email
  if (session.customer_details?.email) {
    // Send confirmation email logic here
    console.log('Sending confirmation email to:', session.customer_details.email);
  }
} 