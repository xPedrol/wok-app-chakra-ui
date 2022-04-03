/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        API_URL: 'https://apiteste.mundodocodigo.com.br/api',
        AUTH_COOKIE_KEY: 'wok-auth',
        IMAGES_URL: 'https://apiteste.mundodocodigo.com.br/storage'
    }
}

module.exports = nextConfig
