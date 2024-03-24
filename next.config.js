/** @type {import("next").NextConfig} */

const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    /*compiler: {
      removeConsole: process.env.NODE_ENV === 'development' ? false : true
    },*/
    env: {
      POSTGRES_URL: process.env.POSTGRES_URL,
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
