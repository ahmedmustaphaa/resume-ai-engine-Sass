/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**.googleusercontent.com', // أضف النجمتين لدعم كل الـ subdomains
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
    ],
  },
  webpack: (config) => {
    // السطر ده بيقول لـ Webpack: لو لقيت حد بيطلب canvas، اعتبرها فاضية ومطلعش Error
    config.resolve.alias.canvas = false;
    return config;
  },
  
};

export default nextConfig;

