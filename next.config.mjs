/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    experimental: {
        taint: true,
        serverActions: {
            allowedOrigins: ['https://inspectex.sa', "http://localhost:3000", `https://secure.clickpay.com.sa`],
            allowedForwardedHosts: ['https://inspectex.sa', "http://localhost:3000", `https://secure.clickpay.com.sa`],
        }
    }
};

export default nextConfig; 