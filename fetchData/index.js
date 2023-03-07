const express = require('express');
const app = express();
const https = require('https');

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})


app.post('/country', (req, res) => {
    const country = req.body.country
    const url = `https://restcountries.com/v3.1/name/${country}`
    https.get(url, (response) => {
        response.on('data', (data) => {
            const [getData] = JSON.parse(data)
            const name = getData.name.common;
            const capital = getData.capital[0];
            const getpopulation = getData.population;
            const population = new Intl.NumberFormat().format(getpopulation)
            const flag = getData.flags.svg
            res.write(`<h1>Country: ${name}</h1>`)
            res.write(`<p>Capital: ${capital}</p>`)
            res.write(`<p>population: ${population}</p>`)
            res.write(`<img src="${flag}">`)
            res.send()
        });
    })
})

app.listen(3000, () => {
    console.log('Server is running');
})