require('express');
const { User, Key } = require('../models');
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign({ data: user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}

function generateRefreshToken(user) {
    return jwt.sign({ data: user }, process.env.REFRESH_TOKEN_SECRET)
}

async function registerUser(user_to_register) {
    if (!user_to_register) return false;
    const refresh_token = generateRefreshToken(user_to_register);
    const new_user_data = await User.create(user_to_register);
    if (!new_user_data) return false;
    const user_key = await Key.create({
        key: refresh_token,
        user_id: new_user_data._id
    });
    if(!user_key) return false;
    const access_token = generateAccessToken(new_user_data);
    return access_token;
} 

async function loginUser(user_to_login) {
    const { email, password } = user_to_login;
    if (!email && !password) return false;
    const user_data = await User.findOne({
        email: email
    });
    if (!user_data) return false;
    const pass_is_valid = await user_data.validatePass(password);
    if (!pass_is_valid) return false;




    const key = await Key.findOne({
        user_id: user_data._id
    });



    if (!key) return false;

    console.log(key.key)

    const access_token = generateAccessToken({
        username: user_data.username,
        email: user_data.email
    });
    return access_token;
};

module.exports = {
    loginUser, registerUser
};