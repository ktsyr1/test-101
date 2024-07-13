/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    cacheMaxMemorySize: 0,
    // distDir: 'build',
    experimental: {
        taint: true,
        serverActions: {
            bodySizeLimit: '5mb', // يمكنك تعديل الحجم حسب الحاجة
            allowedOrigins: ['inspectex.sa', "localhost:3000", `secure.clickpay.com.sa`],
            allowedForwardedHosts: ['inspectex.sa', "localhost:3000", `secure.clickpay.com.sa`],
        }
    },
};

export default nextConfig; 