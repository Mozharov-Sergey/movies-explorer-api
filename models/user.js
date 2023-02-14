const mongoose = require('mongoose');
const validator = require('validator');
const { errorMessages } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: errorMessages.incorrectEmail,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
