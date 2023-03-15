const authorized = (req, res, next) => {
    const { user } = req.query;
    if (user === 'max') {
        req.user = { name: 'Max', id: 6 }
        next();
    } else {
        return res.status(401).send('Unauthorized')
    }
}

module.exports = authorized;