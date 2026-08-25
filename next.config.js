/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/en",
        headers: [{ key: "Content-Language", value: "en" }],
      },
    ];
  },
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
