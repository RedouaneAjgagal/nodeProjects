const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
    const newUser = await User.create(req.body);
    const token = newUser.createToken();
    res.status(StatusCodes.CREATED).json({ username: newUser.name, token });
}
const login = async (req, res) => {
    res.send('Login user')
}

module.exports = {
    register,
    login
}