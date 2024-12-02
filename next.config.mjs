/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ["res.cloudinary.com"], // Add Cloudinary's domain here
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dfwbd7ygx/image/upload/**', // Matches the specific Cloudinary URL structure
      },
    ],
  },
};

export default nextConfig;
