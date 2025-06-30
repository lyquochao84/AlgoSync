import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'codeguppy.com',
      },
      {
        protocol: 'https',
        hostname: 'www.economist.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com'
      }
    ],
  },
};

export default nextConfig;
