/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    // typedRoutes: true
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'res.cloudinary.com'
    ]
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig
