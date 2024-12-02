// TODO - pick everything from here, in all the modules
import dotenv from 'dotenv'

dotenv.config();
export default () => ({
    PORT: process.env.PORT || 3000,
    API_BASE_URL: process.env.API_BASE_URL || 'https://api.example.com',
    AUTH_API_KEY: process.env.AUTH_API_KEY,
    RATE_LIMIT: parseInt(process.env.RATE_LIMIT) || 5,
    CACHE_DURATION: parseInt(process.env.CACHE_DURATION) || 300,
    REDIS_URL: process.env.REDIS_URL
});