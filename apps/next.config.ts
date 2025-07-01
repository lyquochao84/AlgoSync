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
      },
      {
        protocol: 'https',
        hostname: 'graphqleditorcms.fra1.cdn.digitaloceanspaces.com'
      },
      {
        protocol: 'https',
        hostname: 'static01.nyt.com'
      },
      {
        protocol: 'https',
        hostname: 'aps.autodesk.com'
      }
    ],
  },
};

export default nextConfig;
