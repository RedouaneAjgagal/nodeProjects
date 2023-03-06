const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/bmicalculator', (req, res) => {
    res.sendFile(`${__dirname}/bmiCalculator.html`)
});
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});


app.post('/', (req, res) => {
    const num1 = +req.body.num1;
    const num2 = +req.body.num2;
    const totalAmount = num1 + num2
    res.send(`<h1>The calculated amound is: ${totalAmount}</h1>`);
});

app.post('/bmicalculator', (req, res) => {
    const height = req.body.height;
    const weight = req.body.weight;
    const bmiHeight = (height / 100) * (height / 100);
    const bmiTotal = (weight / bmiHeight).toFixed(2);
    let textResult;
    if (bmiTotal >= 25) {
        textResult = 'Overweight'
    } else if (bmiTotal < 18.5) {
        textResult = 'Underweight'
    } else {
        textResult = 'Healthy weight'
    }
    res.send(`<h1>Your BMI is ${bmiTotal} which is ${textResult}</h1>`)
})

app.listen(3000, () => {
    console.log('Server is running!');
});