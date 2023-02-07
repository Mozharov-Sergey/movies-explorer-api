require('dotenv').config();

const PORT = process.env.PORT || 3000;
const express = require('express');
const { errors } = require('celebrate');
const cors = require('cors');
const mongoose = require('mongoose');
const { createUser, login } = require('./controllers/users');
const { users } = require('./routes/users');
const { movies } = require('./routes/movies');
const { return404 } = require('./utils/utils');
const { auth } = require('./middlewares/auth');
const { createUserValidator, loginValidator } = require('./middlewares/userValidation');
const { requestLogger, errorLogger } = require('./middlewares/loggers');

const app = express();

async function connectToDb() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/moviesdb', {});
  } catch (e) {
    console.log(e);
  }
}

app.listen(PORT, () => {
  console.log(`Сервер успешно запущен на порту ${PORT}`);
});

app.use(cors());
connectToDb();

app.use(express.json());
app.use(requestLogger);

app.post('/signup', createUserValidator(), createUser);
app.post('/signin', loginValidator(), login);

app.use('/movies', movies);
app.use('/users', users);

app.use('*', auth, return404);
app.use(errorLogger);
app.use(errors());

app.use((err, req, res) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Ошибка на сервере' : err.message;
  res.status(statusCode).send(message);
});
