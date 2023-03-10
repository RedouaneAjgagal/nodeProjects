const express = require('express');
const app = express();
const generate = require(`${__dirname}/generateId.js`)
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/todoListDB');

const todoSchema = new mongoose.Schema({
    value: {
        type: String,
        required: [true, 'Cannot be empty']
    },
    completed: Boolean
});
const Todo = mongoose.model('Todo', todoSchema);



let todos = []
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    const getTodos = async () => {
        const todos = await Todo.find()
        if (!todos.length) {
            const firstTodo = new Todo({ value: '10 min walk', completed: false })
            const secondTodo = new Todo({ value: 'study mongoose', completed: false })
            const thirdTodo = new Todo({ value: 'watch an episode of any anime', completed: false })
            const initialList = [firstTodo, secondTodo, thirdTodo]
            Todo.insertMany(initialList);
            res.redirect('/')
        } else {
            res.render('index', { todos })
        }
    }
    getTodos()
})

app.post('/', (req, res) => {
    const todo = req.body.todo
    const addNewTodo = async () => {
        const newTodo = new Todo({
            value: todo,
            completed: false
        });
        try {
            await newTodo.save();
        } catch (err) {
            console.log(err.errors.value.message);
        }
    }
    addNewTodo()
    res.redirect('/')
})

app.post('/delete', (req, res) => {
    const id = req.body.delete
    const deleteTodo = async (id) => {
        try {
            await Todo.deleteOne({ _id: id })
            console.log(`todo #${id}, has been successfully deleted!`);
        } catch {
            console.log('Failed to delete');
        }
    }
    deleteTodo(id);
    res.redirect('/')
})

app.post('/edit', (req, res) => {
    const id = req.body.update
    const value = req.body[id]
    if (value.trim().length === 0) {
        return res.redirect('/')
    }
    const updateTodo = async (id, value) => {
        try {
            await Todo.updateOne({ _id: id }, { value })
            console.log(`todo #${id}, has been successfully updated!`);
        } catch (err) {
            console.log(err);
        }
    }
    updateTodo(id, value);
    res.redirect('/')
})

app.post('/complete', (req, res) => {
    const checkboxId = req.body.checkbox;
    const checkTodo = async () => {
        let isCompleted = false
        const findTodo = await Todo.findById(checkboxId)
        if (!findTodo.completed) isCompleted = true;
        await Todo.updateOne({ _id: checkboxId }, { completed: isCompleted });
    }
    checkTodo()
    res.redirect('/')
})


app.listen(3000, () => {
    console.log('Server is running on 3000');
})