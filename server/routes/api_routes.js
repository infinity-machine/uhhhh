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

api_router.get('/user/:username', authenticateReqToken, async (req, res) => {
    const user = await User.findOne({
        username: req.params.username
    });
    res.json(user._id)
})


// api_router.get('/posts', authenticateReqToken, async(req, res) => {
//     const posts = await Post.find();
//     res.json(posts);
// });

// api_router.post('/posts', authenticateReqToken, async(req, res) => {
//     const new_post = await Post.create(req.body);
//     res.json(new_post);
// });

api_router.get('/chats', authenticateReqToken, async (req, res) => {
    const user = await User.findOne({
        _id: req.user.data._id
    });
    res.json(user.chats)
})

api_router.post('/chats', authenticateReqToken, async(req, res) => {
    const new_chat = await Chat.create({
        users: [req.user.data._id, req.body.receiver]
    });
    const sending_user = await User.findOneAndUpdate({
        _id: req.user.data._id
    }, {
        $push: {
            chats: new_chat._id
        }
    });
    const receiving_user = await User.findOneAndUpdate({
        _id: req.body.receiver
    }, {
        $push: {
            chats: new_chat._id
        }
    })
});

module.exports = api_router;