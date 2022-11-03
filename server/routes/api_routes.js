const api_router = require('express').Router();

const { User, Post } = require('../models');
const { authenticateToken } = require('../controllers');

// GET ALL USERS
api_router.get('/users', authenticateToken, async (req, res) => {
    const users = await User.find()
    res.json(users)
})

// GET YOUR USER WITH AUTH
api_router.get('/user', authenticateToken, async (req, res) => {
    const user_data = await User.findOne({
        username: req.user.data.username,
        email: req.user.data.email
    })
    res.json(user_data)
})

api_router.get('/posts', authenticateToken, async(req, res) => {
    const posts = await Post.find()
    res.json(posts)
})

api_router.post('/posts', authenticateToken, async(req, res) => {
    const new_post = Post.create(req.body)
    res.json(new_post);
})

module.exports = api_router;