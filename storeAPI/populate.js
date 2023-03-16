require('dotenv').config();
const Product = require('./models/product');
const connectDB = require('./db/connect');
const jsonProducts = require('./products.json')




const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI)
        await Product.deleteMany();
        await Product.create(jsonProducts)
        console.log('success');
        process.exit(0);
    } catch (error) {
        console.error(error)
        process.exit(1);
    }
}
start();