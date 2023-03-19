const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        minLength: 3,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: [6, 'Password must be more than 6 characters!']
    }
});

userSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model('User', userSchema);
module.exports = User