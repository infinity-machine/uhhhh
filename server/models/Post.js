const { Schema, model } = require('mongoose');

const postSchema = new Schema({
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

const Post = model('post', postSchema);

module.exports = {
    Post, postSchema
};