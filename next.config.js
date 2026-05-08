/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/status/sites/x",
        destination: "/status/sites/twitter",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
