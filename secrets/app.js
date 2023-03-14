require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')

// const encrypt = require('mongoose-encryption');
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: 'socoolstufflol',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect('mongodb://127.0.0.1:27017/userDB');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    secrets: Array
});

userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(encrypt, { secret: process.env.SECRsET_KEY, encryptedFields: ['password'] })

const User = mongoose.model('User', userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    if (isAuthenticated) {
        res.redirect('/secrets')
    } else {
        res.render('home');
    }
})
app.route('/login')
    .get((req, res) => {
        const isAuthenticated = req.isAuthenticated();
        if (isAuthenticated) {
            res.redirect('/')
        } else {
            res.render('login');
        }
    })
    .post((req, res) => {
        const user = new User({
            username: req.body.userName,
            password: req.body.password
        })
        req.login(user, () => {
            passport.authenticate('local', { failureRedirect: '/login' })(req, res, () => {
                res.redirect('/secrets');
            })
        })
    });


app.route('/register')
    .get((req, res) => {
        const isAuthenticated = req.isAuthenticated();
        if (isAuthenticated) {
            res.redirect('/')
        } else {
            res.render('register');
        }
    })
    .post(async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const newUser = new User({ username });
        await newUser.setPassword(password);
        const result = await newUser.save();
        if (result) {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/secrets');
            })
        }
    }
    );

app.get('/secrets', async (req, res) => {
    const usersWithSecrets = await User.find({ 'secrets': { $ne: null } })
    const isAuthenticated = req.isAuthenticated();
    let secrets = [];
    usersWithSecrets.forEach(user => {
        return secrets.push(user.secrets)
    })
    res.render("secrets", { secrets: secrets.flat(Infinity), isAuthenticated });
});

app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err) }
        res.redirect('/');
    });
});

app.route('/secrets/submit')
    .get((req, res) => {
        const isAuthenticated = req.isAuthenticated();
        if (isAuthenticated) {
            res.render('submit');
        } else {
            res.redirect('/login');
        }
    })
    .post(async (req, res) => {
        const isAuthenticated = req.isAuthenticated();
        if (isAuthenticated) {
            const secretValue = req.body.secret;
            await User.updateOne({ _id: req.user.id }, { $push: { secrets: secretValue } })
            res.redirect('/secrets')
        } else {
            res.redirect('/login')
        }
    })


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})