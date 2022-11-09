const message_router = require('express').Router();
const { Chat, Message } = require('../models');

message_router.post('/:chat_id', async (req, res) => {
    const { content, author } = req.body;
    const chat_to_lookup = await Chat.findOneAndUpdate({
        _id: req.params.chat_id
    }, {
        $push: {
            message: {
                content: content,
                author: author
            }
        }
    });
});

message_router.get('/:chat_id', async(req, res) => {
    const chat_to_lookup = await Chat.findOne({
        _id: req.params.chat_id
    });
    res.json(chat_to_lookup.message);
})




module.exports = message_router;