export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Generate a reset token (in production, this would be more secure)
    const resetToken = generateResetToken();
    
    // In a real application, you would:
    // 1. Check if the user exists in your database
    // 2. Generate a secure, time-limited reset token
    // 3. Store the token in your database with an expiration
    // 4. Send an email with the reset link
    
    // For now, we'll simulate success
    console.log(`Password reset requested for: ${email}`);
    console.log(`Reset token generated: ${resetToken}`);
    console.log(`Reset link: ${process.env.NEXT_PUBLIC_APP_URL || 'https://roasorg.com'}/reset-password?token=${resetToken}`);

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.status(200).json({
      message: 'Reset link sent successfully',
      success: true,
      resetLink: `${process.env.NEXT_PUBLIC_APP_URL || 'https://roasorg.com'}/reset-password?token=${resetToken}`,
      token: resetToken
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      success: false
    });
  }
}

function generateResetToken() {
  // Generate a random token (in production, use crypto.randomBytes or similar)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}
