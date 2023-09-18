/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    NEXTAUTH_SECRET:"secret",
    GOOGLE_ID:"165718983810-hdgg0pm0an0ijutopj01ophfkgnt7akd.apps.googleusercontent.com",
    GOOGLE_SECRET:"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"
  }
}

module.exports = nextConfig
