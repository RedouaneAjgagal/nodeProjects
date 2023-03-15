const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connection');
require('dotenv').config();

// Midleware
app.use(express.json());

// Routes
app.use('/api/v1/tasks', tasks)



const port = 3000

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
