const express = require('express');
const Url = require('../models/Url');
const urlRepo = require('../repository/UrlRepository');
const { nanoid } = require('nanoid'); // Importing nanoid to generate unique IDs //
const { saveUrl, getUrlByShortId, incrementCount } = require('../repository/UrlRepository');

function isValidUrl(url) {
    try {
        new URL(url); // Attempt to create a new URL object
        return true; 
    } catch {
        return false; 
    }
}
/*-------------------------------- shortenUrl -------------------------------- */
async function shortenUrl(originalUrl) {
    try {
        if(!originalUrl){
            throw new Error('Original URL is required');
        }
        // adding http to the URL if protocol is missing //
        if (!originalUrl.startsWith('http://') && !originalUrl.startsWith('https://')) {
            originalUrl = 'http://' + originalUrl;
        }
    
        if(!isValidUrl(originalUrl)){
            throw new Error('Invalid URL format');
        }

        // Generate a short ID for the URL
        const shortId = nanoid(6); // Using nanoid to generate a unique short ID of 6-charactrers length //
        const urlDoc =  await saveUrl(shortId, originalUrl); // Save the URL to the database//
        return urlDoc;
    } catch (error) {
       /* next(error); // Pass the error to the next middleware // */
       throw new Error('Error creating short URL: ' + error.message); // If an error occurs, throw a new error with a message //
    }
}

/*------------------------------- redirectUrl ----------------------------------- */
async function redirectUrl(shortId) {
    try {
        const urlDoc = await getUrlByShortId(shortId); // Fetch the URL document from the database using the short ID //
        if (!urlDoc) {
            throw new Error('URL not found'); // If the URL document is not found, throw an error //
        }
        console.log(urlDoc);
        await incrementCount(urlDoc); // Increment the click count for the URL //
        return urlDoc.originalUrl; // Return the original URL from the URL document //
    } catch (error) {
        throw new Error('Error redirecting to URL: ' + error.message); // If an error occurs, throw a new error with a message //
    }
}

/* -----------------------------shortenUrlHandler -------------------------------*/
async function shortenUrlHandler(req, res, next) {
    try {
        const { url } = req.body;
       /* if(!url || typeof url !== 'string' || !url.trim()) {
            return res.status(400).json({ 
                error: {
                    message: 'Invalid URL provided'
                }
            });
        } */
        if(!url) {
            return res.status(400).json({ error : 'URL is required' });
        }

        const urlDoc = await shortenUrl(url); // Check if the URL already exists in the database
        res.json({
            shortUrl: `https://${req.get('host')}/api/${urlDoc.shortUrl}`
        });
    } catch (err) {
        if(err.message.includes('Invalid URL format')) {
            return res.status(400).json({ error: err.message });
        }
        next(err);
    }

}

module.exports = {
    shortenUrl,
    redirectUrl,
    shortenUrlHandler
};
