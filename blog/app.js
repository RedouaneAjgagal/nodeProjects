const express = require("express");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const _ = require('lodash');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/blogPostDB');

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');


const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Cannot be empty!']
  },
  content: {
    type: String,
    required: [true, 'Cannot be empty!']
  }
});
const Post = mongoose.model('Post', postsSchema);

app.get('/', (res, req) => {
  const getPosts = async () => {
    const posts = await Post.find();
    const updatedPosts = posts.map(post => {
      const arrayContent = post.content.split(' ')
      const shortContent = `${arrayContent.slice(0, 8).join(' ')}...`
      return { title: post.title, content: shortContent }
    })
    req.render('home', { content: homeStartingContent, posts: updatedPosts, _: _ });
  }
  getPosts()

})
app.get('/about', (res, req) => {
  req.render('about', { content: aboutContent })
})
app.get('/contact', (res, req) => {
  req.render('contact', { content: contactContent })
})
app.get('/compose', (res, req) => {
  req.render('compose')
})

app.get('/posts/:postId', (req, res) => {
  const params = req.params.postId
  const findPost = async () => {
    const posts = await Post.find();
    const [findPost] = posts.filter(post => {
      const title = _.kebabCase(post.title);
      const titleParams = _.kebabCase(params);
      if (title === titleParams) {
        return true
      }
    })
    if (findPost) {
      res.render('post', { title: findPost.title, content: findPost.content })
    } else {
      res.render('post', { title: 'Error', content: 'Nothing Has found' })
    }
  }
  findPost()

})

app.post('/compose', (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.post
  }
  const publishPost = async () => {
    try {
      await Post.create(post)
      console.log(`Added new post successfully #${post.title}`);
    } catch (err) {
      console.error(`Could not Publish a new post.. ${err}`);
    }
  }
  publishPost()
  res.redirect('/')
})


app.use(express.static("public"));

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
