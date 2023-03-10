const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);
const appel = new Fruit({
    name: 'Appel',
    rating: 7,
    review: 'Umm Im Ok'
});


const banana = new Fruit({
    name: 'Banana',
    rating: 10,
    review: 'Im the best Hehe'
});

const kiwi = new Fruit({
    name: 'Kiwi',
    rating: 9,
    review: 'Trying to be the best'
});
const orange = new Fruit({
    name: 'Orange',
    rating: 5,
    review: 'Im confused about myself'
});
orange.save();
// Fruit.insertMany([banana, kiwi]);
// appel.save();


const getFruits = async () => {
    const fruits = await Fruit.find({});
    const names = fruits.map(fruit => {
        return fruit.name
    });
    mongoose.connection.close();
    console.log(names.toString());
}
// const getFruitsNames = getFruits()
// console.log(getFruits());
getFruits()


const personSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const Person = mongoose.model("Person", personSchema);
const person = new Person({
    name: 'Jhon',
    age: 36
});

// person.save();

const countrySchema = new mongoose.Schema({
    name: String,
    capital: String,
    population: Number
});

const Country = mongoose.model('Country', countrySchema);
const country = new Country({
    name: 'Morocco',
    capital: 'Rabat',
    population: 36910558 
});
const country2 = new Country({
    name: 'Morocco',
    capital: 'Rabat',
    population: '36910558' 
});
const country3 = new Country({
    name: 'Canada',
    capital: 'Ottawa',
    population: 38005238 
});


// country3.save();
// country2.save()
// country.save();