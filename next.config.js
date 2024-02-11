/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "jdonkvex9pz1fqae.public.blob.vercel-storage.com",
      },
    ],
  },
};

module.exports = nextConfig;
