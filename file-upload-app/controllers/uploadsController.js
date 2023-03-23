const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadProductImageLocally = async (req, res) => {

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


const uploadProductImage = async (req, res) => {
    if (!req.files) {
        throw new BadRequestError('Image is required!')
    }
    const maxSize = 1024 * 1024
    if (req.files.image.size > maxSize) {
        fs.unlinkSync(req.files.image.tempFilePath);
        throw new BadRequestError('Please upload images smaller than 1KB');
    }
    if (!req.files.image.mimetype.startsWith('image')) {
        fs.unlinkSync(req.files.image.tempFilePath);
        throw new BadRequestError('Only images are valid')
    }
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        folder: 'file-upload-app',
        use_filename: true,
        resource_type: 'image'
    });
    fs.unlinkSync(req.files.image.tempFilePath);
    res.status(200).json({ image: { src: result.secure_url } });
}

module.exports = {
    uploadProductImage
}