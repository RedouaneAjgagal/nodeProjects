const express = require('express');
const app = express();
const generate = require(`${__dirname}/generateId.js`)
let todos = []
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index', { todos })
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