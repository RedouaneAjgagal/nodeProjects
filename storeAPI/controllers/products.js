const getProducts = (req, res) => {
    return res.status(200).send('All products');
}


module.exports = { getProducts }