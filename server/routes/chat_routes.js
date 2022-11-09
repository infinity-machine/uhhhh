const chat_router = require('express').Router()
const { User, Message, Chat } = require('../models');
const { authenticateReqToken } = require('../controllers');

chat_router.get('/chats', authenticateReqToken, async (req, res) => {
    const user_chats = await Chat.find({
        users: req.user.data._id
    })
    res.json(user_chats)
})

chat_router.post('/chats', authenticateReqToken, async(req, res) => {
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

module.exports = chat_router;