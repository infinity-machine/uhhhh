const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
    users: {
        type: Schema.ObjectId,
        ref: "User"
      },
    // posts: [postSchema],
    created: {
        type: Date,
        default: Date.now
    }
});

const Chat = model('chat', chatSchema);

module.exports = Chat

