/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", // creer le dossier "out" avec npm run build
  images:{
    unoptimized: true,
  }
}


module.exports = nextConfig
