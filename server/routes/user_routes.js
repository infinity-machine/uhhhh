const user_router = require('express').Router();
const { User, Message, Chat } = require('../models');
const { authenticateReqToken } = require('../controllers/auth_controllers');
const { userDataByUsername } = require('../controllers/user_controllers');

// GET ALL LOGGED IN USERS EXCEPT FOR YOU!!!
user_router.get('/', authenticateReqToken, async (req, res) => {
    const users = await User.find({
        _id: {
            $ne: req.user.data._id
        },
        is_logged_in: true
    });
    res.json(users);
});

// GET USER BY USERNAME
user_router.get('/:username', authenticateReqToken, async (req, res) => {
    const user_id = await userDataByUsername(req.params.username);
    res.json(user_id)
})

module.exports = user_router;