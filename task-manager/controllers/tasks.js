const Task = require('../models/Task');


// READ TASKS
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        return res.status(200).json({ tasks })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}


// CREATE TASK
const addNewTask = async (req, res) => {
    try {
        const newTask = await Task.create(req.body)
        return res.status(201).json({ newTask })
    } catch (error) {
        return res.status(500).json(error.errors.name.properties.message)
    }
}


// DETAILS TASK
const taskDetails = async (req, res) => {
    const { id: taskID } = req.params;
    try {
        const task = await Task.findOne({ _id: taskID });
        if (!task) {
            return res.status(404).json({ msg: `No task with id ${taskID}` })
        }
        return res.status(200).json({ task })
    } catch (error) {
        return res.status(500).json({ msg: `No task with id ${taskID}` })
    }
}

// EDIT TASKS
const editTask = async (req, res) => {
    const { id: taskID } = req.params;
    try {
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true });
        if (!task) {
            res.status(404).json({ msg: `No task with id ${taskID}` });
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json(error);
    }
}


// DELETE TASKS
const deleteTask = async (req, res) => {
    const { id: taskID } = req.params;
    try {
        const deletedTask = await Task.findOneAndDelete({ _id: taskID });
        if (!deletedTask) {
            return res.status(404).json({ msg: `Could not delete task with id ${taskID}` })
        }
        return res.status(200).json({ task: deletedTask })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

module.exports = {
    getAllTasks,
    addNewTask,
    taskDetails,
    editTask,
    deleteTask
}