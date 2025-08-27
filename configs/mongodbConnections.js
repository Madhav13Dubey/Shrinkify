const mongoose = require('mongoose');

const connectToMongoDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/urlShortener');
       console.log(`Connected to MongoDB at ${conn.connection.host}:${conn.connection.port}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB ${error.message}`);
    }
}

module.exports = connectToMongoDB;
