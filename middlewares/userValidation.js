const { celebrate, Joi } = require('celebrate');

const createUserValidator = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(true).min(2).max(30),
    password: Joi.required(true),
  }),
});

const updateUserValidator = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

const loginValidator = () => celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = { createUserValidator, updateUserValidator, loginValidator };
