import Head from 'next/head';

export default function Success() {
  // Get session_id from URL parameters using vanilla JavaScript
  const getSessionId = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('session_id');
    }
    return null;
  };

  const session_id = getSessionId();

  return (
    <>
      <Head>
        <title>Payment Successful - RoaS Org</title>
        <meta name="description" content="Thank you for your donation to RoaS Org" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Thank you for your generous donation to RoaS Org. Your support helps us continue our mission.
          </p>
          
          {session_id && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500">
                Session ID: <span className="font-mono text-xs">{session_id}</span>
              </p>
            </div>
          )}
          
          <div className="space-y-3">
            <a
              href="/"
              className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center no-underline"
            >
              Return to Homepage
            </a>
            
            <a
              href="/privacy-policy"
              className="block w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-center no-underline"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </>
  );
} 