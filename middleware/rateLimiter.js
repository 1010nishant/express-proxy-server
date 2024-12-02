import { rateLimit } from 'express-rate-limit'
import configuration from '../config/env.js';
const config = configuration();

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minute
    max: config.RATE_LIMIT,
    message: { error: 'Too many requests. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

export default limiter