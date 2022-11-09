const Key = require('./Key');
const Chat = require('./Chat');
const { User, userSchema } = require('./User');
const { Message, messageSchema } = require('./Message');

module.exports = {
    Key, User, userSchema, Message, messageSchema, Chat
};