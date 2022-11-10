const { Schema, model } = require('mongoose');
const messageSchema = require('../models');
const userSchema = require('../models');

const chatSchema = new Schema({
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    message: [messageSchema],
    created: {
        type: Date,
        default: Date.now
    }
});

const Chat = model('chat', chatSchema);

module.exports = Chat;

