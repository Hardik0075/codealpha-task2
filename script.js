// Sample data
const profile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    followers: ['User2', 'User3'],
    following: ['User4', 'User5'],
    profilePicture: 'imh2.jpeg' // Add your profile picture path here
};

const posts = Array.from({ length: 15 }, (_, i) => ({
    id: (i + 1).toString(),
    author: `User${i + 1}`,
    content: `This is post number ${i + 1}.`,
    image: `img.webp`, // Loop through 5 images
    likes: Math.floor(Math.random() * 20),
    comments: [`Comment ${i + 1}`, `Another comment ${i + 1}`]
}));

const chatMessages = [
    { user: 'User1', message: 'Hi there!' },
    { user: 'John Doe', message: 'Hello! How are you?' }
];

let isFollowing = false;

// Load profile data
function loadProfile() {
    const profileSection = document.getElementById('profile');
    profileSection.innerHTML = `
        <div class="profile">
            <img src="${profile.profilePicture}" alt="Profile Picture">
            <h2>${profile.name}</h2>
            <p>Followers: ${profile.followers.length}</p>
            <p>Following: ${profile.following.length}</p>
            <button id="follow-button" onclick="toggleFollow()">${isFollowing ? 'Following' : 'Follow'}</button>
        </div>
    `;
}

// Load posts
function loadPosts() {
    const postsSection = document.getElementById('posts');
    postsSection.innerHTML = `
        <div class="posts-container">
            ${posts.map(post => `
                <div class="post">
                    <h3>${post.author}</h3>
                    <p>${post.content}</p>
                    <img src="${post.image}" alt="Post Image">
                    <button onclick="likePost('${post.id}')">Like</button>
                    <p>Likes: ${post.likes}</p>
                    <button onclick="commentOnPost('${post.id}')">Comment</button>
                    <div class="comments" id="comments-${post.id}">
                        ${post.comments.map(comment => `<p>${comment}</p>`).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Load chat messages
function loadChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = chatMessages.map(msg => `
        <div><strong>${msg.user}:</strong> ${msg.message}</div>
    `).join('');
}

// Toggle follow (simulated)
function toggleFollow() {
    isFollowing = !isFollowing;
    const followButton = document.getElementById('follow-button');
    followButton.innerText = isFollowing ? 'Following' : 'Follow';
    followButton.classList.toggle('following', isFollowing);
}

// Like post (simulated)
function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes += 1;
        loadPosts();
        alert('Liked successfully');
    }
}

// Comment on post (simulated)
function commentOnPost(postId) {
    const comment = prompt('Enter your comment:');
    if (comment) {
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.comments.push(comment);
            loadPosts();
            alert('Comment added successfully');
        }
    }
}

// Send message in chat (simulated)
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;
    if (message) {
        chatMessages.push({ user: profile.name, message });
        messageInput.value = '';
        loadChat();
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
    loadPosts();
    loadChat();
});
