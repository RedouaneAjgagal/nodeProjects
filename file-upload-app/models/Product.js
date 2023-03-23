const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name!']
    },
    price: {
        type: Number,
        required: [true, 'Please provide prduct price!']
    },
    image: {
        type: String,
        required: [true, 'Image is required..']
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;