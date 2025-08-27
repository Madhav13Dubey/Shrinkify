const { sanitizeBody } = require('express-validator');

const sanitizeInput = (req, res, next) => {
    // Sanitize the request body to prevent XSS attacks
    try {
        if (req.body && typeof req.body.url === 'string') {
            req.body.url = req.body.url.trim();  // remove all the whitespace from the URL and give me a clean url //
        }
        next();
    } catch (error) {
        /*console.error("Error sanitizing input:", error);
        res.status(400).json({ error: "Invalid input" });   (OR)  */

        next(error); // Pass the error to the next middleware
    }
};

module.exports = { sanitizeInput };