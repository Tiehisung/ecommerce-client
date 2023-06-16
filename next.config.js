/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MDB_URI:
      "mongodb+srv://isoskode:soskode@cluster0.41hegr3.mongodb.net/ecommerce-admin?retryWrites=true&w=majority",
    STRIPE_PUB_KEY:
      "pk_test_51NIz6MJO2OBUiG1Y8yQFtNFYlVrR9J6e6ougSOgeXCz1N1mGbpPMikM4cISdiuzHK07xoFuZBvpO7YqvMEKIjaBw00pLokNxTI",
    STRIPE_SECRET:
      "sk_test_51NIz6MJO2OBUiG1YS0NQnkoOQbqulXbjDxV7PN7JUdKRmvfMMT9TwPLufBVwb84uGzBS7egiv09ckGKfBeyhmAcm00RkRRecUO",
    PUBLIC_URI: "http://localhost:3000/cart",
  },
};

module.exports = nextConfig;
