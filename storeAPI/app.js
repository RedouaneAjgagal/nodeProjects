require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const products = require('./routes/products')
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

app.use(express.json());



// Routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>')
});

app.use('/api/v1/products', products)

app.use(notFoundMiddleware)
app.use(errorMiddleware)


const port = process.env.PORT || 3000
const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI)
        app.listen(port, () => {
            console.log(`Server is running on ${port}..`);
        });
    } catch (error) {
        console.error(error)
    }
}
start()