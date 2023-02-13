const express = require('express');
const { auth } = require('../middlewares/auth');

const index = express.Router();
const { createUserValidator, loginValidator } = require('../middlewares/userValidation');
const { createUser, login } = require('../controllers/users');
const { return404 } = require('../utils/utils');
const { users } = require('./users');
const { movies } = require('./movies');

index.post('/signup', createUserValidator(), createUser);
index.post('/signin', loginValidator(), login);

index.use(auth);

index.use('/movies', movies);
index.use('/users', users);

index.use('*', auth, return404);

module.exports = { index };
