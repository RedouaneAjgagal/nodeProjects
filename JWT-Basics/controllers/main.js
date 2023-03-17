const login = async (req, res) => {
    res.status(200).send(`Welcome back user`)
}

const dashboard = async (req, res) => {
    const authenticatedData = Math.floor((Math.random() * 100) + 1);
    res.status(200).send(`Your private key is ${authenticatedData}`);
}


module.exports = {
    dashboard,
    login
}