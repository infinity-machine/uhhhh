const user_router = require('express').Router();
const { User, Message, Chat } = require('../models');
const { authenticateReqToken } = require('../controllers/auth_controllers');
const { userDataById } = require('../controllers/user_controllers');

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

// GET USER BY ID
user_router.get('/:user_id', authenticateReqToken, async (req, res) => {
    const user_id = await userDataById(req.params.user_id);
    res.json(user_id)
})

module.exports = user_router;