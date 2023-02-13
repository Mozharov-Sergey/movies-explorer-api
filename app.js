require('dotenv').config();

const PORT = process.env.PORT || 3000;
const { NODE_ENV, DATABASE_ADRESS } = process.env;
const express = require('express');
const { errors } = require('celebrate');
const cors = require('cors');
const mongoose = require('mongoose');
const { devDataBase } = require('./utils/constants');
const { errorsHandler } = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/loggers');
const { index } = require('./routes/index');
const { apiLimiter } = require('./middlewares/limiter');

const app = express();

async function connectToDb() {
  try {
    await mongoose.connect(NODE_ENV === 'production' ? DATABASE_ADRESS : devDataBase, {});
  } catch (e) {
    console.log(e);
  }
}

app.use(cors());
connectToDb();

app.use(express.json());
app.use(requestLogger);

app.use('/api', apiLimiter, index);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`Сервер успешно запущен на порту ${PORT}`);
});
