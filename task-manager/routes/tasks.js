const express = require('express');
const router = express.Router();
const { getAllTasks, addNewTask, taskDetails, editTask, deleteTask } = require('../controllers/tasks')


// Route /api/v1/tasks
router.route('/')
    .get(getAllTasks)
    .post(addNewTask);

router.route('/:id')
    .get(taskDetails)
    .patch(editTask)
    .delete(deleteTask);

module.exports = router