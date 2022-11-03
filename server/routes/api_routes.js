const api_router = require('express').Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// GET ALL USERS
api_router.get('/users', async (req, res) => {
    const users = await User.find()
    res.json(users)
})

// GET YOUR USER WITH AUTH
api_router.get('/user', authenticateToken, async (req, res) => {
    console.log(req.user.data)
    const user_data = await User.findOne({
        username: req.user.data.username,
        email: req.user.data.email
    })
    res.json(user_data)
})

// AUTHENTICATE TOKEN
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        
        // THIS LINE MAY NOT BE NECESSARY?
        if (Date.now() >= (user.exp * 1000)) return res.sendStatus(403)
        //

        req.user = user;
        next();
    })
    
}

function isAuthenticated() {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      decode(token);
      const { exp } = decode(refreshToken);
      if (Date.now() >= exp * 1000) {
        return false;
      }
    } catch (err) {
      return false;
    }
    return true;
  }


module.exports = api_router;