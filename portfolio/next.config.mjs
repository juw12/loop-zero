/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep builds fast and deterministic; lint is optional and not required to build.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
