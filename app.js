require('dotenv').config();

const PORT = process.env.PORT || 3000;
const { NODE_ENV, DATABASE_ADRESS } = process.env;
const express = require('express');
const { errors } = require('celebrate');
const cors = require('cors');
const mongoose = require('mongoose');
const { createUser, login } = require('./controllers/users');
const { users } = require('./routes/users');
const { movies } = require('./routes/movies');
const { return404 } = require('./utils/utils');
const { auth } = require('./middlewares/auth');
const { errorsHandler } = require('./middlewares/errorsHandler');
const { createUserValidator, loginValidator } = require('./middlewares/userValidation');
const { requestLogger, errorLogger } = require('./middlewares/loggers');

const app = express();

async function connectToDb() {
  try {
    await mongoose.connect(NODE_ENV === 'production' ? DATABASE_ADRESS : 'mongodb://127.0.0.1:27017/bitfilmsdb', {});
  } catch (e) {
    console.log(e);
  }
}

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

app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`Сервер успешно запущен на порту ${PORT}`);
});
