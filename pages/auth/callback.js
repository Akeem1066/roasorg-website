import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function AuthCallback() {
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
            // Handle authentication callback
        const handleAuthCallback = async () => {
          try {
            // Get URL parameters
            const urlParams = new URLSearchParams(window.location.search);
            const error = urlParams.get('error');
            const errorDescription = urlParams.get('error_description');
            const errorCode = urlParams.get('error_code');
            
            if (error) {
              setStatus('error');
              let errorMsg = `Authentication failed: ${errorDescription || error}`;
              
              // Handle specific OAuth errors
              switch (error) {
                case 'access_denied':
                  errorMsg = 'Access was denied. Please try logging in again.';
                  break;
                case 'invalid_request':
                  errorMsg = 'Invalid authentication request. Please try again.';
                  break;
                case 'server_error':
                  errorMsg = 'Server error occurred. Please try again later.';
                  break;
                case 'temporarily_unavailable':
                  errorMsg = 'Service temporarily unavailable. Please try again later.';
                  break;
                default:
                  errorMsg = `Authentication failed: ${errorDescription || error}`;
              }
              
              setMessage(errorMsg);
              return;
            }

            // Check for successful authentication parameters
            const accessToken = urlParams.get('access_token');
            const refreshToken = urlParams.get('refresh_token');
            const provider = urlParams.get('provider') || 'unknown';
            const userEmail = urlParams.get('user_email');
            const userName = urlParams.get('user_name');
            
            if (accessToken) {
              setStatus('success');
              
              // Get provider display name
              const getProviderName = (provider) => {
                switch (provider.toLowerCase()) {
                  case 'google': return 'Google';
                  case 'github': return 'GitHub';
                  case 'discord': return 'Discord';
                  default: return provider;
                }
              };
              
              const providerName = getProviderName(provider);
              setMessage(`Authentication successful via ${providerName}! Redirecting to app...`);
              
              // Store authentication data securely
              localStorage.setItem('supabase_access_token', accessToken);
              localStorage.setItem('auth_provider', provider);
              localStorage.setItem('auth_timestamp', Date.now().toString());
              
              if (refreshToken) {
                localStorage.setItem('supabase_refresh_token', refreshToken);
              }
              
              if (userEmail) {
                localStorage.setItem('user_email', userEmail);
              }
              
              if (userName) {
                localStorage.setItem('user_name', userName);
              }
              
              // Redirect to app after a short delay
              setTimeout(() => {
                window.location.href = '/';
              }, 2000);
            } else {
              setStatus('info');
              setMessage('No authentication parameters found. You may need to log in again.');
            }
          } catch (error) {
            setStatus('error');
            setMessage('An unexpected error occurred during authentication.');
            console.error('Auth callback error:', error);
          }
        };

    handleAuthCallback();
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'info': return 'text-blue-600';
      default: return 'text-purple-600';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'info': return 'ℹ️';
      default: return '⏳';
    }
  };

  return (
    <>
      <Head>
        <title>Authentication Callback - RoaSorg</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Authentication callback page for RoaSorg applications" />
        <link rel="icon" href="/roasorg-website/favicon.ico" type="image/x-icon" />
        <style>{`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
            min-height: 100vh;
            background: radial-gradient(circle at 60% 20%, #3a206e 0%, #1a093b 100%);
            color: #fff;
          }
          .navbar {
            width: 100%;
            background: rgba(30, 20, 60, 0.95);
            display: flex;
            justify-content: center;
            gap: 2rem;
            padding: 1rem 0 0.5rem 0;
            position: sticky;
            top: 0;
            z-index: 10;
          }
          .navbar a {
            color: #a48cff;
            font-weight: 600;
            text-decoration: none;
            font-size: 1.1rem;
            transition: color 0.2s;
          }
          .navbar a:hover {
            color: #fff;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 2rem;
            text-align: center;
          }
          .callback-card {
            background: #fff;
            color: #222;
            border-radius: 15px;
            padding: 3rem 2rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            margin-top: 2rem;
          }
          .status-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
          }
          .status-message {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            line-height: 1.6;
          }
          .loading-spinner {
            display: inline-block;
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #a48cff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 1rem auto;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .action-buttons {
            margin-top: 2rem;
          }
          .btn {
            display: inline-block;
            padding: 12px 24px;
            margin: 0 10px;
            background: #a48cff;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: background 0.2s;
          }
          .btn:hover {
            background: #8b6fff;
          }
          .btn-secondary {
            background: #6c757d;
          }
          .btn-secondary:hover {
            background: #5a6268;
          }
          .error-details {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 1rem;
            margin-top: 1rem;
            text-align: left;
            font-family: monospace;
            font-size: 0.9rem;
            color: #666;
          }
        `}</style>
      </Head>
      
      <nav className="navbar">
        <Link href="/">Home</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </nav>

      <div className="container">
        <div className="callback-card">
          <div className="status-icon">{getStatusIcon()}</div>
          <h1 style={{ color: '#1976d2', marginBottom: '1rem' }}>
            Authentication Callback
          </h1>
          
          <div className={`status-message ${getStatusColor()}`}>
            {status === 'loading' && (
              <>
                <div className="loading-spinner"></div>
                <p>Processing your authentication...</p>
              </>
            )}
            {status !== 'loading' && <p>{message}</p>}
          </div>

          {status === 'error' && (
            <div className="error-details">
              <strong>Error Details:</strong><br />
              URL: {typeof window !== 'undefined' ? window.location.href : 'Loading...'}<br />
              Time: {new Date().toLocaleString()}<br />
              Error Code: {typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('error_code') || 'N/A' : 'N/A'}<br />
              Error Description: {typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('error_description') || 'N/A' : 'N/A'}
            </div>
          )}

          <div className="action-buttons">
            {status === 'success' && (
              <Link href="/" className="btn">
                Go to Homepage
              </Link>
            )}
            {status === 'error' && (
              <>
                <Link href="/" className="btn">
                  Go to Homepage
                </Link>
                <button 
                  onClick={() => window.location.reload()} 
                  className="btn btn-secondary"
                >
                  Try Again
                </button>
              </>
            )}
            {status === 'info' && (
              <Link href="/" className="btn">
                Go to Homepage
              </Link>
            )}
          </div>

          <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
            <p>If you're having trouble, please contact us at <strong>roasorg@gmail.com</strong></p>
          </div>
        </div>
      </div>
    </>
  );
} 