const { Chat, User } = require('../models');

async function createChat(sending_user, receiving_user) {
    const new_chat = await Chat.create({
        users: [sending_user, receiving_user]
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
