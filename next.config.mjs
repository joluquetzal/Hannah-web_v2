/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    // Windows + AV real-time scanning corrupts webpack's persistent disk
    // cache mid-write (ENOENT on vendor-chunks/*.js, then "clientModules"
    // TypeErrors on the next request). Disabling it for dev trades a bit of
    // rebuild speed for a dev server that doesn't randomly 500. No effect on
    // the static export build.
    if (dev) config.cache = false;
    return config;
  },
};

export default nextConfig;
