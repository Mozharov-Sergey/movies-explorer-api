const mongoose = require('mongoose');
const validator = require('validator');
const { errorMessages } = require('../utils/constants');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },

  director: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  year: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: errorMessages.incorrectImageUrl,
    },
  },

  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: errorMessages.incorrectTrailerUrl,
    },
  },

  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: errorMessages.incorrectThumbnail,
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  movieId: {
    type: Number,
    required: true,
  },

  nameRU: {
    type: String,
    required: true,
  },

  nameEN: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('movie', movieSchema);
