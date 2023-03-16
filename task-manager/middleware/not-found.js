const notFound = (req, res) => res.status(404).send('Page is not exist..');

module.exports = notFound;