const api_router = require('express').Router();

const { User, Message, Chat } = require('../models');
const { authenticateReqToken } = require('../controllers');

// GET ALL LOGGED IN USERS
api_router.get('/users', authenticateReqToken, async (req, res) => {
    const users = await User.find({
        is_logged_in: true
    });
    res.json(users);
});

api_router.get('/user/:username', authenticateReqToken, async (req, res) => {
    const user = await User.findOne({
        username: req.params.username
    });
    res.json(user._id)
})


module.exports = api_router;