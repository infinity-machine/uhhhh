const { Schema, model } = require('mongoose');
const postSchema = require('../models');
// const userSchema = require('../models');

const chatSchema = new Schema({
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    // posts: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'post'
    //     }
    // ],
    posts: [postSchema],
    created: {
        type: Date,
        default: Date.now
    }
});

// const chatSchema = new Schema({
//     fuck: {
//         type: String
//     },
//     created: {
//         type: Date,
//         default: Date.now
//     }
// })

const Chat = model('chat', chatSchema);

module.exports = Chat

