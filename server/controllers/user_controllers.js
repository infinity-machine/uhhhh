const { User } = require('../models')

async function getLoggedInUsers() {
    const logged_in_users = await User.find({
        is_logged_in: true
    });
    return logged_in_users
}

async function userDataById(id) {
    const user_data = await User.findOne({
        _id: id
    });
    return user_data
}

async function addChatToUser(user_id, chat_id) {
    const updated_user_data = await User.findOneAndUpdate({
        _id: user_id
    }, {
        $push: {
            chats: chat_id
        }
    });
    return updated_user_data
}

async function getUserChats(user_id) {
    const user_data = await User.findOne({
        _id: user_id
    });
    const user_chats = user_data.chats;
    return user_chats;
}

module.exports = {
    getLoggedInUsers, userDataById, addChatToUser, getUserChats
}