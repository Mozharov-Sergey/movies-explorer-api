const { NotFoundError } = require('../errors/NotFoundError');
const { BadRequestError } = require('../errors/BadRequestError');
const { UnauthorizerError } = require('../errors/UnauthorizedError');
const Movie = require('../models/movie');

module.exports.getAllMovies = async (req, res, next) => {
  try {
    const allMovies = await Movie.find({ owner: req.user._id });
    return res.send(allMovies);
  } catch (err) {
    return next(err);
  }
};

module.exports.createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  try {
    await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: req.user._id,
      movieId,
      nameRU,
      nameEN,
    });

    return res.send({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: req.user._id,
      movieId,
      nameRU,
      nameEN,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  const { movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      throw new NotFoundError('Фильма с таким ID нет в списке');
    }

    const movieOwner = movie.owner.valueOf();
    if (req.user._id !== movieOwner) {
      throw new UnauthorizerError('Вы не можете удалить фильмы другого пользователя');
    }

    await Movie.findByIdAndRemove(movieId);

    return res.send(movie);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError(err.message));
    }
    return next(err);
  }
};
