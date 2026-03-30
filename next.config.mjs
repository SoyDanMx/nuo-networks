/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "logo.clearbit.com", pathname: "/**" },
      { protocol: "https", hostname: "www.google.com", pathname: "/s2/favicons/**" }
    ]
  }
};

export default nextConfig;
