/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        API_URL: 'https://api.mundodocodigo.com.br/api',
        AUTH_COOKIE_KEY: 'wok-auth',
        IMAGES_URL: 'https://api.mundodocodigo.com.br/storage'
    },
    images: {
        domains: ['apiteste.mundodocodigo.com.br', 'api.mundodocodigo.com.br']
    },
    typescript: {
        ignoreBuildErrors: true
    }
}

module.exports = nextConfig
