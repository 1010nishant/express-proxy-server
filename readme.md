# Express.js Proxy Server

This project is an Express.js based proxy server that interacts with GitHub's public API to fetch user data. It includes features such as rate limiting, caching, and logging to ensure efficient and controlled usage. It also has an authentication mechanism by using API_KEY with every request.

## Features

- **Proxy Endpoint**: A single endpoint that fetches user data from GitHub's public API.
- **Rate Limiting**: Limits each IP to a maximum of 5 requests.
- **Authentication**: Limits API requests if they don't have API_KEY in header.
- **Caching with Redis**: API responses are cached for 5 minutes to reduce redundant calls and improve performance.
- **Logging**: Each request is logged with the following details:
  - Timestamp
  - IP Address
  - Rate Limit Status

## Technologies and Libraries Used

- **[Express](https://expressjs.com/)**: Backend framework.
- **[Redis](https://redis.io/)**: Used for caching API responses.
- **[Axios](https://axios-http.com/)**: HTTP client for making API calls.
- **[Express-Rate-Limit](https://www.npmjs.com/package/express-rate-limit)**: Middleware for rate limiting.
- **[Morgan](https://www.npmjs.com/package/morgan)**: HTTP request logger middleware.
