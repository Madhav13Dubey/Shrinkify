const express = require('express');
const router = express.Router();
const { shortenUrlHandler, redirectUrl } = require('../service/urlService'); // Import the URL shortening handler

// URL shortening endpoints //
router.post('/shorten', shortenUrlHandler);        // convert long URL to short URL //


// URL redirection endpoints -> must be after /shorten (inorder to avoid conflicts)//
router.get('/:shortId', async (req, res,next)=>{
    try {
        // Get the original URL from the short URL //
        const originalUrl = await redirectUrl(req.params.shortId); 
        res.redirect(originalUrl); // Redirect to the original URL //
    } catch (error) {
        if(error.message === 'URL not found') {
            return res.status(404).json({ 
                error: {
                    message: 'Short URL not found'
                }
            });
        }
        next(error);
    }
});   // redirect to original URL using short URL // 

module.exports = router;