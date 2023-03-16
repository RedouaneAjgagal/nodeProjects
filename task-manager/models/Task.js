const mongoose = require('mongoose');
const tasksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Provide a value'],
        maxlength: [20, 'Cannot be more than 20 characters']
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Task', tasksSchema);