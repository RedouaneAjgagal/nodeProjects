const express = require('express');
const app = express();
const { products } = require('./data')
const getMoreInfo = require('./getMoreInfo');
const authorized = require('./authorized');
const productsRouter = require('./routes/products')
const peopleRouter = require('./routes/names');
// app.use('/api/products',[getMoreInfo, authorized])
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/products', productsRouter)
app.use('/api/names', peopleRouter);

app.get('/', (req, res) => {
    res.send('<h1>Home Page!</h1><a href="/api/products">Products</a>')
});



app.get('/api/v1/query', (req, res) => {
    const { search, limit, page } = req.query;
    let newProducts = products;
    if (search) {
        newProducts = products.filter(product => product.name.startsWith(search));
    }
    if (limit) {
        newProducts = products.slice(0, Number(limit))
    }
    if (page) {
        const endsWith = Number(page) + Number(page);
        const startsWith = endsWith - 2
        newProducts = products.slice(startsWith, endsWith)
    }
    if (!newProducts.length) {
        return res.status(200).json({ success: true, data: [] })
    }
    return res.json(newProducts)
})

app.get('*', (req, res) => {
    res.status(404).send('Got lost..')
})


app.listen(3000, () => {
    console.log('Server is running on 3000');
})








// const http = require('http');

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'content-type': 'application/json' })
//     res.write('{ name: "red", age: 22 }')
//     res.end()
// })

// server.listen(3000, () => {
//     console.log('Server is running on 3000');
// })








// const EventEmmiter = require('events');

// const myEvent = new EventEmmiter();

// myEvent.on('response', (name) => {
//     console.log('evennnttt! ' + name);
// })
// myEvent.emit('response', 'red')







// const { readFile } = require('fs');
// const util = require('util')
// const readFileAsync = util.promisify(readFile)

// const getFile = (path) => {
//     return new Promise((resolve, reject) => {
//         readFile(path, 'utf-8', (err, data) => {
//             if (err) reject(err);
//             resolve(data);
//         });
//     });
// }


// const reafAfile = async () => {
//     try {
//         const file = await readFileAsync("./folder/subFolder/anotherText.txt", 'utf-8')
//         console.log(file);
//     } catch (err) {
//         console.log(err);
//     }
// }
// reafAfile()


// const http = require('http');

// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.end('Welcome to home page')
//         return;
//     }
//     res.end('This is not working properly')
// });
// server.listen(3000, () => {
//     console.log(`Server is running on 3000`);
// })





// const names = require('./names');
// const sayHi = require('./sayHi');
// const data = require('./data')
// const os = require('os')
// const path = require('path')
// const { readFileSync, writeFileSync } = require('fs')

// const textFile = readFileSync("./folder/subFolder/text.txt", 'utf-8')
// writeFileSync("./folder/subFolder/AnotherText.txt", `YESSSS ${textFile}`, {flag: 'a'})
// console.log(overWrite);

// const filePath = path.join('folder', 'subFolder', 'text.txt')
// console.log(filePath);
// const base = path.basename(filePath)
// console.log(base);

// const absolute = path.resolve(__dirname, filePath)
// console.log(absolute);

// console.log(os.homedir());
// sayHi(names.jhon)
// sayHi(names.max)
// sayHi(names.emmy)
// console.log(data);