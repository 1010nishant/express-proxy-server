import express from 'express';
import configuration from './config/env.js';
import limiter from './middleware/rateLimiter.js';
import logger from './middleware/logger.js';
import redisClient from './config/redisClient.js';
import axios from 'axios';
import auth from './middleware/auth.js';
import { cacheMiddleware, setCache } from './utils/cache.js';
import requestIp from 'request-ip'

const config = configuration();
const app = express();

// Middleware
app.use(express.json());
// Apply the rate limiter to all requests
app.use(limiter)
app.use(logger);

// Health Check for Redis
app.get('/health', async (req, res) => {
    try {
        const redisStatus = await redisClient.ping();
        res.status(200).json({ status: 'UP', redis: redisStatus });
    } catch (err) {
        res.status(500).json({ status: 'DOWN', error: err.message });
    }
});

// Proxy Endpoint
app.get('/proxy', auth, cacheMiddleware, async (req, res) => {
    try {
        const clientIp = requestIp.getClientIp(req);
        const { url, ...queryParams } = req.query;
        if (!url) return res.status(400).json({ error: 'Missing "url" query parameter' });

        const apiResponse = await axios.get(`${config.API_BASE_URL}/${url}`, { params: queryParams });
        // Cache response
        setCache(clientIp, apiResponse.data, config.CACHE_DURATION);

        res.status(200).json({ message: 'Data served from API Call', ...apiResponse.data });
    } catch (err) {
        console.error('Error fetching data:', err.message);
        res.status(err.response?.status || 500).json({ error: err.message || 'Internal Server Error' });
    }
});


// Start server
app.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT}`);
});