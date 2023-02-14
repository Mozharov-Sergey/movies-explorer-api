const { errorMessages } = require('../utils/constants');

const errorsHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? errorMessages.error500Message : err.message;
  res.status(statusCode).send({ error: message });
  next();
};

module.exports = { errorsHandler };
