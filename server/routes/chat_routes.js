const chat_router = require('express').Router()
const { User, Message, Chat } = require('../models');
const { authenticateReqToken } = require('../controllers/auth_controllers');
const { createChat, getChatData } = require('../controllers/chat_controllers')
const { userDataByUsername, userDataById, addChatToUser, getUserChats} = require('../controllers/user_controllers');

chat_router.get('/', authenticateReqToken, async (req, res) => {
    // const chat_users = await getChatUsers(req.user.data._id)
    const user_chats = await getUserChats(req.user.data._id);
    res.json(user_chats);
})

chat_router.get('/:chat_id', authenticateReqToken, async(req, res) => {
    const chat_data = await getChatData(req.params.chat_id);
    res.json(chat_data)
});

chat_router.post('/', authenticateReqToken, async(req, res) => {
    const sending_user = await userDataById(req.user.data._id);
    const receiving_user = await userDataByUsername(req.body.receiver);
    const new_chat = await createChat(sending_user, receiving_user);
    const updated_sender = await addChatToUser(sending_user, new_chat._id);
    const updated_receiver = await addChatToUser(receiving_user, new_chat._id);
});

module.exports = chat_router;