const Product = require('../models/product');

// Read all products
const getProducts = async (req, res) => {
    const { name, featured, company, sort, field } = req.query
    const queryObj = {}
    if (name) {
        queryObj.name = { $regex: name, $options: 'i' }
    }
    if (featured) {
        queryObj.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryObj.company = company
    }
    // console.log(sort.split(',').join(' '));
    const sortList = sort ? sort.split(',').join(' ') : 'createdAt';
    const fieldList = field ? field.split(',').join(' ') : null
    const products = await Product.find(queryObj).setOptions({ strictQuery: true }).sort(sortList).select(fieldList);

    return res.status(200).json(products);
}


module.exports = { getProducts }