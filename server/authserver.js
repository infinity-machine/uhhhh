const express = require('express');
const PORT = process.env.PORT || 2222
const path = require('path');
const db = require('./config/connection');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('./models/User');
const Key = require('./models/Key');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const refreshTokens = []


app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.send(403);
        const accessToken = generateAccessToken({ username: user.username });
        res.json({ accessToken: accessToken })
    })
})

// app.delete('/logout', (req, res) => {
//     refreshTokens = refreshTokens.filter(token => token !== req.body.token);
//     res.sendStatus(204);
// })

app.post('/register', async (req, res) => {
    const user = req.body
    const refreshToken = generateRefreshToken(user);
    const new_user = await User.create(user);
    const user_key = await Key.create({
        key: refreshToken,
        user_id: new_user._id
    });
    res.json(user_key);
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        console.log('nah');
    };
    const user = await User.findOne({
        email: email
    });

    const pass_is_valid = await user.validatePass(password, user.password);
    if (!pass_is_valid) {
        return console.log('nah')
    }
    
    const user_key = await Key.findOne({
        user_id: user._id
    });
    const access_token = await generateAccessToken({
        username: user.username,
        email: user.email
    });
    res.json(access_token);
    console.log(access_token)
});

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s'});
}

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}

db.once('open', () => {
  app.listen(PORT, () => console.log(`AUTH SERVER SERVING AT PORT ${PORT}`))
})