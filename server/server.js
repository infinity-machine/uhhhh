const express = require('express');
const PORT = process.env.PORT || 1111
const path = require('path');
const db = require('./config/connection');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/build')));

const User = require('./models/User');

app.get('/users', async (req, res) => {
  const users = await User.find()
  res.json(users)
})

app.get('/user', authenticateToken, async (req, res) => {
  const users = await User.find()
  res.json(users.filter(currentUser => currentUser.username === req.user.username))
})

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