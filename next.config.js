/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
}





// const nextConfig = {
//   async headers() {
//       return [
//           {
//               // matching all API routes
//               source: "/api/:path*",
//               headers: [
//                   { key: "Access-Control-Allow-Credentials", value: "true" },
//                   { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
//                   { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
//                   { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
//               ]
//           }
//       ]
//   }
// }
const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  nextConfig
})


// module.exports = {
//   experimental: {
//     turbo: {
//       rules: {
//         // Option format
//         '*.md': [
//           {
//             loader: '@mdx-js/loader',
//             options: {
//               format: 'md',
//             },
//           },
//         ],
//         // Option-less format
//         '*.mdx': ['@mdx-js/loader'],
//       },
//     },
//   },
// }