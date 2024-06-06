/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    experimental: {
        taint: true,
        serverActions: {
            allowedOrigins: ['https://inspectex.sa', "http://localhost:3000"],
            allowedForwardedHosts: ['https://inspectex.sa', "http://localhost:3000"],
        }
    }
};

export default nextConfig; 