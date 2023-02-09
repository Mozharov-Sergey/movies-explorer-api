const { celebrate, Joi } = require('celebrate');

const createUserValidator = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
    email: Joi.string().required(),
  }),
});

const updateUserValidator = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
    password: Joi.string(),
  }),
});

const loginValidator = () => celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = { createUserValidator, updateUserValidator, loginValidator };
