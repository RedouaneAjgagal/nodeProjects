const express = require('express');
const mongoose = require('mongoose');
const app = express()

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://127.0.0.1:27017/wikiDB');

const articlesSchema = new mongoose.Schema({
    title: String,
    content: String
});
const Article = mongoose.model('Article', articlesSchema);

app.get('/articles', (req, res) => {
    const getArticles = async () => {
        const articles = await Article.find();
        res.send(articles)
    }
    getArticles()
});

app.post('/articles', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const newArticle = async () => {
        try {
            await Article.create({title, content})
            res.send(`Successfully Added #${title}`)
        } catch (err) {
            res.send(`Fail to add a new article.. ${err}`)
        }
    }
    newArticle();
})

app.listen(3000, () => {
    console.log(`Server is running on port: 3000`);
})











// const insertMany = async () => {
//     const article1 = new Article({
//         title: "The Benefits of Meditation for Mental Health",
//         content: "Meditation has been shown to reduce symptoms of anxiety, depression, and stress."
//     })
//     const article2 = new Article({
//         title: "The Importance of Sleep for Overall Health",
//         content: "Getting enough sleep is crucial for maintaining a healthy immune system, proper cognitive function, and overall physical health."
//     })
//     const article3 = new Article({
//         title: "The Effects of Social Media on Mental Health",
//         content: " Studies have found a correlation between social media use and increased feelings of anxiety, depression, and loneliness, especially among younger generations."
//     })
//     const allArticles = [article1, article2, article3]
//     await Article.insertMany(allArticles)
// }
// insertMany()