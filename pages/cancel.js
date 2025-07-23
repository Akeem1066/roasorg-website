import Head from 'next/head';

export default function Cancel() {
  return (
    <>
      <Head>
        <title>Payment Cancelled - RoaS Org</title>
        <meta name="description" content="Payment was cancelled" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Payment Cancelled
          </h1>
          
          <p className="text-gray-600 mb-6">
            Your payment was cancelled. No charges were made to your account. You can try again anytime.
          </p>
          
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