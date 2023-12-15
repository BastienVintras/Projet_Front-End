/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, //mettre en false pour eviter les doubles resultats des console.log
  output: "export", // creer le dossier "out" avec npm run build
  images:{
    unoptimized: true,
  },
}


module.exports = nextConfig
