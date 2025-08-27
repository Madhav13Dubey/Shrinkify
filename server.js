const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./configs/mongodbConnections');
const { sanitizeInput } = require('./middlewares/sanitizeInput');
const limiter = require('./middlewares/rateLimiter');
const urlRoutes = require('./routes/urlRoutes');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));


// connect to MongoDB //
connectDB();


// Middleware setup //
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies


// custom middlewares //
app.use(sanitizeInput); // Input sanitization middleware
app.use(limiter); // Rate limiting middleware

/*------------------------------------- Routes setup -----------------------*/

app.use('/api', urlRoutes); // URL shortening routes(validation)
app.get("/", (req,res) =>{
    res.send("Welcome to the URL Shortener Backend Project");
});


// 404 Not Found // 
app.use((req, res, next)=>{
    res.status(404).json({ 
        error: {
            message: 'Route Not Found'
        }
    });
});

/*app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
}); */


/*---------------------- Error handling middleware -----------------------------*/

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error'
        }
    });
});


/*------------------------- Start the server -----------------------*/

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
