const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const newUser = await User.create(req.body);

    res.status(StatusCodes.CREATED).json(newUser);
}
const login = async (req, res) => {
    res.send('Login user')
}

module.exports = {
    register,
    login
}