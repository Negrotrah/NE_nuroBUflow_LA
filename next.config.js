/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  eslint: {
    // Отключаем проверку ESLint при сборке
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Отключаем проверку TypeScript при сборке
    ignoreBuildErrors: true,
  },
  // Дополнительные опции для Vercel
  poweredByHeader: false, // Убираем заголовок X-Powered-By
};

module.exports = nextConfig; 