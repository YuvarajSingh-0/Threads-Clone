/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['mongoose'],
    },
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'img.clerk.com',
            },
            {
                protocol:'https',
                hostname:'images.clerk.dev',
            }
        ]
    }
}

module.exports = nextConfig
