/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    cacheMaxMemorySize: 0,
    distDir: 'build',
    experimental: {
        taint: true,
        serverActions: {
            allowedOrigins: ['inspectex.sa', "localhost:3000", `secure.clickpay.com.sa`],
            allowedForwardedHosts: ['inspectex.sa', "localhost:3000", `secure.clickpay.com.sa`],
        }
    },
};

export default nextConfig; 