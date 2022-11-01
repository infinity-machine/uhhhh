const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const keySchema = new Schema({
    key: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
});

// keySchema.pre('save', async function () {
//     const hashed_key = await bcrypt.hash(this.key, 10);
//     const hashed_id = await bcrypt.hash(this.email, 10);
//     this.key = hashed_key;
//     this.user_id = hashed_id;
// });

const Key = model('key', keySchema);

module.exports = Key;