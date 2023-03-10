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
    const id = generate.generateId()
    const todoState = {
        id: id,
        value: todo,
        checked: false,
    }
    todos.push(todoState);
    res.redirect('/')
})

app.post('/delete', (req, res) => {
    const id = req.body.delete
    const updatedTodos = todos.filter(todo => todo.id !== id)
    todos = updatedTodos;
    res.redirect('/')
})

app.post('/edit', (req, res) => {
    const id = req.body.update
    const value = req.body[id]
    const targetTodo = todos.findIndex(todo => todo.id === id)
    todos[targetTodo].value = value
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('Server is running on 3000');
})