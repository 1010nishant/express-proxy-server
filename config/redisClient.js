import configuration from '../config/env.js';
import { createClient } from "redis";
const config = configuration();


const redisClient = createClient({
    url: config.REDIS_URL,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.connect();

export default redisClient