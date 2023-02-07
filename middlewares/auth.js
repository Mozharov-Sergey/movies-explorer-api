const jwt = require('jsonwebtoken');
const { AuthorizationError } = require('../errors/AuthorizationError');

const { NODE_ENV, JWT_SECRET } = process.env;

function auth(req, res, next) {
  const { authorization } = req.headers;

  let payload;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new AuthorizationError('Необходима авторизация');
    }

    const token = authorization.replace('Bearer ', '');
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new AuthorizationError('Невалидный токен');
  }

  req.user = payload;
  next();
}

module.exports = { auth };
