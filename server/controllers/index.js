const { loginUser, logoutUser, registerUser, authenticateReqToken } = require('./auth_controllers');

const {
    getUserChats 
} = require('./chat_controllers');

module.exports = {
    loginUser, logoutUser, registerUser, authenticateReqToken, getUserChats
};