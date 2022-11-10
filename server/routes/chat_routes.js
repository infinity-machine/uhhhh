const chat_router = require('express').Router()
const { User, Message, Chat } = require('../models');
const { authenticateReqToken } = require('../controllers/auth_controllers');
const { createChat, getChatData } = require('../controllers/chat_controllers')
const { userDataByUsername, userDataById, addChatToUser, getUserChats} = require('../controllers/user_controllers');

chat_router.get('/', authenticateReqToken, async (req, res) => {
    const user_chats = await getUserChats(req.user.data._id);
    res.json(user_chats);
});

chat_router.get('/users/:user_id', authenticateReqToken, async (req, res) => {
    const existing_chat = await Chat.find({
        users: {
            $all: [req.user.data._id, req.params.user_id]
        }
    });
    if (existing_chat.length) res.send(true)
    if(!existing_chat.length) res.send(false)
})


chat_router.get('/:chat_id', authenticateReqToken, async(req, res) => {
    const chat_data = await getChatData(req.params.chat_id);
    res.json(chat_data)
});

chat_router.post('/', authenticateReqToken, async(req, res) => {
    console.log(req.body)
    const sender_id = req.user.data._id;
    const receiver_id = req.body.receiver;
    const new_chat = await createChat(sender_id, receiver_id);
    const new_chat_id = await new_chat._id;
    const updated_sender = await addChatToUser(sender_id, new_chat_id);
    const updated_receiver = await addChatToUser(receiver_id, new_chat_id);
});

module.exports = chat_router;