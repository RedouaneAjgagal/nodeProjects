const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');

const uploadProductImage = async (req, res) => {
    console.log(req.files);
    res.status(StatusCodes.CREATED).send('Uploaded image')
}

module.exports = {
    uploadProductImage
}