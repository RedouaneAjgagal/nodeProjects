const { getProducts } = require('../controllers/products');
const router = require('express').Router();


// Route /api/v1/products
router.route('/')
    .get(getProducts);



module.exports = router