const { Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function () {
    const hashed_pass = await bcrypt.hash(this.password, 10);
    this.password = hashed_pass;
});

userSchema.methods.validatePass = async function (raw_pass) {
    const cooked_pass = await bcrypt.compare(raw_pass, this.password);
    return cooked_pass;
};

const User = model('User', userSchema);

module.exports = User