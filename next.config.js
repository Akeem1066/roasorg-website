/** @type {import('next').NextConfig} */
const isGithubPages = process.env.NODE_ENV === 'production';
const repoName = 'roasorg-website';

module.exports = {
  output: 'export',
  assetPrefix: isGithubPages ? `/${repoName}/` : '',
  basePath: isGithubPages ? `/${repoName}` : '',
  images: {
    unoptimized: true,
  },
}; 