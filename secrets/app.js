require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const encrypt = require('mongoose-encryption');
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
mongoose.connect('mongodb://127.0.0.1:27017/userDB');

const userSchema = new mongoose.Schema({
    userName: String,
    password: String
});

// userSchema.plugin(encrypt, { secret: process.env.SECRET_KEY, encryptedFields: ['password'] })

const User = mongoose.model('User', userSchema);


app.get('/', (req, res) => {
    res.render('home');
})
app.route('/login')
    .get((req, res) => {
        res.render('login');
    })
    .post((req, res) => {
        const userName = req.body.username;
        const password = req.body.password;
        const loginHandler = async () => {
            try {
                const user = await User.findOne({ userName })
                bcrypt.compare(password, user.password, async function (err, result) {
                    if (!user) {
                        res.redirect('/login');
                    }
                    if (result) {
                        console.log(`${userName} has successfully logged in`);
                        res.render('secrets');
                    } else {
                        res.redirect('/login');
                    }
                });
            } catch (err) {
                console.error(`Could not login.. ${err}`)
            }
        }
        loginHandler()
    });


app.route('/register')
    .get((req, res) => {
        res.render('register');
    })
    .post((req, res) => {
        const userName = req.body.username;
        const password = req.body.password;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                try {
                    await User.create({ userName, password: hash });
                    console.log(`${userName} has been successfully registered`);
                    res.render('secrets')
                } catch (err) {
                    console.error(`Could not add new user.. ${err}`);
                }
            });
        });
    }
    );


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})