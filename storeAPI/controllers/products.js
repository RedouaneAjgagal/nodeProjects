const getProducts = async (req, res) => {
    throw new Error('testing async errors handler package!');
    return res.status(200).json({ msg: 'All products' });
}


module.exports = { getProducts }