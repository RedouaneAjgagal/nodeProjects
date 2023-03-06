const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.post('/', (req, res) => {
    const num1 = +req.body.num1;
    const num2 = +req.body.num2;
    const totalAmount = num1 + num2
    res.send(`<h1>The calculated amound is: ${totalAmount}</h1>`);
})

app.listen(3000, () => {
    console.log('Server is running!');
});