/** @type {import('next').NextConfig} */
module.exports = {
  // Remove static export for Heroku
  // output: 'export', // Commented out for Heroku
  // basePath: `/${repo}`, // Commented out for Heroku
  // assetPrefix: `/${repo}/`, // Commented out for Heroku
  images: {
    unoptimized: true,
  },
  // Enable API routes for webhooks
  experimental: {
    serverComponentsExternalPackages: ['@stripe/stripe-js'],
  },
}; 