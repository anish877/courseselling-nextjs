import type { NextConfig } from "next";

module.exports = {
  eslint: {
    ignoreDuringBuilds: true, // This will allow builds to succeed even with linting errors
  },
}


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Unsplash domain
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // Allow any path under the Unsplash domain
      },
      // Pexels domain
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**', // Allow any path under the Pexels domain
      },
      {
        protocol: 'https',
        hostname: 'videos.pexels.com',
        port: '',
        pathname: '/**', // Allow any path under the Pexels domain
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
        port: '',
        pathname: '/**', // Allow any path under the Pexels domain
      },
      {
        protocol: 'https',
        hostname: 'aceternity.com',
        port: '',
        pathname: '/**', // Allow any path under the Pexels domain
      },
      {
        protocol: 'https',
        hostname: 'res-console.cloudinary.com',
        port: '',
        pathname: '/**', // Allow any path under the Pexels domain
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
        port: '',
        pathname: '/**', // Allow any path under the Pexels domain
      },
    ]
  }
};

export default nextConfig;
