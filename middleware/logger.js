import morgan from "morgan";
import requestIp from 'request-ip'

const logger = morgan((tokens, req, res) => {
    const clientIp = requestIp.getClientIp(req);
    return [
        `[${new Date().toISOString()}]`,
        `IP: ${clientIp}`,
        `Method: ${tokens.method(req, res)}`,
        `URL: ${tokens.url(req, res)}`,
        `Status: ${tokens.status(req, res)}`,
        `Rate Limit: ${res.getHeader('RateLimit-Limit') || 'N/A'}`,
        `Rate Limit Remaining: ${res.getHeader('RateLimit-Remaining') || 'N/A'}`,
    ].join(' ');
});

export default logger