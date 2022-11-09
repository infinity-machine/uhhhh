const { Schema, model } = require('mongoose');
const postSchema = require('../models');

const chatSchema = new Schema({
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    posts: [postSchema],
    created: {
        type: Date,
        default: Date.now
    }
});

const Chat = model('chat', chatSchema);

module.exports = Chat;

