const mongoose = require('mongoose');
const tasksSchema = new mongoose.Schema({
    name: String,
    isCompleted: Boolean
});

module.exports = mongoose.model('Task', tasksSchema);