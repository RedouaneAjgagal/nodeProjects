const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

// READ TASKS
const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find();
    return res.status(200).json({ tasks })
});


// CREATE TASK
const addNewTask = asyncWrapper(async (req, res) => {
    const newTask = await Task.create(req.body)
    return res.status(201).json({ newTask })
});


// DETAILS TASK
const taskDetails = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
        return next(createCustomError(`Could not find task with id ${taskID}`, 404));
    }
    return res.status(200).json({ task })
});


// EDIT TASKS
const editTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true });
    if (!task) {
        return next(createCustomError(`Could not find task with id ${taskID}`, 404));
    }
    return res.status(200).json({ task });
})


// DELETE TASKS
const deleteTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params;
    const deletedTask = await Task.findOneAndDelete({ _id: taskID });
    if (!deletedTask) {
        return next(createCustomError(`Could not find task with id ${taskID}`, 404));
    }
    return res.status(200).json({ task: deletedTask })
})

module.exports = {
    getAllTasks,
    addNewTask,
    taskDetails,
    editTask,
    deleteTask
}