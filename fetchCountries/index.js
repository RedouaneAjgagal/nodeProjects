const express = require('express');
const https = require('https');
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.post('/countries', (req, res) => {
    const country = req.body.country
    const url = `https://restcountries.com/v3.1/name/${country}`
    https.get(url, (response) => {
        response.on('data', (data) => {
            if (response.statusCode === 200) {
                const [countryData] = JSON.parse(data);
                const name = countryData.name.common;
                const capital = countryData.capital;
                const getPopulation = countryData.population;
                const population = new Intl.NumberFormat().format(getPopulation)
                const flag = countryData.flags.svg;
                res.render('country', {
                    countryName: name,
                    countryCapital: capital,
                    countryPopulation: population,
                    countryImg: flag
                })
            } else {
                res.render('errors', { statusCode: response.statusCode })
            }
        });
    })
})

app.listen(3000, () => {
    console.log('Stating..');
});