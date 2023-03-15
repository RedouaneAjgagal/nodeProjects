const express = require('express');
const router = express.Router();
const { products } = require('../data');


router.get('/', (req, res) => {
    const newProducts = products.map(product => {
        const { id, name, image } = product
        return { id, name, image }
    })
    res.json(newProducts)
});

router.get('/:id', (req, res) => {
    const targetProduct = products.find(product => product.id == req.params.id);
    if (!targetProduct) return res.status(404).send('Not found');
    res.json(targetProduct)
});

module.exports = router;