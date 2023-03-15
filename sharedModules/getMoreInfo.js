const getMoreInfo = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const getFullYear = new Date().getFullYear();
    const status = req.statusCode;
    console.log(method, url, status, getFullYear);
    next();
}

module.exports = getMoreInfo