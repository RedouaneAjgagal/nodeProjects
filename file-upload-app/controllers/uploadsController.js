const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors')
const path = require('path');

const uploadProductImage = async (req, res) => {
    if (!req.files) {
        throw new BadRequestError('Image is required!')
    }
    const uploadImage = req.files.image;
    const imageType = uploadImage.mimetype.split('/')[0]
    if (imageType !== 'image') {
        throw new BadRequestError('Only images are valid')
    }

    const maxSize = 1024 * 1024
    if (uploadImage.size > maxSize) {
        throw new BadRequestError('Please upload image smaller than 1KB');
    }
        const imagePath = path.join(__dirname, '../public/uploads', uploadImage.name);
    await uploadImage.mv(imagePath);
    res.status(StatusCodes.OK).json({ image: { src: `uploads/${uploadImage.name}` } })
}

module.exports = {
    uploadProductImage
}