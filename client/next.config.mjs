/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'peppy-moonbeam-9fe49c.netlify.app',
      },
      {
        protocol: 'https',
        hostname: '**.pinimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5001',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5001',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '::1',
        port: '5000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '::1',
        port: '5001',
        pathname: '/**',
      }
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [25, 30, 40, 50, 60, 75, 80, 90, 100],
  },
  // Performance optimizations for development and build
  experimental: {
    optimizePackageImports: [
      'lucide-react', 
      'gsap', 
      'framer-motion', 
      '@lucide/react'
    ],
  },
  // Ensure we aren't leaking too much during dev
  reactStrictMode: false, 
};

export default nextConfig;
