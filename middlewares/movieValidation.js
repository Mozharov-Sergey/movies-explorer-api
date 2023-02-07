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
    country: Joi.string().required(true),
    director: Joi.string().required(true),
    duration: Joi.number().required(true),
    year: Joi.string().required(true),
    description: Joi.string().required(true),
    image: Joi.required(true).custom(customIsUrl),
    trailerLink: Joi.required(true).custom(customIsUrl),
    thumbnail: Joi.required(true).custom(customIsUrl),
    owner: Joi.required(true).hex().length(24),
    movieId: Joi.string().required(true),
    nameRU: Joi.string().required(true),
    nameEN: Joi.string().required(true),
  }),
});

const deleteMovieValidation = () => celebrate({
  params: Joi.object().keys({
    movieId: Joi.required(true).hex().length(24),
  }),
});

module.eports = { createMovieValidation, deleteMovieValidation };
