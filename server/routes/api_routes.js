const api_router = require('express').Router();

const { User, Post, Chat } = require('../models');
const { authenticateReqToken } = require('../controllers');

// GET ALL LOGGED IN USERS
api_router.get('/users', authenticateReqToken, async (req, res) => {
    const users = await User.find({
        is_logged_in: true
    });
    res.json(users);
});


api_router.get('/posts', authenticateReqToken, async(req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

api_router.post('/posts', authenticateReqToken, async(req, res) => {
    const new_post = await Post.create(req.body);
    res.json(new_post);
});

api_router.post('/chats', authenticateReqToken, async(req, res) => {
    console.log(req.body)
    const receiving_user_data = await User.findOne({
        username: req.body.receiver
    });
    console.log(receiving_user_data)
    const new_chat = await Chat.create({
        users: [
            req.body.sender._id, receiving_user_data._id
        ]
    })
    res.json(new_chat);
});

module.exports = api_router;