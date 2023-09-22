/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    NEXTAUTH_SECRET:"secret",
    GOOGLE_ID:"165718983810-hdgg0pm0an0ijutopj01ophfkgnt7akd.apps.googleusercontent.com",
    GOOGLE_SECRET:"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",
    RAZORPAY_ID:"rzp_test_fK6UqiIJlinaLj",
    RAZORPAY_SECRET:"nTjNV5x0N8KEjOKd978LDQxs"
  }
}

module.exports = nextConfig
