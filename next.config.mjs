/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  /** Framer Motion v12 (motion-dom) + webpack: avoid missing vendor-chunks in server bundles. */
  transpilePackages: ["framer-motion"],
  images: {
    remotePatterns: []
  }
};

export default nextConfig;
