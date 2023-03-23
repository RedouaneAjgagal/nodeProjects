const Product = require('../models/Product');
const {StatusCodes} = require('http-status-codes');

const getAllProducts = async (req,res) => {
    res.status(StatusCodes.OK).send('list of products');
}

const createProduct = async (req, res) => {
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).send(product);
}


module.exports = {
    getAllProducts,
    createProduct
}