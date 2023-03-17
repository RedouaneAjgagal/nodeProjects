const Product = require('../models/product');

// Read all products
const getProducts = async (req, res) => {
    const { name, featured, company, sort, field, page, limit, numericFilters } = req.query
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
    if (numericFilters) {
        const operatorMap = {
            '<': '$lt',
            '<=': '$lte',
            '=': '$eq',
            '>': '$gt',
            '>=': '$gte'
        }
        const regEx = /\b(<|<=|=|>|>=)\b/g
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach(item => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                return queryObj[field] = { [operator]: Number(value) }
            }
        });
    }
    // console.log(sort.split(',').join(' '));
    const sortList = sort ? sort.split(',').join(' ') : 'createdAt';
    const fieldList = field ? field.split(',').join(' ') : null;
    const pages = Number(page) || 1;
    const limits = Number(limit) || 10;
    const skip = (pages - 1) * limits
    const products = await Product.find(queryObj).setOptions({ strictQuery: true }).sort(sortList).select(fieldList).limit(limits).skip(skip);

    return res.status(200).json(products);
}


module.exports = { getProducts }