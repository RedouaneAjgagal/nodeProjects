const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');


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
const taskDetails = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
        return res.status(404).json({ msg: `No task with id ${taskID}` })
    }
    return res.status(200).json({ task })
});


// EDIT TASKS
const editTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true });
    if (!task) {
        res.status(404).json({ msg: `No task with id ${taskID}` });
    }
    res.status(200).json({ task });
})


// DELETE TASKS
const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const deletedTask = await Task.findOneAndDelete({ _id: taskID });
    if (!deletedTask) {
        return res.status(404).json({ msg: `Could not delete task with id ${taskID}` })
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