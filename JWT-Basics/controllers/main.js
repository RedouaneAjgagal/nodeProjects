const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
    const { username, password } = req.body
    if (username.trim().length < 1 || password.trim().length < 1) {
        throw new CustomAPIError('Username or Password cannot be empty.', 400)
    }
    // demo ID
    const id = Math.random();
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(200).json({ msg: `Welcome back ${username}`, token })
}

const dashboard = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new CustomAPIError('No token has been provided.', 401);
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const authenticatedData = Math.floor((Math.random() * 100) + 1);
        res.status(200).json({ msg: `Hello, ${decoded.username}`, secret: `Your private key is ${authenticatedData}` });
    } catch (error) {
        throw new CustomAPIError('Unauthorized action. Please login first', 401);
    }
}


module.exports = {
    dashboard,
    login
}