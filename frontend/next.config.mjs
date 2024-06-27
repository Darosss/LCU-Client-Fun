/** @type {import('next').NextConfig} */

//whole project shouold be on localhost...
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
