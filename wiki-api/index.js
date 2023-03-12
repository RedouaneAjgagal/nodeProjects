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

// /////////////// requests targeting all articles //////////////////////// //

app.route('/articles')

    .get((req, res) => {
        const getArticles = async () => {
            const articles = await Article.find();
            res.send(articles)
        }
        getArticles()
    })

    .post((req, res) => {
        const title = req.body.title;
        const content = req.body.content;
        const newArticle = async () => {
            try {
                await Article.create({ title, content })
                res.send(`Successfully Added #${title}`)
            } catch (err) {
                res.send(`Failed to add a new article.. ${err}`)
            }
        }
        newArticle();
    })

    .delete((req, res) => {
        const deleteAllArticles = async () => {
            try {
                await Article.deleteMany();
                res.send('Successfully deleted all articles')
            } catch (err) {
                res.send('Failed to delete all articles')
            }
        }
        deleteAllArticles();
    });

// /////////////// requests targeting a specific article //////////////////////// //

app.route('/articles/:post')

    .get((req, res) => {
        const params = req.params.post;
        const getArticle = async () => {
            try {
                const article = await Article.findOne({ title: params })
                if (article) {
                    res.send(article);
                } else {
                    res.send(`Could not find ${params}`)
                }
            } catch (err) {
                res.send(err)
            }
        }
        getArticle();
    })
    .put((req, res) => {
        const params = req.params.post;
        const title = req.body.title;
        const content = req.body.content;
        const updateArticle = async () => {
            try {
                const updatedArticle =  await Article.replaceOne({ title: params }, { title, content });
                if (!updatedArticle.modifiedCount) {
                    res.send(`Could not find ${params} article to update`)
                } else {
                    res.send(`${params} article has been updated succeffully`)
                }
            } catch (err) {
                res.send(err)
            }
        }
        updateArticle()
    });


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