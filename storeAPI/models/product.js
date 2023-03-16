const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be empty.']
    },
    price: {
        type: Number,
        required: [true, 'Price cannot be empty.']
    },
    featued: {
        type: Boolean,
        default: false
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'marcos', 'caressa'],
            message: '{VALUE} is not supported'
        }
    },
    rating: {
        type: Number,
        min: [1, 'Rating must be above 1'],
        max: [5, 'Rating must be below 5']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;