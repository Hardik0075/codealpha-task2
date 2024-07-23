const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/social-media', { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = new mongoose.Schema({
    author: String,
    content: String,
    likes: { type: Number, default: 0 },
    comments: [String]
});

const Post = mongoose.model('Post', postSchema);

const posts = [
    { author: 'User1', content: 'This is the first post!', likes: 5, comments: ['Great post!', 'Interesting...'] },
    { author: 'User2', content: 'Hello world! This is another post.', likes: 3, comments: ['Hello!', 'Nice to meet you!'] },
    { author: 'User3', content: 'Just had an amazing day!', likes: 8, comments: ['Awesome!', 'Tell us more!'] },
    { author: 'User4', content: 'Check out my new blog post!', likes: 12, comments: ['Great read!', 'Thanks for sharing!'] },
    { author: 'User5', content: 'Feeling good today!', likes: 7, comments: ['Keep it up!', 'Fantastic!'] }
];

Post.insertMany(posts)
    .then(() => {
        console.log('Sample posts added.');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error adding posts:', err);
        mongoose.connection.close();
    });
