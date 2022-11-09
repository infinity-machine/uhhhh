const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Message = model('message', messageSchema);

module.exports = {
    Message, messageSchema
};