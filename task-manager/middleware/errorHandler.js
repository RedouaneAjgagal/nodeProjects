const errorHandler = (err, req, res, next) => {
    return res.status(500).json({ errorMsg: 'Something went wrong..' });
}

module.exports = errorHandler;