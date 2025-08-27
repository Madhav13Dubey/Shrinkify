/*this file is made for the interaction of all the function that has to meet in te database */
/* so, a well defined connection is made with database layer */
const Url = require('../models/Url');

async function saveUrl(shortId, originalUrl){
    const newUrl = new Url({shortUrl: shortId, originalUrl: originalUrl});
    return await newUrl.save();
}

// finding of the shorturl based on the shortId //
async function getUrlByShortId(shortId){
    return await Url.findOne({ shortUrl: shortId });
}

/* async function incrementClickCount(urlDoc) {
    const urlDoc = await getUrlByShortId(urlDoc);
    if (urlDoc) {
        urlDoc.clickCount++;
        return await urlDoc.save();
    }
    return null;
}  */

async function incrementCount(urlDoc) {
    urlDoc.clickCount++;
    return await urlDoc.save();
}

module.exports = {
    saveUrl,
    getUrlByShortId,
    incrementCount
};