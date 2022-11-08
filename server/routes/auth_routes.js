const auth_router = require('express').Router();
const { loginUser, logoutUser, registerUser } = require('../controllers');
const { User } = require('../models');

// REGISTER
auth_router.post('/register', async (req, res) => {
    const access_token = await registerUser(req.body);
    if(!access_token) return res.sendStatus(400);
    res.json(access_token);
});

// LOGIN
auth_router.post('/login', async (req, res) => {
    const access_token = await loginUser(req.body);
    if (!access_token) return res.sendStatus(400);
    res.json(access_token);
});

// LOGOUT
// TODO SEPERATE LOGIC INTO CONTROLLER
auth_router.put('/logout', async (req, res) => {
    const user_logged_out = await logoutUser(req.body)
    res.json(`${user_logged_out.username} LOGGED OUT!`);
});

module.exports = auth_router;