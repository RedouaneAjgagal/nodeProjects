const CustomAPIError = require('../errors/custom-error');
const jwt = require('jsonwebtoken')
const authorizationMiddleware = async (req, res, next) => {
    const authorized = req.headers.authorization;
    if (!authorized || !authorized.startsWith('Bearer')) {
        throw new CustomAPIError('No token has been provided.', 401);
    }
    const token = authorized.split(' ')[1];
    try {
        const encoded = await jwt.verify(token, process.env.JWT_SECRET);
        const { username, id } = encoded;
        req.user = { username, id }
        next();
    } catch (error) {
        throw new CustomAPIError('Unauthorized action. Please login first', 401);
    }
}

module.exports = authorizationMiddleware