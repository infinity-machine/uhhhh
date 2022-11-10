const { Chat, User } = require('../models');

async function createChat(sender_id, receiver_id) {
    const new_chat = await Chat.create({
        users: [sender_id, receiver_id]
    });
    return new_chat
}

async function getChatData(chat_id) {
    const chat_data = await Chat.findOne({
        _id: chat_id
    });
    return chat_data;
}

module.exports = {
    createChat, getChatData
}
