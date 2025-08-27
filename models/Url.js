const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    originalUrl: String,
    createdAt: {
        type: Date,
        default: Date.now()  // Automatically set to current date
      /*  expires: '7d' // Automatically delete after 7 days    */
    },
    clickCount: {
        type: Number,
        default: 0 // Initialize click count to 0
    }
});

module.exports = mongoose.model('Url', urlSchema);