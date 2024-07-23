const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/social-media', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define schema and models
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    followers: [String],
    following: [String]
});

const postSchema = new mongoose.Schema({
    author: String,
    content: String,
    likes: { type: Number, default: 0 },
    comments: [String]
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

// API Routes
app.get('/api/profile', async (req, res) => {
    const user = await User.findOne(); // Simplified; use actual logic
    res.json(user);
});

app.get('/api/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

app.post('/api/follow/:userId', async (req, res) => {
    const userId = req.params.userId;
    res.json({ message: 'Followed successfully' });
});

app.post('/api/like/:postId', async (req, res) => {
    const postId = req.params.postId;
    res.json({ message: 'Liked successfully' });
});

app.post('/api/comment/:postId', async (req, res) => {
    const postId = req.params.postId;
    const { comment } = req.body;
    res.json({ message: 'Comment added successfully' });
});

// Serve index.html on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/api/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
