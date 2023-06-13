/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MDB_URI:
      "mongodb+srv://isoskode:soskode@cluster0.41hegr3.mongodb.net/ecommerce-admin?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;
