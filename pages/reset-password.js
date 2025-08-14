import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { SUPABASE_CONFIG } from '../supabase-config';

// Supabase configuration
const SUPABASE_URL = SUPABASE_CONFIG.url;
const SUPABASE_ANON_KEY = SUPABASE_CONFIG.anonKey;

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [resetToken, setResetToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Get reset token from URL parameters - try multiple methods
    const detectToken = () => {
      let token = null;
      
      // Method 1: Try Next.js router first
      if (router.query.token) {
        token = router.query.token;
      }
      
      // Method 2: If no token from router, check URL directly
      if (!token && typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        token = urlParams.get('token');
      }
      
      // Method 3: Check hash fragment if present
      if (!token && typeof window !== 'undefined' && window.location.hash) {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        token = hashParams.get('token');
      }
      
      if (token) {
        setResetToken(token);
        setMessageType('info');
        setMessage(`Reset token found: ${token.substring(0, 8)}... You can now set your new password.`);
        console.log('Reset token detected:', token);
      } else {
        setMessageType('error');
        setMessage('No reset token found. Please use the forgot password link.');
        console.log('No reset token found in URL');
      }
    };

    // Run immediately
    detectToken();
    
    // Also run when router query changes
    if (router.isReady) {
      detectToken();
    }
    
    // Fallback: check again when window loads
    if (typeof window !== 'undefined') {
      window.addEventListener('load', detectToken);
      return () => window.removeEventListener('load', detectToken);
    }
  }, [router.query, router.isReady]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessageType('error');
      setMessage('Passwords do not match. Please try again.');
      return;
    }

    if (password.length < 8) {
      setMessageType('error');
      setMessage('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // Call Supabase directly for password reset
      const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resetToken}`,
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          password: password,
        }),
      });

      if (response.ok) {
        setMessageType('success');
        setMessage('Password reset successful! You can now log in with your new password.');
        
        // Clear form
        setPassword('');
        setConfirmPassword('');
        
        // Redirect to home after a delay
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        const errorData = await response.json();
        setMessageType('error');
        setMessage(errorData.message || 'Failed to reset password. Please try again.');
        console.error('Supabase error:', errorData);
      }
    } catch (error) {
      setMessageType('error');
      setMessage('An error occurred. Please try again.');
      console.error('Reset password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove the early return that shows "Invalid Reset Link"
  // Instead, always render the page and let JavaScript handle the state
  
  return (
    <>
      <Head>
        <title>Reset Password - Aditask</title>
        <meta name="description" content="Reset your Aditask password" />
      </Head>
      
      <div className="reset-password-container">
        <div className="container">
          <div className="logo">🔐</div>
          
          {/* Show form only when token is detected */}
          {resetToken ? (
            <>
              <h1>Reset Your Password</h1>
              <p className="subtitle">
                Enter your new password below. Make sure it's secure and easy to remember.
              </p>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="password">New Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    disabled={isLoading}
                    minLength="8"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    disabled={isLoading}
                    minLength="8"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn"
                  disabled={isLoading || password.length < 8 || confirmPassword.length < 8 || password !== confirmPassword}
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            </>
          ) : (
            <>
              <h1>Checking Reset Link...</h1>
              <p className="subtitle">
                Please wait while we verify your reset link...
              </p>
            </>
          )}
          
          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}
          
          <div className="links">
            <Link href="/" className="back-link">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .reset-password-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .container {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          padding: 40px;
          width: 100%;
          max-width: 400px;
          text-align: center;
        }
        
        .logo {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #1976d2, #42a5f5);
          border-radius: 50%;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 32px;
          font-weight: bold;
        }
        
        h1 {
          color: #333;
          margin-bottom: 10px;
          font-size: 24px;
        }
        
        .subtitle {
          color: #666;
          margin-bottom: 30px;
          font-size: 16px;
          line-height: 1.5;
        }
        
        .form-group {
          margin-bottom: 20px;
          text-align: left;
        }
        
        label {
          display: block;
          margin-bottom: 8px;
          color: #333;
          font-weight: 500;
        }
        
        input {
          width: 100%;
          padding: 15px;
          border: 2px solid #e1e5e9;
          border-radius: 10px;
          font-size: 16px;
          transition: border-color 0.3s ease;
        }
        
        input:focus {
          outline: none;
          border-color: #1976d2;
        }
        
        .btn {
          background: linear-gradient(135deg, #1976d2, #42a5f5);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          transition: transform 0.2s ease;
          text-decoration: none;
          display: inline-block;
        }
        
        .btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        
        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .message {
          margin-top: 20px;
          padding: 15px;
          border-radius: 10px;
          font-weight: 500;
        }
        
        .message.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        
        .message.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
        
        .message.info {
          background: #d1ecf1;
          color: #0c5460;
          border: 1px solid #bee5eb;
        }
        
        .links {
          margin-top: 30px;
        }
        
        .back-link {
          color: #1976d2;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        
        .back-link:hover {
          color: #1565c0;
        }
        
        @media (max-width: 480px) {
          .container {
            padding: 30px 20px;
          }
          
          h1 {
            font-size: 22px;
          }
          
          .subtitle {
            font-size: 15px;
          }
        }
      `}</style>
    </>
  );
}
