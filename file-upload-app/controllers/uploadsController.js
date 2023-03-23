const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors')
const path = require('path');

const uploadProductImage = async (req, res) => {
    const uploadImage = req.files.image;
    const imageType = uploadImage.mimetype.split('/')[0]
    if (imageType !== 'image') {
        throw new BadRequestError('Only images are valid')
    }
    const imagePath = path.join(__dirname, '../public/uploads', uploadImage.name);
    await uploadImage.mv(imagePath);
    res.status(StatusCodes.OK).json({ image: { src: `uploads/${uploadImage.name}` } })
}

module.exports = {
    uploadProductImage
}