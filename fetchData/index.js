const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})


app.post('/country', (req, res) => {
    const countryValue = req.body.country
    const country = `https://restcountries.com/v3.1/name/${countryValue}`
    https.get(country, (response) => {
        response.on('data', (data) => {
            const [getData] = JSON.parse(data)
            const name = getData.name.common;
            const capital = getData.capital[0];
            const population = getData.population;
            res.send(`Country Name: ${name}, capital ${capital} and population ${population}`)
        });
    })
})

app.listen(3000, () => {
    console.log('Server is running');
})