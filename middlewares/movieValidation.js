const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const customIsUrl = (value) => {
  const isUrl = validator.isURL(value);
  if (!isUrl) {
    throw new Error('не корректный URL');
  }
  return value;
};

const createMovieValidation = () => celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.required().custom(customIsUrl),
    trailerLink: Joi.required().custom(customIsUrl),
    thumbnail: Joi.required().custom(customIsUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidation = () => celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

module.exports = { createMovieValidation, deleteMovieValidation };
