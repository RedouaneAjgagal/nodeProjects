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

const listSchema = new mongoose.Schema({
    listName: String,
    todos: [todoSchema]
});
const List = mongoose.model("List", listSchema)



app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

const firstTodo = new Todo({ value: '10 min walk', completed: false })
const secondTodo = new Todo({ value: 'study mongoose', completed: false })
const thirdTodo = new Todo({ value: 'watch an episode of any anime', completed: false })
const initialList = [firstTodo, secondTodo, thirdTodo]

app.get('/', (req, res) => {
    const getTodos = async () => {
        const todos = await Todo.find()
        const list = await List.find()
        const listName = list.map(list => list.listName)
        console.log(listName);
        if (!todos.length) {
            Todo.insertMany(initialList);
            res.redirect('/')
        } else {
            res.render('index', { content: 'Today', todos, list: listName })
        }
    }
    getTodos()
})

app.post('/', (req, res) => {
    const todo = req.body.todo
    const addTodoBtn = req.body.addTodoBtn
    const addNewTodo = async () => {
        const newTodo = new Todo({
            value: todo,
            completed: false
        });
        try {
            if (addTodoBtn === 'Today') {
                await newTodo.save();
                res.redirect('/')
            } else {
                await List.findOneAndUpdate({ listName: addTodoBtn }, { $push: { todos: newTodo } })
                res.redirect(`/${addTodoBtn}`)
            }
        } catch (err) {
            console.log(err.errors.value.message);
        }
    }
    addNewTodo()

})

app.post('/delete', (req, res) => {
    const id = req.body.delete
    const params = req.body.list
    const deleteTodo = async (id) => {
        try {
            if (params === 'Today') {
                await Todo.deleteOne({ _id: id })
                console.log(`todo #${id}, has been successfully deleted!`);
                res.redirect('/')
            } else {
                await List.findOneAndUpdate({ listName: params }, { $pull: { todos: { _id: id } } })
                res.redirect(`/${params}`);
            }

        } catch {
            console.log('Failed to delete');
        }
    }
    deleteTodo(id);

})

app.post('/edit', (req, res) => {
    const id = req.body.update
    const value = req.body[id]
    const params = req.body.edit
    const updateTodo = async (id, value) => {
        try {
            if (params === 'Today') {
                await Todo.updateOne({ _id: id }, { value })
                res.redirect('/')
            } else {
                await List.updateOne({ listName: params, "todos._id": id }, { $set: { "todos.$.value": value } })
                res.redirect(`/${params}`)
            }
            console.log(`todo #${id}, has been successfully updated!`);
        } catch (err) {
            console.log(err);
        }
    }
    updateTodo(id, value);
})

app.post('/complete', (req, res) => {
    const checkboxId = req.body.checkbox;
    const params = req.body.params;
    const checkTodo = async () => {
        try {
            let isCompleted = false
            if (params === 'Today') {
                const findTodo = await Todo.findById(checkboxId)
                if (!findTodo.completed) isCompleted = true;
                await Todo.updateOne({ _id: checkboxId }, { completed: isCompleted });
                res.redirect('/')
            } else {
                const list = await List.findOne({ listName: params })
                const [targetTodo] = list.todos.filter(todo => todo.id === checkboxId)
                if (!targetTodo.completed) isCompleted = true
                await List.updateOne({ listName: params, "todos._id": checkboxId }, { $set: { "todos.$.completed": isCompleted } })
                res.redirect(`/${params}`)
            }
        } catch (err) {
            console.error(`Could not update! ${err}`)
        }
    }
    checkTodo()
})


app.get('/:customList', (req, res) => {
    const params = req.params.customList.toLocaleLowerCase()
    const isCustomListExist = async () => {
        const list = await List.findOne({ listName: params })
        const findAllList = await List.find()
        const listName = findAllList.map(list => list.listName)
        if (list) {
            res.render('index', { content: list.listName, todos: list.todos, list: listName })
        } else {
            const initialState = new List({
                listName: params,
                todos: initialList
            });
            initialState.save();
            return res.redirect(`/${params}`)
        }
    }
    isCustomListExist()
})


app.post('/category', (req, res) => {
    const params = req.body.category;
    res.redirect(`/${params}`)
})

app.listen(3000, () => {
    console.log('Server is running on 3000');
})