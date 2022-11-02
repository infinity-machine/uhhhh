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

app.use(express.static(path.join(__dirname, '../client/build')));


// app.post('/token', (req, res) => {
//     const refreshToken = req.body.token
//     if (refreshToken == null) return res.sendStatus(401);
//     if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//         if (err) return res.send(403);
//         const accessToken = generateAccessToken({ username: user.username });
//         res.json({ accessToken: accessToken })
//     })
// })



// REGISTER
app.post('/register', async (req, res) => {
  const user = req.body
  const refreshToken = generateRefreshToken(user);
  const new_user = await User.create(user);
  const user_key = await Key.create({
    key: refreshToken,
    user_id: new_user._id
  });
  const accessToken = generateAccessToken(new_user)
  res.json(accessToken);
});

// LOGIN
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error('PLEASE ENTER YOUR CREDENTIALS');
  };

  const user = await User.findOne({
    email: email
  });

  if (!user) throw new Error('NO USER FOUND WITH THAT EMAIL');

  const pass_is_valid = await user.validatePass(password, user.password);
  if (!pass_is_valid) {
    throw new Error('INVALID PASSWORD');
  }

  const access_token = generateAccessToken({
    username: user.username,
    email: user.email
  });
  res.json(access_token);
});


// function signToken(user, type) {
//     let secret;
//     if (type == 'access') secret = process.env.ACCESS_TOKEN_SECRET
//     if (type == 'refresh') secret = process.env.REFRESH_TOKEN_SECRET
//     return jwt.sign({
//         data: user
//     }, secret,  )
// }


function generateAccessToken(user) {
  return jwt.sign({ data: user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}

function generateRefreshToken(user) {
  return jwt.sign({ data: user }, process.env.REFRESH_TOKEN_SECRET)
}

// GET ALL USERS
app.get('/users', async (req, res) => {
  const users = await User.find()
  res.json(users)
})

// GET YOUR USER WITH AUTH
app.get('/user', authenticateToken, async (req, res) => {
  const users = await User.find()
  res.json(users.filter(currentUser => currentUser.username === req.user.username))
})


// AUTHENTICATE TOKEN
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  })
}

db.once('open', () => {
  app.listen(PORT, () => console.log(`SERVER SERVING AT PORT ${PORT}`))
})