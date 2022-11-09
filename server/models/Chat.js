const { Schema, model } = require('mongoose');
const messageSchema = require('../models');
const userSchema = require('../models');

const chatSchema = new Schema({
    users: [userSchema],
    message: [messageSchema],
    created: {
        type: Date,
        default: Date.now
    }
});

const Chat = model('chat', chatSchema);

module.exports = Chat;

