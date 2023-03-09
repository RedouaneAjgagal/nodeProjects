const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');

const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);
const appel = new Fruit({
    name: 'Appel',
    rating: 7,
    review: 'Umm Im Ok'
});
// appel.save();


const personSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const Person = mongoose.model("Person", personSchema);
const person = new Person({
    name: 'Jhon',
    age: 36
});

person.save();