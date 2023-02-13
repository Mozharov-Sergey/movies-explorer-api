const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { errorMessages } = require('../utils/constants');
const { AuthorizationError } = require('../errors/AuthorizationError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ConflictError } = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.updateUserInfo = async (req, res, next) => {
  const { name, email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      throw new ConflictError(errorMessages.userDuplication);
    }

    await User.findByIdAndUpdate(req.user._id, { name, email })
      .orFail(() => NotFoundError(errorMessages.userNotExist));
    const updatedUser = await User.findById(req.user._id);
    return res.send(updatedUser);
  } catch (err) {
    return next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { password, email } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AuthorizationError(errorMessages.loginError);
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new AuthorizationError(errorMessages.loginError);
    }

    const token = await jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
      expiresIn: '7d',
    });
    return res.send({ token });
  } catch (err) {
    return next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: passwordHash,
    });

    return res.send({
      name,
      email,
    });
  } catch (err) {
    if (err.code === 11000) {
      return next(new ConflictError(errorMessages.userDuplication));
    }
    return next(err);
  }
};

module.exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError(errorMessages.userNotExist);
    }
    return res.send(user);
  } catch (err) {
    return next(err);
  }
};
