const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connection');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

// Midleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandler);


const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(port, () => {
            console.log(`Server is running on ${port}..`);
        })
    } catch (err) {
        console.log(err);
    }
}
start();
