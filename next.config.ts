import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['www.centauri.org.uk', 'jdghcalaxibgkltzmcne.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.centauri.org.uk',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'centauri.org.uk',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'jdghcalaxibgkltzmcne.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
