const express = require('express');
const { getAllProducts, createProduct } = require('../controllers/productController')
const { uploadProductImage } = require('../controllers/uploadsController')
const router = express.Router();

router.route('/')
    .get(getAllProducts)
    .post(createProduct);

router.route('/uploads')
    .post(uploadProductImage);

module.exports = router;