import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Here you would typically call your authentication API
      // For now, we'll simulate the API call
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessageType('success');
        setMessage(`Reset link sent to ${email}! Check your email and click the link to reset your password.`);
        setEmail('');
      } else {
        const errorData = await response.json();
        setMessageType('error');
        setMessage(errorData.message || 'Failed to send reset link. Please try again.');
      }
    } catch (error) {
      setMessageType('error');
      setMessage('An error occurred. Please try again.');
      console.error('Forgot password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessageType(type);
    setMessage(text);
  };

  return (
    <>
      <Head>
        <title>Forgot Password - Aditask</title>
        <meta name="description" content="Reset your Aditask password" />
      </Head>
      
      <div className="forgot-password-container">
        <div className="container">
          <div className="logo">🔐</div>
          <h1>Forgot Your Password?</h1>
          <p className="subtitle">
            No worries! Enter your email address and we'll send you a link to reset your password.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>
            
            <button 
              type="submit" 
              className="btn"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
          
          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}
          
          <div className="links">
            <Link href="/auth/callback" className="back-link">
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .forgot-password-container {
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
