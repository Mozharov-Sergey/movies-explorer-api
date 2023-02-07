const express = require('express');
const { auth } = require('../middlewares/auth');
const { updateUserValidator } = require('../middlewares/userValidation');

const users = express.Router();
const { getMe, updateUserInfo } = require('../controllers/users');

users.use(auth);
users.get('/me', getMe);
users.patch('/me', updateUserValidator(), updateUserInfo);

module.exports = { users };
