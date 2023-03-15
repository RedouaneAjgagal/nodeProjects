const Task = require('../models/Task');

const getAllTasks = (req, res) => {
    res.send('All Tasks')
}

const addNewTask = async (req, res) => {
    const newTask = await Task.create({name: req.body.name, isCompleted: req.body.isCompleted})
    res.status(201).json(newTask)
}

const taskDetails = (req, res) => {
    const id = req.params.id;
    res.send(`Task Details ${id}`)
}
const editTask = (req, res) => {
    const id = req.params.id
    res.send(`Task ${id} has been edited`)
}
const deleteTask = (req, res) => {
    const id = req.params.id
    res.send(`Task ${id} has been deleted`)
}

module.exports = {
    getAllTasks,
    addNewTask,
    taskDetails,
    editTask,
    deleteTask
}