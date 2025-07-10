/** @type {import('next').NextConfig} */
const repo = 'roasorg-website';

module.exports = {
  output: 'export',
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  images: {
    unoptimized: true,
  },
}; 