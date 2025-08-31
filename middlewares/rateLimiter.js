const rateLimit = require('express-rate-limit');

// create a limiter that allows 5 requests per 1 minutes from a single IP address //
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 5, // limit each IP to 5 requests per window
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = limiter;
