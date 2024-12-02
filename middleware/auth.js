import configuration from '../config/env.js';
const config = configuration();

const auth = (req, res, next) => {
    const apiKey = req.header('x-api-key');
    if (!apiKey || apiKey !== config.AUTH_API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

export default auth