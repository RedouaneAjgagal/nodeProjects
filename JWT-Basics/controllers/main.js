// const CustomAPIError = require('../errors/custom-error')
const { BadRequestError } = require('../errors')
const jwt = require('jsonwebtoken');



const login = async (req, res) => {
    const { username, password } = req.body
    if (username.trim().length < 1 || password.trim().length < 1) {
        throw new BadRequestError('Username or Password cannot be empty.')
    }
    // demo ID
    const id = Math.random();
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(200).json({ msg: `Welcome back ${username}`, token })
}



const dashboard = async (req, res) => {
    const { username } = req.user
    // Dummy data
    const authenticatedData = Math.floor((Math.random() * 100) + 1);
    res.status(200).json({ msg: `Hello, ${username}`, secret: `Your private key is ${authenticatedData}` });
}


module.exports = {
    dashboard,
    login
}