import redisClient from "../config/redisClient.js";

// Middleware to serve cached responses if available
const cacheMiddleware = async (req, res, next) => {
    try {
        const cachedData = await redisClient.get(req.originalUrl);
        if (cachedData) {
            return res.status(200).json({
                message: 'Data served from cache',
                ...JSON.parse(cachedData)
            });
        }
        next();
    } catch (err) {
        console.error('Cache Retrieval Error:', err.message);
        next();
    }
};

// Function to cache data with expiration
const setCache = async (key, data, duration) => {
    try {
        await redisClient.set(JSON.stringify(key), JSON.stringify(data), {
            EX: duration,
        });
    } catch (err) {
        console.error('Cache Set Error:', err.message);
    }
};

export { cacheMiddleware, setCache };