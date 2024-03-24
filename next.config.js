/** @type {import("next").NextConfig} */

const dotenv = require('dotenv')
dotenv.config()
const cspHeader = `
    frame-ancestors 'self' https://auth.privy.io;
    upgrade-insecure-requests;`

module.exports = {
    compiler: {
      removeConsole: process.env.NODE_ENV === 'development' ? false : true
    },
    env: {
      POSTGRES_URL: process.env.POSTGRES_URL,
      DEBUG_HUB_HTTP_URL: "https://hub-api.neynar.com",
      KV_URL: process.env.KV_URL,
      KV_REST_API_URL: process.env.KV_REST_API_URL,
      KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
      KV_REST_API_READ_ONLY_TOKEN: process.env.KV_REST_API_READ_ONLY_TOKEN
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
            {
              key: 'Content-Security-Policy',
              value: cspHeader.replace(/\n/g, ''),
            },
          ]
        }
      ];
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '*.imgur.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: '*.decentralized-content.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: '*.ipfs.nftstorage.link',
            port: '',
            pathname: '/',
          }
        ],
      }

}
