const express = require('express');
const app = express();

const todos = []

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index', {todos})
})

app.post('/', (req, res) => {
    const todo = req.body.todo
    todos.push(todo);
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('Server is running on 3000');
})